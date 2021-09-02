import React from "react";
import { TodoI } from "../App";

export interface CompleteCompI {
  items: TodoI[];
}
/**
 * Lists all completed items from the todo list
 * @param {CompleteCompI} props - All completed items
 * @returns {JSX.Element}
 */
const CompleteComp = ({ items }: CompleteCompI): JSX.Element => {
  return (
    <div>
      <h1>Completed</h1>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            {todo.title} <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteComp;
