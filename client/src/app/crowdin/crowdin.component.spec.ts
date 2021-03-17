import { HttpClientModule } from '@angular/common/http';
import { ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__ } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testData } from 'src/data/testData';

import { CrowdinComponent } from './crowdin.component';

describe('CrowdinComponent', () => {
  let component: CrowdinComponent;
  let fixture: ComponentFixture<CrowdinComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrowdinComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CrowdinComponent);
    component = fixture.componentInstance;
    component.data = testData;
    component.crowdin = testData.crowdin;
    component.loaded = true;
    component.updated = testData.updated_on;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(component.crowdin).toBeDefined('missing crowdin property');
    expect(component.data).toBeDefined('missing data property');
    expect(component.loaded).toBeDefined('missing loaded property');
    expect(component.updated).toBeDefined('missing updated property');
  });

  it('should render the title', () => {
    const title = compiled.querySelector('h1').textContent;
    expect(title).toEqual('Crowdin Contributions');
  });

  it('should render the description text', () => {
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions[0].textContent.trim()).toEqual(
      `These are this week's top contributors for our Crowdin translation efforts.`
    );
    expect(descriptions[1].textContent.trim()).toEqual(
      'If you are interested in contributing to our translation efforts, you should start with our translation documentation.'
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
  });

  it('should render a table row correctly', () => {
    const tableRows = compiled.querySelectorAll('.contrib-grid-4');
    const trChildren = tableRows[0].children;
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
});
