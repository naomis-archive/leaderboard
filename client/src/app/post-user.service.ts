import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataInt, UserFormInt } from 'src/interfaces/ProfileInt';
import { GetAggregateService } from './get-aggregate.service';

const url = 'http://localhost:8000/user';
@Injectable({
  providedIn: 'root',
})
export class PostUserService {
  constructor(
    private http: HttpClient,
    private getAggregateService: GetAggregateService
  ) {}

  public postUser(data: UserFormInt) {
    this.getAggregateService.clearCache();
    return this.http.post<UserDataInt>(url, data, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    });
  }
}
