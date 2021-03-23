import { Component, OnInit } from '@angular/core';
import { CrowdinDataInt, ForumDataInt, GithubDataInt, GlobalDataInt, NewsDataInt } from 'src/interfaces/GlobalDataInt';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css'],
})
export class TopTenComponent implements OnInit {
  public data: GlobalDataInt | undefined;
  public loaded = false;
  public updated: string | undefined;
  public crowdin: CrowdinDataInt[] | undefined;
  public forum: ForumDataInt[] | undefined;
  public github: GithubDataInt[] | undefined;
  public news: NewsDataInt[] | undefined;
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
  onImgError(event: any) {
    event.target.src = '../assets/img/default-avatar.png';
  }
}
