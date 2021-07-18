import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './components/secure/secure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';



const routes: Routes = [
  {   path: '', component: DashboardComponent },
  {   path: 'secure', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SecureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
