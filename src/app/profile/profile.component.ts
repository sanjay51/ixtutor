import { AuthenticationService, User } from './../shared/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getUserProfile(this.authenticationService.getEmail())
      .subscribe(user => {
        console.log(user);
        this.user = user;
      })
  }
}
