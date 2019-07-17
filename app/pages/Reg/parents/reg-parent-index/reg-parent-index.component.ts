import { RegParentService } from './../reg-parent.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-reg-parent-index',
  templateUrl: './reg-parent-index.component.html',
  styleUrls: ['./reg-parent-index.component.scss']
})
export class RegParentIndexComponent implements OnInit {

  dataSource:any;
  loading= false;
cols=[
  {field:"id", header:"رقم ولي الامر"},
  {field:"fatherName", header:"إسم ولي الامر"},
  {field:"nationalityName", header:"الجنسية"},
  {field:"cityName",header:"المدينة"}
]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  constructor(private service:RegParentService, private dialog: MatDialog) { }
  ngOnInit() {
    this.getParentList();
  }

  getParentList(){
    this.service.getParentsList().subscribe(get=>this.dataSource=get);
  }

  //Delete

  
deleteParent(parent: regParents) {
  this.loading = true;
  this.service.deleteParent(parent.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}


openDeleteDialog(model: regParents) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.firstName}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteParent(model);
    }
  });
}

private handleSuccess() {
  this.getParentList();
}

private handleErrors() {
}


}
