import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  fieldClass:string;
  constructor() {}
  ngOnInit() {}
}
