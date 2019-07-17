import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LkpBus } from 'src/app/Models/addLookups/bus/lkpBus';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-bus-index',
  templateUrl: './bus-index.component.html',
  styleUrls: ['./bus-index.component.scss']
})
export class BusIndexComponent implements OnInit {

cols=[
  {field:"id", header:"#"},
  {field:"sidNo", header:"رقم الجنب"},
  {field:"driverName",header:"السائق"},
  {field:"mobile", header:"الموبايل"},
  {field:"morningSuper",header:"المشرف الصباحي"},
  {field:"evningSuper",header:"المشرف المسائي"},
  {field:"schoolId",header:"المدرسة"}
]

  dataSource:MatTableDataSource<LkpBus>
  loading=false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  
  constructor(private service:BusService) {
this.dataSource=new MatTableDataSource<LkpBus>();
this.busList();

   }

busList(){
return this.service.busList().subscribe(get=>this.dataSource.data=get)
}

  ngOnInit() {
  
  }

}
