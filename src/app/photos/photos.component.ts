import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Photo } from '../user/photo';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  title = 'MyProject';
  errorMessage = "";
  sub!: Subscription;
  user!: User;

  // Hard code the user and album ids due to the way
  // the api is designed (photos are not directly related to users).
  userId = 5;
  albumId = 50;
  photos: Photo[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.getPhotos();

    /** Code below fetches all albums created by a user */
    // this.sub = this.userService.getAlbumsAPI(this.userId).subscribe({
    //   next: albums => {
    //     this.albums = albums;
    //     this.getPhotos();
    //   },
    //   error: err => {
    //     this.errorMessage = err;
    //   }
    // });

    /** Code below is used to get photos from */
    // json file format as api/user/user.json.
    // this.sub = this.userService.getUser().subscribe({
    //   next: user => {
    //     this.user = user;
    //     this.posts = this.userService.getPosts(user);
    //   },
    //   error: err => {
    //     this.errorMessage = err;
    //   }
    // })

    /** Code below is used to get photos from */
    // json file format as api/posts/posts.json.
    // this.sub = this.postService.getPosts().subscribe({
    //   next: posts => {
    //     this.posts = posts;
    //   },
    //   error: err => {
    //     this.errorMessage = err;
    //   }
    // });
  }

  getUser(): void {
    this.sub = this.userService.getUserAPI(this.userId).subscribe({
      next: user => {
        this.user = user;
        // console.log(this.user);
      },
      error: err => {
        this.errorMessage = err;
      }
    })
  }

  getPhotos(): void {
    this.sub = this.userService.getPhotosAPI(this.albumId).subscribe({
      next: photos => {
        this.photos = photos;
        // console.log(this.photos.length);
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
