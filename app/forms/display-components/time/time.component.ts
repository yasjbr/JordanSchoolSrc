import { FormGroup } from '@angular/forms';
import { FieldConfig } from './../../field.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  fieldClass:string;
  constructor() {}
  ngOnInit() {}
}
