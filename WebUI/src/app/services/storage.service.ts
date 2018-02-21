import { Injectable, HostListener } from '@angular/core';
import { TodoItem } from '../models/todo-item';

import { Subject, Observable } from "rxjs";

@Injectable()
export class StorageService {

  private StorageChangedEvent = new Subject();
  public OnStorageChanged: Observable<{}>;

  constructor()
  {
    this.Configure();
  }

  private Configure()
  { 
    window.addEventListener('storage', () => { this.PushChange(); console.log("Storage Changed!") });
    this.OnStorageChanged = this.StorageChangedEvent.asObservable();
  }

  public PushChange(): void
  { 
    this.StorageChangedEvent.next();
  }
  
  HasItems(): boolean
  { 
    return this.GetAll().length > 0;
  }

  GetAll(): TodoItem[]
  { 
    var allKeys = this.FindAllTodoItems();
    var allItems = new Array<TodoItem>();
    allKeys.forEach(element => {
      allItems.push(new TodoItem(element));
    });

    return allItems;
  }

  RemoveAll(): number
  { 
    // Find all items that are of type ToDoItem and remove them
    var keysToDelete = this.FindAllTodoItems();

    keysToDelete.forEach(element => {
      localStorage.removeItem(element);
    });


    return keysToDelete.length;
  }

  private FindAllTodoItems(): string[]
  { 
    var allKeys = new Array<string>();
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      allKeys.push(key);
    }

    var todoKeys = allKeys.filter(data =>
    {
      if (data.startsWith("Todo-Item-"))
      { 
        return data;
      }
    });

    return todoKeys;
  }
}
