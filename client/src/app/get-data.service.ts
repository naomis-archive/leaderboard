import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalDataInt } from 'src/interfaces/GlobalDataInt';

const URL = 'http://leaderboard-api.nhcarrigan.com:8000/get-data';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  public responseCache = new Map();
  constructor(private http: HttpClient) {}

  public getData(): Observable<GlobalDataInt> {
    const dataFromCache = this.responseCache.get(URL);
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<GlobalDataInt>(URL);
    response.subscribe((data) => this.responseCache.set(URL, data));
    return response;
  }
}
