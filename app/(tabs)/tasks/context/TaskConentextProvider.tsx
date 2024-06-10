

import React from 'react'
import { TaskContext } from './TaskContext'
import { TaskReducer } from '../reducer/task.reducer';
import { Task, TaskState } from '../types/task.types';
import jsonTask from '../tasks.json'


type TaskContextType = {
    children: React.ReactNode;
};

export const TaskConentextProvider = ({children}: TaskContextType) => {
    const initialState:TaskState = {
        tasks: jsonTask
    }

    const [tasks, dispatch] = React.useReducer(TaskReducer, initialState);

    const addTask = (task: Task) => {
        const newTask = {...task, id: tasks.tasks.length + 1, completed: false, date: new Date().toLocaleDateString()};

        dispatch({type: 'ADD_TASK', payload: task});
        return true;
    };

    const removeTask = (task: Task) => {
        dispatch({type: 'REMOVE_TASK', payload: task.id!});
        return true;
    };

    const toggleTask = (task: Task) => {
        dispatch({type: 'TOGGLE_TASK', payload: task.id!});
        return true;
    };

    const upDateTask = (task: Task) => {
        dispatch({type: 'UPDATE_TASK', payload: task});
        return task;
    }




  return (
    <TaskContext.Provider value={{
        tasks: tasks.tasks,
        addTask,
        removeTask,
        toggleTask,
        upDateTask
    }}>
      {children}
    </TaskContext.Provider>
  )
}
