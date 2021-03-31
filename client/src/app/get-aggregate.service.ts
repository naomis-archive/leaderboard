import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AggregateDataInt } from 'src/interfaces/AggregateDataInt';

// const URL = 'https://leaderboard-api.nhcarrigan.com/aggregate';
const URL = 'http://localhost:8000/aggregate'
@Injectable({
  providedIn: 'root',
})
export class GetAggregateService {
  public responseCache = new Map();
  constructor(private http: HttpClient) {}

  public getData(): Observable<AggregateDataInt> {
    const dataFromCache = this.responseCache.get(URL);
    if (dataFromCache) {
      return of(dataFromCache);
    }
    const response = this.http.get<AggregateDataInt>(URL);
    response.subscribe((data) => this.responseCache.set(URL, data));
    return response;
  }

  public clearCache(): void {
    this.responseCache = new Map();
  }
}
