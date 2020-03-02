import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;


  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //when profile page loads it will get the PROFILE
    this.authenticationService.getUserDetails().subscribe(data => {
      this.user = data.user;
    });
  }

}
