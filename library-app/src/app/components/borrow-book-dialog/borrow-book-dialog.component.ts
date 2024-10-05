// src/app/components/borrow-book-dialog/borrow-book-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowService } from '../../services/borrow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-borrow-book-dialog',
  templateUrl: './borrow-book-dialog.component.html',
  styleUrls: ['./borrow-book-dialog.component.css']
})
export class BorrowBookDialogComponent {
  borrowForm: FormGroup;
  scannedUserId: string = '';
  hasDevices: boolean;
  showScanner = false;
  hasPermission: boolean;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<BorrowBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number; bookTitle: string },
    private borrowService: BorrowService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.fetchUsers();
    this.borrowForm = this.fb.group({
      user_id: ['', Validators.required],
      reserve_date: [''],
      due_date: ['', Validators.required]
    });
  }
  ngOnInit() {
    // Check for available devices and permissions
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    // Select the first device by default
    if (devices.length > 0) {
      this.selectedDevice = devices[0];
    }
  }
  
  onDeviceSelectChange(selectedValue: string) {
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === selectedValue);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCodeResult(resultString: string) {
    this.scannedUserId = resultString;
    this.borrowForm.controls['user_id'].setValue(this.scannedUserId);
  }

  borrow() {
    if (this.borrowForm.valid) {
      const borrowData = {
        ...this.borrowForm.value,
        book_id: this.data.bookId
      };
      this.borrowService.borrowBook(borrowData).subscribe(
        res => {
          this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close('success');
        },
        err => {
          this.snackBar.open('Failed to borrow book.', 'Close', { duration: 3000 });
        }
      );
    }
  }
  fetchUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      err => this.snackBar.open('Failed to load users.', 'Close', { duration: 3000 })
    );
  }

  onScanBarcode() {
    // Implement barcode scanning logic here
    // For now, we'll simulate barcode scanning
    this.scannedBarcode = '1234567890'; // Example barcode
  }

  onBorrow() {
    const borrowData = {
      user_id: this.selectedUserId,
      book_barcode: this.scannedBarcode,
      due_date: this.dueDate
    };

    this.borrowService.borrowBook(borrowData).subscribe(
      res => {
        this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      err => {
        this.snackBar.open('Failed to borrow book.', 'Close', { duration: 3000 });
      }
    );
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}