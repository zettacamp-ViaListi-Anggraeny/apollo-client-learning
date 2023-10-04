import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../school.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss'],
})
export class SchoolTableComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  schools: any;
  loading: boolean = false;
  paginator: any = {
    limit: 100,
    page: 0,
  };
  maxCount: number = 0;

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolsData();
  }

  getSchoolsData() {
    this.loading = true;
    this.subs.sink = this.schoolService
      .getAllSchool(this.paginator)
      .subscribe((resp) => {
        this.formatSchoolsData(resp);
        this.loading = false;
        console.log(resp);
      });
  }

  formatSchoolsData(data: any) {
    this.schools = data?.data?.GetAllSchools;
    this.maxCount = this.schools[0]?.count_document;
    console.log(this.schools);
  }

  prevPage() {
    this.paginator.page--;
    this.getSchoolsData();
  }

  nextPage() {
    this.paginator.page++;
    this.getSchoolsData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
