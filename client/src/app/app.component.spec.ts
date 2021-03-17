import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavComponent, FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy('app does not build');
  });

  it(`should have as title 'freeCodeCamp Leaderboard'`, () => {
    expect(app.title).toEqual(
      'freeCodeCamp Leaderboard',
      'did not have correct title'
    );
  });

  it('should render the nav bar', () => {
    expect(compiled.querySelector('app-nav')).toBeTruthy(
      'does not render nav bar'
    );
  });

  it('should render the router component', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy(
      'does not render the router outlet'
    );
  });

  it('should render the footer component', () => {
    expect(compiled.querySelector('app-footer')).toBeTruthy(
      'does not render the app footer'
    );
  });
});
