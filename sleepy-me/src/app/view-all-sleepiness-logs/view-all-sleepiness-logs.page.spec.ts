import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllSleepinessLogsPage } from './view-all-sleepiness-logs.page';

describe('ViewAllSleepinessLogsPage', () => {
  let component: ViewAllSleepinessLogsPage;
  let fixture: ComponentFixture<ViewAllSleepinessLogsPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ViewAllSleepinessLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
