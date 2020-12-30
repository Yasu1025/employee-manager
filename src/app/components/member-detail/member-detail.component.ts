import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(id)
      .subscribe(member => this.member = member)
  }

  save(): void {
    this.memberService.updadateMember(this.member)
      .subscribe(member => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}
