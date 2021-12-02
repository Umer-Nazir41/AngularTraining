import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JsonComponent } from './components/json/json.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { CrudComponent } from './components/crud/crud.component';
import { InterceptComponent } from './components/intercept/intercept.component';
import { AgGridComponent } from './components/agGrid/ag-grid/ag-grid.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Json',
    component: JsonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'CRUD',
    component: CrudComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'intercept',
    component: InterceptComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'agGrid',
    component: AgGridComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
