import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { PromoService } from '../promo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-promo-form',
  templateUrl: './add-promo-form.component.html',
  styleUrls: ['./add-promo-form.component.scss'],
})
export class AddPromoFormComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  form!: FormGroup;
  isEditing = false;
  promoId: string = '';

  constructor(
    private fb: FormBuilder,
    private promoService: PromoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.promoId = this.route.snapshot.params['id'];
    if (this.promoId) {
      this.isEditing = true;

      this.promoService.getPromoById(this.promoId).subscribe((existingData) => {
        if (existingData) {
          this.initForm(existingData.data.GetOnePromo);
        }
      });
    } else {
      this.initForm();
    }
  }

  initForm(data?: any): void {
    console.log(data?.ref);

    this.form = this.fb.group({
      ref: [data ? data?.ref : '', Validators.required],
      title: [data ? data?.title : '', Validators.required],
      sub_title: [data ? data?.sub_title : '', Validators.required],
      description: [data ? data?.description : '', Validators.required],
      image_url: [data ? data?.image_url : ''],
    });
  }

  savePromo() {
    if (this.form.valid) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedData = this.form.value;
          if (this.isEditing) {
            this.subs.sink = this.promoService
              .updatePromo(this.promoId, updatedData)
              .subscribe(
                (data) => {
                  console.log(data);
                  Swal.fire('Saved!', '', 'success');
                  this.router.navigate(['/promo']);
                },
                (error) => {
                  console.log(error);
                  Swal.fire('Error', error.message, 'error');
                }
              );
          } else {
            this.subs.sink = this.promoService
              .createPromo(updatedData)
              .subscribe(
                () => {
                  Swal.fire('Saved!', '', 'success');
                  this.router.navigate(['/promo']);
                },
                (error) => {
                  console.log(error);
                  Swal.fire('Error', error.message, 'error');
                }
              );
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please Fill all your data!',
      });

      for (const controlName in this.form.controls) {
        if (this.form.controls.hasOwnProperty(controlName)) {
          this.form.get(controlName)?.markAsTouched();
        }
      }
    }
  }

  cancel() {
    Swal.fire({
      title: 'Do you want to cancel the changes?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/promo']);
      } else if (result.isDenied) {
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
