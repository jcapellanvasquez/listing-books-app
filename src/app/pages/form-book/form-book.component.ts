import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {BookActions} from '../../store/actions';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
  providers: [MessageService]
})
export class FormBookComponent implements OnInit {
  public form: FormGroup;
  public uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      autor: [''],
      sinopsis: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'Imagen cargada con exito', detail: ''});
  }

  goBack() {
    this.router.navigate(['/']);
  }

  save() {
    console.log(this.form)
    if (this.form.valid) {
      this.store.dispatch(BookActions.addBookAction({book: this.form.value}));
    }
  }
}
