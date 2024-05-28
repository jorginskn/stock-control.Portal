import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { HomeComponent } from '../home/home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
  },
 
];
