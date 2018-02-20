import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { TodoItem } from './models/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _Storage: StorageService)
  {
    
  }
}
