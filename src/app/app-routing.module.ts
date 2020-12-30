import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { MembersComponent } from './components/members/members.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: MemberDetailComponent},
  { path: 'members', component: MembersComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
