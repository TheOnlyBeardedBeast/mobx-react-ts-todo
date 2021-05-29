import { action, computed, observable, makeObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { ITodoItem } from "./types";
import React from "react";

export class TodoStore {
  constructor() {
    makeObservable(this);

    makePersistable(this, {
      name: "TodoStore",
      properties: ["todoItems"],
      storage: localStorage
    });
  }

  @observable public todoItems: ITodoItem[] = [
    {
      id: 1,
      content: "Ditch redux",
      done: true,
    },
    {
      id: 2,
      content: "Learn MobX",
      done: false,
    },
  ];

  @action public  setTodoItems = (v: ITodoItem[]) => {
    this.todoItems = v;
  }

  @computed public get sortedTodoItems(): ITodoItem[] {
    return this.todoItems.slice().sort((a, b) => a.id - b.id);
  }

  @observable public itemToEdit?: ITodoItem;

  @action public setItemToEdit = (v: ITodoItem | undefined)  => {
    this.itemToEdit = v;
  }

  @action addItem(todoContent: string) {
    if (this.itemToEdit) {
      this.itemToEdit.content = todoContent;
      this.itemToEdit = undefined;
      return;
    }

    this.todoItems.push({
      id: Date.now(),
      content: todoContent,
      done: false,
    });
  }

  @action toggleState = (item: ITodoItem) => {
    item.done = !item.done;
  };

  @action public removeItem(item: ITodoItem) {
    const indexToRemove = this.todoItems.findIndex(
      (todo) => todo.id === item.id
    );

    this.todoItems.splice(indexToRemove, 1);
  }

  @action public setEditItem(item: ITodoItem) {
    this.itemToEdit = item;
  }
}

const rootStore = { todoStore: new TodoStore() };

const TodoStoreContext = React.createContext(rootStore);
export const useStores = () => React.useContext(TodoStoreContext);
