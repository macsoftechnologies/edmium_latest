import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
  Delete,
} from '@nestjs/common';
import {
  CreateUser,
  UserLogin,
  FavoriteListDto,
  FilterStudentsDto,
  SwitchFavoriteUniversityRanksDto,
  AddCounselorDto,
  AssignStudentToCounselorDto,
  RegisterStudentDto,
  FetchUsersDto,
  UpdateCounselorDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { SearchUniversitiesByIntCourUniNameDto } from 'src/university_details/dto/university_details.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';
import { PaginationDto } from 'src/shared/dto/shared.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
  ) {}

  /* Create User  */
  @Post('/signUp')
  async createUser(@Body() createUser: CreateUser) {
    try {
      console.log(createUser);
      let response = await this.userService.createUser(createUser);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* User LogIn */
  @Post('/logIn')
  async userLogIn(@Body() userLogIn: UserLogin) {
    try {
      console.log(userLogIn);
      let response = await this.userService.userLogIn(userLogIn);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Profile Image
  @Post('/profileImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addProfileImage(@UploadedFile() file, @Param('id') id: string) {
    try {
      const profileImage = await this.sharedService.uploadFileToAWSBucket(
        file,
        'user/profile-image',
      );
      const response = await this.userService.updateUser(id, {
        profileImage: profileImage.Location,
      });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* Search universities by intake , course, and university */
  @Post()
  async getUniversitiesByIntakeCourseUniversity(
    @Body()
    searchUniversitiesByIntCourUniNameDto: SearchUniversitiesByIntCourUniNameDto,
  ) {
    try {
      let universities = await this.userService.getUniversitiesByIntakeCourseUniversity(
        searchUniversitiesByIntCourUniNameDto,
      );
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Add favorite University
  @Post('/addFavoriteUniversity')
  async addFavoriteUniversity(@Body() body: FavoriteListDto) {
    try {
      let universities = await this.userService.addFavoriteUniversity(body);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Remove favorite University
  @Post('/removeFavoriteUniversity')
  async removeFavoriteUniversity(@Body() body: FavoriteListDto) {
    try {
      let universities = await this.userService.removeFavoriteUniversity(body);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Switch Favorite University Ranks
  @Post('/switchFavoriteUniversityRanks')
  async switchFavoriteUniversityRanks(
    @Body() body: SwitchFavoriteUniversityRanksDto,
  ) {
    try {
      let universities = await this.userService.switchFavoriteUniversityRanks(
        body,
      );
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Get favorite Universities
  @Get('/favoriteUniversities/:id')
  async getFavoriteUniversities(@Param('id') id: string) {
    try {
      let universities = await this.userService.getFavoriteUniversities(id);
      return universities;
    } catch (error) {
      return error;
    }
  }

  // Filter students
  @Post('/filter-by-criteria')
  async filterStudents(@Body() params: FilterStudentsDto) {
    try {
      let response = await this.userService.filterStudents(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Counselor
  @Post('/addCounselor')
  async addCounselor(@Body() body: AddCounselorDto) {
    try {
      console.log(body);
      const params: any = body;
      params.role = 'counselor';
      let response = await this.userService.createUser(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Counselor
  @Get('/counselors')
  async getCounselors() {
    try {
      let response = await this.userService.getUsers({ role: 'counselor' });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Update Counselor
  @Put('/:id')
  async updateCounselor(
    @Body() body: UpdateCounselorDto,
    @Param('id') id: string,
  ) {
    try {
      console.log(body);
      let response = await this.userService.updateUser(id, body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Delete Counselor
  @Delete('/:id')
  async deleteCounselor(@Param('id') id: string) {
    try {
      let response = await this.userService.deleteUser(id);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Assign student to Counselor
  @Post('/assignStudentToCounselor')
  async assignStudentToCounselor(@Body() body: AssignStudentToCounselorDto) {
    try {
      console.log(body);
      const params: any = body;
      params.role = 'counselor';
      let response = await this.userService.updateUser(body.userId, {
        assignedTo: body.counselorId,
      });
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  /* Create User  */
  @Post('/registerStudent')
  async registerStudent(@Body() body: RegisterStudentDto) {
    try {
      console.log(body);
      let response = await this.userService.createUser(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  @Get('/counselor/applicationsStatus/:counselorId')
  async applicationsStatus(@Param('counselorId') counselorId: string) {
    try {
      let response = await this.userService.applicationsStatus(counselorId);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Users For Eligibility Check
  @Post('/forEligibilityCheck')
  async getUsersForEligibilityCheck(@Body() body: PaginationDto) {
    try {
      const params: any = body;
      params.role = 'student';

      const params1 = await this.sharedService.prepareParams(params);
      let response = await this.userService.fetchUsers(params1);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Users For Eligibility Check
  @Get('/relatedUniversities/:id')
  async relatedUniversities(@Param('id') id: string) {
    try {
      let response = await this.userService.relatedUniversities(id);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Suggested University
  @Post('/addSuggestedUniversity')
  async addSuggestedUniversity(@Body() body: FavoriteListDto) {
    try {
      let response = await this.userService.addSuggestedUniversity(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Remove Suggested University
  @Post('/removeSuggestedUniversity')
  async removeSuggestedUniversity(@Body() body: FavoriteListDto) {
    try {
      let response = await this.userService.removeSuggestedUniversity(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Suggested University
  @Post('/getSuggestedUniversities/:id')
  async getSuggestedUniversities(@Param('id') id: string) {
    try {
      let response = await this.userService.getSuggestedUniversities(id);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Agent
  @Post('/addAgent')
  async addAgent(@Body() body: AddCounselorDto) {
    try {
      console.log(body);
      const params: any = body;
      params.role = 'agent';
      let response = await this.userService.createUser(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  //Get Agents
  @Post('/fetchAll')
  async fetchAll(@Body() body: FetchUsersDto) {
    try {
      const params = await this.sharedService.prepareParams(body);
      // body = Object.assign(paginationObject, body);
      console.log(params);
      let response = await this.userService.fetchAll(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Add Agent Counselor
  @Post('/addAgentCounselor')
  async addAgentCounselor(@Body() body: AddCounselorDto) {
    try {
      console.log(body);
      const params: any = body;
      params.role = 'agent-counselor';
      let response = await this.userService.createUser(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Agent Counselors
  @Post('/getAgentCounselors/:agentId')
  async getAgentCounselors(
    @Body() body: PaginationDto,
    @Param('agentId') agentId: string,
  ) {
    try {
      const params1: any = body;
      params1.role = 'agent-counselor';
      params1.assignedTo = agentId;
      const params = await this.sharedService.prepareParams(params1);

      let response = await this.userService.fetchUsers(params);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
