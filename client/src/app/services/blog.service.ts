import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Http, Headers, RequestOptions } from '@angular/http';

//Service Created to communicate with the route on the back end
@Injectable()
export class BlogService {

  setting;
  domain = this.authenticationService.domain;

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) { }

  authenticationHeaders() { //calling this function in order to attach the headers
    //loading token
    this.authenticationService.authenticationToken;

    this.setting = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authentication': this.authenticationService.authenticationToken
      })
    });
  }

  getBlogFeed() { //subscribe in blog component
    this.authenticationHeaders();
    //get request
    return this.http.get(this.domain + 'blog/blogFeed', this.setting).map(res => res.json());
  }

  newBlog(blog) {
    this.authenticationHeaders();
    return this.http.post(this.domain + 'blog/newBlog', blog, this.setting).map(res => res.json());
  }

  getPostById(id) {
    this.authenticationHeaders();
    return this.http.get(this.domain + 'blog/post/' + id, this.setting).map(res => res.json());
  }

  updatePost(blog) {
    this.authenticationHeaders();
    return this.http.put(this.domain + 'blog/updatePost/', blog, this.setting).map(res => res.json());
  }

  deletePost(id) {
    this.authenticationHeaders();
    return this.http.delete(this.domain + 'blog/deletePost/' + id, this.setting).map(res => res.json());
  }
}
