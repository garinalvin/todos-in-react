
import "./AddTaskForm.css";
import {useState} from "react";



export default function AddTaskForm(props){

    const [todo, setTodo]= useState("");
 
    function handleChange(event){
        
        setTodo(event.target.value);
        
    };
    function handleClick(event){
        props.addTask(todo);
        setTodo("");
        event.preventDefault();
    }



    return (
        <form >
            <input onChange={handleChange} type="text" id="task-input" name="task" value={todo} placeholder="input new task here...."/>
            <div className="date-picker">
            {/* <BasicDatePicker name="pickdate" onChange={handleChange} value={todo.due} /> */}
            </div> 
            <input onClick={handleClick} type="submit" value="add task" disabled={!todo} className={todo?"":"disabled"} />
      
        </form>
    
    );
};



            