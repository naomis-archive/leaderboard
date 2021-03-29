import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserDataInt, UserFormInt } from 'src/interfaces/ProfileInt';
import { aggregateContribs } from 'src/helpers/aggregateContributions';
import { PostUserService } from '../post-user.service';
import { GetAggregateService } from '../get-aggregate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userForm = this.formBuilder.group({
    username: '',
    password: '',
    avatar: '',
    newUsername: '',
    crowdin: '',
    forum: '',
    github: '',
    news: '',
  });

  public userResult: UserDataInt | any;
  public error: string | undefined;
  public submitted = false;

  constructor(
    private getDataService: GetAggregateService,
    private postUserService: PostUserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit(live = true): void {
    const targetUser: UserFormInt = this.userForm.value;

    if (!targetUser.username) {
      this.error = 'Username is required.';
      return;
    }

    if (!targetUser.password) {
      this.error = 'Password is required.';
      return;
    }

    this.error = '';

    if (live) {
      this.postUserService.postUser(targetUser).subscribe(
        (data) => {
          this.userResult = data;
          this.error = '';
          this.submitted = true;
        },
        (error) => {
          this.error = error.error.message;
          this.submitted = false;
        }
      );
    }
  }
}
