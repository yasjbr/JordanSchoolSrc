import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-scanner-app-dialog',
  templateUrl: './scanner-app-dialog.component.html',
  styleUrls: ['./scanner-app-dialog.component.scss']
})
export class ScannerAppDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ScannerAppDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
