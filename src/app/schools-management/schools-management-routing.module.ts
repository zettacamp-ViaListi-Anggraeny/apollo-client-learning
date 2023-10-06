import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolTableComponent } from './school-table/school-table.component';
import { SchoolFormComponent } from './school-form/school-form.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolTableComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'form',
    component: SchoolFormComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'form/:id',
    component: SchoolFormComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsManagementRoutingModule { }
