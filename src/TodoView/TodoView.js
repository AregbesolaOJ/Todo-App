import React from 'react';
import './TodoView.css';
import { Consumer } from '../context';

const TodoView = () => {
    return (
        <Consumer>
            {context => (
                <div className="todoview">
                    <div className="todoview_content">

                        <h1>Welcome, please Enter Your Name to Create a Personal Todo List!</h1>
                        <form className="form-group">
                            <input name="userName" 
                                type="text" 
                                value={context.data.userName} 
                                onChange={context.actions.changed}
                                required
                            />
                            <button onClick={context.actions.clicked}>{context.data.isLoading ? "Loading..." : "Create Todo"}</button>
                            <p>{context.data.errorView ? "Oops! That an empty field..." : null}</p>
                        </form>
                    </div>
                </div>

            )}
        </Consumer>
    );
}

export default TodoView;