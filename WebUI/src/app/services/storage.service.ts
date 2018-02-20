import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';

@Injectable()
export class StorageService {

  constructor()
  {

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
