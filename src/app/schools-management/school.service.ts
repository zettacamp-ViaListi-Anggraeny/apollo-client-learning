import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private apollo: Apollo) {}

  getAllSchool(pagination: any): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getSchoolList($pagination: PaginationInput) {
          GetAllSchools(pagination: $pagination) {
            short_name
            long_name
            status
            count_document
          }
        }
      `,
      variables: {
        pagination,
      },
      fetchPolicy: 'network-only',
    });
  }
}
