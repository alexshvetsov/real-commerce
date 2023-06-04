import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaService } from '../../media.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, filter, debounceTime, takeUntil, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTerm: FormControl = new FormControl('');
  unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.mediaService.setSearchTerm(searchTerm);
      });
  }

  changeSortDirection(): void {
    this.mediaService.setSortDirection();
  }

  clear(): void {
    this.searchTerm.setValue('');
  }

  refreshResults(): void {
    this.mediaService.refreshResults();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
  }
}
