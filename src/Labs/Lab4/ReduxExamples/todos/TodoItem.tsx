import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./TodosReducer";
export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
      <span style={{ maxWidth: "300px" }}>{todo.title}</span>
      <div className="ml-auto">
      <button
        className="btn btn-primary btn-sm mx-1"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        {" "}
        Edit{" "}
      </button>
      <button
        className="btn btn-danger btn-sm mx-1"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        {" "}
        Delete{" "}
      </button>
      </div>
    </li>
  );
}
