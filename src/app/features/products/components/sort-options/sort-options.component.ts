import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as sortActions from "@sort/sort.actions";
import { sortTypes } from '../../enums/sort.enum';
import { SortOption } from '../../models/sort-options';
@Component({
  selector: 'app-sort-options',
  imports: [],
  templateUrl: './sort-options.component.html',
  styleUrl: './sort-options.component.css'
})
export class SortOptionsComponent {
  sortOptions:SortOption[] = [
    {
      id: "A-Z",
      value: sortTypes.ASC,
      checked: false,
      label:"by title (a-z)",
      field:"title"
    },
    {
      id: "Z-A",
      value: sortTypes.DESC,
      checked: false,
      label:"by title (z-a)",
      field:"title"


    },
    {
      id: "low-high",
      value: sortTypes.ASC,
      checked: false,
      label:"by price (low to high)",
      field:"price"


    },
    {
      id: "high-low",
      value: sortTypes.DESC,
      checked: false,
      label:"by price (high to low)",
      field:"price"


    },
  ];
  isDropped= false;
  private _store = inject(Store)
  constructor(){}


  clearSort(){
    this._store.dispatch(sortActions.clearSort())
  }
  onSortChange(option: SortOption) {
    // Uncheck all options first
    this.sortOptions.forEach(opt => opt.checked = false);
    // Check the selected one
    option.checked = true;

    if (option.field === 'title') {
      this.sortByTitle(option.value);
    } else {
      this.sortByPrice(option.value);
    }
    }
  sortByTitle(type:sortTypes) {
    this._store.dispatch(sortActions.sortByTitle({
      sType: type
    }))


  }
  sortByPrice(type:sortTypes) {
    this._store.dispatch(sortActions.sortByPrice({
      sType: type
    }))

  }



}
