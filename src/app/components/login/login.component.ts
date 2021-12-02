import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { SignInData } from 'src/app/modals/signInData';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isFormValid = false;
  areCredentialsInvalid = false;
  isFailed!: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {}

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);
  }

  private async checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(
      signInForm.value.login,
      signInForm.value.password
    );
    this.isFailed = await this.authenticationService.authenticate(signInData);
    if (!this.isFailed) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }
}

// this.auth
//   .signInWithEmailAndPassword(
//     signInForm.value.login,
//     signInForm.value.password
//   )
//   .then((res) => console.log('Success', res))
//   .catch((err) => console.log('Err', err));
