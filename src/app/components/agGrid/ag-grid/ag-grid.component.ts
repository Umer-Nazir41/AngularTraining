import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ApiService } from '../../../service/api/api.service';
import { GridOptions } from 'ag-grid-community/main';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
})
export class AgGridComponent implements OnInit {
  //users!: any;

  public gridOptions: GridOptions;

  rowData: Observable<any[]>;
  constructor(private API: ApiService, private http: HttpClient) {
    this.rowData = this.http.get<any[]>('http://localhost:3000/posts');
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit(): void {}

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'left' },
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'left' },
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'left' },
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'left' },
    },
  ];

  onGridReady = () => {
    //this.gridOptions.columnApi?.sizeColumnsToFit(5000);
    this.gridOptions.api?.sizeColumnsToFit();
    console.log('Fit Fit');
  };
}
