import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testData } from 'src/data/testData';
import { testUserData } from 'src/data/testUserData';

import { TopTenComponent } from './top-ten.component';

fdescribe('TopTenComponent', () => {
  let component: TopTenComponent;
  let fixture: ComponentFixture<TopTenComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopTenComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TopTenComponent);
    component = fixture.componentInstance;
    component.data = testData;
    component.crowdin = testData.crowdin;
    component.forum = testData.forum;
    component.github = testData.github;
    component.news = testData.news;
    component.updated = testData.updated_on;
    component.loaded = true;
    component.parsed = testUserData.sort((a, b) => b.aggregate - a.aggregate);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy('does not build correctly');
  });

  it('should have the correct properties', () => {
    expect(component.crowdin).toBeDefined('missing crowdin property');
    expect(component.forum).toBeDefined('missing forum property');
    expect(component.github).toBeDefined('missing github property');
    expect(component.news).toBeDefined('missing news property');
    expect(component.data).toBeDefined('missing data property');
    expect(component.loaded).toBeDefined('missing loaded property');
    expect(component.updated).toBeDefined('missing updated property');
    expect(component.parsed).toBeDefined('missing parsed property');
  });

  it('should render the title correctly', () => {
    const title = compiled.querySelector('h1');
    expect(title.textContent).toEqual('freeCodeCamp Leaderboard');
  });

  it('should render the description text', () => {
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions[0].textContent.trim()).toEqual(
      `This page shows our top contributors across all platforms. Don't see your data? Create or update your profile.`
    );
    const link = descriptions[0].querySelector('a');
    expect(link.textContent.trim()).toBe('Create or update your profile');
    expect(descriptions[1].textContent.trim()).toEqual(
      'Thank you all for your contributions.'
    );
  });

  it('should render the updated-on timestamp', () => {
    const text = compiled.querySelectorAll('p')[2];
    expect(text.textContent.trim()).toEqual(
      `Updated on: ${testData.updated_on}`
    );
  });

  it('should render the expected table structure', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-3');
    const tableRows = compiled.querySelectorAll('.contrib-grid-3');
    expect(tableHeader.length).toEqual(1, 'does not have correct header');
    expect(tableRows.length).toEqual(3, 'does not have correct rows');
  });

  it('should render the table header content', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-3')[0];
    expect(tableHeader.children[0].textContent.trim()).toBe('Avatar');
    expect(tableHeader.children[1].textContent.trim()).toBe('Username');
    expect(tableHeader.children[2].textContent.trim()).toBe('Aggregate Score');
  });

  it('should render the data in the correct order', () => {
    const [first, second, third] = compiled.querySelectorAll('.contrib-grid-3');
    expect(first.children[0].children[0].getAttribute('src')).toBe(
      'https://best.com'
    );
    expect(first.children[1].textContent).toBe('nhcarrigan but best');
    expect(first.children[2].textContent).toBe('10');
    expect(second.children[0].children[0].getAttribute('src')).toBe(
      'https://better.com'
    );
    expect(second.children[1].textContent).toBe('nhcarrigan but better');
    expect(second.children[2].textContent).toBe('7');
    expect(third.children[0].children[0].getAttribute('src')).toBe(
      'https://www.nhcarrigan.com'
    );
    expect(third.children[1].textContent).toBe('nhcarrigan');
    expect(third.children[2].textContent).toBe('5');
  });
});
