import { Injectable } from '@angular/core';
import { List } from './interfaces/schema.interface';
import * as SAMPLE_DATA from '../assets/sample.json';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  private lists: List[] = (SAMPLE_DATA as any).default;

  getLists(): List[] {
    return this.lists;
  }
}
