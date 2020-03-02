import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  blog; //blog service will get the blog for deletion
  url;

  constructor(
    private location: Location,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deletePost() {
    this.blogService.deletePost(this.url.id).subscribe(data => {
      if(!data.success) {
        //put some alerts here!
      }
      else {
        //alerts here for buttons maybe
        setTimeout(() => {
          this.router.navigate(['/blog']);
        }, 2000);
      }
    });
  }

  backClick() {
    this.location.back();
  }

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.params;

    this.blogService.getPostById(this.url.id).subscribe(data => {
      this.blog = data.blog;
    });
  }

}
