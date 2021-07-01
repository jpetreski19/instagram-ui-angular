import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../user/photo';
import { User } from '../user/user';
import { UserService } from '../user/user.service';


@Component({
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  pageTitle = "Photo detail";
  errorMessage = "";
  photo: Photo | undefined;
  user: User | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const albumId = Number(this.route.snapshot.paramMap.get('albumId'));
    const userId = Number(this.route.snapshot.paramMap.get('userId'));

    if (id && albumId && userId) {
      this.getUser(userId);
      this.getPhoto(id, albumId);
    }
  }

  getPhoto(id: number, albumId: number): void {
    this.userService.getPhotoAPI(id, albumId).subscribe({
      next: photo => this.photo = photo,
      error: err => this.errorMessage = err
    });
  }

  getUser(id: number): void {
    this.userService.getUserAPI(id).subscribe({
      next: user => this.user = user,
      error: err => this.errorMessage = err
    })
  }

  onBack(): void {
    this.router.navigate(['/photos']);
  }

  onDelete(): void {
    if (this.photo) {
      // Prompt a confirmation dialog

      if(confirm("Are you sure to delete this photo?")) {
        this.userService.deletePhotoAPI(this.photo.id);
        this.router.navigate(['/photos']);
      } 
    }
  }

  onUpdate(): void {
    if (this.photo) {
      this.router.createUrlTree(['/photos/update', {myPhoto: JSON.stringify(this.photo)}]);
      console.log("Done");
    }
  }


}
