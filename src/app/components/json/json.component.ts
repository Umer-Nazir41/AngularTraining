import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../../service/jsonPlaceholder/jsonplaceholder.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css'],
})
export class JsonComponent implements OnInit {
  isPressed: boolean = true;
  postId: number = 0;

  data: Array<any>;

  constructor(private JSONPlaceHolder: JsonplaceholderService) {
    this.data = new Array<any>();
  }

  ngOnInit(): void {}

  getDataFromApi() {
    this.JSONPlaceHolder.getData().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.isPressed = false;
    });
  }

  getSinglePostData(postId: number) {
    this.JSONPlaceHolder.getSinglePostData(postId).subscribe((data) => {
      console.log(data);
      this.data.length = 0;
      this.data.push(data);
      this.isPressed = !this.isPressed;
    });
  }
}
