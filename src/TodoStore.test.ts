import { TodoStore } from "./TodoStore";

describe("TodoStore test", () => {
  let store: TodoStore;

  test("creates a new todoStore", () => {
    store = new TodoStore();

    expect(store).not.toBeNull();
  });

  test("check todo item count", () => {
    expect(store.todoItems.length).toEqual(2);
  });

  test("add todo item", () => {
    store.addItem("new todo");

    expect(store.todoItems.length).toEqual(3);
  });

  test("mark item done", () => {
    const newContent = "new todo";
    store.toggleState(store.todoItems[store.todoItems.length - 1]);

    expect(store.todoItems[store.todoItems.length - 1].done).toEqual(true);
    expect(store.todoItems[store.todoItems.length - 1].content).toEqual(
      newContent
    );
  });

  test("undo item done", () => {
    store.toggleState(store.todoItems[store.todoItems.length - 1]);

    expect(store.todoItems[store.todoItems.length - 1].done).toEqual(false);
  });

  test("edit item", () => {
    const newContent = "updated todo";

    store.itemToEdit = store.todoItems[store.todoItems.length - 1];
    store.addItem(newContent);

    expect(store.todoItems.length).toEqual(3);
    expect(store.todoItems[store.todoItems.length - 1].content).toEqual(
      newContent
    );
  });

  test("remove item", () => {
    store.removeItem(store.todoItems[store.todoItems.length - 1]);

    expect(store.todoItems.length).toEqual(2);
    expect(store.todoItems[store.todoItems.length - 1].content).toEqual(
      "Learn MobX"
    );
    expect(store.todoItems[store.todoItems.length - 1].id).toEqual(2);
  });
});
