import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { TimeComponent } from '../time/time.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { FileUploadComponent } from '../file-upload/upload.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { FormTemplateComponent } from '../form-template/form-template.component';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textEditor:TextEditorComponent,
  time:TimeComponent,
  multiSelect:MultiSelectComponent,
  file:FileUploadComponent,
  textarea:TextAreaComponent,
  headerText:SectionHeaderComponent,
  template:FormTemplateComponent
};
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() fieldClass: string;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.fieldClass = this.fieldClass;
  }
}
