import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Media } from 'src/app/utilities/models/media';
import { MediaService } from '../../media.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
})
export class MediaCardComponent implements OnInit, OnDestroy {
  @Input() media: Media;
  imageError: boolean = false;
  editMode: boolean = false;
  titleInput: FormControl;
  unsubscribeAll: Subject<void> = new Subject();
  disableNavigation: boolean = false;

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleInput = new FormControl(this.media.Title);
    this.titleInput.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.media.Title = value;
        this.mediaService.updateMedia(this.media);
      });
  }

  imgError(event, title) {
    event.target.style.display = 'none';
    this.imageError = true;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  navigateToMedia(imdbID: string): void {
    !this.disableNavigation && this.router.navigate([`media/${imdbID}`]);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
