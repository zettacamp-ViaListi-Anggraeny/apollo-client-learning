import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'apollo-client-learning';

  pageTitle: string = 'Home';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset: boolean = false;
  selectedLang!: string;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isHandset = result.matches;
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.data.subscribe((data) => {
          if (data.title) {
            this.pageTitle = data.title;
          } else {
            this.pageTitle = '';
          }
        });
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
