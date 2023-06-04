import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from '../media.service';
import { Media } from 'src/app/utilities/models/media';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss'],
})
export class MediaItemComponent implements OnInit {
  media: Media;
  imdbID: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.imdbID = this.route.snapshot.paramMap.get('id');

    if (!this.imdbID) {
      this.router.navigate(['media']);
    }
    this.mediaService.getItem(this.imdbID).subscribe((media: Media) => {
      this.media = media;
    });
  }

  goBack(): void {
    this.router.navigate(['media']);
  }
}
