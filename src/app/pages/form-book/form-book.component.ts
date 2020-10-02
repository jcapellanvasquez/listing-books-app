import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css'],
  providers: [MessageService]
})
export class FormBookComponent implements OnInit {

  public uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private router: Router) {
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

}
