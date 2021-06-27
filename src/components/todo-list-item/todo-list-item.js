import React, { Component } from 'react';

import './todo-list-item.css';

class TodoListItem extends Component {
constructor(){
  super();
}
  

 render() {
    const  { label, onDeleted, onToggleImportant, onToggleDone,done, important } = this.props;
    
    let newClass = 'todo-list-item';

    if(done){
      newClass += ' done';
    }

    if(important){
      newClass += ' important';
    }

    
  
    return (
      <span className={newClass}>
        <span
          className="todo-list-item-label"
          onClick = {onToggleDone}>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick = {onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}



export default TodoListItem;
