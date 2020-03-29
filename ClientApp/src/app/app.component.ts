import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Post } from './post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'

  // Interface
  //posts: Observable<Post[]>;

  posts: Observable<any>;
  newPost: Observable<any>;


  constructor(private http: HttpClient) { }

  getPosts() {
    let params = new HttpParams().set('userId', '1');


    // Interface
    //this.posts = this.http.get<Post[]>(this.ROOT_URL + '/posts');

    this.posts = this.http.get<Post[]>(this.ROOT_URL + '/posts', { params } );
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





}
