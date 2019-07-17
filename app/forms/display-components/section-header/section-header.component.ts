import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';
 
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  field: FieldConfig;
   fieldClass:string;
  constructor() {}
  ngOnInit() {}
}
