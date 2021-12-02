import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  constructor() {}

  show() {
    console.log('Spinner On');
    this._loading.next(true);
  }

  hide() {
    console.log('Spinner Off');
    this._loading.next(false);
  }
}
