import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { MEMBERS } from '../mocks/member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private messageService: MessageService) { }

  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService: Get Employees Data')
    return of(MEMBERS);
  }
}
