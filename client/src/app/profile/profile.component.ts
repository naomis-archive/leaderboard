import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { FormBuilder } from '@angular/forms';
import {
  CrowdinDataInt,
  ForumDataInt,
  GithubDataInt,
  GlobalDataInt,
  NewsDataInt,
} from 'src/interfaces/GlobalDataInt';
import { UserFormInt } from 'src/interfaces/ProfileInt';
import { aggregateContribs } from 'src/helpers/aggregateContributions';
import { PostUserService } from '../post-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public data: GlobalDataInt | undefined;
  public loaded = false;
  public updated: string | undefined;
  public crowdin: CrowdinDataInt[] | undefined;
  public forum: ForumDataInt[] | undefined;
  public github: GithubDataInt[] | undefined;
  public news: NewsDataInt[] | undefined;
  public submitted = false;
  public error = '';
  public userForm = this.formBuilder.group({
    username: '',
    avatar: '',
    newUsername: '',
    crowdin: '',
    forum: '',
    github: '',
    news: '',
  });

  public userResult = {
    username: '',
    crowdin: '',
    forum: '',
    github: '',
    news: '',
    aggregate: 0,
  };
  constructor(
    private getDataService: GetDataService,
    private postUserService: PostUserService,
    private formBuilder: FormBuilder
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
      this.loaded = true;
    });
  }

  onSubmit(): void {
    const targetUser: UserFormInt = this.userForm.value;

    if (!targetUser.username) {
      this.error = 'Username is required!';
      return;
    }

    this.error = '';

    this.userResult.username = targetUser.username;

    this.postUserService
      .postUser(targetUser)
      .subscribe((data) => console.log('success!'));

    const crowdinResult = this.crowdin?.find(
      (el) => el.username === targetUser.crowdin
    );
    this.userResult.crowdin = crowdinResult
      ? `${crowdinResult.translations} words translated.`
      : 'No contributions found...';

    const forumResult = this.forum?.find(
      (el) => el.username === targetUser.forum
    );
    this.userResult.forum = forumResult
      ? `${forumResult.likes} posts liked.`
      : 'No contributions found...';

    const gitHubResult = this.github?.find(
      (el) => el.username === targetUser.github
    );
    this.userResult.github = gitHubResult
      ? `${gitHubResult.commits} commits to our main repository.`
      : 'No contributions found...';

    const newsResult = this.news?.find((el) => el.username === targetUser.news);
    this.userResult.news = newsResult
      ? `${newsResult.posts} articles published.`
      : 'No contributions found...';

    this.userResult.aggregate = aggregateContribs(
      crowdinResult?.translations || 0,
      forumResult?.likes || 0,
      gitHubResult?.commits || 0,
      newsResult?.posts || 0
    );

    this.submitted = true;
  }
}
