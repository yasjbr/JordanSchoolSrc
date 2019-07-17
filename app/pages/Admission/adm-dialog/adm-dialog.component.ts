import { AdmFormComponent } from './../adm-form/adm-form.component';
import { Admission } from './../../../Models/Admission/admission';
import { BusService } from './../../addLookups/Buses/bus.service';
import { Class } from './../../../Models/addLookups/classes/class';
import { AdmService } from './../adm.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from '../../lookups/lookups-api.service';
import { ClassService } from '../../addLookups/classes/class.service';
import { TourService } from '../../addLookups/tours/tour.service';
import { lkpTour } from 'src/app/Models/addLookups/tours/lkpTour';
import { LkpBus } from 'src/app/Models/addLookups/bus/lkpBus';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SectionService } from '../../addLookups/sections/section.service';

@Component({
  selector: 'app-adm-dialog',
  templateUrl: './adm-dialog.component.html',
  styleUrls: ['./adm-dialog.component.scss']
})
export class AdmDialogComponent implements OnInit {

  

  @Output() event=new EventEmitter<Admission>(true);
  loading = false;
  public formGroup: FormGroup;
  returnUrl = '/admissions/index';
  edit = false;
  id: number;
  parentId:any;
  fatherName:any;
  tourValue:any;
  tourTypeValue:any;
  tourPrice:any=0;
  classValue:any;
  classPrice:any=0;
  totalPrice:any=0;


  
  martialList: Lkplookup[];
  citiesList: Lkplookup[];
  religionsList: Lkplookup[];
  nationalList:Lkplookup[];
  countriesList: Lkplookup[];
  idTypesList: Lkplookup[];
  healthStatusList: Lkplookup[];
  genderList: Lkplookup[];
  educationList: Lkplookup[];
  relationList: Lkplookup[];
  YearsList: Lkplookup[];
  TermsList:Lkplookup[];
  sectionList:LkpSection[];
  classSeqList:Lkplookup[];
  classList:Class[];
  tourList: lkpTour[];
  busList: LkpBus[];
  tourTypeList:Lkplookup[];
  
  constructor( private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private service: AdmService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService,
    private classService: ClassService,
    private tourService:TourService,
    private busService: BusService,
    private sectionService:SectionService,
    public dialogRef: MatDialogRef<AdmDialogComponent>
   
    ) { 

      this.parentId=this.service.sParentId;
      this.fatherName=this.service.sParentName;
      this.iniForm();
      
    }

    message:string;
pp:string;
  ngOnInit() {
   
    this.getLookups();
    this. getClassList();
    this.getTourList();
    this.getBusList();
    this.getSectionList();

      this.service.currentMessage.subscribe(message => this.message = message);
      
   //   this.service.currentParentIdParam.subscribe(p => this.parentId = p);

//this.parentId=this.service.sParentId;
//console.log(this.parentId);

  }

  getClassList(){
    return this.classService.classList().subscribe(res=>this.classList=res);
  }
  getTourList(){
    return this.tourService.tourList().subscribe(res=>this.tourList=res);
  }
  getBusList(){
    return this.busService.busList().subscribe(res=>this.busList=res);
  }
  getSectionList(){
    return this.sectionService.sectionList().subscribe(res=>this.sectionList=res);
  }

  newMessage() {
    let x = this.service.changeMessage("Hello from Sibling");
   // console.log(this.message);
  }


  iniForm(){
    this.formGroup=this.fb.group({

      id:[0],
      firstName:[null],
      parentId:[this.parentId],
      studNo:[null],
      schoolId:[13],
      sectionId:[null],
      nationalityId:[null],
      fatherName:[this.fatherName],
      entryDate:[null],
      religionId:[null],
      birthDate:[null],
      genderId:[null],
      yearId:[null],
      classId:[null],
      classSeqId:[null],
      tourId:[null],
      tourTypeId:[null],
      busId:[null],
      tourPrice:[0],
      studentBrotherSeq:[null],
      brotherDescountType:[null],
      busNote:[null],
      note:[null],
      classPrice:[0],
      totalPrice:[0]


    });
  }

  
  addStud() {
    this.service.admInsert(this.formGroup.value).subscribe(
      res => {
        
        this.event.emit(this.formGroup.value);
        this.dialogRef.close(this.formGroup.value);
       // this.router.navigateByUrl(this.returnUrl);
      // console.log(res);
       
      },
      err => console.log(err)
    );
  }

submit(){
  //null;
}
  
  submit2() {
    if (!this.formGroup.valid) {
      this.validator.markFormTouched(this.formGroup);
      return;
    }

    this.loading = true;
   /* this.edit ? this.updateLookup() :*/ this.addStud();
  }

  public get name(): AbstractControl {
    return this.formGroup.get('firstName');
  }
  
/// Fill Lookups

private fillLookups(res: any) {
  res.forEach((element: Lkplookup[])  => {
    //console.log("Loop");
     switch ( element[0].typeId) {
       case LookupTypes.MartialStatus:
         this.martialList = element;
         break;
       case LookupTypes.Cities:
         this.citiesList = element;
         break;
       case LookupTypes.Religions:
        this.religionsList = element;
         break;
       case LookupTypes.Countries:
         this.countriesList = element;
         break;
       case LookupTypes.IdTypes:
         this.idTypesList = element;
         break;
       case LookupTypes.HealthStatus:
         this.healthStatusList = element;
         break;
       case LookupTypes.Gender:
         this.genderList = element;
         break;
       case LookupTypes.Nationalities:
           this.nationalList=element;
           break;
       case LookupTypes.EducationLevel:
         this.educationList=element;
         break;
       case LookupTypes.Relationships:
         this.relationList=element;
         break;
         case LookupTypes.Years:
          this.YearsList=element;
          break;
          case LookupTypes.Terms:
            this.TermsList=element;
            break;
            case LookupTypes.ClassSeq:
              this.classSeqList=element;
              break;
              case LookupTypes.TourType:
                this.tourTypeList=element;
       default:
         break;
     }
   }
   );
 }

 
 private getLookups() {
  this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Countries,
  LookupTypes.IdTypes, LookupTypes.Cities, LookupTypes.Religions, LookupTypes.HealthStatus,
  LookupTypes.Gender, LookupTypes.Nationalities,
LookupTypes.EducationLevel,LookupTypes.Relationships,
LookupTypes.Years,LookupTypes.Terms, LookupTypes.ClassSeq, LookupTypes.TourType])
    .subscribe(
      res => this.fillLookups(res),
      _err => { console.log("Error") },
      () => { console.log("Complite")
       // this.setupValidation();
     //   this.setUpUpdate();
      });
}


/// Tour Calculations
onTourChange(){
let n=-1;
  let tourIndex=this.tourList.findIndex(i=>i.id===this.tourValue);
  let tourTypeIndex =this.tourTypeList.findIndex(i=>i.id===this.tourTypeValue);
  let tourFullPrice=this.tourList[tourIndex].tourFullPrice;
  let tourHalfPrice=this.tourList[tourIndex].tourHalfPrice;
  if(tourTypeIndex>=0 && tourIndex>=0){
    if(tourTypeIndex===2)
    this.tourPrice=tourFullPrice;
    else
    this.tourPrice=tourHalfPrice;
  }
  this.totalPrice=this.tourPrice+this.classPrice;
}
  
/// Class Calculations
onClassChange(){
    let Index=this.classList.findIndex(i=>i.id===this.classValue);
    let amtPrice=this.classList[Index].amt;
    this.classPrice=amtPrice;
    this.totalPrice=this.tourPrice+this.classPrice;
    //console.log("Index="+Index+"  amtPrice="+amtPrice+"  classValue="+this.classValue);
    
  }
  // console.log("index="+tourTypeIndex+"   value="+this.tourTypeValue+
  // "  tourIndex="+tourIndex+"  tourValue="+this.tourValue);
  //  console.log("index= "+tourIndex+"  F="+tourFullPrice+" H="+tourHalfPrice+
  //  "  tourTypeIndex="+tourTypeIndex+" tourPrice="+this.tourPrice);



//Dialog

closeDialog():void {
  this.dialogRef.close();
}
}