import { Component, OnInit } from '@angular/core';
import { GlobalDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  public data: any;
  public loaded: boolean = false;
  public updated: any;
  public crowdin: any;
  public forum: any;
  public github: any;
  public news: any;
  constructor(private GetDataService: GetDataService) {}

  ngOnInit(): void {
    this.GetDataService.getData().subscribe((data) => {
      this.data = data;
      this.updated = new Date(data.updated_on).toLocaleDateString() + " " + new Date(data.updated_on).toLocaleTimeString();
      this.crowdin = data.crowdin.slice(0, 10);
      console.log(this.crowdin)
      this.forum = data.forum.slice(0, 10);
      this.github = data.github.slice(0, 10);
      this.news = data.news.slice(0, 10);
      this.loaded = true;
    });
  }
}
