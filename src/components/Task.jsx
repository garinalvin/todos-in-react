import AddTaskForm from "./AddTaskForm";
import {useState, useEffect} from "react";
import "./Task.css";
import TaskIcon from '@mui/icons-material/Task';
import DelIcon from '@mui/icons-material/DeleteOutlineOutlined';


const dayname = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Task(){
    let data = [];
    
    if(localStorage.getItem("todos")){
       data = JSON.parse(localStorage.getItem("todos"));
    }
    
    
    const [tasks, setTasks] = useState(data);


   

    // tasks = [{id:, todo, due}]

    let currDay = new Date();
    let weekday = dayname[currDay.getDay()];
    let currMonth = months[currDay.getMonth()];

    let strDay = `${weekday}, ${currMonth}, ${currDay.getDate()} ${currDay.getFullYear()}`;
   

    const [today] = useState(strDay);

    function handleAddTask(task){
        // setTasks(
        //    [ ...tasks, task ]
        // );
        setTasks(
            [ ...tasks, {
                todo: task,
                status: "pending"
            } ]
         );

       
       
    };


    function handleDel(event){
        const toDelete = event.target.parentElement.id;
        console.log(toDelete);
        setTasks((prev)=>{
            return prev.filter((value, idx)=> idx !== +toDelete);
           
        });
    };

    function handleCheck(event){

        let targetIndex = +event.target.classList[0];

        
            setTasks(
               (prev)=>{
                return prev.map(
                    (data, idx)=> {
                        if (idx===targetIndex){
                            if(data.status === "pending")
                            {return(
                                {
                                    ...data,
                                    status: "done"
                                }
                            )}
                            else{
                                return(
                                    {
                                        ...data,
                                        status: "pending"
                                    }
                                )
                            }
                        }else 
                        {return data;}
                    }
                )
               }
            )



        // console.log(event.target.parentElement.parentElement.classList.toggle("done"));
    }

    useEffect(
        ()=>{
            localStorage.setItem("todos", JSON.stringify(tasks));

        },[tasks]
    )


    return (
    <div className="task-container">
        <AddTaskForm addTask={handleAddTask}/>  

        
        <h3>{today}</h3>
        <hr />
        <h2>My Task List</h2> 
        <hr id="tasks-sep"/>
        {!tasks.length?<h2>No tasks</h2> : <table>
            <thead>
            <tr>
                <th>Tasks</th>
                <th>Status</th>
                <th>Delete</th>

            </tr>
            </thead>
                <tbody>
                    {
                        tasks.map((task, idx)=>{
                            return(
                                <tr key={idx} className={idx}>
                                    <td><TaskIcon /> <span className={task.status}>{task.todo}</span></td>
                                    <td class="checkbox-td"><input className={idx} type="checkbox" onClick={handleCheck} checked={task.status === "done"} /><span class="status-label">{task.status}</span></td>
                                    <td id={idx} onClick={handleDel}><DelIcon fontSize="inherit" sx={{color: "red"}}/></td>
                                </tr>

                            )
                        })
                    }
                    
                </tbody>

        </table>
        }

    </div>
    
);
};