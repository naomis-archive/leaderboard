import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { testAggregateData } from 'src/data/testUserData';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(component.submitted).toBeDefined('missing submitted property');
    expect(component.userForm).toBeDefined('missing userForm property');
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

  it('should render the form component correctly', () => {
    const form = compiled.querySelector('form');
    const labels = form.querySelectorAll('label');
    expect(labels.length).toEqual(8, 'incorrect number of labels');
    expect(labels[0].textContent).toBe('Leaderboard Username: ');
    expect(labels[0].children[0].getAttribute('formControlName')).toBe(
      'username'
    );
    expect(labels[1].textContent).toBe('Password: ');
    expect(labels[1].children[0].getAttribute('formControlName')).toBe(
      'password'
    );
    expect(labels[2].textContent).toBe('Avatar URL: ');
    expect(labels[2].children[0].getAttribute('formControlName')).toBe(
      'avatar'
    );
    expect(labels[3].textContent).toBe('NEW Leaderboard Username: ');
    expect(labels[3].children[0].getAttribute('formControlName')).toBe(
      'newUsername'
    );
    expect(labels[4].textContent).toBe('Crowdin Username: ');
    expect(labels[4].children[0].getAttribute('formControlName')).toBe(
      'crowdin'
    );
    expect(labels[5].textContent).toBe('Forum Username: ');
    expect(labels[5].children[0].getAttribute('formControlName')).toBe('forum');
    expect(labels[6].textContent).toBe('GitHub Username: ');
    expect(labels[6].children[0].getAttribute('formControlName')).toBe(
      'github'
    );
    expect(labels[7].textContent).toBe('News Username: ');
    expect(labels[7].children[0].getAttribute('formControlName')).toBe('news');
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

  it('should render the returned data correctly', () => {
    component.userResult = testAggregateData.data[0];
    component.submitted = true;
    fixture.detectChanges();
    const result = compiled.querySelector('.data-container').children;
    expect(result[0].textContent.trim()).toBe('Crowdin - words translated: 2');
    expect(result[1].textContent.trim()).toBe('Forum - posts liked: 1');
    expect(result[2].textContent.trim()).toBe(
      'GitHub - commits made: 12'
    );
    expect(result[3].textContent.trim()).toBe('News - posts published: 1');
    expect(result[4].textContent.trim()).toBe('Aggregate Score: 300');
  });

  it('should handle the returned data correctly (with no username)', () => {
    component.userForm.controls.username.setValue('');
    component.onSubmit(false);
    fixture.detectChanges();
    const result = compiled.querySelector('.error-message');
    expect(result.textContent.trim()).toBe('Username is required.');
  });
});
