import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, removeTodo, editTodo }) => {
  return (
    <div className="todo-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article className="todo-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={() => editTodo(id)}>
                <FaEdit />
              </button>
              <button type="button" className="remove-btn" onClick={() => removeTodo(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
