import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../user/photo';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-add-photo-component',
  templateUrl: './add-photo-component.component.html',
  styleUrls: ['./add-photo-component.component.css']
})
export class AddPhotoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  // Keeps the original settings. The id is set to a junk value as new id is given.
  originalFields: Photo = {
    albumId: 50,
    id: -1,
    title: "",
    url: "",
    thumbnailUrl: ""
  }

  postError = false;
  postErrorMessage = "";
  subscriptionTypes!: Observable<string[]>;
  fields: Photo = { ...this.originalFields };

  albumId = 50;
  userId = 5;


  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('albumId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    console.log(this.albumId);
    console.log(this.userId);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.userService.addPhotoAPI(this.fields);
      this.router.navigate(['/photos']);
    } else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
  }

  onHttpError(errorResponse: any) {
    console.log(errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}
