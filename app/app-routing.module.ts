import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { LoginComponent } from './login/login.component';
import { PermissionGuard } from './permission.guard';

const routes: Routes = [
  { path: 'company', component: CompaniesComponent, canActivate: [PermissionGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactPersonComponent, canActivate: [PermissionGuard] },
  { path : '', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
