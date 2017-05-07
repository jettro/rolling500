import {Album} from "./album";
import {KeyValuePair} from "./KeyValuePair";

export class SearchResponse {
  totalNumberOfResults: number = 0;
  foundAlbums: Array<Album>;
  artists: Array<KeyValuePair>;
  labels: Array<KeyValuePair>;
}
