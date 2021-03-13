import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdinComponent } from './crowdin.component';

describe('CrowdinComponent', () => {
  let component: CrowdinComponent;
  let fixture: ComponentFixture<CrowdinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrowdinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
