import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Album } from './album';
import { Photo } from './photo';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "api/user/user.json";

  constructor(private http: HttpClient) { }

  getAlbumsAPI(userId: number): Observable<Album[]> {
    this.URL = "https://jsonplaceholder.typicode.com/users/" + userId + "/albums";
    // console.log(this.URL);

    return this.http.get<Album[]>(this.URL).pipe(
      tap(data => console.log("All: ", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPhotosAPI(albumId: number): Observable<Photo[]> {
    this.URL = "https://jsonplaceholder.typicode.com/albums/" + albumId + "/photos";
    // console.log(this.URL);

    return this.http.get<Photo[]>(this.URL).pipe(
      tap(data => console.log("All: ", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPhotoAPI(id: number, albumId: number): Observable<Photo | undefined> {
    return this.getPhotosAPI(albumId).pipe(
      map((photos: Photo[]) => photos.find(p => p.id === id))
    );
  }

  getUserAPI(userId: number): Observable<User> {
    this.URL = "https://jsonplaceholder.typicode.com/users/" + userId;
    // console.log(this.URL);
    
    return this.http.get<User>(this.URL).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePhotoAPI(id: number): void {
    this.URL = "https://jsonplaceholder.typicode.com/photos/" + id;
    fetch(this.URL, {
      method: 'DELETE',
    });
  }

  addPhotoAPI(photo: Photo): void {
    fetch('https://jsonplaceholder.typicode.com/photos', {
      method: 'POST',
      body: JSON.stringify({
        title: photo.title,
        albumId: photo.albumId,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  updatePhotoAPI(photo: Photo): void {
    const URL = 'https://jsonplaceholder.typicode.com/photos/' + photo.id;
    fetch(URL, {
      method: 'PUT',
      body: JSON.stringify({
        id: photo.id,
        title: photo.title,
        albumId: photo.albumId,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
}
