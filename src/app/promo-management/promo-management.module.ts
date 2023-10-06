import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoManagementRoutingModule } from './promo-management-routing.module';
import { PromoManagementComponent } from './promo-management.component';
import { AddPromoFormComponent } from './add-promo-form/add-promo-form.component';
import { PromoCardListComponent } from './promo-card-list/promo-card-list.component';
import { SharedModule } from '../shared/shared.module';
import { DetailPromoComponent } from './detail-promo/detail-promo.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PromoManagementComponent,
    AddPromoFormComponent,
    PromoCardListComponent,
    DetailPromoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PromoManagementRoutingModule,
    TranslateModule
  ]
})
export class PromoManagementModule { }
