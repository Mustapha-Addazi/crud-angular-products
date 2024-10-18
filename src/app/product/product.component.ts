import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
handelPromotedProduct() {
this.productService.GetPromotedProduct().subscribe({
  next:(data)=>{
    this.products=data
  }
})
}
handelNewProduct() {
  this.router.navigateByUrl("admin/newProduct")
}
gotoPage(index: number) {
this.curentPage=index;
if(this.currentAction=="all")
this.handleGetPagesProducts();
else
 this.hundelSearchProduct();
}
hundelSearchProduct() {
  this.curentPage=0
  this.currentAction="search"
let keyword=this.searchFormgroup.value.keyword;
 this.productService.searchProducts(this.curentPage,this.pageSize,keyword).subscribe({
  next:(data)=>{
    this.products=data.products;
    this.totalpages=data.totalpages;
  },
  error:(err)=>{
    this.errorMessage=err
  }
 })
}

hundelSetPromotion(p: Product) {
let promo=p.promotion;
  this.productService.setPromotion(p.id).subscribe({
  next:(data)=>{
    p.promotion=!promo
  },
  error:(err)=>{
    this.errorMessage=err;
  }
})
}
updateproduct(p: Product) {
this.router.navigateByUrl("/admin/editProduct/"+p.id)
}
  public products!:Product[];
  public errorMessage!:string;
  public searchFormgroup!:FormGroup;
  public curentPage: number=0;
  public totalpages:number=0;
  public pageSize:number=5;
  public currentAction:string="all"
  constructor( private productService:ProductService,private fb:FormBuilder,public AuthenticationService:AuthenticationService,
private router:Router
   ){}
  ngOnInit(): void {
    this.searchFormgroup=this.fb.group({
      keyword:this.fb.control(null)
    })
      this.handleGetPagesProducts();
  }
  handleGetPagesProducts(){
 
    this.productService.getPagesProducts(this.curentPage,this.pageSize).subscribe({
            next:(data)=>{
              this.products=data.products;
              this.totalpages=data.totalpages;
            },
            error:(err)=>{
              this.errorMessage=err;
              
            }
          });
}
handleGetAllProducts(){
 
this.productService.getAllProducts().subscribe({
        next:(data)=>{
          this.products=data;
        },
        error:(err)=>{
          this.errorMessage=err;
          
        }
      });
}
  deleteproduct(p:Product){
     let conf=confirm("Ara you sure ?");
  if(conf==false) return;
    this.productService.deleteproduct(p.id).subscribe({
      next:(data)=>{
       // this.handleGetAllProducts();
       let index=this.products.indexOf(p);
       this.products.splice(index,1);
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    })
  }
}
