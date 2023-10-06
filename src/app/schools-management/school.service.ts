import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

interface schools{
  id: number;
  longName: string;
  shortName: string;
  phone?: string;
  address: any[];
  website?: string;
  email: string;
  contactPerson: any[];
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  schoolsList: schools[] = [
    {
      id: 1,
      longName: 'University One',
      shortName: 'U1',
      phone: '123-456-7890',
      address: [
        {
          fullAddress: '123 Main Street',
          zipCode: 12345,
          city: 'Cityville',
          country: 'Countryland',
        },
        {
          fullAddress: '123 Main Street',
          zipCode: 12345,
          city: 'Cityville',
          country: 'Countryland',
        },
      ],
      website: 'https://university1.com',
      email: 'info@university1.com',
      contactPerson: [
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          phone: '987-654-3210',
          email: 'alice.johnson@example.com',
          position: 'Administrator',
        },
        {
          firstName: 'Bob',
          lastName: 'Wilson',
          phone: '987-654-3210',
          email: 'Bob.Wilson@example.com',
          position: 'Administrator',
        },
      ],
    },
    {
      id: 2,
      longName: 'University Two',
      shortName: 'U2',
      phone: '555-123-4567',
      address: [
        {
          fullAddress: '456 Elm Street',
          zipCode: 54321,
          city: 'Townsville',
          country: 'Stateland',
        },
      ],
      website: 'https://university2.com',
      email: 'info@university2.com',
      contactPerson: [
        {
          firstName: 'Bob',
          lastName: 'Wilson',
          phone: '555-987-6543',
          email: 'bob.wilson@example.com',
          position: 'Admissions Officer',
        },
      ],
    },
    {
      id: 3,
      longName: 'University Three',
      shortName: 'U3',
      phone: '111-222-3333',
      address: [
        {
          fullAddress: '789 Oak Street',
          zipCode: 98765,
          city: 'Villagetown',
          country: 'Countryville',
        },
      ],
      website: 'https://university3.com',
      email: 'info@university3.com',
      contactPerson: [
        {
          firstName: 'David',
          lastName: 'Smith',
          phone: '111-333-5555',
          email: 'david.smith@example.com',
          position: 'Registrar',
        },
      ],
    },
    {
      id: 4,
      longName: 'University Four',
      shortName: 'U4',
      phone: '999-888-7777',
      address: [
        {
          fullAddress: '987 Pine Street',
          zipCode: 87654,
          city: 'Forestville',
          country: 'Woodland',
        },
      ],
      website: 'https://university4.com',
      email: 'info@university4.com',
      contactPerson: [
        {
          firstName: 'Ella',
          lastName: 'Wilson',
          phone: '999-777-5555',
          email: 'ella.wilson@example.com',
          position: 'Finance Manager',
        },
      ],
    },
  ];

  schoolSubject = new BehaviorSubject<schools[]>(
    this.schoolsList
  );
  schoolsList$ = this.schoolSubject.asObservable();

  constructor() {}

  addSchoolsData(data: any) {
    const currentData = this.schoolSubject.value;
    currentData.push(data);
    this.schoolSubject.next(currentData);
  }

  getSchoolsById(id: number): any | null {
    const data = this.schoolSubject.value;
    const schools = data.find((item) => item.id === id);
    return schools || null;
  }

  updateSchoolsData(updatedData: schools): void {
    const currentData = this.schoolSubject.value;

    const indexToUpdate = currentData.findIndex(
      (item) => item.id === updatedData.id
    );

    if (indexToUpdate !== -1) {
      currentData[indexToUpdate] = updatedData;
      this.schoolSubject.next(currentData);
    }
  }

  deleteSchoolsData(id: number) {
    const currentData = this.schoolSubject.value;
    if (id >= 0 && id < currentData.length) {
      currentData.splice(id, 1);
      this.schoolSubject.next(currentData);
    }
  }
}
