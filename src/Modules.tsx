import React from "react";

import { Trash, Check, Edit2, Plus, SkipBack } from "react-feather";
import { useObserver } from "mobx-react";
import { when } from "mobx";

import { useStores } from "./TodoStore";
import { ITodoItem } from "./types";

interface TodoItemProps {
  item: ITodoItem;
}

export const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const { todoStore } = useStores();

  const onCheckClick = () => {
    todoStore.toggleState(item);
  };

  const onTrashClick = () => {
    todoStore.removeItem(item);
  };

  const onEditClick = () => {
    todoStore.itemToEdit = item;
  };

  return useObserver(() => {
    const className = "todo-list-item" + (item.done ? " done" : "");

    return (
      <li className={className}>
        <span>{item.content}</span>
        <button onClick={onEditClick}>
          <Edit2 size="20" color="#fff" />
        </button>
        <button className="green" onClick={onCheckClick}>
          {item.done ? (
            <SkipBack size="20" color="#fff" />
          ) : (
            <Check size="20" color="#fff" />
          )}
        </button>
        <button className="red" onClick={onTrashClick}>
          <Trash size="20" color="#fff" />
        </button>
      </li>
    );
  });
};

export const TodoItemList: React.FC = () => {
  const { todoStore } = useStores();

  return useObserver(() => {
    if (!todoStore.todoItems.length) {
      return <span>Please add some todos</span>;
    }

    return (
      <ul className="todo-list">
        {todoStore.todoItems.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    );
  });
};

export const TodoForm = () => {
  const { todoStore } = useStores();

  const input = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const input = (event.target as HTMLElement).querySelector<HTMLInputElement>(
    //   "[name=todo-content]"
    // );

    if (input.current && input.current.value) {
      todoStore.addItem(input.current.value);
      input.current.value = "";
    }
  };

  React.useEffect(() => {
    when(
      () => !!todoStore.itemToEdit,
      () => {
        // const input = document
        //   .querySelector<HTMLFormElement>("form")
        //   ?.querySelector<HTMLInputElement>("[name=todo-content]");
        if (input.current) {
          input.current.value = todoStore.itemToEdit!.content;
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={input}
        type="text"
        name="todo-content"
        className="todo-form-input"
      />
      <button type="submit">
        <Plus size="20" color="#fff" />
      </button>
    </form>
  );
};
