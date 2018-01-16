export const state = {
    todos: [{
      title: 'Test task',
      description: 'Test description',
      done: false,
      id: this._uid,
  }],
};

export const mutations = {
  createTodo(newTodo) {
      state.todos.push(newTodo);
      sweetalert('Success!', 'To-Do created!', 'success');
  },
};
