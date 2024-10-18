import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
handellogin() {
let username=this.userFormGroup.value.username;
let password=this.userFormGroup.value.password;
this.userservice.login(username,password).subscribe({
  next:(appuser)=>{
    this.userservice.authenticateUser(appuser).subscribe({
      next:(data)=>{
      this.Router.navigateByUrl("/admin")
      }
    })
  },
  error:(err)=>{
this.errorMessage=err
  }
})
}
ngOnInit(): void {
  this.userFormGroup=this.fb.group({
    username : this.fb.control(""),
    password : this.fb.control("")
  
  })
}
constructor(private fb:FormBuilder,
  private userservice:AuthenticationService,
  private Router:Router){

}
public userFormGroup!:FormGroup 
public errorMessage:any;

}
