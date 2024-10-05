import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../../services/borrow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-borrow-book-dialog',
  templateUrl: './borrow-book-dialog.component.html',
  styleUrls: ['./borrow-book-dialog.component.scss'],
})
export class BorrowBookDialogComponent implements OnInit {
  selectedUserId: number | undefined;
  dueDate!: Date;
  scannedBarcode!: string;

  // Barcode scanner variables
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  availableDevices!: MediaDeviceInfo[];
  selectedDevice!: MediaDeviceInfo;

  constructor(
    private borrowService: BorrowService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BorrowBookDialogComponent>
  ) {}

  ngOnInit() {
    this.checkDevices();
  }

  checkDevices() {
    const scanner = new ZXingScannerComponent();

    scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      this.selectedDevice = devices[0]; // Select the first device
    });

    scanner.camerasNotFound.subscribe(() => {
      this.hasDevices = false;
      this.snackBar.open('No cameras found.', 'Close', { duration: 3000 });
    });

    scanner.permissionResponse.subscribe((perm) => {
      this.hasPermission = perm;
      if (!perm) {
        this.snackBar.open('Camera permission denied.', 'Close', { duration: 3000 });
      }
    });
  }

  onCodeResult(resultString: string) {
    this.scannedBarcode = resultString;
    this.snackBar.open(`Scanned Barcode: ${this.scannedBarcode}`, 'Close', { duration: 3000 });
  }

  onBorrow() {
    if (!this.selectedUserId || !this.scannedBarcode || !this.dueDate) {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
      return;
    }

    const borrowData = {
      user_id: this.selectedUserId,
      book_barcode: this.scannedBarcode,
      due_date: this.dueDate,
    };

    this.borrowService.borrowBook(borrowData).subscribe(
      (res) => {
        this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      (err) => {
        console.error(err);
        const errorMsg = err.error?.message || 'Failed to borrow book.';
        this.snackBar.open(errorMsg, 'Close', { duration: 3000 });
      }
    );
  }
}