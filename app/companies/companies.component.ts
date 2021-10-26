import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  dataSource: any;
  
  displayedColumns: string[] = ['id', 'name', 'logo', 'description'];

  constructor(private httpService: HttpRequestService) { }

  ngOnInit(): void {
    this.httpService.getAllCompanies().subscribe(data => {
      this.dataSource = data;
    })
  }

}
