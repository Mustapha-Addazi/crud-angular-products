import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})

export class NewProductComponent implements OnInit {
handelAddProduct() {
  let product= this.ProductFormGroup.value
  this.productservice.addProduct(product).subscribe({
    next:()=>{
      this.router.navigateByUrl("/admin/products")
    }
  })
}
 constructor(private fb:FormBuilder,public productservice:ProductService,
  private router:Router
 ){

 }
  ngOnInit(): void {
this.ProductFormGroup=this.fb.group({
  name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
  price:this.fb.control(0,[Validators.required]),
  promotion:this.fb.control(false,[Validators.required])
})
  }
  public ProductFormGroup!:FormGroup
}
