import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const todoArray = [
    {
      titulo: "Titulo 1",
      descripcion: "Descripcion 1",
      isComplete: false,
      id: 1
    },
    {
      titulo: "Titulo 2",
      descripcion: "Descripcion 2",
      isComplete: true,
      id: 2
    }
  ];

  const [todos, setTodos] = useState(todoArray);
  const [newTodo, setNewTodo] = useState({ titulo: '', descripcion: '', isComplete: false, id: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (newTodo.titulo.trim() !== '' && newTodo.descripcion.trim() !== '') {
      setTodos(prevState => [...prevState, newTodo]);
      setNewTodo({ titulo: '', descripcion: '', isComplete: false, id: 0 });
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...updatedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.isComplete);
    setTodos(updatedTodos);
  };

  return (
    <div className='container my-5'>
      <form onSubmit={addTodo}>
        <input type="text" name='titulo' placeholder='Titulo' value={newTodo.titulo} onChange={handleInputChange} />
        <input type="text" name='descripcion' placeholder='Descripcion' value={newTodo.descripcion} onChange={handleInputChange} />
        <input type="submit" value='Añadir' />
      </form>

      <div className='container my-5'>
        <div>
          <h5>TodoList</h5>
          <button onClick={deleteCompleted}>Eliminar tareas completadas</button>
        </div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.isComplete} onChange={() => toggleComplete(todo.id)} />
            <p>
              {todo.titulo}<br />
              <span>{todo.descripcion}</span>
            </p>
            {todo.isComplete && <span>Completada</span>}
            <button onClick={() => editTodo(todo.id, { titulo: prompt('Actualizar titulo:', todo.titulo), descripcion: prompt('Actualizar descripcion:', todo.descripcion) })}>
              Editar
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
