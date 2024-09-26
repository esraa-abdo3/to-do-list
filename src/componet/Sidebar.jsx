

import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ currentTask, fetchTasks, onClose }) {


    const [titleEditorState, setTitleEditorState] = useState(EditorState.createEmpty());
    const [descriptionEditorState, setDescriptionEditorState] = useState(EditorState.createEmpty());
    const [dueDate, setDueDate] = useState('');
    const [isPopupActive, setPopupActive] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [priority, setPriority] = useState(false);
    
    const username = localStorage.getItem('username') || 'user';



    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    useEffect(() => {
        // edit
        if (currentTask) {
            setTitleEditorState(EditorState.createWithContent(ContentState.createFromText(currentTask.title)));
            setDescriptionEditorState(EditorState.createWithContent(ContentState.createFromText(currentTask.description)));
            setPriority(currentTask.priority || false);
            setDueDate(currentTask.dueDate || '');
            setIsEdit(true);
            setPopupActive(true);
        } else {
            setTitleEditorState(EditorState.createEmpty());
            setDescriptionEditorState(EditorState.createEmpty());
            setDueDate('');
            setPriority(false);
            setIsEdit(false);
        }
    }, [currentTask]);

    const handleAddNoteClick = () => {
        setTitleEditorState(EditorState.createEmpty());
        setDescriptionEditorState(EditorState.createEmpty());
        setPriority(false);
        setIsEdit(false);
        setPopupActive(true);
    };

    const handleSaveNoteClick = () => {
        const titleContent = titleEditorState.getCurrentContent().getPlainText();
        const descriptionContent = descriptionEditorState.getCurrentContent().getPlainText();
        const timestamp = new Date().toLocaleString();

        const taskData = {
            title: titleContent,
            description: descriptionContent,
            timestamp: timestamp,
            dueDate: dueDate,
            priority: priority,
            uid: localStorage.getItem('uid')
        };

        const requestUrl = isEdit && currentTask ? `http://localhost:8000/notes/${currentTask.id}` : 'http://localhost:8000/notes';
        const requestMethod = isEdit && currentTask ? 'PUT' : 'POST';

        fetch(requestUrl, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPopupActive(false);
                fetchTasks(); 
                if (onClose) onClose();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (selectedDate < today || selectedDate > maxDateStr) {
            alert('The due date must be between today and one year from now.');
            return;
        }
        setDueDate(selectedDate);
    };

    const handleCancel = () => {
        setPopupActive(false);
        if (onClose) onClose();
    };

    return (
        <>
            <div className={`popup ${isPopupActive ? 'active' : ''}`}>
                <h2>{isEdit ? 'Edit task' : 'Add task'}</h2>
                <div className="editor-container">
                    <h3>Title</h3>
                    <Editor
                        editorState={titleEditorState}
                        onChange={setTitleEditorState}
                        placeholder="Enter title here..."
                    />
                </div>
                <div className="editor-container">
                    <h3>Description</h3>
                    <Editor
                        editorState={descriptionEditorState}
                        onChange={setDescriptionEditorState}
                        placeholder="Enter description here..."
                    />
                </div>
                <div className="editor-container">
                    <label>
                        <input 
                            type="checkbox"
                            checked={priority}
                            onChange={(e) => setPriority(e.target.checked)}
                         style={{margin:" 0 10px"}}/>
                     High Priority
                    </label>
                </div>
                <div className="editor-container">
                    <h3>Due Date</h3>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={handleDateChange}
                        min={today}
                        max={maxDateStr}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button id="saveNoteButton" onClick={handleSaveNoteClick}>Save Note</button>
                    <button id="canclebutton" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            <div className='side-flex'>
                <nav>
                    <div className="username">
                        <i className="fa-solid fa-user"></i>
                        <span>hello {username}</span>
                    </div>
                </nav>
                <div className="addNoteButton" onClick={handleAddNoteClick}>
                    <i className="fa-solid fa-plus"></i>
                    <span>add task</span>
                </div>
                <div>
                    <NavLink 
                        to="/view/tasks" 
                        className={({ isActive }) => isActive ? "link active" : "link"}
                    >
                        my Lists
                    </NavLink>
                </div>
            </div>
        </>
    );
   
}














    

    



