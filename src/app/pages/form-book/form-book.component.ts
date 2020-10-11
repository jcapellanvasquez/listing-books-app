import {Component, OnInit, ViewChild} from '@angular/core';
import {Message, MessageService, SelectItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {BookActions, loadBookAction} from '../../store/actions';
import {getFailureMessage, getSelectedBook, getSuccessMessage} from '../../store/selectors';
import {Book} from '../../models/book';
import {FileUpload} from 'primeng/fileupload';
import {QueryType} from '../../models/query';
import {Observable} from 'rxjs';
import {DataService} from '../../app-shared/data.service';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
})
export class FormBookComponent implements OnInit {
  public form: FormGroup;
  public formTitle = 'Agregar un nuevo libro';
  public book$: Observable<Book>;
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
  public blob: Blob = new Blob();

  @ViewChild('files') files: FileUpload;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activeRoute: ActivatedRoute,
    private db: DataService
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
    this.activeRoute.paramMap.subscribe(params => {
      this.store.dispatch(loadBookAction({query: {field: 'id', value: params.get('id'), type: QueryType.Filter}}));
      this.book$ = this.store.select(getSelectedBook);
    });

    this.store.select(getSuccessMessage).subscribe(message => {
      if (message) {
        this.form.reset();
        this.form.patchValue({
          lang: 'es'
        });
        this.files.clear();
        this.messageService.clear();
        this.successMessage.detail = message;
        this.messageService.add(this.successMessage);
      }
    });

    this.store.select(getFailureMessage).subscribe(message => {
      if (message) {
        this.messageService.clear();
        this.failureMessage.detail = message;
        this.messageService.add(this.failureMessage);
      }
    });

    this.book$.subscribe(book => {
      this.formTitle = 'Editar libro';
      this.form.patchValue({...book});
    });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  public removeFile() {
    this.uploadedFiles = [];
  }

  public hasSelectedImage(): boolean {
    return this.notImageSelected = this.uploadedFiles.length === 0;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  save() {
    if (this.form.valid && !this.hasSelectedImage()) {
      let file = this.uploadedFiles[0];
      let createdDate = new Date();
      let book: Book = {
        ...this.form.value,
        img: '',
        imageFile: {file: file, name: file.name},
        createdDate: createdDate.toISOString(),
        title: (<string> this.title.value).toLowerCase(),
        synopsis: (<string> this.synopsis.value).toLowerCase(),
        author: (<string> this.author.value).toLowerCase(),
      };
      this.store.dispatch(BookActions.addBookAction({book: book}));
    } else {
      this.title.markAsTouched();
      this.synopsis.markAsTouched();
      this.form.markAsTouched();
    }
  }

  get title() {
    return this.form.get('title');
  }

  get synopsis() {
    return this.form.get('synopsis');
  }

  get author() {
    return this.form.get('author');
  }

  get img() {
    return this.form.get('img');
  }
}
