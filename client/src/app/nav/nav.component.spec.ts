import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

const navLinks = [
  {
    name: 'Leaderboard',
    link: 'leaderboard',
    index: 1,
  },
  {
    name: 'Crowdin',
    link: 'crowdin',
    index: 2,
  },
  {
    name: 'Forum',
    link: 'forum',
    index: 3,
  },
  {
    name: 'GitHub',
    link: 'github',
    index: 4,
  },
  {
    name: 'News',
    link: 'news',
    index: 5,
  },
  {
    name: 'My Profile',
    link: 'profile',
    index: 6
  }
];

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy('component does not build');
  });

  it('should display the logo', () => {
    const logo = compiled.querySelector('svg');
    expect(logo).toBeTruthy('does not render a logo');
  });

  it('should render six nav link items', () => {
    const linkItems = compiled.querySelectorAll('li');
    expect(linkItems.length).toEqual(6, 'does not have 6 link items');
  });

  it('should have seven navigation links, including the logo', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toEqual(7, 'does not render seven links');
  });

  it('should have link to freeCodeCamp', () => {
    const link = compiled.querySelectorAll('a')[0];
    expect(link.getAttribute('href')).toEqual('https://www.freecodecamp.org');
    expect(link.children[0].tagName).toEqual('svg');
  });

  for (const navLink of navLinks) {
    it(`should have routerLink to ${navLink.name} component`, () => {
      const target = compiled.querySelectorAll('a')[navLink.index];
      expect(target.getAttribute('routerLink')).toEqual(
        navLink.link,
        'does not have correct routerLink'
      );
      expect(target.textContent).toEqual(
        navLink.name,
        'does not have correct text'
      );
    });
  }
});
