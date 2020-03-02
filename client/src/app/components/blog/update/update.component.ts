import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//using the Activated Route to grab the id from the url
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  url; //storing the post url
  blog; //storing blog obj

  constructor(
    private location: Location,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }//end constructor

  updateBlogClick() {
    //submit form
    //updating the blog
    this.blogService.updatePost(this.blog).subscribe(data =>{
    // Check if PUT request was a success or not
      if(!data.success) {
        console.log("PUT REQUEST UNSUCCESSFUL!");
      }
      else {
        console.log("PUT REQUEST SUCCESSFUL!");

        // navigate back with a delay
        setTimeout(() => {
          this.router.navigate(['/blog']); //route for navigation
        }, 2000);
      }
    });//end subscribe()
  }//end updateBlockClick()

//using angular location to go to previous page
  backClick() {
    this.location.back();
  }//end backClick

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.params; //grabs the id when the component loads
    //retrieves the blog post by id
    this.blogService.getPostById(this.url.id).subscribe(data => {
      this.blog = data.blog;
    });
  }//end ngOnInit

}
