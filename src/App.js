import React, { Component } from 'react';
import './App.css';
import TodoView from './TodoView/TodoView';
import TodoList from './TodoList/TodoList';
import { Provider } from './context';


class App extends Component {
  state = {
    items: [],
    todo: '',
    editObject: {},
    edit: '',
    checked: false,
    userName: '',
    isLoggedIn: false,
    isLoading: false,
    isEdit: false,
    errorList: false,
    errorView: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value })
  }

  handleCheckboxChange = (id) => {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        if (item.id === id) {
          item.checked = !item.checked
        }
        return item
      })
      return {
        items: updatedItems
      }
    })
  }

  handleClick = event => {
    event.preventDefault();

    if (this.state.userName !== '') {
      this.setState({ isLoading: true, errorView: false })

      setTimeout(() => {
        this.setState({ 
          isLoggedIn: true,
        })
      }, 600)
    } else {
      this.setState({ errorView: true })
    }
  }

  editItemHandler = (index) => {
    this.setState({ isEdit: true})

    const items = [...this.state.items];
    items.map(item => {
      if (item.id === index) {
        this.setState({ editObject: item, edit: item.todo })
      }
      return item
    })
  }

  editItemUpdate = (event) => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value })
  }

  updateItem = (event) => {
    event.preventDefault();
    const todoValue = this.state.edit;
    const items = [...this.state.items];
    const editedTodos = items.map(item => {
      if (item.id === this.state.editObject.id && this.state.edit !== "") {
        item.todo = todoValue
      }
      return item
    })
    this.setState({ 
      items: editedTodos,
      edit: '',
      isEdit: false

    })

  }

  deleteTodoItem = (id) => {
    const items = [...this.state.items];
    const list = items.filter(p => p.id !== id)
    this.setState({
        items: list        
    })
  }

  addNewTodoItem = (event) => {
    event.preventDefault();
    const myId = Math.floor(Date.now() / 1000);
    const items = this.state.items;
    const todoValue = this.state.todo;
    const isChecked = this.state.checked;
    if (this.state.todo !== "" && this.state.todo.length > 5) {
        this.setState( ({
          items: [...items, {todo: todoValue, id: myId, checked: isChecked}],
          todo: '',
          errorList: false
        })
      )
    } else {
      this.setState({ errorList: true })
    }
  }

  render() {
    return (
      // named import for the Context Provider Created and initialized as an object containing all state data and methods
      <Provider value={{
        data: this.state,
        actions: {
          edit: this.editItemHandler, 
          editItem: this.editItemUpdate,
          update: this.updateItem,
          del: this.deleteTodoItem, 
          changed: this.handleChange,
          checkedChange: this.handleCheckboxChange, 
          submit: this.addNewTodoItem,                   
          clicked: this.handleClick
        }
        }}>
        <div className="App">
          {this.state.isLoggedIn ? <TodoList /> : <TodoView />}
        </div>
      </Provider>
    );
  }
}

export default App;
