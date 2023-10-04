import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';



const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
    data:{title:'Home'}
  },
  {
    path: 'schools',
    loadChildren: () => import('./schools-management/schools-management.module').then((m) => m.SchoolsManagementModule),
    canActivate: [AuthGuard],
    data:{title:'School Management'}

  },
  {
    path: 'title',
    loadChildren: () => import('./title-management/title-management.module').then((m) => m.TitleManagementModule),
    canActivate: [AuthGuard],
    data:{title:'Title Management'}
  },
  {
    path: 'users',
    loadChildren: () => import('./users-management/users-management.module').then((m) => m.UsersManagementModule),
    canActivate: [AuthGuard],
    data:{title:'Users Management'}

  },
  {
    path: 'promo',
    loadChildren: () => import('./promo-management/promo-management.module').then((m) => m.PromoManagementModule),
    canActivate: [AuthGuard],
    data:{title:'Promo Management'}

  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
