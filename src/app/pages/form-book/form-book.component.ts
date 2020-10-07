import {Component, OnInit, ViewChild} from '@angular/core';
import {Message, MessageService, SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {BookActions} from '../../store/actions';
import {getFailureMessage, getSuccessMessage} from '../../store/selectors';
import {Book} from '../../models/book';
import {FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
})
export class FormBookComponent implements OnInit {
  public form: FormGroup;
  public uploadedFiles: any[] = [];
  private successMessage: Message = {
    severity: 'success',
    summary: 'Registro exitoso',
    detail: 'EL libro fue creado con exito.',
    life: 1000
  };
  private failureMessage: Message = {severity: 'error', summary: 'Registro fallido', detail: 'EL libro no pudo ser creado.', life: 1000};
  public notImageSelected: boolean = false;
  public languages: SelectItem[];

  @ViewChild('files') files: FileUpload;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.languages = [
      {label: 'Español', value: 'es'},
      {label: 'Inglés', value: 'en'},
    ];

    this.form = this.fb.group({
      title: ['', Validators.required],
      author: [''],
      synopsis: ['', Validators.required],
      lang: ['es']
    });
  }

  ngOnInit(): void {
    this.messageService.clear();

    this.store.select(getSuccessMessage).subscribe(message => {
      if (message) {
        this.form.reset();
        this.form.patchValue({
          lang: 'es'
        });
        this.files.clear();
        this.successMessage.detail = message;
        this.messageService.add(this.successMessage);
      }
    });

    this.store.select(getFailureMessage).subscribe(message => {
      if (message) {
        this.failureMessage.detail = message;
        this.messageService.add(this.failureMessage);
      }
    });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.notImageSelected = this.uploadedFiles.length === 0;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  save() {
    if (this.form.valid && !this.notImageSelected) {
      let file = this.uploadedFiles[0];
      let book: Book = {...this.form.value, img: '', imageFile: {file: file, name: file.name}};
      this.store.dispatch(BookActions.addBookAction({book: book}));
    } else {
      this.title.markAsTouched();
      this.synopsis.markAsTouched();
      this.notImageSelected = this.uploadedFiles.length === 0;
    }
  }

  get title() {
    return this.form.get('title');
  }

  get synopsis() {
    return this.form.get('synopsis');
  }

  get img() {
    return this.form.get('img');
  }
}
