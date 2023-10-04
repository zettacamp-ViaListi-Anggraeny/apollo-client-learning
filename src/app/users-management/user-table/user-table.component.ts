import { Component } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  searchTerm: string = '';
  isLoading: boolean = false;
  userData: any = null;

  constructor(private userService: UserService) {}

  onSearchChange() {
    this.userData = null;
  }

  searchUser() {
    const sanitizedSearchTerm = this.searchTerm.trim();

    if (sanitizedSearchTerm.length >= 4) {
      if (this.userData) {
        console.log('Data sudah ada');
      } else {
        this.isLoading = true;
        this.userService.getAllUsers(sanitizedSearchTerm, 10, 0).subscribe(
          (response) => {
            this.userData = response.data.GetAllUsers;
            this.isLoading = false;
            console.log(response.data.GetAllUsers);
          },
          (error) => {
            console.error('API Error:', error);
            this.isLoading = false;
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter at least 4 characters to search!',
      });
    }
  }

  generateClass(index: number): string {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const className = colors[index % colors.length];
    return className;
  }
}
