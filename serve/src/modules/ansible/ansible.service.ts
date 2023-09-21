import { Injectable } from '@nestjs/common';
import Ansible from 'node-ansible-control';

@Injectable()
export class AnsibleService {
  #playbook;
  constructor() {}

  setPlaybook(playbooksDir: string, name: string = 'hosts') {
    this.#playbook = new Ansible.Playbook().inventory(
      `${playbooksDir}/${name}.yml`,
    );
  }

  getPlaybook() {
    return this.#playbook;
  }

  async execPlaybook() {
    const promise = this.#playbook.exec();
    const res = await promise;
    return res;
  }
}
