import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
      this.forum = data.forum.slice(0, 10);
      this.github = data.github.slice(0, 10);
      this.news = data.news.slice(0, 10);
      this.loaded = true;
    });
  }
}
