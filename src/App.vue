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
html {
  margin: 0;
  padding: 0;
}
body {
  background: #EFEFEF;
  color: #2e2e2f;
  font-family: 'myriad-pro','Myriad Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  font-family: 'myriad-pro','Myriad Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
}

#app {
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
  margin: 0 auto;
  max-width: 80em;
  min-height: 100vh;
  padding: 4.5em;
  text-align: center;
}
</style>
