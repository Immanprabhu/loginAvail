import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './modules/dashboard/components/secure/secure.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
     canActivate: [AuthGuard] 
    },
    {path:'secure',component:SecureComponent,
      canActivate: [AuthGuard] 
     },
    { path: '**', redirectTo:'', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
