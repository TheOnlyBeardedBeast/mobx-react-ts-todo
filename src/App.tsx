import React from "react";
import "./App.scss";
import { TodoForm, TodoItemList } from "./Modules";

export const App: React.FC = () => {
  return (
    <div className="todo">
      <TodoForm />
      <TodoItemList />
    </div>
  );
};
