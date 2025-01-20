import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('DonorManagementComponent', () => {
  let component: DonorManagementComponent;
  let fixture: ComponentFixture<DonorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
