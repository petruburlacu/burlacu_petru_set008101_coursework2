import { Component, OnInit } from '@angular/core';
//https://angular.io/api/forms/FormBuilder
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

message;
register = "Register";
//creating form
  form: FormGroup; //exmploring the form of the FormGroupType

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { //https://angular.io/api/forms/FormBuilder

    this.form = this.formBuilder.group({
      email: '', //value inside the hmtl input
      username: '',
      password: ''
    })
   }

   onClickRegister() {
     //constructing a user object
     const user = {
        email: this.form.get('email').value, //passing the input values
        username: this.form.get('username').value,
        password: this.form.get('password').value
     }

     //passing the created user to the authenticationService
    this.authenticationService.registerUser(user).subscribe(data => {
      if(!data.success) {
        this.message = "alert alert-danger";
        this.register = "FAILED!";
      }
      else {
        this.message = "alert alert-success";
        this.register = "REGISTERED!";

        this.form.controls['email'].disable();
        this.form.controls['username'].disable();
        this.form.controls['password'].disable();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
      console.log(data);
    });
    //becouse development server runs on port 4200 BUT Express Server runs on 8080 port and
    //The request from development server to back end needs cross origin enabled!

     console.log(this.form);
     console.log("Email: " + this.form.get('email').value);
     console.log("Username: " + this.form.get('username').value);
     console.log("Password: " + this.form.get('password').value);
     console.log("USER REGISTERED!");
   }

  ngOnInit() {
  }

}
