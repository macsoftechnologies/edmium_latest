import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import {
  UniversityApplicationDto,
  ApplicationsOfStudentDto,
  UpdateStatusDto,
  ApplicationsFilterDto,
} from './dto/university-applications.dto';
import { UniversityApplicationsService } from './university-applications.service';
import { PaginationDto } from 'src/shared/dto/shared.dto';

import moment = require('moment');
import { ApplicationStatusService } from 'src/application-status/application-status.service';
import { CommissionTransactionsService } from 'src/commission-transactions/commission-transactions.service';
import { UniversityDetailsService } from 'src/university_details/university_details.service';
import { AgentCommissionService } from 'src/agent-commission/agent-commission.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/dto/user.schema';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';
import { Country } from 'src/country/dto/country.schema';
import { Currency } from 'src/currency/dto/currency.schema';
import { SharedService } from 'src/shared/shared.service';
import { NotificationService } from 'src/notification/notification.service';
import { University } from 'src/university/dto/university.schema';

var mongoose = require('mongoose');

@Controller('university-applications')
export class UniversityApplicationsController {
  constructor(
    private universityApplicationService: UniversityApplicationsService,
    private applicationStatusService: ApplicationStatusService,
    private commissionTransactionsService: CommissionTransactionsService,
    private universityDetailsService: UniversityDetailsService,
    private agentCommissionService: AgentCommissionService,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('ApplicationStatus')
    private applicationStatusModel: Model<ApplicationStatus>,
    @InjectModel('Country')
    private countryModel: Model<Country>,
    @InjectModel('Currency')
    private currencyModel: Model<Currency>,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    @InjectModel('University')
    private universityModel: Model<University>,
  ) {}

  //   Apply for University
  @Post()
  async addUniversityApplication(@Body() body: UniversityApplicationDto) {
    try {
      console.log(body);

      if (
        (await this.universityApplicationService.find({ user: body.user })) >= 7
      ) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessage: 'You can apply for max of 7 Universities',
        };
      }

      if ((await this.universityApplicationService.find(body)) > 0) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessage: 'You have already applied to this University',
        };
      }

      const params: any = body;
      const maxUniqueId = await this.universityApplicationService.getMaxUniqueId();
      if (maxUniqueId.length > 0) {
        params.uniqueId = ++maxUniqueId[0].uniqueId;
      }
      const currentYear = moment().year();
      const nextYear = currentYear + 1;
      params.year =
        currentYear.toString().substring(2, 4) +
        '-' +
        nextYear.toString().substring(2, 4);

      const status = await this.applicationStatusService.find({
        isDefault: true,
      });

      const user: any = await this.userModel.findById(body.user).populate({
        path: 'assignedTo',
        model: this.userModel,
        retainNullValues: true,
      });

      const universityDetails = await this.universityDetailsService.getOne({
        _id: body.universityDetails,
      });

      const university = await this.universityModel.findOne({
        _id: universityDetails.university,
      });

      if (status.data && status.data[0] && status.data[0]._id)
        params.status = status.data[0]._id;
      let response = await this.universityApplicationService.addUniversityApplication(
        params,
      );

      const notificationObj = {
        usersTo: [user.assignedTo._id],
        notification: {
          action: 'university-application',
          title: 'Applied for University',
          body: `${user.firstName} ${user.lastName} applied for ${universityDetails.course} in ${university.universityName}`,
          actionId: response._id,
        },
      };

      await this.notificationService.sendNotifications(notificationObj);

      const agentCommission = await this.agentCommissionService.getOne({
        university: universityDetails.university,
        country: universityDetails.country,
        education: universityDetails.studyLevel,
        isDeleted: false,
      });

      let commission = 0;

      if (
        agentCommission &&
        universityDetails &&
        universityDetails.tuitionFee
      ) {
        commission =
          (agentCommission.commission * universityDetails.tuitionFee) / 100;
      }

      let agent;
      if (
        user &&
        user.assignedTo &&
        (user.assignedTo.role == 'admin' || user.assignedTo.role == 'agent')
      ) {
        agent = user.assignedTo._id;
      } else if (
        user &&
        user.assignedTo &&
        user.assignedTo.role == 'agent-counselor' &&
        user.assignedTo.assignedTo
      ) {
        agent = user.assignedTo.assignedTo;
      } else {
        // for counselor and anonymous user
        const admin = await this.userModel.findOne({
          isDeleted: false,
          role: 'admin',
        });
        if (admin && admin._id) agent = admin._id;
      }

      // insert commission transaction
      if (agent) {
        await this.commissionTransactionsService.insertTransaction({
          user: body.user,
          agent: agent,
          application: response.data._id,
          country: universityDetails.country,
          commission: commission,
        });
      }

      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/listing')
  async getAllApplications(@Body() params: PaginationDto) {
    try {
      let response = await this.universityApplicationService.getAllApplications(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/filter-by-user')
  async getApplicationsOfStudent(@Body() params: ApplicationsOfStudentDto) {
    try {
      let response = await this.universityApplicationService.getApplicationsOfStudent(
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get User Academic Info
  @Post('/filter-by-criteria/:userId')
  async filterApplications(
    @Body() body: ApplicationsFilterDto,
    @Param('userId') userId: string,
  ) {
    try {
      const params = await this.sharedService.prepareParams(body);

      let response = await this.universityApplicationService.filterApplications(
        userId,
        params,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Update Status
  @Post('/status/:id')
  async updateStatus(@Body() params: UpdateStatusDto, @Param('id') id: string) {
    try {
      const status = await this.applicationStatusModel.findById(params.status);
      const application = await this.universityApplicationService.getById(id);
      // console.log(application);
      if (status.initiateCommission) {
        const applications = await this.commissionTransactionsService.fetch({
          user: application.user._id,
          isActualAmount: true,
        });
        // console.log(applications);
        if (applications && applications.length) {
          return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage:
              'Application processed for another Application of this Student.',
          };
        } else {
          await this.commissionTransactionsService.update(
            {
              isDeleted: false,
              user: application.user._id,
            },
            { isEstimatedAmount: false },
          );

          await this.commissionTransactionsService.update(
            {
              application: id,
            },
            { isActualAmount: true },
          );

          const universityDetails = await this.universityDetailsService.getOne({
            _id: application.universityDetails._id,
          });

          const country: any = await await this.countryModel
            .findById(universityDetails.country)
            .populate({
              path: 'currency',
              model: this.currencyModel,
            });

          const transactionRecord = await this.commissionTransactionsService.getOne(
            {
              application: id,
            },
          );

          const agentRecord = await this.userModel.findById(
            transactionRecord.agent,
          );

          const commission =
            agentRecord.commission +
            country.currency.equivalentValueInINR *
              transactionRecord.commission;

          await this.userModel.updateOne(
            { _id: transactionRecord.agent },
            { $set: { commission: commission } },
          );
        }
      } else if (status.applicationClosed) {
        await this.commissionTransactionsService.update(
          {
            application: id,
          },
          { isEstimatedAmount: false },
        );
      }
      const data: any = Object.assign({}, params);
      data.$push = {
        statusHistory: { status: params.status, comment: params.comment },
      };
      delete data.comment;

      let response = await this.universityApplicationService.updateStatus(
        id,
        data,
      );

      const notificationObj = {
        usersTo: [application.user._id],
        notification: {
          action: 'application-status-update',
          title: 'Application Status Updated',
          body: `Application status for ${application.universityDetails.course} in ${application.universityDetails.university.universityName} is updated to ${status.status}`,
          actionId: id,
        },
      };

      await this.notificationService.sendNotifications(notificationObj);

      let toEmail = application.user.emailAddress;
      let role = application.user.role;

      if (
        application.createdBy &&
        application.createdBy._id &&
        application.createdBy._id != application.user._id
      ) {
        toEmail = application.createdBy.emailAddress;
        role = application.createdBy.role;
      }

      await this.sharedService.sendMail({
        to: toEmail,
        studentName:
          application.user.firstName + ' ' + application.user.lastName,
        applicationId: application.uniqueId,
        country: application.universityDetails.country.name,
        institution: application.universityDetails.university.universityName,
        program: application.universityDetails.course,
        intake: application.intake,
        year: application.yearOfPass,
        status: status.status,
        comment: params.comment,
        role: role,
      });

      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
