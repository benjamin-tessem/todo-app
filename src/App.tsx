import { useEffect, useState } from "react";

import CompleteComp from "./components/complete";
import IncompleteComp from "./components/incomplete";

export interface TodoI {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
/**
 * Different View options available
 */
enum TodoView {
  complete,
  incomplete,
}
/**
 * Main entry point for application
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => {
  // Stores all completed todo items
  const [completed, setCompleted] = useState<TodoI[]>([]);
  // Stores all incomplete todo items
  const [inCompleted, setIncomplete] = useState<TodoI[]>([]);
  // Selected current view from user
  const [currentView, setView] = useState<TodoView>(TodoView.complete);
  // Determines if data has been aquired
  const [isLoaded, setIsLoaded] = useState(false);
  // Optional error if fetching data failed
  const [error, setError] = useState<Error | null>(null);

  // Fetches todo items asynchronously
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((json) => json.json())
      .then(
        (data: TodoI[]) => {
          const completed = data.filter((todo) => todo.completed);
          const inComplete = data.filter((todo) => !todo.completed);
          setCompleted(completed);
          setIncomplete(inComplete);
          setIsLoaded(true);
        },
        // Error Handling
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  /**
   * Add an item from the Incomplete Category to the Complete Category
   * @param completedItem - Todo Item to be added to the "Completed" Category
   */
  const updateTodos = (completedItem: TodoI): void => {
    // Remove Completed Item from the list
    setIncomplete((incompleted) =>
      incompleted.filter((item) => item !== completedItem)
    );
    // Add Completed Todo to the top of the list
    setCompleted((completed) => [completedItem, ...completed]);
  };

  /**
   * Returns proper Element, depending on required view
   * @returns {JSX.Element}
   */
  const GetView = (): JSX.Element => {
    switch (currentView) {
      case TodoView.complete:
        return <CompleteComp items={completed} />;
      case TodoView.incomplete:
        return <IncompleteComp items={inCompleted} updateTodo={updateTodos} />;
      default:
        return <div>Unknown View!</div>;
    }
  };

  if (error) {
    // Return error message if fetching data failed
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    // Inform user data is being fetched in the background
    return <div>Loading...</div>;
  } else {
    // Todo App
    return (
      <div>
        <button onClick={() => setView(TodoView.complete)}>Completed</button>
        <button onClick={() => setView(TodoView.incomplete)}>
          Not Completed
        </button>
        <GetView />
      </div>
    );
  }
};

export default App;
