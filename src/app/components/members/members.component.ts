import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  selectedMember: Member;

  constructor(
    private memberService: MemberService,
    private messageService: MessageService
  ) { }

  onSelectMember(member: Member): void{
    this.messageService.add(`MemberComponent: ID${member.id} selected`)
    this.selectedMember = member;
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members);
  }

}
