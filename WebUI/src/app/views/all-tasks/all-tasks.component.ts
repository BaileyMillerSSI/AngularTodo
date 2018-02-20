import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { TodoItem } from '../../models/todo-item';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  constructor(public _storage: StorageService)
  {
    
  }

  ngOnInit() {
  }

  AllItems(): TodoItem[]
  { 
    return this._storage.GetAll();
  }

  RemoveAll(): void
  { 
    this._storage.RemoveAll();
  }

  AddNew(): void
  { 
    var title = prompt("Please enter title");
    if (title != null)
    { 
      TodoItem.CreateItem(title);
    }  
  }

}
