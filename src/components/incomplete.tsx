import { TodoI } from "../App";

export interface IncompleteCompI {
  items: TodoI[];
  updateTodo: (item: TodoI) => void;
}

/**
 * Lists all incomplete items.
 * @param {IncompleteCompI} props - Items, and function to update the todo list
 * @returns {JSX.Element}
 */
const IncompleteComp = ({
  items,
  updateTodo,
}: IncompleteCompI): JSX.Element => {
  return (
    <div>
      <h1>Not Completed</h1>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => updateTodo(todo)}>Mark complete</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncompleteComp;
