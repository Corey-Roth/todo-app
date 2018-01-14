<template>
    <div id="app">
        <template>
            <div>
                <todo-list v-bind:todos="todos"></todo-list>
                <create-todo v-on:create-todo="createTodo"></create-todo>
            </div>
        </template>
    </div>
</template>

<script>
    import sweetalert from 'sweetalert';
    import TodoList from './components/TodoList';
    import CreateTodo from './components/CreateTodo';

    export default {
      name: 'app',
      components: {
        TodoList,
        CreateTodo,
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

      methods: {
        createTodo(newTodo) {
            this.todos.push(newTodo);
        },
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
      overflow-y: auto;
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
      width: 100%;
    }

    .swal-modal {
        font-size: 1rem;
        height: 15rem;
        width: 15rem;
    }

    .swal-icon {
        height: 4em;
        width: 4em;
    }

    .swal-icon:first-child {
        margin: 1em auto;
    }

    .swal-title {
        color: #2e2e2f;
        font-size: 1.5em;
        margin: 0;
        padding: 0.5rem 0;
    }

    .swal-title:not(:last-child) {
        margin: 0;
    }

    .swal-text {
        margin-bottom: 1em;
        padding: 0 1em;
    }

    .swal-footer {
        margin: 0;
        padding: 0 1em;
    }

    .swal-icon--success__line--long {
        right: -8px;
    }

    .swal-button, .swal-button:focus {
        background: #e41f35;
        border: 0 none;
        border-radius: 0.25em;
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        color: #FFFFFF;
        cursor: pointer;
        display: block;
        font-size: 1rem;
        line-height: 1;
        outline: 0;
        padding: 1em 2em;
        width: 100%;
    }

    .swal-button:hover, .swal-button:active {
        background: #8B0000;
        box-shadow: 0 0 0 0;
        transform: translateY(1px);
    }

    .swal-button-container {
        display: block;
        margin: 0;
    }

    @media screen and (max-width: 840px) {
        body {
            background: #FFFFFF;
        }
        #app {
            box-shadow: 0 0 0 0;
            padding: 1em 0 0;
        }
    }
</style>
