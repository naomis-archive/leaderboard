import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy('footer component does not build');
  });

  it('should have three links', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toEqual(3, 'does not have three links');
  });

  it('should have a link to my homepage', () => {
    const homepage = compiled.querySelectorAll('a')[0];
    expect(homepage.textContent).toEqual(
      'Prototype Designed by Nicholas Carrigan',
      'does not have correct homepage text'
    );
    expect(homepage.getAttribute('href')).toEqual(
      'https://www.nhcarrigan.com',
      'does not have correct homepage href'
    );
  });

  it('should have a link to the source code', () => {
    const source = compiled.querySelectorAll('a')[1];
    expect(source.textContent).toEqual(
      'View Source Code',
      'does not have correct source text'
    );
    expect(source.getAttribute('href')).toEqual(
      'https://github.com/nhcarrigan/leaderboard',
      'does not have correct source href'
    );
  });

  it('should have a link to the landing page', () => {
    const landing = compiled.querySelectorAll('a')[2];
    expect(landing.textContent).toEqual(
      'Return to Landing Page',
      'does not have correct landing text'
    );
    expect(landing.getAttribute('routerLink')).toEqual(
      '/',
      'does not have correct landing routerLink'
    );
  });
});
