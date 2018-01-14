<template>
  <div id="app">
    <template>
      <div>
        <todo-list v-bind:todos="todos"></todo-list>
      </div>
    </template>
  </div>
</template>

<script>
import TodoList from './components/TodoList';

export default {
  name: 'app',
  components: {
    TodoList,
  },
  // data function avails data to the template
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
    };
  },
};
</script>

<style>
#app {
  font-family: 'myriad-pro','Myriad Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2e2e2f;
  margin-top: 4em;
}
</style>
