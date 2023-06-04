import { Pipe, PipeTransform } from '@angular/core';
import { MediaType } from '../models/media-type';

@Pipe({
  name: 'displayMediaType',
})
export class DisplayMediaTypePipe implements PipeTransform {
  transform(mediaType: MediaType | string, mediaTypes?: MediaType[]): unknown {
    if (!mediaType) return '';

    if(typeof mediaType === 'string') {
      const allMediaTypes = mediaTypes.reduce((acc, mediaType) => {return acc+= mediaType.count},0);
      return `All (${allMediaTypes})`;
    }

    return `${mediaType.type} (${mediaType.count})`;
  }
}
