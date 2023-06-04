import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MediaResponse } from 'src/app/utilities/models/media-response';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, tap, takeUntil, map } from 'rxjs/operators';
import { MediaService } from '../media.service';
import { MediaType } from 'src/app/utilities/models/media-type';
import { Media } from 'src/app/utilities/models/media';

@Component({
  selector: 'app-media-main-grid',
  templateUrl: './media-main-grid.component.html',
  styleUrls: ['./media-main-grid.component.scss'],
})
export class MediaMainGridComponent implements OnInit, OnDestroy {
  mediaResponse: MediaResponse;
  shownMedia: Media[] = [];
  mediaTypes: MediaType[] = [];
  isVerticalLayout$: Observable<boolean>;
  flexAlignment = {
    row: {
      fxLayout: 'row',
      fxLayoutAlign: 'start center',
    },
    column: {
      fxLayout: 'column',
      fxLayoutAlign: 'center start',
    },
  };
  unsubscribeAll: Subject<void> = new Subject<void>();
  error: any;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.configureMediaSortingAndFiltering();
    this.isVerticalLayout$ = this.mediaService.getIsVerticalLayoutAsObs();
  }

  configureMediaSortingAndFiltering(): void {
    combineLatest([
      this.mediaService.getChosenMediaTypeAsObs(),
      this.mediaService.getSortDirectionAsObs(),
      this.mediaService.getAllMedia(),
      this.mediaService.getSearchTermAsObs(),
    ])
      .pipe(
        takeUntil(this.unsubscribeAll),
        map(([chosenMediaType, isSortAsc, mediaResponse, searchTerm]) => {
          this.initializeMediaResponse(mediaResponse);
          let filteredMedia = this.filterByMediaType(chosenMediaType);
          this.sortAndFilterBySearchTerm(filteredMedia, isSortAsc, searchTerm);
        })
      )
      .subscribe();
  }

  initializeMediaResponse(mediaResponse: MediaResponse): void {
    if (!this.mediaResponse) {
      this.mediaResponse = mediaResponse;
      this.shownMedia = mediaResponse.results;
      this.createMediaTypes(mediaResponse);
    }
  }

  filterByMediaType(chosenMediaType: string): Media[] {
    let filteredMedia = this.mediaResponse?.results || [];
    if (chosenMediaType !== 'All') {
      filteredMedia = filteredMedia.filter(
        (media) => media.Type === chosenMediaType
      );
    } else {
      filteredMedia = this.mediaResponse.results;
    }
    return filteredMedia;
  }

  sortAndFilterBySearchTerm(
    mediaArray: Media[],
    isSortAsc: boolean,
    searchTerm: string
  ): void {
    this.shownMedia = this.sortMedia(mediaArray, isSortAsc);
    if (searchTerm) {
      this.shownMedia = this.shownMedia.filter(
        (media) =>
          media.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          media.Year.toLowerCase().includes(searchTerm)
      );
    }
  }

  createMediaTypes(mediaResponse: MediaResponse): void {
    mediaResponse.results.forEach((media) => {
      const isMediaTypeInArray = this.mediaTypes.find(
        (mediaType) => mediaType.type === media.Type
      );
      if (isMediaTypeInArray) {
        isMediaTypeInArray.count += 1;
      } else {
        this.mediaTypes.push({ type: media.Type, count: 1 });
      }
    });
    this.mediaTypes.push({ type: 'All', count: mediaResponse.totalResults });
  }

  sortMedia(mediaArray: Media[], ascending: boolean): Media[] {
    const copiedArray = [...mediaArray];
    return copiedArray.sort((media1, media2) => {
      const titleA = media1.Title.toUpperCase();
      const titleB = media2.Title.toUpperCase();
      if (titleA < titleB) {
        return ascending ? -1 : 1;
      }
      if (titleA > titleB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
