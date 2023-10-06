import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  constructor(private apollo: Apollo) {}

  getAllPromo(pagination: any): Observable<any> {
    return this.apollo.query({
      query: gql`
        query ($pagination: PaginationInput) {
          GetAllPromos(pagination: $pagination) {
            _id
            ref
            image_url
            title
            sub_title
            count_document
          }
        }
      `,
      variables: {
        pagination: pagination,
      },
      fetchPolicy: 'network-only',
    });
  }

  createPromo(promoInput: any): Observable<any> {
    // console.log(promoInput);
    return this.apollo.mutate({
      mutation: gql`
        mutation ($promoInput: PromoInput) {
          CreatePromo(promo_input: $promoInput) {
            _id
          }
        }
      `,
      variables: {
        promoInput: promoInput,
      },
      fetchPolicy: 'network-only',
    });
  }

  updatePromo(_id: any, promoInput: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($_id: ID!, $promoInput: PromoInput) {
          UpdatePromo(_id: $_id, promo_input: $promoInput) {
            _id
          }
        }
      `,
      variables: {
        _id: _id,
        promoInput: promoInput,
      },
      fetchPolicy: 'network-only',
    });
  }

  deletePromo(promoId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          DeletePromo(_id: $id) {
            title
          }
        }
      `,
      variables: {
        id: promoId,
      },
    });
  }

  getPromoById(promoId: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query ($_id: ID!) {
          GetOnePromo(_id: $_id) {
            _id
            ref
            title
            sub_title
            description
            image_url
          }
        }
      `,
      variables: {
        _id: promoId,
      },
      fetchPolicy: 'network-only',
    });
  }
}
