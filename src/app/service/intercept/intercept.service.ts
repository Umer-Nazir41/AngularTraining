import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterceptService {
  constructor(private http: HttpClient) {}
  readonly API_URL = 'http://localhost:3001';

  signIn() {
    return this.http.get<any>(this.API_URL + '/token/sign');
  }

  getPath() {
    return this.http.get<any>(this.API_URL + '/path1'); //path1 is then requested
  }
}

// getWithToken(token: any) {
//   return this.http.get<any>(this.API_URL + '/path1', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }
// .subscribe((data) => {
//   return data.token;
// }
