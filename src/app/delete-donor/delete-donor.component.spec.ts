import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDonorComponent } from './delete-donor.component';

describe('DeleteDonorComponent', () => {
  let component: DeleteDonorComponent;
  let fixture: ComponentFixture<DeleteDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDonorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
