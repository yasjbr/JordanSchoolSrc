import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {
  field: FieldConfig;
  fieldClass:string;
  constructor() {}
  ngOnInit() {}
}


