import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MediaResponse } from 'src/app/utilities/models/media-response';
import { Media } from 'src/app/utilities/models/media';
@Injectable({
  providedIn: 'root',
})
export class MediaService {
  isVerticalLayout$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  chosenMediaType$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'All'
  );
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isSortAsc$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private refreshMedia$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<MediaResponse> {
    return this.refreshMedia$.pipe(
      startWith({}),
      switchMap(() =>
        this.http.get<MediaResponse>('assets/data/media-response.json')
      )
    );
  }

  getItem(imdbID: string): Observable<Media> {
    return this.http
      .get<MediaResponse>(`assets/data/media-response.json/`)
      .pipe(
        map((mediaResponse: MediaResponse) => {
          return mediaResponse.results.find(
            (media: Media) => media.imdbID === imdbID
          );
        })
      );
  }

  updateMedia(media: Media): void {
    this.http
      .put('assets/data/media-response.json', media)
      .subscribe((media) => {
        console.log(media);
      });
  }

  refreshResults(): void {
    this.refreshMedia$.next();
  }

  getIsVerticalLayoutAsObs(): Observable<boolean> {
    return this.isVerticalLayout$.asObservable();
  }

  setIsVerticalLayout(): void {
    const isVerticalLayout = this.isVerticalLayout$.getValue();
    this.isVerticalLayout$.next(!isVerticalLayout);
  }

  getChosenMediaTypeAsObs(): Observable<string> {
    return this.chosenMediaType$.asObservable();
  }

  setChosenMediaType(chosenMediaType: string): void {
    this.chosenMediaType$.next(chosenMediaType);
  }

  getSortDirectionAsObs(): Observable<boolean> {
    return this.isSortAsc$.asObservable();
  }

  setSortDirection(): void {
    const isSortAsc = this.isSortAsc$.getValue();
    this.isSortAsc$.next(!isSortAsc);
  }

  getSearchTermAsObs(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }
}
