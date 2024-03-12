import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { OvernightPage } from './overnight.page';

describe('OvernightPage', () => {
  let component: OvernightPage;
  let fixture: ComponentFixture<OvernightPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OvernightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
