import {
    Controller,
    Post,
    Body,
    HttpStatus,
    Put, Get, Param
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgentCommissionService } from './agent-commission.service';
import { CommissionDto, CommissionUpdateDto } from './dto/agent-commission.cto';

@Controller('agent-commission')
export class AgentCommissionController {

     constructor(private agentCommission : AgentCommissionService){}
     @ApiTags('AgentCommission')
     @Post('')
     async addCommission(@Body() commission : CommissionDto){
         try {
            const response = await this.agentCommission.addCommission(
              commission
              );
              return response;
             
         } catch (error) {
           return{
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            data: null,
            errorMessage: error.message,
           }  
         }

     }

     @ApiTags('AgentCommission')
     @Put('')
     async updateCommission(@Body() updateCommission : CommissionUpdateDto){
      try {
         const response = await this.agentCommission.updateCommission(
          updateCommission
           );
           return response;
          
      } catch (error) {
        return{
         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
         data: null,
         errorMessage: error.message,
        }  
      }

  }

  @ApiTags('AgentCommission')
  @Get('/:CommissionId')
  async getCommissionById(@Param('CommissionId')  CommissionId : string){
   try {
      const response = await this.agentCommission.getCommissionById(
        CommissionId
        );
        return response;
       
   } catch (error) {
     return{
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      errorMessage: error.message,
     }  
   }

}

@ApiTags('AgentCommission')
@Get('')
async getCommissions(){
  try {
    const response = await this.agentCommission.getCommissions();
      return response;
     
 } catch (error) {
   return{
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    data: null,
    errorMessage: error.message,
   }  
 }

}

}
