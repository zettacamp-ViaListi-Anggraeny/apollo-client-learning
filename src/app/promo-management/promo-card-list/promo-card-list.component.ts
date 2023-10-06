import { Component, OnInit, ViewChild } from '@angular/core';
import { PromoService } from '../promo.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailPromoComponent } from '../detail-promo/detail-promo.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-promo-card-list',
  templateUrl: './promo-card-list.component.html',
  styleUrls: ['./promo-card-list.component.scss'],
})
export class PromoCardListComponent implements OnInit {
  private subs = new SubSink();
  promo!: any[];
  paginator: any = {
    limit: 6,
    page: 0,
  };
  maxCount: number = 0;
  isLoading = false;

  constructor(
    private promoService: PromoService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getPromoData();
  }

  getPromoData() {
    this.isLoading = true;
    this.subs.sink = this.promoService
      .getAllPromo(this.paginator)
      .subscribe((resp) => {
        this.formatPromoData(resp);
        this.isLoading = false;
      });
  }

  formatPromoData(data: any) {
    this.promo = data.data.GetAllPromos;
    this.maxCount = this.promo[0]?.count_document;
  }

  onAddPromo() {
    this.router.navigate(['/promo/form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/promo/form', id]);
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.sink = this.promoService.deletePromo(id).subscribe(() => {
          this.getPromoData();
        });

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  openDialog(id: string) {
    this.subs.sink = this.promoService.getPromoById(id).subscribe((data) => {
      this.dialog.open(DetailPromoComponent, {
        data: {
          data,
        },
      });
    });
  }

  prevPage() {
    this.paginator.page--;
    this.getPromoData();
  }

  nextPage() {
    this.paginator.page++;
    this.getPromoData();
  }

  onImageError(event: any) {
    console.error('Image loading error:', event);
    event.target.src = 'https://placehold.co/200x100?text=Promo+Image';
  }

  generateClass(index: number): string {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const className = colors[index % colors.length];
    return className;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
