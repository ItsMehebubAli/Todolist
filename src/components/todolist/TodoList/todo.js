import React, { useEffect, useState } from 'react'
import "./style.css";
const getLocalData=()=>
{
  const list=localStorage.getItem("mytodolist");
  if(list)
  {
    return JSON.parse(list);
  }
  else{
    return [];
  }
}

const Todo = () => {
  const [ Input , setInput ]=useState("");
  const [ items, setItems ]=useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("");
  console.log("@"+"yoyo"); 
  const [toggleButton, setToggleButton]=useState(false);
  const addItem=()=>
  {
    if(!Input)
    {
      alert("Fill The Activity");
      
    }
    else if (Input && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: Input };
          }
          return curElem;
        })
      );

      setInput("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else
    {
      const myNewInputData=
      {
        id:new Date().getTime().toString(),
        name:Input
      };
      setItems([...items,myNewInputData]);
      setInput("");
    }
  }

  const deleteItems =(index)=>
  {
    
    const updatedItems=items.filter((curElem)=>{
      return curElem.id!==index
    })
    setItems(updatedItems);
  }

  const removeAll=()=>
  {
    setItems([]);
  }
  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));
  },[items])

  const editItem=(index)=>
  {
    
    const item_todo_edited=items.find((curElem)=>{
      return curElem.id===index;
    });
    setInput(item_todo_edited.name); 
    setIsEditItem(index);
    console.log(toggleButton+"*");
    setToggleButton(true);
    console.log(toggleButton);
  }
  

  return (
    <>
      <div className="main-div">
       <div className="child-div">
        <figure>
            <img src="./images/todo.svg" alt="todologo"></img>
            <figcaption>Add Your List Here</figcaption>
        </figure>
        <div className="additems">
          <input type="text" placeholder="✍️Add Item" className="form-control" value={Input} 
          onChange={(event)=>setInput(event.target.value)}/>
          {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
          {/* <i className="far fa-edit add-btn" onClick={addItem}></i> */}
        </div>
        {/* {Show our items} */}
        <div className="showItems">
          {items.map((curElem,index)=>
          {
            return(<div className="eachItem" key={curElem.id}>
            <h3>{curElem.name}</h3>
            <div className="todo-btn">
              <i className="far fa-edit add-btn" onClick={()=>{editItem(curElem.id)}}></i>
              <i className="far fa-trash-alt add-btn" onClick={()=>{deleteItems(curElem.id)}}></i>
            </div>
          </div>
          );
          })}
         {/* <div className="eachItem" >
            <h3>apple</h3>
            <div className="todo-btn">
              <i className="far fa-edit add-btn"></i>
              <i className="far fa-trash-alt add-btn"></i>
            </div>
          </div> */}
          
        </div>



        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
           <span>CHECK LIST</span>
          </button>
        </div>
       </div>
      </div>
    </>
  ) 
}

export default Todo
