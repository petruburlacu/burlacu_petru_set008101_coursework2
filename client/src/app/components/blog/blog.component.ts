import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  refreshing = false;
  form;
  postState = false;
  author;
  blogFeed;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private blogService: BlogService
  ) {
  }

  newBlogPostClick() { //using the form builder to build a new blog Post
    this.form = this.formBuilder.group({
      title: '',
      body: '',
      author: ''
    });
    this.postState = true;
  }

  refreshBlogFeed() {
    this.refreshing = true;
    this.getBlogFeed();
    //Gets all blogs
    setTimeout(() => {
    this.refreshing = false;
    }, 3000);
  }

  backToFeed() {
    window.location.reload();
  }

  onNewBlogPostSubmit() {
    this.refreshing = true;

    this.form.get('title').disable();
    this.form.get('body').disable();

    const blog = {
      title: this.form.get('title').value,
      body:   this.form.get('body').value,
      author: this.author
    }//end blog obj
    this.blogService.newBlog(blog).subscribe(data => {
    if(!data.success) {

      this.refreshing = false;
      this.form.get('title').enable();
      this.form.get('body').enable();
    }
    else {
      //everytime a new post is created => refresh the blog feed
      this.getBlogFeed();

      setTimeout(() => {
        this.postState = false;
        this.refreshing = false;
        this.form.reset();
        this.form.get('title').enable();
        this.form.get('body').enable();
      }, 2000);
    }
  });
    console.log('Post Submitted: ', this.author);
  }//end submit function

  getBlogFeed() {
    this.blogService.getBlogFeed().subscribe(data => {
      console.log(data);
      console.log(data.blog);
      this.blogFeed = data.blog; // ------------------------------------------
    }); //getting blog feed of all posts
  }
  ngOnInit() {
    //get username
    this.authenticationService.getUserDetails().subscribe(profile => {
      this.author = profile.user.username;
    });
    //get blog feed on startup
    this.getBlogFeed();
  }

}
