import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../school.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css'],
})
export class SchoolFormComponent implements OnInit {
  schoolsForm!: FormGroup;
  isEditMode = false;
  schoolsId: number = 0;

  constructor(
    private schoolService: SchoolService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.schoolsId = +this.activatedRoute.snapshot.params['id'];

    if (this.schoolsId) {
      this.isEditMode = true;

      const schoolsData = this.schoolService.getSchoolsById(this.schoolsId);

      if (schoolsData) {
        this.createSchoolsForm(schoolsData);
      }
    } else {
      this.createSchoolsForm();

      this.addAddress();
      this.addContactPerson();
    }

    this.schoolsForm;
  }

  private createSchoolsForm(data?: any): void {
    this.schoolsForm = this.fb.group({
      id: [data?.id || Date.now()],
      longName: [data?.longName || null, Validators.required],
      shortName: [data?.shortName || null, Validators.required],
      phone: [data?.phone || null],
      address: this.fb.array([]),
      contactPerson: this.fb.array([]),
      website: [data?.website || null],
      email: [data?.email || null, [Validators.required, Validators.email]],
    });

    if (data && data.address && data.contactPerson) {
      data.address.forEach((address: any) => {
        this.addAddress(address);
      });

      data.contactPerson.forEach((contactPerson: any) => {
        this.addContactPerson(contactPerson);
      });
    }
  }

  // Address
  private addAddress(data?: any): void {
    const control = this.fb.group({
      fullAddress: [data?.fullAddress || null, Validators.required],
      zipCode: [data?.zipCode || null, Validators.required],
      city: [data?.city || null, Validators.required],
      country: [data?.country || null, Validators.required],
    });
    this.addressControls.push(control);
  }

  get addressControls() {
    return this.schoolsForm.get('address') as FormArray;
  }

  onAddAddress() {
    this.addAddress();
  }

  onDeleteAddress(index: number) {
    if (confirm('Are You Sure Want To Delete Field?')) {
      if (index >= 0 && index < this.addressControls.length) {
        this.addressControls.removeAt(index);
      }
    }
  }

  // Contact Person
  private addContactPerson(data?: any): void {
    const control = this.fb.group({
      id: Date.now(),
      firstName: [data?.firstName || null, Validators.required],
      lastName: [data?.lastName || null, Validators.required],
      phone: [data?.phone || null, Validators.required],
      email: [data?.email || null, [Validators.required, Validators.email]],
      position: [data?.position || null, Validators.required],
    });
    this.contactPersonControls.push(control);
  }

  get contactPersonControls() {
    return this.schoolsForm.get('contactPerson') as FormArray;
  }

  onAddContactPerson() {
    this.addContactPerson();
  }

  onDeleteContactPerson(index: number) {
    if (confirm('Are You Sure Want To Delete Field?')) {
      if (index >= 0 && index < this.contactPersonControls.length) {
        this.contactPersonControls.removeAt(index);
      }
    }
  }

  // Other Function
  onSubmit() {
    if (this.schoolsForm.valid) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.isEditMode) {
            this.schoolService.updateSchoolsData(this.schoolsForm.value);
          } else {
            this.schoolService.addSchoolsData(this.schoolsForm.value);
          }
          this.route.navigate(['/schools']);
          Swal.fire('Saved!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      Swal.fire('Error!', 'Check Again Your input!', 'error');
    }
  }

  onReset() {
    if (confirm('Yakin ingin mereset data?')) {
      this.schoolsForm.reset();
      while (this.addressControls.length > 0) {
        this.addressControls.removeAt(0);
      }
    }
  }
}
