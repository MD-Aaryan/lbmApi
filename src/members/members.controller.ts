// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Req,
// } from '@nestjs/common';
// import { MembersService } from './members.service';
// import { CreateMemberDto } from './dto/create-member.dto';
// import { UpdateMemberDto } from './dto/update-member.dto';
// import { Request } from 'express';
// import { Librarian } from '@prisma/client';

// interface memberRequest extends Request {
//   payload: Librarian;
// }

// @Controller('members')
// export class MembersController {
//   constructor(private readonly membersService: MembersService) {}

//   @Post()
//   create(
//     @Body() createMemberDto: CreateMemberDto,
//     @Req() request: memberRequest,
//   ) {
//     createMemberDto.mem_id = request.payload.id;
//     return this.membersService.create(createMemberDto);
//   }

//   @Get()
//   findAll(@Req() request: memberRequest) {
//     return this.membersService.findAll(request.payload.id);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string, @Req() request: memberRequest) {
//     return this.membersService.findOne(+id, request.payload.id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
//     return this.membersService.update(+id, updateMemberDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string, @Req() request: memberRequest) {
//     return this.membersService.remove(+id, request.payload.id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';
import { Librarian } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth/auth.guard';

// Custom interface for request to access `payload` from JWT
interface MemberRequest extends Request {
  payload?: Librarian; // <-- Added for type safety
}

// Apply AuthGuard globally to all controller routes
@UseGuards(AuthGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(
    @Body() createMemberDto: CreateMemberDto,
    @Req() request: MemberRequest,
  ) {
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token'); // <-- Added null check
    }

    // Set the mem_id from logged-in librarian's token
    createMemberDto.mem_id = request.payload.id; // <-- Key line to link member to librarian
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(@Req() request: MemberRequest) {
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token'); // <-- Added null check
    }

    // Use librarian id from payload
    return this.membersService.findAll(request.payload.id); // <-- Fixed root cause of your original error
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: MemberRequest) {
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.membersService.findOne(+id, request.payload.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: MemberRequest) {
    if (!request.payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.membersService.remove(+id, request.payload.id);
  }
}
