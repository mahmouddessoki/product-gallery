import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  searchText = signal('')
  constructor() { }
}
