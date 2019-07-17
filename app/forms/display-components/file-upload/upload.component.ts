import { FieldConfig } from './../../field.interface';
import { FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'file-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class FileUploadComponent {

  field: FieldConfig;
  group: FormGroup;
  fieldClass: string;
  @ViewChild('file') file;
  public files: Set<UploadFile> = new Set();
  constructor(public uploadService: UploadService) { }

  ngOnInit() { }

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: UploadFile } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        files[key].isUploaded = false;
        this.files.add(files[key]);
      }
    }
    this.saveFiles();
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  changeFileName(fileName: string, newFileName: string) {
    console.log("change name func");
    this.files.forEach(file => {
      console.log(file);
      if (file.name == fileName) {
        file.serverFileName = newFileName;
        console.log(file);
      }
    });
  }

  removeFiles(file: UploadFile) {
    this.uploadService.deleteFile(file.serverFileName).subscribe(() => this.files.delete(file));
  }

  saveFiles() {
    this.uploading = true;
    let allProgressObservables = [];
    this.progress = this.uploadService.upload(this.files);
    if (this.progress != undefined) {
      for (const key in this.progress) {
        this.progress[key].progress.subscribe(val => console.log(val));
        allProgressObservables.push(this.progress[key].progress);
      }
      this.uploadService.uploadResult.subscribe(res => {
        console.log(res);

        this.changeFileName(res.message, res.data);
        this.group.get(this.field.name).setValue(res.message);
      });
      // Hide the cancel-button
      this.showCancelButton = false;
      // When all progress-observables are completed...
      forkJoin(allProgressObservables).subscribe(end => {
        // ... the upload was successful...
        this.uploadSuccessful = true;
        // ... and the component is no longer uploading
        this.uploading = false;
      });
    }

  }
}
