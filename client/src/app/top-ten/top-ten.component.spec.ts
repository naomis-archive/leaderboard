import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testData } from 'src/data/testData';

import { TopTenComponent } from './top-ten.component';

describe('TopTenComponent', () => {
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
  });

  it('should render the title correctly', () => {
    const title = compiled.querySelector('h1');
    expect(title.textContent).toEqual('freeCodeCamp Leaderboard');
  });

  it('should render the description text', () => {
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions[0].textContent.trim()).toEqual(
      `This page shows our top ten contributors on each platform over the last week.`
    );
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

  it('should render the expected table', () => {
    const tableHeaderThree = compiled.querySelectorAll('.header-grid-3');
    const tableRowsThree = compiled.querySelectorAll('.contrib-grid-3');
    const tableHeaderFour = compiled.querySelectorAll('.header-grid-4');
    const tableRowsFour = compiled.querySelectorAll('.contrib-grid-4');
    expect(tableHeaderThree.length).toEqual(
      2,
      'does not have two size 3 headers'
    );
    expect(tableRowsThree.length).toEqual(2, 'does not have two size 3 rows');
    expect(tableHeaderFour.length).toEqual(
      2,
      'does not have two size 4 headers'
    );
    expect(tableRowsFour.length).toEqual(2, 'does not have two size 4 rows');
  });

  it('should render the Crowdin table correctly', () => {
    const crowdinHeader = compiled.querySelectorAll('.header-grid-4')[0];
    const crowdinRow = compiled.querySelectorAll('.contrib-grid-4')[0];
    const thChildren = crowdinHeader.children;
    expect(thChildren[0].textContent).toEqual(
      'Avatar',
      'does not have avatar header'
    );
    expect(thChildren[1].textContent).toEqual(
      'Name',
      'does not have name header'
    );
    expect(thChildren[2].textContent).toEqual(
      'Languages Translated',
      'does not have langs header'
    );
    expect(thChildren[3].textContent).toEqual(
      'Words Translated',
      'does not render words header'
    );
    const trChildren = crowdinRow.children;
    // Image is nested in a span, so call children on the children...
    expect(trChildren[0].children[0].getAttribute('src')).toEqual(
      'https://production-enterprise-static.downloads.crowdin.com/avatar/232/medium/6ac64de32f21629b968e8a3a55d76a69.jpg',
      'does not load avatar data'
    );
    expect(trChildren[1].textContent).toEqual(
      'Nicholas Carrigan',
      'does not load correct name data'
    );
    expect(trChildren[2].textContent).toEqual(
      'English',
      'does not load correct lang data'
    );
    expect(trChildren[3].textContent).toEqual(
      '1',
      'does not load correct words data'
    );
  });

  it('should render the Forum table correctly', () => {
    const forumHeader = compiled.querySelectorAll('.header-grid-4')[1];
    const forumRow = compiled.querySelectorAll('.contrib-grid-4')[1];
    const thChildren = forumHeader.children;

    expect(thChildren[0].textContent).toEqual(
      'Avatar',
      'does not have avatar header'
    );
    expect(thChildren[1].textContent).toEqual(
      'Name (username)',
      'does not have name header'
    );
    expect(thChildren[2].textContent).toEqual(
      'Likes Received',
      'does not have likes received header'
    );
    expect(thChildren[3].textContent).toEqual(
      'Likes Given',
      'does not have likes given header'
    );
    const trChildren = forumRow.children;
    // Image is nested in a span, so call children on the children...
    expect(trChildren[0].children[0].getAttribute('src')).toEqual(
      'https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/nhcarrigan/240/185808_2.png',
      'does not load avatar data'
    );
    expect(trChildren[1].textContent).toEqual(
      'Nicholas Carrigan (nhcarrigan)',
      'does not load correct name data'
    );
    expect(trChildren[1].children[0].getAttribute('href')).toEqual(
      'https://forum.freecodecamp.org/u/nhcarrigan',
      'does not load profile url data'
    );
    expect(trChildren[2].textContent).toEqual(
      '20',
      'does not load correct likes received data'
    );
    expect(trChildren[3].textContent).toEqual(
      '5',
      'does not load correct likes given data'
    );
  });

  it('should render the GitHub table correctly', () => {
    const githubHeader = compiled.querySelectorAll('.header-grid-3')[0];
    const githubRow = compiled.querySelectorAll('.contrib-grid-3')[0];
    const thChildren = githubHeader.children;

    expect(thChildren[0].textContent).toEqual(
      'Avatar',
      'does not have avatar header'
    );
    expect(thChildren[1].textContent).toEqual(
      'Name (username)',
      'does not have name header'
    );
    expect(thChildren[2].textContent).toEqual(
      'Commits',
      'does not have commits header'
    );
    const trChildren = githubRow.children;
    // Image is nested in a span, so call children on the children...
    expect(trChildren[0].children[0].getAttribute('src')).toEqual(
      'https://avatars.githubusercontent.com/u/63889819?v=4',
      'does not load avatar data'
    );
    expect(trChildren[1].textContent).toEqual(
      'Nicholas Carrigan (nhcarrigan)',
      'does not load correct name data'
    );
    expect(trChildren[1].children[0].getAttribute('href')).toEqual(
      'https://github.com/nhcarrigan',
      'does not load profile url data'
    );
    expect(trChildren[2].textContent).toEqual(
      '39',
      'does not load correct likes received data'
    );
  });

  it('should render the News table correctly', () => {
    const newsHeader = compiled.querySelectorAll('.header-grid-3')[1];
    const newsRow = compiled.querySelectorAll('.contrib-grid-3')[1];
    const thChildren = newsHeader.children;

    expect(thChildren[0].textContent).toEqual(
      'Avatar',
      'does not have avatar header'
    );
    expect(thChildren[1].textContent).toEqual(
      'Name (username)',
      'does not have name header'
    );
    expect(thChildren[2].textContent).toEqual(
      'Published Posts',
      'does not have commits header'
    );
    const trChildren = newsRow.children;
    // Image is nested in a span, so call children on the children...
    expect(trChildren[0].children[0].getAttribute('src')).toEqual(
      'https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg',
      'does not load avatar data'
    );
    expect(trChildren[1].textContent).toEqual(
      'Nicholas Carrigan (nhcarrigan)',
      'does not load correct name data'
    );
    expect(trChildren[1].children[0].getAttribute('href')).toEqual(
      'https://www.freecodecamp.org/news/author/nhcarrigan/',
      'does not load profile url data'
    );
    expect(trChildren[2].textContent).toEqual(
      '3',
      'does not load correct likes received data'
    );
  });
});
