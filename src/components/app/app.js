import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form/add-item-form';

import './app.css';

class App extends Component {
maxId = 100
  state = {
     todoData: [
       this.createTodoItem('Drink Coffee'),
       this.createTodoItem('Make Awesome App'),
       this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const item = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, item)
      const after = todoData.slice(item + 1)
      const newArray = [...before, ...after]

      return {
        todoData: newArray
      }
    })
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
      
    

    this.setState(({todoData}) => {
      const newData = [...todoData, newItem]
      return {
        todoData: newData
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
      const oldItem = arr[idx]
      const newItem = { ...oldItem, [propName]: !oldItem[propName] }
      return [ 
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
        ]

       
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
      
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
      
    })
  }

  search(items, term) {
    if(term.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
     default:
        return items
    }
  }
  
render() {
  const { todoData, term, filter } = this.state
  const visibleItems = this.filter(this.search(todoData, term), filter)
  const doneCount = todoData.filter((el) => el.done).length
  const toDoCount = todoData.length - doneCount
  return (
    <div className="todo-app">
      <AppHeader toDo={toDoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel 
          onSearchChange ={this.onSearchChange}/>
        <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange}/>
      </div>

      <TodoList 
                todos={visibleItems}
                onDeleted={this.deleteItem} 
                onToggleDone={this.onToggleDone}
                onToggleImportant= {this.onToggleImportant}/>

      <AddItemForm onItemAdded={this.addItem}/>
    </div>
  );
}
  
}

export default App;
