import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoManagementComponent } from './promo-management.component';
import { AddPromoFormComponent } from './add-promo-form/add-promo-form.component';

const routes: Routes = [
  {
    path: '',
    component: PromoManagementComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'form',
    component: AddPromoFormComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'form/:id',
    component: AddPromoFormComponent,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoManagementRoutingModule {}
