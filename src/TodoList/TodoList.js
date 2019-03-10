import React from 'react';
import TodoItem from './TodoItem/TodoItem';
import { Consumer } from '../context';
import './TodoList.css';

const TodoList = () => {

    return (
        <Consumer>
            { context => {
                const todoItem = context.data.items.map((item, index) => {
                    return (
                        <TodoItem 
                                key={item.id}
                                index={index}   
                                todos={item.todo}
                                checked={item.checked} 
                                edit={() => context.actions.edit(item.id)}
                                changed={() => context.actions.checkedChange(item.id)}
                                del={() => context.actions.del(item.id)} 
                        />
                    )
                })       

                let date = new Date().toDateString()  
                
                return (
                <div className="todolist">
                    <div className="todolist_header">
                        <div className="todolist_header_image">
                            <img src={require('../assets/todo-image1.JPG')} alt="" />
                        </div>
                        <div className="todolist_header_details">
                            <h1>Hi! <span className="userName">{context.data.userName.toUpperCase()}</span></h1>
                            <p>You have {context.data.items.length} task(s)!</p>
                            <p>{date}</p>
                        </div>
                    </div>

                    <form className="todolist_forms">
                        {context.data.isEdit ?  
                            <input type="text" name="edit" value={context.data.edit} onChange={context.actions.editItem}/> 
                            : 
                            <input type="text" name="todo" value={context.data.todo} onChange={context.actions.changed}/> //the default
                        }
    
                        {context.data.isEdit ?  
                            <button onClick={context.actions.update}>Edit Item</button> 
                            :
                            <button onClick={context.actions.submit}>Add Todo Item</button> //the default
                        }
                        <p>{context.data.errorList ? "Oops! That an empty field..." : null}</p>
                    </form>

                    <div className="todolist_content">
                        <div className="todolist_items">
                            <img src={require('../assets/todo-logo.JPG')} alt="" />
                            {todoItem}                        
                        </div>
                    </div>

                </div>                
            )}
        }
        </Consumer>
    );
}

export default TodoList;