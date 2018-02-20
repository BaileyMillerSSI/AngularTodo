import { StorageService } from "../services/storage.service";

/// A way of storing information about an item that needs to be completed
export class TodoItem 
{
    private _key: string;


    public status: boolean = false;
    public title: string;

    constructor(key: string)
    { 
        this._key = key;
        this.LoadData();
    }

    public static CreateItem(title: string, status: boolean = false): TodoItem
    { 
        var tempData = {
            title: title,
            status: status
        } as TodoItem;

        var key = "Todo-Item-" + (localStorage.length+1);
        localStorage.setItem(key, JSON.stringify(tempData));

        return new TodoItem(key);
    }

    private LoadData(): void
    { 
        var data = localStorage.getItem(this._key);
        if (data != null && data.length != 0)
        { 
            var tempData = JSON.parse(data) as TodoItem;
            this.status = tempData.status;
            this.title = tempData.title;
        }    
    }
    
    public ChangeTitle(newTitle: string): void
    { 
        this.title = newTitle;
        
        this.Update();
    }

    public ChangeStatus(newStatus: boolean): void
    { 
        this.status = newStatus;
        this.Update();
    }

    public ToggleStatus(): void
    { 
        this.ChangeStatus(!this.status);
    }

    public GetKey(): string
    { 
        return this._key;
    }

    public GetTitle(): string
    { 
        return this.title;
    }

    private Update(): void
    { 
        // Just reload this item into localStorage
        localStorage.setItem(this.GetKey(), JSON.stringify(this));
    }

    public Delete(): void
    { 
        localStorage.removeItem(this.GetKey());
    }
}
