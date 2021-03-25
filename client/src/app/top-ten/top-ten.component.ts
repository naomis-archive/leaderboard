import { Component, OnInit } from '@angular/core';
import { aggregateContribs } from 'src/helpers/aggregateContributions';
import {
  CrowdinDataInt,
  ForumDataInt,
  GithubDataInt,
  GlobalDataInt,
  NewsDataInt,
} from 'src/interfaces/GlobalDataInt';
import { ParsedUserInt } from 'src/interfaces/ProfileInt';
import { GetDataService } from '../get-data.service';
import { GetUserService } from '../get-user.service';

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
  public parsed: ParsedUserInt[] = [];
  constructor(
    private getDataService: GetDataService,
    private getUserServer: GetUserService
  ) {}

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.data = data;
      this.updated =
        new Date(data.updated_on).toLocaleDateString() +
        ' ' +
        new Date(data.updated_on).toLocaleTimeString();
      this.crowdin = data.crowdin;
      this.forum = data.forum;
      this.github = data.github;
      this.news = data.news;
      this.getUserServer.getUser().subscribe((userData) => {
        userData.forEach((user) => {
          const userCrowdin = this.crowdin?.find(
            (el) => el.username === user.crowdin
          );
          const userForum = this.forum?.find(
            (el) => el.username === user.forum
          );
          const userGithub = this.github?.find(
            (el) => el.username === user.github
          );
          const userNews = this.news?.find((el) => el.username === user.news);
          const userAggregate = aggregateContribs(
            userCrowdin?.translations || 0,
            userForum?.likes || 0,
            userGithub?.commits || 0,
            userNews?.posts || 0
          );
          this.parsed.push({
            username: user.username,
            aggregate: userAggregate,
            avatar: 'test',
          });
        });

        this.loaded = true;
      });
    });
  }
  onImgError(event: any) {
    event.target.src = '../assets/img/default-avatar.png';
  }
}
