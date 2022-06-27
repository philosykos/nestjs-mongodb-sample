import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats/cats.schema';
import { CatsRepository } from './../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository, private readonly jwtService: JwtService) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat: Cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

		const payload = { email: email, sub: cat.id };

		return {
			token: this.jwtService.sign(payload),
		}
  }
}
