import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy('landing component does not build');
  });

  it('should display the title', () => {
    const title = compiled.querySelector('h1');
    expect(title.textContent).toEqual('freeCodeCamp Leaderboard');
  });

  it('should have four information texts', () => {
    const texts = compiled.querySelectorAll('p');
    expect(texts.length).toEqual(4, 'does not have four information texts');
  });

  it('should render expected information texts', () => {
    const texts = compiled.querySelectorAll('p');
    expect(texts[0].textContent.trim()).toEqual(
      // eslint-disable-next-line max-len
      'Welcome to the freeCodeCamp leaderboard. This application recognises all of our volunteer contributors for their efforts to make freeCodeCamp great.',
      'first text is incorrect'
    );
    expect(texts[1].textContent.trim()).toEqual(
      'If you are interested in contributing, we recommend starting with our contributing guidelines.',
      'second information text is incorrect'
    );
    expect(texts[2].textContent.trim()).toEqual(
      'Thank you all for your contributions.',
      'third information text is incorrect'
    );
    expect(texts[3].textContent.trim()).toEqual(
      // eslint-disable-next-line max-len
      'NOTE: This application is a prototype and still in progress. It is subject to breaking changes, redesign, or deprecation at any time.',
      'fourth information text is incorrect'
    );
  });

  it('should have contributing guide link', () => {
    const link = compiled.querySelector('a');
    expect(link.getAttribute('href')).toEqual(
      'https://contribute.freecodecamp.org',
      'does not have correct link href'
    );
    expect(link.textContent).toEqual(
      'our contributing guidelines',
      'does not have correct link text'
    );
  });
});
