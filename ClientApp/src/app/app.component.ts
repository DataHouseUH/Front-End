import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { Post } from './post';
import { Observable } from 'rxjs';

const material = [
  MatGridListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  readonly ROOT_URL2 = 'http://127.0.0.1/api/v1/kiosk-check-in'
  // Interface
  //posts: Observable<Post[]>;

  posts: Observable<any>;
  newPost: Observable<any>;


  constructor(private http: HttpClient) { }

  getPosts() {
    let params = new HttpParams().set('userId', '1');


    // Interface
    //this.posts = this.http.get<Post[]>(this.ROOT_URL + '/posts');

    this.posts = this.http.get(this.ROOT_URL + '/posts', { params });
  }

  createPost() {
    const data: Post = {
      id: null,
      userId: 23,
      title: 'My New Post',
      body: 'Hello World!'
    }

    this.newPost = this.http.post(this.ROOT_URL + '/posts', data)

  }

  createTestPost() {

    this.newPost = this.http.post(this.ROOT_URL2, '')

  }





}
