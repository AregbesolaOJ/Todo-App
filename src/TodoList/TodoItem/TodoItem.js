import React from 'react';
import './TodoItem.css';

const TodoItem = ({ checked, todos, edit, changed, del  }) => {
    const completedStyle = {
        color: '#cccc',
        fontStyle: 'italic',
        textDecoration: 'line-through'
    }

    const btnClass = {
        display: 'none'
    };

    return (
        <div className="todo-item">
            <input type="checkbox" checked={checked} onChange={changed}/>
            <p style={checked ? completedStyle : null }>{todos}</p>
            <button style={checked ? btnClass : null } onClick={del}>Delete</button>
            <button style={checked ? btnClass : null } onClick={edit}>Edit</button>
        </div>
    )
}

export default TodoItem;
