import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { Card } from '../interfaces/schema.interface';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {card: Card, edit: boolean},
    private dialogRef: MatDialogRef<CardDialogComponent>,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const card = this.data && this.data.card ? this.data.card : null;
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      creationTime: [new Date()]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

}
