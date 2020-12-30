import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const members: Member[] = [
      { id: 11, name: 'Tom Bond' },
      { id: 12, name: 'James Bond' },
      { id: 13, name: 'Brad Pitt' },
      { id: 14, name: 'Micheal Jordan' },
      { id: 15, name: 'Sam Todd' },
      { id: 16, name: 'Matt Damon' },
      { id: 17, name: 'Daniel King' },
      { id: 18, name: 'Anne Frank' },
      { id: 19, name: 'Mother Teresa' },
      { id: 20, name: 'Taro Yamada' }
    ];

    return { members }
  }

  genId(members: Member[]): number {
    return members.length > 0 ?
      Math.max(...members.map(member => member.id)) + 1 :
      11
  }
}
