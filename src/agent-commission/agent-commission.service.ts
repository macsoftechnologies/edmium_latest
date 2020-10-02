import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from 'src/country/dto/country.schema';
import { University } from 'src/university/dto/university.schema';
import { CommissionDto, CommissionUpdateDto } from './dto/agent-commission.cto';
import { AgentCommission } from './dto/agent-commission.schema';

@Injectable()
export class AgentCommissionService {

    constructor(
        @InjectModel('AgentCommission')
        private agentCommissionModel: Model<AgentCommission>,
        @InjectModel('Country') private countryModel: Model<Country>,
        @InjectModel('University')
        private universityModel: Model<University>,
    ) { }



    async addCommission(commission: CommissionDto) {
        try {

            const University = commission.university
            const Country = commission.country
            const Campus = commission.campus
            const Education = commission.education

            const duplicate = await this.agentCommissionModel.findOne({ $and: [{ university: University }, { country: Country }, { campus: Campus }, { education: Education }] })
            if (duplicate) {
                return {
                    statusCode: HttpStatus.CONFLICT,
                    data: duplicate,
                    errorMessage: "Commission Already exit",
                }
            }

            const response = await this.agentCommissionModel.create(commission)
            if (response) {
                return {
                    statusCode: HttpStatus.OK,
                    data: response,
                    message: "Commission Added SuccessFully",
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: null,
                errorMessage: "Commission Added Failed ",
            }

        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                errorMessage: error.message,
            }
        }
    }

    async updateCommission(updateCommission: CommissionUpdateDto) {
        try {
            const CommissionId = updateCommission.commissionId
            const Commission = updateCommission.commission

            const response = await this.agentCommissionModel.updateOne({ _id: CommissionId }, { $set: { commission: Commission } })

            if (response.nModified == 1) {
                return {
                    statusCode: HttpStatus.OK,
                    data: null,
                    message: "Commission Updated SuccessFully",
                }
            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                data: null,
                errorMessage: "Commission Updated Failed ",
            }

        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                errorMessage: error.message,
            }
        }
    }

    async getCommissionById(CommissionId: string) {
        try {

            const response = await this.agentCommissionModel.findOne({ _id: CommissionId })
                .populate({
                    path: 'country',
                    model: this.countryModel,
                    retainNullValues: true,
                })
                .populate({
                    path: 'university',
                    model: this.universityModel,
                    retainNullValues: true,
                })

            if (response) {
                return {
                    statusCode: HttpStatus.OK,
                    data: response,
                    message: "Commission Details",
                }
            }


            return {
                statusCode: HttpStatus.NOT_FOUND,
                data: null,
                errorMessage: "Commission Not Found ",
            }


        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                errorMessage: error.message,
            }
        }
    }

    async getCommissions() {
        try {

            const response = await this.agentCommissionModel.find()
                .populate({
                    path: 'country',
                    model: this.countryModel,
                    retainNullValues: true,
                })
                .populate({
                    path: 'university',
                    model: this.universityModel,
                    retainNullValues: true,
                }).lean()

                 return {
                    statusCode: HttpStatus.OK,
                    data: response,
                    message: "Commissions List"
                 }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                errorMessage: error.message,
            }
        }
    }

}
