import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';

function App() {
 
  //State stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

//useEffect Only ONCE
  useEffect(() => {
  getLocalTodos();
}, []);

 //UseEffect
  useEffect(() => {

     filterHandler();
     saveLocalTodos();
    
}, [status, todos]);


  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
    }
  }

  //Save to local
  const saveLocalTodos = () => {
    if(todos.length !== 0){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
      
  }
const getLocalTodos = () => {
  if(localStorage.getItem('todos') === null){
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoLocal);
  }
}

  return (
    <div className="App" style={{backgroundImage: `url("https://i.postimg.cc/4dCds0Mv/work.jpg")`, backgroundSize: "cover", }}>
       <header>
      <h1>Kamea's Todo List</h1>
    </header>
      <Form  todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;