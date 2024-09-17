import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressHeaderComponent } from './progress-header.component';

describe('ProgressHeaderComponent', () => {
  let component: ProgressHeaderComponent;
  let fixture: ComponentFixture<ProgressHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
