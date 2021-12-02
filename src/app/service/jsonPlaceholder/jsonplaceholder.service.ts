import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JsonplaceholderService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(URL);
  }
  getSinglePostData(id: number): Observable<any> {
    const URL = 'https://jsonplaceholder.typicode.com/posts/' + id;
    return this.http.get(URL);
  }
}
