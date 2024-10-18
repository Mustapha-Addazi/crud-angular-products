import { Injectable } from '@angular/core';
import { finalize, find, Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! :Array<Product>;
  constructor() { 
    this.products=[
      {"id":UUID.UUID(),"name":"computer","promotion":true,"price":2344},
      {"id":UUID.UUID(),"name":"printer","price":244,"promotion":false},
      {"id":UUID.UUID(),"name":"smartphone","price":1322,"promotion":true},
      {"id":UUID.UUID(),"name":"headphone","price":344,"promotion":false}
    ]
    for(let i=0;i<2;i++){
      this.products.push({"id":UUID.UUID(),"name":"computer","promotion":true,"price":2344})
      this.products.push({"id":UUID.UUID(),"name":"printer","price":244,"promotion":false})
      this.products.push({"id":UUID.UUID(),"name":"smartphone","price":1322,"promotion":true})
      this.products.push({"id":UUID.UUID(),"name":"headphone","price":344,"promotion":false})
    }
  }
  public getAllProducts():Observable<Product[]>{
    let rnd=Math.random();
    if(rnd<0.1){
      return throwError(()=>new Error("erreur de connexion"))
    }else
    return of(this.products);
  }
  public getPagesProducts(page:number,size:number):Observable<PageProduct>{
    let index = page*size;
   let totalpage= ~~(this.products.length/size);
   if(this.products.length % size !=0){
    totalpage++;
   }
  let pageproduct= this.products.slice(index,index+size);
  return of({page:page,size:size,totalpages:totalpage,products:pageproduct})
  }
  public deleteproduct(id:string):Observable<boolean>{
  this.products=this.products.filter(p=>p.id!=id)
  return of(true);
  }
  public setPromotion(id:string):Observable<boolean>{
   let product= this.products.find(p=>p.id==id);
   if(product != undefined){
    product.promotion=!product.promotion;
  return of(true);
  }else return throwError(()=>new Error("Product not fount"))
  }
  public searchProducts(page:number,size:number,keyword:string):Observable<PageProduct>{
  let result=  this.products.filter(p=>p.name.includes(keyword));
  let index = page*size;
  let totalpage= ~~(result.length/size);
  if(result.length % size !=0){
   totalpage++;
  }
 let pageproduct= result.slice(index,index+size);
 return of({page:page,size:size,totalpages:totalpage,products:pageproduct})
  
  }
  public addProduct(product:Product):Observable<boolean>{
    product.id=UUID.UUID()
   this.products.push(product)
   return of(true)
  }
  public getProductbyID(id:string):Observable<Product>{
    let product= this.products.find(p=>p.id==id)
    if(product !== undefined)
      return of(product)
    else
      return throwError(()=> new Error("product not found"))
  }
  getMessageError(fieldname: string,error: ValidationErrors) {
    if(error['required']){
      return fieldname +" is required"
    }else if(error['minlength']){
      return fieldname+ " should have at least "+ error['minlength']['requiredLength']+" characters";
    }else
    return ""
    }
    public updateProduct(product:Product):Observable<Product>{
      this.products=this.products.map(p=>(product.id==p.id)?product:p)
      return of(product)
    }
    public GetPromotedProduct():Observable<Product[]>{
      let Promotedproduct:Array<Product>=[]
      this.products.forEach(product=>{
        if(product.promotion==true)
          Promotedproduct.push(product)
      })
     return of(Promotedproduct)
    }
}
