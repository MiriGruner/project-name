import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftManageComponent } from './gift-manage.component';

describe('GiftManageComponent', () => {
  let component: GiftManageComponent;
  let fixture: ComponentFixture<GiftManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
