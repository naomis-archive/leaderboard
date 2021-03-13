import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public data: any;
  public news: any;
  public loaded = false;

  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.news = data.news;
      this.loaded = true;
    });
  }
}
