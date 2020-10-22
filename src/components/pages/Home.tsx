import React, {useState, useEffect} from 'react';
import PageLayout from '../common/PageLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import styled, {css} from 'styled-components';

type FormEvent = React.FormEvent<HTMLFormElement>;
type MouseEvent = any; //MouseEvent<HTMLButtonElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const Home = () => {

  const localTodos = localStorage.getItem('todos');
  let initialTodos = JSON.parse(localTodos || '[]');

  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleOnChange = (e: MouseEvent): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (value !== '') {
      addTodo(value);
      setValue("");
    }
  };

  const addTodo = (text: string) =>  {
    const newTodos: ITodo[] = [...todos, { text, complete: false}];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => (e: any): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !(newTodos[index].complete);
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => (e: any): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <PageLayout>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={handleOnChange}
        />
        <Button
          type="submit"
          disabled={value === ''? true : false}
        >Add Todo</Button>
      </form>
      <section>
        { todos.map((todo: ITodo, index: number) => (
          <React.Fragment key={index}>
            <div
              style={
                { 
                  textDecoration: todo.complete ? 'line-through' : '', 
                  textAlign: 'center',
                  marginTop: '1rem',
                  border: 'solid',
                  borderColor: todo.complete ? 'green': 'yellow',
                  paddingTop: '1rem',
                  paddingBottom: '1rem'
                }
              }>{todo.text}</div>
              <Button
                style={{
                  background: todo.complete ? 'green': 'yellow',
                  color: todo.complete ? 'white': 'black',
                  width: '50%',
                  display: 'inline'
                }}
                onClick={completeTodo(index)}
              >
                {todo.complete ? "Completed" : "Incompleted"}
              </Button>
              <Button
                style={{background: 'red',
                  width: '50%',
                  display: 'inline'
                }}
                onClick={removeTodo(index)}
              >
                &times;
              </Button>
          </React.Fragment>
        ))}
      </section>
    </PageLayout>
  );
}

export default Home;
