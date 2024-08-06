import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./TodosReducer";
export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center">
        <input
        className="form-control form-control-sm flex-grow-1 me-2"
        style={{ maxWidth: "300px" }}
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
        <button
        className="btn btn-warning btn-sm mx-1"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
        >
          {" "}
          Update{" "}
        </button>

        <button className="btn btn-success btn-sm mx-1" onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
          {" "}
          Add{" "}
        </button>
      </div>
    </li>
  );
}
