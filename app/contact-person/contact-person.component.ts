import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { HttpRequestService } from '../services/http-request.service';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.scss']
})
export class ContactPersonComponent implements OnInit {  

  displayedColumns: string[] = ['id', 'name', 'country', 'phone', 'action'];
  
  dataSource: any;

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(public dialog: MatDialog, private httpService: HttpRequestService) {}

  ngOnInit(): void {
    this.httpService.getAllContacts().subscribe(data => {
      this.dataSource = data;
    })
  }

  openDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any){
    var d = new Date();
    this.dataSource.push({
      id: 'xx',
      name:row_obj.name,
      country: row_obj.country,
      phone: row_obj.phone
    });
    this.table.renderRows();
    
  }
  
  updateRowData(row_obj: any){
    this.dataSource = this.dataSource.filter((value: any,key: any)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.country = row_obj.country;
        value.phone = row_obj.phone;
      }
      return true;
    });
  }

  deleteRowData(row_obj: any){
    this.dataSource = this.dataSource.filter((value: any,key: any)=>{
      return value.id != row_obj.id;
    });
  }

}
