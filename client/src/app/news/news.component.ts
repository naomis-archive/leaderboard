import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  public data: any;
  public news: any;
  public loaded = false;
  public updated: any;

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.news = data.news;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();

      this.loaded = true;
    });
  }
}
