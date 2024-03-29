import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
@Component({
  selector: 'app-checkbox',
  templateUrl:'./checkbox.component.html'  ,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  fieldClass:string;
  constructor() {}
  ngOnInit() {}
}
