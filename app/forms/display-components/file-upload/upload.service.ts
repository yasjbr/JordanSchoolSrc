import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpEvent
} from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { map } from 'rxjs/operators';


const url = "https://localhost:44345/api/UploadFile";

@Injectable()
export class UploadService {

  uploadResult = new Subject<any>();

  constructor(private http: HttpClient) { }

  public upload(files: Set<UploadFile>): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      if (!file.isUploaded) {
        // create a new multipart-form for every file
        const formData: FormData = new FormData();
        formData.append("file", file, file.name);

        // create a http-post request and pass the form
        // tell it to report the upload progress
        const req = new HttpRequest("POST", url, formData, {
          reportProgress: true
        });

        // create a new progress-subject for every file
        const progress = new Subject<number>();
        // send the http-request and subscribe for progress-updates
        let startTime = new Date().getTime();
        this.http.request(req)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // calculate the progress percentage
            const percentDone = Math.round((100 * event.loaded) / event.total);
            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            progress.complete();
            let result:any= event.body;
             this.uploadResult.next(result);
          }
        }, error => {
          console.log(error);
        }
        );

        // Save every progress-observable in a map of all observables
        status[file.name] = {
          progress: progress.asObservable()
        };
        file.isUploaded = true;
      }
      else{
        status[file.name] = {
          progress: of(100)
        };
      }
    });

    // return the map of progress.observables
    return status;
  }

  deleteFile(id: string):Observable<any> {
    return this.http.delete(`${url}?file=${id}`);
   }
}
