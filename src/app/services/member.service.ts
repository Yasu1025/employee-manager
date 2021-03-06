import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { MEMBERS } from '../mocks/member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private MEMBERS_URL = 'api/members';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.MEMBERS_URL)
      .pipe(
        tap(_ => this.log('Get Employees Data')),
        catchError(this.handleError<Member[]>('getMembers', []))
      );
  }

  getMember(id: number): Observable<Member> {
    this.log(`Get Employee[${id}] Data`);
    const url = `${this.MEMBERS_URL}/${id}`;
    return this.http.get<Member>(url)
      .pipe(
        tap(_ => this.log(`Get Employee[${id}] Data`)),
        catchError(this.handleError<Member>(`getMember id: ${id}`))
      )
  }

  updadateMember(member: Member): Observable<any> {
    return this.http.put(this.MEMBERS_URL, member, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Update Employee[${member.id}] Data`)),
        catchError(this.handleError<Member>(`updateMember id: ${member.id}`))
      )
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post(this.MEMBERS_URL, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) => this.log(`Add new Employee ID: ${newMember.id}`)),
        catchError(this.handleError<Member>(`addMember`))
      )
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === `number` ? member : member.id;
    const url = `${this.MEMBERS_URL}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Delete ${id}`)),
        catchError(this.handleError<Member>(`deleteMember`))
      )
  }

  searchMembers(terms: string): Observable<Member[]> {
    if(!terms.trim()) {
      return of([]);
    }
    const url = `${this.MEMBERS_URL}/?name=${terms}`;
    return this.http.get<Member[]>(url)
      .pipe(
        tap(_ => this.log(`Search: Match employees's name of ${terms}`)),
        catchError(this.handleError<Member[]>(`searchMember`, []))
      )
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation}: get members Failed...`);

      return of(result as T);
    }
  }
}
