import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'src/app/modals/signInData';
import { InterceptService } from 'src/app/service/intercept/intercept.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tokenData } from 'src/app/Interfaces/intercept';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private mockedUser: SignInData = new SignInData('test', 'test');
  isAuthenticated: boolean = false;
  verificationData: object = {};
  EMAIL: string = '';
  PASSWORD: string = '';
  token!: tokenData;
  check: boolean;

  constructor(
    private router: Router,
    private interceptorService: InterceptService,
    public auth: AngularFireAuth
  ) {}

  signup(signUpData: SignInData): boolean {
    try {
      this.auth
        .createUserWithEmailAndPassword(
          signUpData.getLogin(),
          signUpData.getPassword()
        )
        .then((res) => {
          //console.log(res);
          return true;
        })
        .catch((err) => {
          console.log('Err => Signup (Firebase)', err);
          return false;
        });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  authenticate = async (signInData: SignInData): Promise<boolean> => {
    let chkcreds = await this.checkCredentials(signInData);

    if (chkcreds) {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  };

  private checkCredentials = async (
    signInData: SignInData
  ): Promise<Boolean> => {
    await this.auth
      .signInWithEmailAndPassword(
        signInData.getLogin(),
        signInData.getPassword()
      )
      .then((res) => {
        //console.log('Firebase Auth', res);
        this.interceptorService.signIn().subscribe((data) => {
          this.token = data.headers.Authorization;
        });
        this.check = true;
      })
      .catch((err) => {
        console.log('Err => Login (Firebase)', err);
        //alert(err);
        this.check = false;
      });
    return this.check;
  };

  logout() {
    this.auth.signOut();
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}

//this.verificationData = new SignInData(this.EMAIL, this.PASSWORD);

// this.mockedUser.login = localStorage.getItem('EMAIL');
// PASSWORD = localStorage.getItem('PASSWORD');
// signInData.getLogin() === this.mockedUser.getLogin() &&
// signInData.getPassword() === this.mockedUser.getPassword()

// localStorage.setItem('EMAIL', signUpData.getLogin());
// localStorage.setItem('PASSWORD', signUpData.getPassword());
//this.mockedUser = signUpData;

// private checkCredentials(signInData: SignInData): boolean {
//   this.EMAIL = localStorage.getItem('EMAIL') || 'umernazir01@gmail.com';
//   this.PASSWORD = localStorage.getItem('PASSWORD') || '123456789';

//   if (
//     signInData.getLogin() === this.EMAIL &&
//     signInData.getPassword() === this.PASSWORD
//   ) {
//     this.interceptorService.signIn().subscribe((data) => {
//       this.token = data.headers.Authorization;
//     });
//     return true;
//   }
//   return false;
// }

// if (this.checkCredentials(signInData)) {
//   this.isAuthenticated = true;
//   this.router.navigate(['home']);
//   return true;
// }
