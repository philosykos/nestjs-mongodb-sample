import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from './../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCurrentCat() {
    return 'one cat';
  }

  @Post()
  async signUp(@Body() catRequestDto: CatRequestDto) {
    return this.catsService.signUp(catRequestDto);
  }

  @Post('login')
  async logIn() {
    return 'login';
  }

  @Post('logout')
  async logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
