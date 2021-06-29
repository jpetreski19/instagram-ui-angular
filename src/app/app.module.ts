import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoDetailComponent } from './photos/photo-detail.component';
import { PhotoDetailGuard } from './photos/photo-detail.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPhotoComponent } from './add-photo/add-photo-component.component';
import { UpdatePhotoComponent } from './update-photo/update-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailComponent,
    AddPhotoComponent,
    UpdatePhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'photos', component: PhotosComponent },
      {
        path: 'photos/add/:userId/:albumId',
        component: AddPhotoComponent
      },
      {
        path: 'photos/update/:userId/:albumId/:photoId',
        component: UpdatePhotoComponent
      },
      {
        path: 'photos/:userId/:albumId/:id', 
        canActivate: [PhotoDetailGuard],
        component: PhotoDetailComponent
      },
      { path: '', redirectTo: 'photos', pathMatch: 'full' },
      { path: '**', redirectTo: 'photos', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
