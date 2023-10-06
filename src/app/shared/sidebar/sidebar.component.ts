import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  private breakpointObserverSubscription: Subscription;

  pageTitle: string = 'Management App';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isHandset: boolean = false;
  selectedLang!: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public translate: TranslateService
  ) {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isHandset = result.matches;
      });

    translate.addLangs(['en', 'id']);
    translate.setDefaultLang('en');
    this.selectedLang = translate.defaultLang

  }

  onToggleSidenav() {
    this.sidenav.toggle();
  }

  onLanguageSwitch(lang: string) {
    this.translate.use(lang);
    this.selectedLang = lang;
  }

  ngOnDestroy() {
    this.breakpointObserverSubscription.unsubscribe();
  }
}
