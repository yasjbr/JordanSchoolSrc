import { LookupTypes } from '../Models/Enum/SystemEnum';
import { FormElemntTypes } from './formElementTypes';
 
export interface Validator {
  name: string;
  validator: any;
  message: TranslateFormObject[];
}

export interface TranslateFormObject {
  label: string;
  lan: string;
  isDefault: boolean;
 }
export interface FormElementsOption {
  label: string;
  value: string;
  isDefault?: boolean;
  goTo?: string;
 }
 export interface FormElement {
   cssClass?:string;
   fieldGroup:FieldConfig[],
   groupTitle?:string
 }
export interface FieldConfig {
  label?:  TranslateFormObject[];
  placeholder?:  TranslateFormObject[];
  name?: string;
  inputType?: string;
  options?: FormElementsOption[];
  collections?: any;
  type: FormElemntTypes;
  value?: any;
  validations?: Validator[];
  cssClass?: string;
  lookupType?: LookupTypes;
  disable?: boolean;
  displayType?: number;
  displayCssClass?: string;
  displayLink?: string;
  hintLabel?: TranslateFormObject[];
  order?: number;
  icon?:string;
  link?:string;
}
