# React- Redux ToDo List Study

### What did I use

- Provider
- Manage stores in Reduxjs Toolikit
- useSelector & useDispatch for global states
- Modal for edit to do
- For modals different file was created and manage from this file
- Stores file was created for each need
- createSlice & configureStore used from reactjs toolikit for create and manage stores.
- Nano id was used for create unique id for each list item.
- For local states, useState was used.
- For each user could be able to edit, delete, add own items.

### Dependincies in use

- Add Nanoid for giving unique id for each list item in the todo list.
- react-redux
- Reduxjs toolikit

### Notes of mapping for create redux store and send/ calls states and actions

```
//1- create store-->todo.js files
//2- import createSlice method for could create store

import { createSlice } from "@redux.js/toolkit";

//3-Give a initial state, this is same with the useState argument

const initialState = {
  todos: []
};

//4- createSlice was created as a todos variable
const todos = createSlice({
  name: "todos", //this is used for prefix to action types, be careful it should uniqe
  initialState,
  //reducer is work like "setTodos"
  reducers: {
    addTodo: (state, action) => {
      state.todos = [
        action.payload, // this is actually what adding , for redux jargon this is payload
        ...state.todos //all todos
      ];
    }

    //for deleting one item from the state. If not equal show them
    deleteTodo: (state,action) => {
      state.todos = state.todos.filter(todo=> todo.id !== action.payload)
    }
  }
});

//5- somethings is goint to exract now. todos.actions' todos is that uniqe name

export const { addTodo, deleteTodo } = todos.actions;

// and also as a default
export default todos.reducer;

// NOW WE HAVE ONE STORE. For managins that store, another index.js is going to be created.

//6- Create index.js under store folder

//7- For using that store { configureStore } should be imported

import { configureStore } from "@redux.js/toolkit";

//8- First thing is in that index.js is define a store variable and it get values from todo.js

const store = configureStore({
  reducer: {
    todo //in here, second todo is same as from slice file.
  }
});

//9- We define todo inside the store but didnt import, also we need to import it inside to index.js

import todo from "./todo";

//10- Also we need to export index.js. We will use it inside the provider

export default store;

//11- Go main index.js file which wrapp the App.js. In there first import {Provider} from react-redux

import { Provider } from "react-redux";

//12- And then wrapp that App component with Provider, and define store inside that provider for can send it every component

{
  /* <Provider store={store}>
  <App/>
  <Provider/> */
}

//13- We need also import store index.js here

import store from "./stores";

// 14- now go to AddTodo.js component. In this component we will add these todos, so we need to import addTodo from store
//addTodo was exported with this name, thats why we are importing it directly, not like props as a argument.
import { addTodo } from "src/stores/todo";

//15- And now we are at one of main point, dispatch. We want add something in a state, and we will use some method
//If we want to trigger this addTodo method which is coming from store, we will useDispacth for this.
//To sum up, when we are sending "state" we will send function and one method for trigger it.

import { useDispatch } from "react-redux";

//16- After importing it, first just create it with its name.
//After function line

const dispatch = useDispatch();

//17- We will add with submitHandle event listener. Put that dispatch inside that listener. And addTodo is going inside this dispatch method
//for adding todo object

const submitHandle = e => {
  e.preventDeafult()

  dispatch(addTodo({
    title: todo,
    done: false,
    id: nanoid(),
    user: user.id
  }))
}

//Now inside that addTodo object is action payload now.

//------------------------------------

//18- Go to TodoList.js component. If you want to glabal state and use it
// Use useSelector hook for it

import {useSelector} from "react-redux"

//usage of useSelector for taking global state with callback
//Todo is inside the state/store, todos is in the todo as an initialstate
//so we destruct that todos from todo
const {todos} = useSelector(state=> state.todo)

//19- for every item, TodoItem.js is using. Inside it, we will use useSelector again.
//And also we define deleteHandle and editHandle events in that component. Delete and edit functions calling here with "import"

import {useSelector} from "react-redux"
import {deleteTodo} from "../stores/todo"

const dispatch = useDispatch()

//inside the handlers;

const deleteHandle=()=> {
  dispatch(deleteTodo(todo.id))
}


//20- now, create store for the login auth.js / Adding new state situation

//import createSlice method for could create store
//Give a initial state, this is same with the useState argument

import { createSlice } from "@redux.js/toolkit";

const initialState = {
  user: false
};


const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload  //set user boolean with what will come

    }
    logout : state => {
      state.user = false;
    }

  }
});

export const { login, logout } = auth.actions;

export default auth.reducer;

//21- Inside the store index.js

import auth from "./auth"

/* const store = configureStore({
  reducer: {
    todo
  }
}); */
//Inside that configureStore, add auth

const store = configureStore({
  reducer: {
    todo,
    auth
  }
});

//22- Fırst, inside the Header component, we want the get our user

import {useSelector} from "react-redux"

const {user} = useSelector(state => state.auth.user)

//23- After getting user, for could change, changeUser and for trigger it useDispatch should import that component

import {useSelector, useDispatch} from "react-redux"
import {login, logout} from "../stores/auth"

const dispatch = useDispatch()

//Insede the login-logout handler

const loginHandler = user => {
  dispatch(login(user))
}
const logoutHandler = () => {
  dispatch(logout())
}

//23- AddTodo() - TodoItem also need users
//useSelector
//const {user} =useSelector(state=> state.auth)

//24- Create store for the modal now
//modal.js
//createSlice
//initialState name:false,data:false, open: false
//const modal= createSlice
//reducers:{
 // openModal: (state, action) => {
  //  state.name = action.payload.name
   // state.data=action.payload?.data || false
    //state.open=true},
  //closeModal : state=> {
  //  state.name: false;
   // state.data: false,
   // state.open = false
  //}}

// export const {openModal, closeModal} = modal.actions -- export default modal.reducers

//25- add this modal to store index.js

```
