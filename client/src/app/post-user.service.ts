import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFormInt } from 'src/interfaces/ProfileInt';

const url = 'https://leaderboard-api.nhcarrigan.com/user';

@Injectable({
  providedIn: 'root',
})
export class PostUserService {
  constructor(private http: HttpClient) {}

  public postUser(data: UserFormInt) {
    return this.http.post(url, data, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    });
  }
}
