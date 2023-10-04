import { Component, OnInit } from '@angular/core';
import { PromoService } from '../promo.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-promo-card-list',
  templateUrl: './promo-card-list.component.html',
  styleUrls: ['./promo-card-list.component.scss']
})
export class PromoCardListComponent implements OnInit {
  private subs = new SubSink();
  promo: any;

  constructor(
    private promoService: PromoService
  ) { }

  ngOnInit(): void {
    this.getPromoData();
  }

  getPromoData() {
    this.subs.sink = this.promoService.getAllPromo().subscribe(resp => {
      this.formatSchoolsData(resp);
      console.log(resp);
    })
  }

  formatSchoolsData(data: any) {
    this.promo = data.data.GetAllPromos;
  }

}
