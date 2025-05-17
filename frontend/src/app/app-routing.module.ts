import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListingsComponent } from './pages/listings/listings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },     // Redirect root path to /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listings', component: ListingsComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
