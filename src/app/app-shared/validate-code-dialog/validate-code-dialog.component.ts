import {Component, OnInit} from '@angular/core';
import {AppState, loadPermission} from '../../store';
import {Store} from '@ngrx/store';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-validate-code-dialog',
  templateUrl: './validate-code-dialog.component.html',
  styleUrls: ['./validate-code-dialog.component.css']
})
export class ValidateCodeDialogComponent implements OnInit {
  public saveCode: string = '';

  constructor(private store: Store<AppState>, private ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
  }

  public validateCode() {
  }

}
