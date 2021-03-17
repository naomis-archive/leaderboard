import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testData } from 'src/data/testData';

import { ForumComponent } from './forum.component';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    component.data = testData;
    component.forum = testData.forum;
    component.updated = testData.updated_on;
    component.loaded = true;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(component.forum).toBeDefined('missing forum property');
    expect(component.data).toBeDefined('missing data property');
    expect(component.loaded).toBeDefined('missing loaded property');
    expect(component.updated).toBeDefined('missing updated property');
  });

  it('should render the title', () => {
    const title = compiled.querySelector('h1').textContent;
    expect(title).toEqual('Forum Contributions');
  });

  it('should render the description text', () => {
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions[0].textContent.trim()).toEqual(
      `These are this week's top contributors for our forum.`
    );
    expect(descriptions[1].textContent.trim()).toEqual(
      'If you are interested in participating in discussions on our forum, we recommend starting with the forum guidelines.'
    );
  });

  it('should render the expected table', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-4');
    const tableRows = compiled.querySelectorAll('.contrib-grid-4');
    expect(tableHeader.length).toEqual(1, 'does not have only one header');
    expect(tableRows.length).toEqual(
      1,
      'does not render the expected single row of data'
    );
  });

  it('should render table header correctly', () => {
    const tableHeader = compiled.querySelectorAll('.header-grid-4');
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
      'Likes Received',
      'does not have likes received header'
    );
    expect(thChildren[3].textContent).toEqual(
      'Likes Given',
      'does not have likes given header'
    );
  });

  it('should render a table row correctly', () => {
    const tableRows = compiled.querySelectorAll('.contrib-grid-4');
    const trChildren = tableRows[0].children;
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
});
