import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllLogsPage } from './view-all-logs.page';

describe('ViewAllLogsPage', () => {
  let component: ViewAllLogsPage;
  let fixture: ComponentFixture<ViewAllLogsPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ViewAllLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
