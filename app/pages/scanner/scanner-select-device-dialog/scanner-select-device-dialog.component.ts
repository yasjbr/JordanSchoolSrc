import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-scanner-select-device-dialog',
  templateUrl: './scanner-select-device-dialog.component.html',
  styleUrls: ['./scanner-select-device-dialog.component.css']
})
export class ScannerSelectDeviceDialogComponent implements OnInit {
  selectedDevice: string = null;

  constructor(
    public dialogRef: MatDialogRef<ScannerSelectDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
