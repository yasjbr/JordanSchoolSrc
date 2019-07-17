import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
 
@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
 
    field: FieldConfig;
    group: FormGroup;
    fieldClass:string;
    constructor() {}
    ngOnInit() {}
  }
  