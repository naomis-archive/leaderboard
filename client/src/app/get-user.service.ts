import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDataInt } from 'src/interfaces/ProfileInt';

const URL = 'https://leaderboard-api.nhcarrigan.com/user';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  public responseCache = new Map();
  constructor(private http: HttpClient) {}

  public getUser(): Observable<UserDataInt[]> {
    const dataFromCache = this.responseCache.get(URL);
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<UserDataInt[]>(URL);
    response.subscribe((data) => this.responseCache.set(URL, data));
    return response;
  }
}
