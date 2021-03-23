import { Component, OnInit } from '@angular/core';
import { GlobalDataInt, NewsDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  public data: GlobalDataInt | undefined;
  public news: NewsDataInt[] | undefined;
  public loaded = false;
  public updated: string | undefined;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.data = data;
      this.news = data.news;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();

      this.loaded = true;
    });
  }
  onImgError(event: any) {
    event.target.src = '../assets/img/default-avatar.png';
  }
}
