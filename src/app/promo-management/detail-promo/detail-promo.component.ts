import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.component.html',
  styleUrls: ['./detail-promo.component.css'],
})
export class DetailPromoComponent implements OnInit {
  detailData: any;

  constructor(
    private dialogRef: MatDialogRef<DetailPromoComponent>,
    @Inject(MAT_DIALOG_DATA) public promo: any
  ) {}

  ngOnInit(): void {
    const promoData = this.promo.data.data.GetOnePromo;
    this.detailData = promoData;
  }

  onImageError(event: any) {
    console.error('Image loading error:', event);
    event.target.src = 'https://placehold.co/200x100?text=Promo+Image';
  }
}
