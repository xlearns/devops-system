import { Module } from '@nestjs/common';
import { AnsibleService } from './ansible.service';

@Module({
  providers: [AnsibleService],
  exports: [AnsibleService],
})
export class AnsibleModule {}
