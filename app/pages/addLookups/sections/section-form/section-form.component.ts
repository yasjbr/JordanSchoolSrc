import { SectionService } from './../section.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../schools/school.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  

  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/sections/index';
  id: number;
  schoolList:any;

  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: SectionService,
    private schoolService: SchoolService,
    private route: ActivatedRoute
  ) { 
    this.getSchoolList();
    this.initForm();
  }

  ngOnInit() {
    this.setupUpdate();
  }

  
  initForm() {
    this.form = this.fb.group({
      id: [0],
      sectionName: ['', [Validators.required]],
      email: [''],
      managerId: [''],
      nationalId:[''],
      schoolId: ['']
    });
  }

  
  addSection() {
    this.service.addSection(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }
    
  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
    this.edit ? this.updateSection() : this.addSection();
    
  }

  updateSection() {
    this.service.updateSection(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  
  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getSection(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }


  public get name(): AbstractControl {
    return this.form.get('sectionName');
  }
  
}
