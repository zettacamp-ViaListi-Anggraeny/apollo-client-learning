import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string = '';

  constructor(private apollo: Apollo) {}

  loginUser(email: string, password: string): Observable<any> {
    this.userEmail = email;
    console.log(this.userEmail);

    return this.apollo
      .mutate({
        mutation: gql`
        mutation {
          Login(email: "${email}", password: "${password}") {
            token
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          this.userLogin(resp.data);
          return resp;
        })
      );
  }

  userLogin(data: any) {
    console.log(data);
    localStorage.setItem(
      environment.tokenKey,
      JSON.stringify(data.Login.token)
    );
    localStorage.setItem('userEmail', this.userEmail);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(environment.tokenKey);
    return !!token;
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
