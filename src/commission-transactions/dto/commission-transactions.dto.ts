import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class CommissionTransactionDto {

    @ApiProperty()
    @IsString()
    user: string;

    @ApiProperty()
    @IsString()
    applicationId: string;

    @ApiProperty()
    @IsString()
    countryId: string
    
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    estimatedAmount: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    actualAmount: number


}