import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../user/photo';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.css']
})
export class UpdatePhotoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  photo: Photo | undefined;
  newPhoto: Photo | undefined;
  errorMessage = "";
  postError = false;
  postErrorMessage = "";
  userId = -1;

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('albumId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    const photoId = Number(this.route.snapshot.paramMap.get('photoId'));

    this.userService.getPhotoAPI(photoId, albumId).subscribe({
      next: photo => {
        this.photo = photo;
        this.newPhoto = photo;
      },
      error: err => this.errorMessage = err
    });
  }

  onHttpError(errorResponse: any) {
    console.log(errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.newPhoto) {
        this.userService.updatePhotoAPI(this.newPhoto);
        const url = '/photos/' + this.userId + '/' + this.newPhoto.albumId + '/' + this.newPhoto.id;
        this.router.navigate([url]);
      } else {
        this.postError = true;
        this.postErrorMessage = "Invalid input";
      }
    } else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
  }


}
