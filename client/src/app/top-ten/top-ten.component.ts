import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css'],
})
export class TopTenComponent implements OnInit {
  public data: any;
  public loaded = false;
  public updated: any;
  public crowdin: any;
  public forum: any;
  public github: any;
  public news: any;
  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.data = data;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();
      this.crowdin = data.crowdin.slice(0, 10);
      console.log(this.crowdin);
      this.forum = data.forum.slice(0, 10);
      this.github = data.github.slice(0, 10);
      this.news = data.news.slice(0, 10);
      this.loaded = true;
    });
  }
}
