import localforage from 'localforage';

export const STORAGE_KEY = 'todos-vuejs';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear();
}

export const state = {
  isOpen: false,
  projects: [{
  }],
  globalTags: [{
  }],
  todoStore: localforage.createInstance({
    name: "nameHere"
  }),
};

export const mutations = {
  addTodo (state, { text }) {
    state.todos.push({
      text,
      done: false,
    });
  },

  deleteTodo (state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  toggleTodo (state, { todo }) {
    todo.done = !todo.done;
  },

  editTodo (state, { todo, value }) {
    todo.text = value;
  },

  toggleAll (state, { done }) {
    state.todos.forEach((todo) => {
      todo.done = done;
    });
  },

  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.done);
  },

  toggleMenu(menu) {
      menu.isOpen = !menu.isOpen;
  },

  //Projects
  addProject (state, {name, id}) {
    state.projects.push({
      name,
      id,
    });
  },

  //Projects
  addGlobalTag (state, {name, id}) {
    state.globalTags.push({
      name,
      id,
    });
  },

  //Local storage
  ADD_TASK (key, payload) {
    if (typeof payload !== 'string') {
      console.warn(payload + ' used as a key, but it is not a string.');
      var payload = String(payload);
    }
    if (typeof key !== 'string') {
      console.warn(key + ' used as a key, but it is not a string.');
      var key = String(key);
    }
    state.todoStore.setItem(key, payload);
  },

  UPDATE_TASK (state, payload) {
    state.todos[payload.todo.id] = payload.todo;
  },

  DELETE_TASK (state, payload) {
    Vue.delete(state.todos, payload.todo.id);
  },

  LOAD_TASKS (key, payload) {
    state.todoStore.getItem(key, payload);
    console.log(key, payload);
  }
};
