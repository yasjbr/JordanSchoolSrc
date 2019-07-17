
import { DynamicFormComponent } from './../../forms/display-components/dynamic-form/dynamic-form.component';
import { FieldConfig, FormElement } from './../../forms/field.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormElemntTypes } from '../../forms/formElementTypes';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent implements OnInit {

  constructor() { }
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formTitle: string = "Registration Form";
  formIcon: string = "format_list_bulleted";
  formHint: string;
  formDescription: string = 'Create and add new users accounts dynamically using following approach.';
  regConfig: FormElement[] = [
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.template,
        label: [{ label: "<h2>Hi every one in this for</h2><br>", lan: 'en', isDefault: true }],
        order: 5,
        link: '#',
        cssClass: "headerLine",
        displayCssClass: 'text-center headerLine',
        icon: 'add_comment',
      }]
    },
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.header,
        label: [{ label: "SubTitle: here first line of form", lan: 'en', isDefault: true }],
        order: 5,
        link: '#',
        cssClass: "rowflexItem-1 text-center headerLine",
        displayCssClass: 'text-center headerLine',
        icon: 'add_comment',
      }]
    },
    {
      cssClass: 'row',
      fieldGroup: [
        {
          type: FormElemntTypes.input,
          inputType: "text",
          label: [{ label: "Username", lan: 'en', isDefault: true }],
          name: "name",
          order: 1,
          hintLabel: [{ label: "please enter the username ..... ", lan: 'en', isDefault: true }],
          cssClass: "rowflexItem-3",
          displayCssClass: 'col-xs-12 col-md-6',
          value: '',
          icon: 'account_circle',
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: [{ label: "Name Required", lan: 'en', isDefault: true }]
            },
            {
              name: "pattern",
              validator: Validators.pattern("^[a-zA-Z]+$"),
              message: [{ label: "Accept only text", lan: 'en', isDefault: true }]
            }
          ]
        },
        {
          type: FormElemntTypes.input,
          label: [{ label: "Email Address", lan: 'en', isDefault: true }],
          inputType: "email",
          name: "email",
          order: 2,
          hintLabel: [{ label: "Email Address", lan: 'en', isDefault: true }],
          cssClass: "rowflexItem-3",
          displayCssClass: 'col-xs-12 col-md-6',
          icon: 'email',
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: [{ label: "Email Required", lan: 'en', isDefault: true }]
            },
            {
              name: "pattern",
              validator: Validators.pattern(
                "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
              ),
              message: [{ label: "Invalid email", lan: 'en', isDefault: true }]
            }
          ]
        },
        {
          type: FormElemntTypes.date,
          label: [{ label: "DOB", lan: 'en', isDefault: true }],
          name: "dob",
          cssClass: "rowflexItem-3",
          hintLabel: [{ label: "Date of birth", lan: 'en', isDefault: true }],
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: [{ label: "Date of Birth Required", lan: 'en', isDefault: true }],
            }
          ]
        }],
    },
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.radiobutton,
        label: [{ label: "gender", lan: 'en', isDefault: true }],
        displayCssClass: 'col-xs-12',
        cssClass: "rowflexItem-3",
        name: "gender",
        options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }],
        value: "Male"
      }, {
        type: FormElemntTypes.basicSelectList,
        label: [{ label: "Country", lan: 'en', isDefault: true }],
        name: "country",
        value: "UK",
        hintLabel: [{ label: "Contry", lan: "en", isDefault: true }],
        cssClass: "rowflexItem-3",
        options: [
          { label: "India", value: "India" },
          { label: "UAE", value: "UAE" },
          { label: "UK", value: "UK" },
          { label: "US", value: "US" }
        ]
      }, {
        type: FormElemntTypes.checkbox,
        label: [{ label: "Accept Terms", lan: 'en', isDefault: true }],
        name: "term",
        value: true,
        cssClass: "rowflexItem-3",
      }]
    },
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.header,
        label: [{ label: "SubTitle: here first line of form", lan: 'en', isDefault: true }],
        order: 5,
        link: '',
        cssClass: "rowflexItem-1 text-center headerLine",
        displayCssClass: 'text-center',
        icon: 'title',
      }]
    },
    {
      cssClass: 'row',
      fieldGroup: [
        {
          type: FormElemntTypes.time,
          label: [{ label: "Time", lan: 'en', isDefault: true }],
          name: "timeFiled",
          order: 8,
          hintLabel: [{ label: "please enter the time ..... ", lan: 'en', isDefault: true }],
          cssClass: "rowflexItem-3",
          displayCssClass: 'col-xs-12',
          value: '',
          icon: 'access_time',
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: [{ label: "Time Required", lan: 'en', isDefault: true }]
            }
          ]
        },
        {
          type: FormElemntTypes.multiSelectList,
          label: [{ label: "Select Multi Country", lan: 'en', isDefault: true }],
          name: "multicountry",
          value: "",
          hintLabel: [{ label: "Select Multi Country", lan: "en", isDefault: true }],
          cssClass: "rowflexItem-3",
          options: [
            { label: "India", value: "India" },
            { label: "UAE", value: "UAE" },
            { label: "UK", value: "UK" },
            { label: "US", value: "US" }
          ]
        },
        {
          type: FormElemntTypes.fileUpload,
          label: [{ label: "File Upload", lan: 'en', isDefault: true }],
          placeholder: [{ label: "text editor Description", lan: 'en', isDefault: true }],
          name: "upload",
          order: 5,
          hintLabel: [{ label: "Enter text description ", lan: 'en', isDefault: true }],
          cssClass: "rowflexItem-1",
          displayCssClass: 'col-xs-12 col-md-12',
          icon: 'attachment',
        }
      ]
    },
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.richTextEditor,
        label: [{ label: "Description", lan: 'en', isDefault: true }],
        placeholder: [{ label: "text editor Description", lan: 'en', isDefault: true }],
        name: "descriptionEditor",
        order: 5,
        hintLabel: [{ label: "Enter text description ", lan: 'en', isDefault: true }],
        cssClass: "rowflexItem-1",
        displayCssClass: 'col-xs-12 col-md-12',
        icon: 'email',
      }]
    },
    {
      cssClass: 'row',
      fieldGroup: [{
        type: FormElemntTypes.textarea,
        label: [{ label: "Description 2", lan: 'en', isDefault: true }],
        placeholder: [{ label: "text editor Description", lan: 'en', isDefault: true }],
        name: "descriptionEditor",
        order: 5,
        hintLabel: [{ label: "Enter text description ", lan: 'en', isDefault: true }],
        cssClass: "rowflexItem-1",
        displayCssClass: 'col-xs-12 col-md-12',
        icon: 'email',
      }]
    },


    // {
    //   cssClass: 'row',
    //   fieldGroup: [
    //    ]
    // },
    {
      cssClass: 'row',
      fieldGroup: [
        {
          type: FormElemntTypes.button,
          icon: 'save',
          label: [{ label: "Save", lan: 'en', isDefault: true }],
        }]
    }
  ];

  ngOnInit() {
  }

  submit(value: any) {
    console.log(value);
  }
}
