import { sortTypes } from "../enums/sort.enum"

export interface SortOption {
  id: string
  value: sortTypes
  checked: boolean
  label: string
  field: string

}
