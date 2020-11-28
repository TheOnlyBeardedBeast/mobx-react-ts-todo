import { action, computed, observable, makeObservable } from "mobx";
import { ITodoItem } from "./types";
import React from "react";

export class TodoStore {
  constructor() {
    makeObservable(this);
  }

  @observable protected _todoItems: ITodoItem[] = [
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

  @computed public get todoItems(): ITodoItem[] {
    return this._todoItems;
  }

  public set todoItems(v: ITodoItem[]) {
    this._todoItems = v;
  }

  @computed public get sortedTodoItems(): ITodoItem[] {
    return this.todoItems.sort((a, b) => a.id - b.id);
  }

  @observable protected _itemToEdit?: ITodoItem;

  public get itemToEdit(): ITodoItem | undefined {
    return this._itemToEdit;
  }

  public set itemToEdit(v: ITodoItem | undefined) {
    this._itemToEdit = v;
  }

  @action addItem(todoContent: string) {
    if (this.itemToEdit) {
      this.itemToEdit!.content = todoContent;
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
    const indexToRemove = this._todoItems.findIndex(
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
