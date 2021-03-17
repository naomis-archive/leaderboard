import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testData } from 'src/data/testData';

import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    component.data = testData;
    component.news = testData.news;
    component.updated = testData.updated_on;
    component.loaded = true;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy('github component does not build');
  });

  it('should have the correct properties', () => {
    expect(component.news).toBeDefined('missing news property');
    expect(component.data).toBeDefined('missing data property');
    expect(component.loaded).toBeDefined('missing loaded property');
    expect(component.updated).toBeDefined('missing updated property');
  });

  it('should render the title', () => {
    const title = compiled.querySelector('h1').textContent;
    expect(title).toEqual('News Contributions');
  });

  it('should render the description text', () => {
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions[0].textContent.trim()).toEqual(
      `These are this week's top contributors for our News publication.`
    );
    expect(descriptions[1].textContent.trim()).toEqual(
      'If you are interested in contributing to our publication, we recommend starting with our publication style guide.'
    );
  });

  it('should render the expected description links', () => {
    const [platform, contrib] = compiled.querySelectorAll('a');
    expect(platform.textContent.trim()).toEqual(
      'News publication',
      'does not have correct platform link text'
    );
    expect(platform.getAttribute('href')).toEqual(
      'https://www.freecodecamp.org/news',
      'does not have correct platform link'
    );
    expect(contrib.textContent.trim()).toEqual(
      'publication style guide',
      'does not have correct docs link text'
    );
    expect(contrib.getAttribute('href')).toEqual(
      'https://www.freecodecamp.org/news/developer-news-style-guide/',
      'does not have correct docs link'
    );
  });

  it('should render the updated-on timestamp', () => {
    const text = compiled.querySelectorAll('p')[2];
    expect(text.textContent.trim()).toEqual(
      `Updated on: ${testData.updated_on}`
    );
  });

  it('should render the expected table', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-3');
    const tableRows = compiled.querySelectorAll('.contrib-grid-3');
    expect(tableHeader.length).toEqual(1, 'does not have only one header');
    expect(tableRows.length).toEqual(
      1,
      'does not render the expected single row of data'
    );
  });

  it('should render table header correctly', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-3');
    const thChildren = tableHeader[0].children;

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
  });

  it('should render a table row correctly', () => {
    const tableRows = compiled.querySelectorAll('.contrib-grid-3');
    const trChildren = tableRows[0].children;
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
