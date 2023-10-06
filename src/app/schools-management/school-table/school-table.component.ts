import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../school.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss'],
})
export class SchoolTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private subs = new SubSink();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Specify the data type as 'any[]'
  isLoading: boolean = false;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private schoolService: SchoolService, private router: Router) {}

  ngOnInit(): void {
    this.getSchoolsData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getSchoolsData() {
    this.isLoading = true;
    
    this.subs.sink = this.schoolService.schoolsList$.subscribe((data) => {
      console.log(data);
      this.dataSource.data = data; // Assign data to the dataSource
      this.isLoading = false;
    });
  }

  onAddNewSchools() {
    this.router.navigate(['schools/form']);
  }

  onDelete(index: number) {
    if (index >= 0 && index < this.dataSource.data.length) {
      const deletedSchool = this.dataSource.data[index];
      this.schoolService.deleteSchoolsData(deletedSchool.id);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
