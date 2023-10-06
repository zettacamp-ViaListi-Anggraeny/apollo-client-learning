import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getAllUsers(lastName: string, limit: number, page: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query ($lastName: String $limit: Int $page: Int) {
          GetAllUsers(
            pagination: { limit: $limit, page: $page }
            last_name: $lastName
          ) {
            _id
            profile_picture
            first_name
            last_name
            civility
            position
            email
            entities {
              entity_name
              school {
                short_name
              }
            }
            status
          }
        }
      `,
      variables: {
        lastName: lastName,
        limit: limit,
        page: page,
      }, fetchPolicy:'network-only'
    });
  }
}
