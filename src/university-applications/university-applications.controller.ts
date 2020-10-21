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
import { userInfo } from 'os';
import { UniversityDetailsService } from 'src/university_details/university_details.service';
import { AgentCommissionService } from 'src/agent-commission/agent-commission.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/dto/user.schema';
import { ApplicationStatus } from 'src/application-status/dto/application-status.schema';
import { Country } from 'src/country/dto/country.schema';
import { Currency } from 'src/currency/dto/currency.schema';

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
  ) {}

  //   Apply for University
  @Post()
  async addUniversityApplication(@Body() body: UniversityApplicationDto) {
    try {
      console.log(body);

      if ((await this.universityApplicationService.checkDuplicate(body)) > 0) {
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

      // params.universityDetails = mongoose.Types.ObjectId(
      //   params.universityDetails,
      // );
      // params.user = mongoose.Types.ObjectId(params.user);

      const status = await this.applicationStatusService.find({
        isDefault: true,
      });

      if (status.data && status.data[0] && status.data[0]._id)
        params.status = status.data[0]._id;
      let response = await this.universityApplicationService.addUniversityApplication(
        params,
      );

      const universityDetails = await this.universityDetailsService.getOne({
        _id: body.universityDetails,
      });

      const agentCommission = await this.agentCommissionService.getOne({
        universityDetails: body.universityDetails,
        country: universityDetails.country,
        education: universityDetails.studyLevel,
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

      const user: any = await this.userModel.findById(body.user).populate({
        path: 'assignedTo',
        model: this.userModel,
        retainNullValues: true,
      });

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
  @Post('/filter-by-criteria')
  async filterApplications(@Body() params: ApplicationsFilterDto) {
    try {
      let response = await this.universityApplicationService.filterApplications(
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
      const application = await this.universityApplicationService.getApplicationById(
        id,
      );
      if (status.initiateCommission) {
        const applications = await this.universityApplicationService.fetch({
          isDefault: false,
          user: application.user,
          status: params.status,
        });
        if (applications && applications.length) {
          return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage:
              'VISA Processed for another Application of this Student.',
          };
        } else {
          await this.commissionTransactionsService.update(
            {
              isDeleted: false,
              user: application.user,
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
            _id: application.universityDetails,
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
      const data: any = params;
      data.$push = {
        statusHistory: { status: params.status, comment: params.comment },
      };
      delete data.comment;

      let response = await this.universityApplicationService.updateStatus(
        id,
        data,
      );
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
