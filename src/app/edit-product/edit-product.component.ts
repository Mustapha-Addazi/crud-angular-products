import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
handelUpdateProduct() {
  let p=this.ProductFormGroup.value;
  p.id=this.product.id;
  this.productservice.updateProduct(p).subscribe({
    next:(prod)=>{
      alert("product updated successfully")
      this.router.navigateByUrl("/admin/products")
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
  public productId!:string;
  public product! :Product;
  public ProductFormGroup!:FormGroup
  constructor(public productservice:ProductService,public fb:FormBuilder,
     private route:ActivatedRoute,private router:Router ){ 
      this.productId=this.route.snapshot.params['id'];
     }
  ngOnInit(): void {
    this.productservice.getProductbyID(this.productId).subscribe({
      next:(product)=>{
        this.product=product
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.ProductFormGroup=this.fb.group({
   name:this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
  price:this.fb.control(this.product.price,[Validators.required]),
  promotion:this.fb.control(this.product.promotion,[Validators.required])
    })
  }
}
