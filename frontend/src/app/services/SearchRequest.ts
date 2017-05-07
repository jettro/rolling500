import {FilterRequest} from "./FilterRequest";
export class SearchRequest {
  searchString: string;
  page: number;
  size: number;
  filters: Array<FilterRequest>;
}
