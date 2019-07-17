import { AdmDialogComponent } from "./../adm-dialog/adm-dialog.component";
import { regParents } from "./../../../Models/Reg/Parents/reg-parents";
import { RegParentService } from "./../../Reg/parents/reg-parent.service";
import { Admission } from "./../../../Models/Admission/admission";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdmService } from "../adm.service";
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from "@angular/material";
import { analytics } from "../../dashboard/dashboard.data";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";

@Component({
  selector: "app-adm-index",
  templateUrl: "./adm-index.component.html",
  styleUrls: ["./adm-index.component.scss"]
})
export class AdmIndexComponent implements OnInit {
  parentList: regParents;
  schoolList: any;
  loading = false;
  parentId: any;
  fatherName: any;
  selected: any;
  ///Father Data
  fatherFirstName: any;
  fatherSecondName: any;
  fatherFamilyName: any;
  fatherReligionName: any;
  fatherNationalityName: any;
  fatherCityName: any;
  fatherAddress: any;
  fatherTel: any;
  fatherMobile: any;
  motherMobile: any;
  showSaveButton: boolean=false;
  showForm: boolean = false;

  cols = [
    { field: "id", header: "#" },
    { field: "firstName", header: "إسم الطالب " },
    { field: "fatherFirstName", header: "إسم الاب  " },
    { field: "fatherSecondName", header: "إسم الجد  " },
    { field: "fatherFamilyName", header: "  العائلة" },
    // {field:"schoolId", header:"المدرسة"},
    // {field:"sectionId",header:"القسم"},
    { field: "classId", header: "الصف" },
    { field: "classSeqId", header: "الشعبة" },
    { field: "parentId", header: "الاب" }
  ];
  dataSource: MatTableDataSource<Admission> = new MatTableDataSource<
    Admission
  >();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols
    .map(col => col.field)
    .concat("actions");

  message: string;

  constructor(
    private service: AdmService,
    private parentService: RegParentService,
    public dialog: MatDialog
  ) {
    //this.getAdmList();
    this.getParentList();
    // this.selected=this.service.sSelected;
    //  this.onParentChanged(this.selected);
    //   console.log("++ "+this.selected);
  }

  ngOnInit() {
    // this.dataSource.filterPredicate = (data: Admission, filter: string) => {
    // return data.parentId == +filter;  };

    this.service.currentMessage.subscribe(message => (this.message = message));
    this.service.currentParentIdParam.subscribe(p => (this.parentId = p));
  }

  getAdmList() {
    return this.service
      .admissionList()
      .subscribe(res => (this.dataSource.data = res));
  }
  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => (this.parentList = res));
  }

  pp: string;
  arr: any[];


   onParentChanged(filterValue: string) {
    this.selected = filterValue;
    this.service.sSelected = filterValue;
    this.parentId = filterValue;
    let x = this.service.changeParentId(this.parentId);
    this.service.sParentId = filterValue;
    // console.log(": "+this.selected);
    // console.log(fatherName);
    //  this.service.currentParentIdParam.subscribe(p => this.parentId = p);
    //this.dataSource.filter = filterValue+"";
    this.service.getByParent(filterValue).subscribe(res => {
      this.dataSource.data = res;
      //   res[0]!=null? this.fatherName=res[0].parentId:this.fatherName="";
      // console.log('** '+this.fatherName);
    });

    // console.log(event);
    // console.log(index);

    this.service.getStudParent(filterValue).subscribe(res => {
      this.fatherName = res[0].fatherFullName;
      this.parentId = res[0].id;
      this.fatherFirstName = res[0].fatherFirstName;
      this.fatherSecondName = res[0].fatherSecondName;
      this.fatherFamilyName = res[0].fatherFamilyName;
      this.fatherReligionName = res[0].religionName;
      this.fatherNationalityName = res[0].nationalityName;
      this.fatherCityName = res[0].cityName;
      this.fatherAddress = res[0].address;
      this.fatherTel = res[0].tel;
      this.fatherMobile = res[0].fatherMobile;
      this.motherMobile = res[0].motherMobile;

      this.service.sParentName = this.fatherName;
      this.showSaveButton=true;

      // console.log( this.parentId);
      // console.log(res);
    });
  }

  //Dialog

  
  addNewStudent() {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //   dialogConfig.position = {
  //     'top': '0',
  //     left: '0'
  // };
  dialogConfig.direction ="rtl";
  const dialogRef =  this.dialog.open(AdmDialogComponent, dialogConfig);  
  dialogRef.afterClosed().subscribe(res => {
      this.onParentChanged(res.parentId);
});
  }

  addNewStudent2() {
    const dialogRef = this.dialog.open(AdmDialogComponent, {
      //data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }
  displayForm(show:boolean){
  this.showForm= show;
  }

  onSave(data:Admission){
    this.onParentChanged(""+data.parentId);
  }
}
