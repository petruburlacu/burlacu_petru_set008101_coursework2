import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message;
  register = "Login";

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { //https://angular.io/api/forms/FormBuilder

    this.form = this.formBuilder.group({
       //value inside the hmtl input
      username: '',
      password: ''
    })
   }

   onClickLogin() {
     //constructing a user object from user input
     const user = {
        //passing the input values
        username: this.form.get('username').value,
        password: this.form.get('password').value
     }

     this.authenticationService.loginUser(user).subscribe(data => {
       if(!data.success) {
         this.message = "alert alert-danger";
         this.register = "LOGIN FAILED";
       }
       else {
         this.message = "alert alert-success";
         this.register = "LOGED IN";
         this.form.controls['username'].disable();
         this.form.controls['password'].disable();

         this.authenticationService.browserStoreUser(data.token, data.user);

         setTimeout(() => {
           this.router.navigate(['/']);
         }, 2000);
       }
     });
    //becouse development server runs on port 4200 BUT Express Server runs on 8080 port and
    //The request from development server to back end needs cross origin enabled!
   }

  ngOnInit() {
  }

}
