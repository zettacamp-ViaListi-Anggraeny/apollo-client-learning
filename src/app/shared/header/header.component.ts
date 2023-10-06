import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() selectedLang: string = '';
  @Output() sideNavToggle = new EventEmitter<boolean>();
  @Output() switchLang = new EventEmitter<string>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.sideNavToggle.emit();
  }

  onSwitchLang(lang: string) {
    this.switchLang.emit(lang);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
        Swal.fire(
          'Log Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  }
}
