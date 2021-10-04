import React, { useReducer, useRef } from 'react';
import { render } from 'react-dom';

import './style.css';
import * as constants from './constants';

//const initialState = [...constants.TODOS];
const initialState = [{ id: 1, name: 'Get started', complete: false }];

//set up a function that takes state and action, then switch on action.type
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return action.name.length
        ? [
            ...state,
            {
              id: state.length
                ? Math.max(...state.map((todo) => todo.id)) + 1
                : 0,
              name: action.name,
              complete: false,
            },
          ]
        : state;
    }
  }
};

const Todo = () => {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  function addTodo(event) {
    event.preventDefault();//Prevents the page from refreshing when hitting submit
    dispatch({
      type: 'ADD_TODO',
      name: inputRef.current.value,
      complete: false,
    });
    inputRef.current.value = '';
  }
  return (
    <>
      <div className="todo-input">
        <form onSubmit={addTodo}>
          <input
            ref={inputRef}
            type="search"
            id="add-todo"
            placeholder="Add Todo..."
          />
        </form>
      </div>
      <div className="column-container">
        {todos.map((todo) => (
          <div key={todo.id} alt={todo.id} className="column-item">
            <div className="flex-container">
              <div className="todo-name">{todo.name}</div>
              <div className="todo-delete">&times;</div>
            </div>
          </div>
        ))}
      </div>
      <button>CLEAR TODOS</button>
    </>
  );
};

render(<Todo />, document.getElementById('root'));
