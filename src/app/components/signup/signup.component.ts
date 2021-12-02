import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { SignInData } from 'src/app/modals/signInData';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    console.log();
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit = async () => {
    if (this.profileForm.valid) {
      const signUpData = new SignInData(
        this.profileForm.value.email,
        this.profileForm.value.password
      );

      if (this.authenticationService.signup(signUpData)) {
        this.router.navigate(['signin']);
      }

      console.log(signUpData);
    }
  };
}
