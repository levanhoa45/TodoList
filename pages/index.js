import cx from 'classnames';
import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css';
import TodoItem from '../components/todo-item';

export default function Home(){
  const [todoItem, setTodoItem] = useState();
  const [dataForm,setDataForm] = useState(null);
  const [items, setItems] = useState([]);
  const [toggleSubmit, SetToggleSubmit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  
 
  const handleToogle = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    setItems(_items);
  };
  const submitForm = (e) => {
    e.preventDefault();
    const {todoList} = dataForm;
    setItems([
      {
        id: uuidv4(), 
        message: todoList,
        done: false,
      },
      ...items
    ]);
    setDataForm({...dataForm, todoList: null});
  };

  const changeInput = (e)=>{
    const {value, name} = e.target;
    setDataForm({[name]: value});
  }

  const delItem = (itemId)=>{
    const newItems = items.filter(i=>i.id != itemId);
    setItems(newItems);
  }

  const changeTodoItem = (data)=>{
    // const newItems = items.map(i=>{
    //   if(i.id == data.id){
    //     return data;
    //   }
    //   return i;
    // });
    const newItems = items.map(i => i.id == data.id ? data : i);
    setItems(newItems);
  }

  const [isToggle, setIsToggle] = useState(true);

  const toggleEffect = ()=> setIsToggle(!isToggle);

  useEffect(()=>{
    console.log('toggle effect:', isToggle);
  }, [isToggle]);

  return(
    <div className='w-3/4 mx-auto text-center'>
      <button onClick={toggleEffect}>Test useEffect</button>
      <div className='pt-12'>
        <h1 className='text-5xl'>Todo App</h1>
      </div>
      <form className='pt-12' onSubmit={submitForm}>
        <input 
          type="text" 
          placeholder='Add Todo'
          value={dataForm?.todoList ?? ''} 
          name="todoList"
          className="w-2/4 text-gray-900 px-4 py-2 text-center"
          onChange={changeInput}
        /><button className={cx(styles.add)} type='submit'>Add</button>
      </form>
      <ul className='pt-12'>
          {items
            .sort((x,y) => Number(x.done) - Number(y.done))
            .map((item, index) => <TodoItem 
              data={item} 
              key={index} 
              changeTodoItem={changeTodoItem}
              handleToogle={handleToogle}
              delItem={delItem}
            />)}
      </ul>
    </div>
  ); 
};
