import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getRoot() {
    return {
      message: 'NestJS is running successfully 🚀',
    };
  }
}
