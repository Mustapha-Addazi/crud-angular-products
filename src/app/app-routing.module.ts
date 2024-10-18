import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authenticationGuard } from './gaurds/authentication.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {path:"login" ,component:LoginComponent},
  {path:"" ,component:LoginComponent},
  {path:"admin",component:AdminTemplateComponent, canActivate:[authenticationGuard]
    , children:[
    {path:"products",component:ProductComponent},
    {path:"customers",component:CustomersComponent},
    {path:"newProduct",component:NewProductComponent},
    {path:"editProduct/:id",component:EditProductComponent}
  ]},
  {path:"home" ,component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
