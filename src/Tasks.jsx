
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './componet/Sidebar';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false); 
    const [filter, setFilter] = useState('all');
    const [sortCriteria, setSortCriteria] = useState('');

    const fetchTasks = (async () => {
        const uid= window.localStorage.getItem("uid");
        try {
            const response = await axios.get(`http://localhost:34000/notes?uid=${uid}`); 
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
); 

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/notes/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const completeTask = async (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        setTasks(updatedTasks);

        try {
            const taskToUpdate = updatedTasks.find(task => task.id === taskId);
            await axios.put(`http://localhost:8000/notes/${taskId}`, taskToUpdate);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setShowSidebar(true); 
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };


    const handleSortCriteriaChange = (criteria) => {
        setSortCriteria(criteria);
    };

    const handleCloseSidebar = () => {
        setCurrentTask(null);
        setShowSidebar(false);
    };

    const filteredTasks = tasks
        .filter(task => {
            if (filter === 'all') return true;
            if (filter === 'done') return task.completed;
            if (filter === 'pending') return !task.completed;
            return false;
        })
        .sort((a, b) => {
            if (sortCriteria === 'priority') {
                return b.priority - a.priority;
            } else if (sortCriteria === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate); 
            }
            return 0;
        });

    const taskDiv = filteredTasks.map((task, index) => (
        <div key={task.id} id='t' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "50px" }}>
            <div id='tasks'className={task.completed ? 'task done' : 'task' } >
                <h2 className='count-task'> {index+1}</h2>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <span style={{ margin: "0 5px" }}>{task.timestamp}</span>
                <span style={{ margin: "0 5px" }} className={task.completed ? 'status done' : 'status pending'}>
                    {task.completed ? 'done' : 'pending'}
                </span>
                <span style={{ margin: "0 5px", fontWeight: task.priority ? 'bold' : 'normal', color: task.priority ? 'white' : 'black' }}>
                    {task.priority ? 'High Priority' : 'Normal Priority'}
                </span>
                <p> The Due Date is : {task.dueDate}</p>
              
            </div>
            <div className='action' style={{ display: "flex", gap: "50px" }}>
                <i
                    className={`fa-regular fa-square-check fa-2x ${task.completed ? 'completed' : ''}`}
                    onClick={() => completeTask(task.id)}
                    style={{ color: task.completed ? 'green' : 'inherit' }}></i>
                <i className="fa-solid fa-pen-to-square fa-2x" onClick={() => handleEditClick(task)}></i>
                <i className="fa-solid fa-trash fa-2x" onClick={() => deleteTask(task.id)}></i>
            </div>
        </div>
    ));

    return (
        <div>
            {showSidebar &&  <Sidebar currentTask={currentTask} fetchTasks={fetchTasks} onClose={handleCloseSidebar}  setTasks={setTasks} tasks={tasks}/>}
            <header className='taskstype'>
                <span onClick={() => handleFilterChange('all')}>All tasks</span>
                <span onClick={() => handleFilterChange('done')}>Done</span>
                <span onClick={() => handleFilterChange('pending')}>Pending</span>
                <div className="dropdown">
                    <span className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" onClick={() => handleSortCriteriaChange('priority')}>Priority</button></li>
                        <li><button className="dropdown-item" onClick={() => handleSortCriteriaChange('dueDate')}>Due Date</button></li>
                        <li><button className="dropdown-item" onClick={() => handleSortCriteriaChange('')}>Default</button></li>
                    </ul>
                </div>
            </header>
            <h2>Tasks</h2>
            {taskDiv}
        </div>
    );
}









