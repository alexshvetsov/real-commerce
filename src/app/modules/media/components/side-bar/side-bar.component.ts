import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../media.service';
import { MediaType } from 'src/app/utilities/models/media-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() mediaTypes: MediaType[] = [];
  chosenMediaType$: Observable<string>;
  constructor(private mediaService: MediaService) {

  }

  ngOnInit(): void {
    this.chosenMediaType$ = this.mediaService.getChosenMediaTypeAsObs();
  }

  changeMediaType(mediaType: MediaType):void {
    this.mediaService.setChosenMediaType(mediaType.type);
  }

  changeViewDisplay():void {
    this.mediaService.setIsVerticalLayout();
  }
}
