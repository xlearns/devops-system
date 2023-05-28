import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';

@Module({
  imports: [HttpModule],
  providers: [RobotService],
})
export class RobotModule {}
