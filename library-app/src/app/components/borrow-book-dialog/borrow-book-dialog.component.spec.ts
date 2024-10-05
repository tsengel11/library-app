import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowBookDialogComponent } from './borrow-book-dialog.component';

describe('BorrowBookDialogComponent', () => {
  let component: BorrowBookDialogComponent;
  let fixture: ComponentFixture<BorrowBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowBookDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
