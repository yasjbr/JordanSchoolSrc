import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {animate, style, transition, trigger} from '@angular/animations';
 
 import {webSocket} from 'rxjs/webSocket';
import {ScannerAppDialogComponent} from './scanner-app-dialog/scanner-app-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ScannerSelectDeviceDialogComponent} from './scanner-select-device-dialog/scanner-select-device-dialog.component';

declare var scanner: any;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  animations: [
    trigger(
      /* slide animation for device-settings-menu */
      'slideAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100vh)'}),
          animate('200ms', style({transform: 'translateY(0)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)'}),
          animate('200ms', style({transform: 'translateY(-100vh)'}))
        ])
      ]
    )
  ],
})
export class ScannerComponent implements OnInit, OnDestroy {


  selectedImg: number = null;
  imagesScanned: number[] = [];
   @ViewChild('activeImage') activeImage: Element;
   scannerList: string[] = [];
  ScanningStart = false;
  ScanningFinished = false;
  isConnected = false;
  private scannerSubject = webSocket<{ Type: string, Data?: string }>('ws://127.0.0.1:7373');
  private dialogRef: MatDialogRef<ScannerAppDialogComponent, any>;
  private selectedScanner: string;
  imageToView:any[]=[];
  constructor(private sanitization: DomSanitizer,       public dialog: MatDialog) {

    setInterval(() => {
      if (this.isConnected === false) {
        this.scannerSubject = webSocket<{ Type: string, Data?: string }>('ws://127.0.0.1:7373');
        this.subscribeToWs();
      }
    }, 2500);

    this.subscribeToWs();
  }

  subscribeToWs() {
    this.scannerSubject.subscribe(
      msg => {
        this.WsConnected();
         let data = null;
         console.log(msg.Type);
        switch (msg.Type) {
          case 'ScannerList':

            data = JSON.parse(msg.Data);
            console.log('ScannerList', data);
            this.scannerList = data;
            break;
          case 'ScanningStart':
            this.ScanningStart = true;
            break;
          case 'ScanningFinished':
            this.ScanningFinished = true;
            break;
          case 'ScanningResult':
 
            data = JSON.parse(msg.Data);
            const scannedImages: string[] = data;

            if (!scannedImages || scannedImages.length === 0) {
              return;
            }


            scannedImages.forEach(async img => {
 
              const file = this.dataURLtoFile('data:image/png;base64,' + img, 'img_0');
              this.imageToView.push('data:image/png;base64,' + img);
              // this.publicFileService.uploadFile(file).subscribe(res => {
              //   // this.publicFileService.uploadThumbnail(thumbnail, res.result.id).subscribe(thRes => {
              //   this.imagesScanned.push(res.result.id);
              //   // });
              // });
            });

            break;
          case 'Error':
            // code block
            break;
          default:
          // code block
        }
      },
      (err) => {
        console.log('this is err');
        this.isConnected = false;
      },
      () => {
        console.log('complete');
        this.isConnected = false;
      }
    );
    this.scannerSubject.next({Type: 'Get', Data: ''});
  }

  ngOnInit() {
    
  }

  startScan() {

    if (this.isConnected) {
    
    
      if (this.selectedScanner == null) {
        if (this.scannerList.length === 1) {
          this.selectedScanner = this.scannerList[0];
        } else {
          const selectScannerRef = this.dialog.open(ScannerSelectDeviceDialogComponent, {
            width: '400px',
            data: this.scannerList
          });

          selectScannerRef.afterClosed().subscribe(result => {
            this.selectedScanner = result;
            if (this.selectedScanner != null) {
              this.startScan();
            }
          });

        }
      }

      if (this.selectedScanner != null) {
        this.scannerSubject.next({Type: 'Scan', Data: this.selectedScanner});
      }

    } else {
      this.dialogRef = this.dialog.open(ScannerAppDialogComponent, {
        width: '600px'
      });
    }
  }

  getImageSrc(imageId: number): string {
   // return APISettings.API_FILES_PATH + '/' + imageId;
   return "";
  }

  // shareFiles() {
  //   const message = {
  //     callId: this.calls[0].callId + '',
  //     files: this.imagesScanned
  //   };

  //  // this.medcorSignalRService.sendScannedFiles(message);
  //   this.imagesScanned = [];
  // }

  // checkCalls() {
  //   if (this.calls.length === 0) {
  //     this.imagesShared = [];
  //   }
  // }

  ngOnDestroy(): void {
    this.scannerSubject.complete(); // Closes the connection.
    this.scannerSubject.unsubscribe();
  }

  private dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  private WsConnected() {
    this.isConnected = true;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
