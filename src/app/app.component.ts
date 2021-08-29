import { Component } from '@angular/core';
import { List, Card } from './interfaces/schema.interface';
import { ListsService } from './lists.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trello-board';
  lists: List[] = [];

  constructor(private _listService: ListsService, private _dialog: MatDialog) {
    if (localStorage.getItem('lists')) {
      this.lists = JSON.parse(localStorage.getItem('lists'));
    } else {
      this.lists = this._listService.getLists();
    }
  }

  listIds(): string[] {
    return this.lists.map(list => list.title);
  }

  addList() {
    this.lists.push({
      title: 'Enter title',
      cards: []
    });
    this.saveData();
  }

  deleteList(title) {
    this.lists = this.lists.filter(list => list.title != title);
    this.saveData();
  }

  deleteCard(card, list) {
    list.cards.splice(list.cards.indexOf(card), 1);
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  addEditCard(card: Card, list: List, edit = false) {
    this._dialog.open(CardDialogComponent, {data: {card, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newCardData => {
        if (newCardData) {
          list.cards? list.cards.unshift(newCardData): list.cards = [newCardData];
        }
        this.saveData();
      });
  }

  onCardDrop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data == undefined) {
        event.container.data = [];
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    event.container.data.sort((a, b) => {
      let keyA = new Date(a.creationTime),
      keyB = new Date(b.creationTime);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
    });
    this.saveData();
  }

  saveData() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }
}
