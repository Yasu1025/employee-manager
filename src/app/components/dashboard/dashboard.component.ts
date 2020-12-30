import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers()
      .subscribe(members => this.members = members.slice(1, 5))
  }

}
