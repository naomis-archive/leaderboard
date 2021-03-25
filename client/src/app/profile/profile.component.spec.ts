import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { testData } from 'src/data/testData';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.data = testData;
    component.crowdin = testData.crowdin;
    component.forum = testData.forum;
    component.github = testData.github;
    component.news = testData.news;
    component.updated = testData.updated_on;
    component.loaded = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(component.crowdin).toBeDefined('missing crowdin property');
    expect(component.data).toBeDefined('missing data property');
    expect(component.forum).toBeDefined('missing forum property');
    expect(component.github).toBeDefined('missing github property');
    expect(component.loaded).toBeDefined('missing loaded property');
    expect(component.news).toBeDefined('missing news property');
    expect(component.submitted).toBeDefined('missing submitted property');
    expect(component.updated).toBeDefined('missing updated property');
    expect(component.userForm).toBeDefined('missing userForm property');
    expect(component.userResult).toBeDefined('missing userResult property');
    expect(component.error).toBeDefined('missing error property');
  });

  it('should render the title correctly', () => {
    const title = compiled.querySelector('h1').textContent;
    expect(title).toEqual('Your Profile', 'does not have correct title');
  });

  it('should render the description correctly', () => {
    const description = compiled.querySelectorAll('p');
    expect(description[0].textContent.trim()).toEqual(
      `To add your usernames to our database, or to update your existing usernames, please submit the form below!`,
      'does not have correct description'
    );
    expect(description[1].textContent.trim()).toEqual(
      `NOTE: The new username field is optional - only submit that if you would like to update your leaderboard username.`,
      'does not have correct description'
    );
  });

  it('should not show the form before the data is loaded', () => {
    component.loaded = false;
    fixture.detectChanges();
    const form = compiled.querySelector('form');
    expect(form).toBeNull();
  });

  it('should render the form component correctly', () => {
    const form = compiled.querySelector('form');
    const labels = form.querySelectorAll('label');
    expect(labels.length).toEqual(7, 'incorrect number of labels');
    expect(labels[0].textContent).toBe('Leaderboard Username: ');
    expect(labels[0].children[0].getAttribute('formControlName')).toBe(
      'username'
    );
    expect(labels[1].textContent).toBe('Avatar URL: ');
    expect(labels[1].children[0].getAttribute('formControlName')).toBe(
      'avatar'
    );
    expect(labels[2].textContent).toBe('NEW Leaderboard Username: ');
    expect(labels[2].children[0].getAttribute('formControlName')).toBe(
      'newUsername'
    );
    expect(labels[3].textContent).toBe('Crowdin Username: ');
    expect(labels[3].children[0].getAttribute('formControlName')).toBe(
      'crowdin'
    );
    expect(labels[4].textContent).toBe('Forum Username: ');
    expect(labels[4].children[0].getAttribute('formControlName')).toBe('forum');
    expect(labels[5].textContent).toBe('GitHub Username: ');
    expect(labels[5].children[0].getAttribute('formControlName')).toBe(
      'github'
    );
    expect(labels[6].textContent).toBe('News Username: ');
    expect(labels[6].children[0].getAttribute('formControlName')).toBe('news');
  });

  it('should render the submit button correctly', () => {
    const button = compiled.querySelector('button');
    expect(button.textContent).toBe('Get My Data!');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should not render the result before form is submitted', () => {
    const result = compiled.querySelector('.data-container');
    expect(result).toBeNull();
  });

  it('should render the returned data correctly (with valid username)', () => {
    component.userForm.controls.username.setValue('nhcarrigan');
    component.userForm.controls.crowdin.setValue('nhcarrigan');
    component.userForm.controls.forum.setValue('nhcarrigan');
    component.userForm.controls.github.setValue('nhcarrigan');
    component.userForm.controls.news.setValue('nhcarrigan');
    component.onSubmit(false);
    fixture.detectChanges();
    const result = compiled.querySelector('.data-container').children;
    expect(result[0].textContent).toBe('Crowdin: 1 words translated.');
    expect(result[1].textContent).toBe('Forum: 20 posts liked.');
    expect(result[2].textContent).toBe(
      'GitHub: 39 commits to our main repository.'
    );
    expect(result[3].textContent).toBe('News: 3 articles published.');
    expect(result[4].textContent).toBe('Aggregate Score: 692');
  });

  it('should handle the returned data correctly (with invalid username)', () => {
    component.userForm.controls.username.setValue('fakeusername');
    component.userForm.controls.crowdin.setValue('fakeusername');
    component.userForm.controls.forum.setValue('fakeusername');
    component.userForm.controls.github.setValue('fakeusername');
    component.userForm.controls.news.setValue('fakeusername');
    component.onSubmit(false);
    fixture.detectChanges();
    const result = compiled.querySelector('.data-container').children;
    expect(result[0].textContent).toBe('Crowdin: No contributions found...');
    expect(result[1].textContent).toBe('Forum: No contributions found...');
    expect(result[2].textContent).toBe('GitHub: No contributions found...');
    expect(result[3].textContent).toBe('News: No contributions found...');
    expect(result[4].textContent).toBe('Aggregate Score: 0');
  });

  it('should handle the returned data correctly (with no username)', () => {
    component.userForm.controls.username.setValue('');
    component.onSubmit(false);
    fixture.detectChanges();
    const result = compiled.querySelector('.error-message');
    expect(result.textContent.trim()).toBe('Username is required!');
  });
});
