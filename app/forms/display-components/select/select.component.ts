import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
 @Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  fieldClass:string;
  constructor() {}
  ngOnInit() {}
}
