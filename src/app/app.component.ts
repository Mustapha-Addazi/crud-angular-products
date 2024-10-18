import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

title = 'catalog';
public currentrout:any;
constructor(private router:Router){

}
gotoHome() {
  this.currentrout="home";
this.router.navigateByUrl("/home")
}
gotoService() {
  this.currentrout="service";
  this.router.navigateByUrl("/service")
} 
gotoProduct() {
  this.currentrout="product"
this.router.navigateByUrl("/product")
}
 
}


