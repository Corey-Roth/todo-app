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