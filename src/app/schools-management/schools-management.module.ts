import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsManagementRoutingModule } from './schools-management-routing.module';
import { SchoolTableComponent } from './school-table/school-table.component';
import { SharedModule } from '../shared/shared.module';
import { SchoolFormComponent } from './school-form/school-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SchoolTableComponent,
    SchoolFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SchoolsManagementRoutingModule,
    TranslateModule
  ]
})
export class SchoolsManagementModule { }
