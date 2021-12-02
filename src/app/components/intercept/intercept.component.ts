import { Component, OnInit } from '@angular/core';
import { InterceptService } from 'src/app/service/intercept/intercept.service';

@Component({
  selector: 'app-intercept',
  templateUrl: './intercept.component.html',
  styleUrls: ['./intercept.component.css'],
})
export class InterceptComponent implements OnInit {
  dataLog: string = '';

  constructor(private intercept: InterceptService) {}

  ngOnInit(): void {}

  AccessSecretPage() {
    this.intercept.getPath().subscribe(
      (data) => {
        this.dataLog = data.msg;
        console.log(data);
      },
      (error) => {
        this.dataLog = error.statusText;
        console.log('Without Token', this.dataLog);
      }
    );
  }
}
