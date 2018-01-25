<template>
    <div id="app">
        <template>
            <div>
                <create-todo v-on:create-todo="createTodo"></create-todo>
                <left-nav></left-nav>
                <todo-list v-bind:todos="todos"></todo-list>
            </div>
        </template>
    </div>
</template>

<script>
    import sweetalert from 'sweetalert';
    import { mapState } from 'vuex';
    import TodoList from './components/TodoList';
    import CreateTodo from './components/CreateTodo';
    import LeftNav from './components/LeftNav';
    import store from './main';

    export default {
        name: 'app',
        components: {
            TodoList,
            CreateTodo,
            LeftNav,
        },
        computed: {
            ...mapState([
                'store',
            ]),
        },
      // data function avails data to the template
        data() {
            return {
                todos: [{
                }],
            };
        },
        methods: {
            createTodo(newTodo) {
                this.todos.push(newTodo);
                console.log(newTodo.tags);
                sweetalert('Success!', 'To-Do created!', 'success');
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
      background: #f2f2f2;
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

    h1 {
        font-size: 3em;
        font-weight: 300;
        letter-spacing: -0.0125em;
        line-height: 1;
        margin: 0;
        text-align: left;
        width: calc(100% - 6rem);
    }

    #app {
      margin: 0 auto;
      padding: 4.5em 0;
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

  .primary {
        background: #e41f35;
        border: 0 none;
        border-radius: 0.25em;
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        color: #FFFFFF;
        cursor: pointer;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 1em 2em;
        width: 100%;

    }

    .primary:hover {
        background: #8B0000;
        box-shadow: 0 0 0 0;
        transform: translatey(1px);
    }

    .secondary {
        background: none;
        border: 0 none;
        color: #777777;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        padding: 1em 2em 0;
        width: 100%;
        text-align: center;
    }

    .secondary:hover {
        color: #000000;
    }

    .completed {
        background: #ebebeb;
        border: 0 none;
        border-radius: 0.25em;
        color: #777777;
        cursor: not-allowed;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 1em 2em;
        width: 100%;
    }

    .primary, .completed {
        margin: 0 auto;
        max-width: 20em;
        text-align: center;
    }


    @media screen and (max-width: 767px) {
        #app {
            box-shadow: 0 0 0 0;
            padding: 3em 0 0;
        }

        h1 {
            font-size: 2em;
        }
    }

    @media screen and (max-width: 540px) {
        h1 {
            font-size: 1.5em;
        }
    }
</style>
