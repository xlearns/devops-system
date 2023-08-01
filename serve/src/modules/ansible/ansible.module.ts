import { Module } from '@nestjs/common';
import { AnsibleService } from './ansible.service';

@Module({
  providers: [AnsibleService],
})
export class AnsibleModule {}
