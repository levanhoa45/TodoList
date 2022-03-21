import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import cx from 'classnames';

export default function TodoItem ({data, changeTodoItem, handleToogle, delItem}){

    const [myValue, setMyValue] = useState(null);
  
    const [isEdit, setIsEdit] = useState(false);
  
    useEffect(()=>{
      setMyValue(data.message);
    }, [data.message])
  
    const toggleEdit = ()=>{
      // === là sự kiện submit  nếu isEdit hiện tại = true ===
      if(isEdit){
        const newData = {...data, message: myValue};
        changeTodoItem(newData);
      }
      setIsEdit(!isEdit);
    }
  
    const cancelEdit = ()=>{
      setIsEdit(false);
    }
  
    const changeItem = (e)=>{
      const {value} = e.target;
      // const newItem = {...data, message: value};
      setMyValue(value);
      // changeTodoItem(newItem);
    }
    
    return <li
    key={data.id}
    style={{textDecoration: data.done ? 'line-through' : '', color: data.done ? 'black' : 'white'}}
    className={cx(styles.item)}
  >
    {isEdit ? <input onChange={changeItem} value={myValue} style={{color:'#000'}} /> : <span onClick={() => handleToogle(data.id)} >{data.message}</span>}
    {<button className={cx(styles.delete)} type='button' onClick={() => delItem(data.id)}>&#10006;</button>}
    { isEdit ? 
    <>
    <button className={cx(styles.edit)} type='submit' onClick={toggleEdit}>&#10003;</button> 
    <button onClick={cancelEdit}>X</button>
    </>:
    <button className={cx(styles.edit)} type='button' onClick={toggleEdit}>&#9998;</button>}
  </li>
  }


//   function component
//  useEffect

//  props trong react 
//  optional operator
//   toán tử 3 ngoi
//  array method
// object method