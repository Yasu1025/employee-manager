import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members);
  }

  add(name: string) {
    name = name.trim();
    if(!name) return;
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member)
      });
  }

}
