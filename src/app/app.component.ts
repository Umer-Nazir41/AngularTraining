import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';
import { SpinnerService } from './service/spinner/spinner.service';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LoginTask';

  loading$: any;

  constructor(
    public authenticationService: AuthenticationService,
    private spinner: SpinnerService,
    private translateService: TranslateService
  ) {
    this.loading$ = spinner.loading$;
  }

  logout() {
    this.authenticationService.logout();
  }

  changeLang(event: any) {
    console.log(event.target.value);
    this.translateService.use(event.target.value);
  }
}
