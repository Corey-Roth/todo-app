<template>
    <div class="todo-list">
        <div class="row button-row">
            <button v-on:click="toggleView" class="toggle" v-bind:class="{ list: isList }"><img src="../assets/list-view.svg"/></button>
            <button v-on:click="toggleView" class="toggle" v-bind:class="{ list: !isList }"><img src="../assets/grid-view.svg"/></button>
        </div>
        <div class="row" v-bind:class="{ list: isList }">
            <todo
                v-on:delete-todo="deleteTodo"
                v-on:complete-todo="completeTodo"
                v-for="todo in todos"
                :key="todo.id"
                :todo.sync="todo">
            </todo>
        </div>
    </div>
</template>

<script type = "text/javascript" >
    import sweetalert from 'sweetalert';
    import Todo from './ToDo';

    export default {
      props: ['todos'],
      components: {
        Todo,
      },

      data() {
        return {
            isList: false,
        };
      },

      methods: {
        deleteTodo(todo) {
          sweetalert({
            title: 'Are you sure?',
            text: 'This To-Do will be permanently deleted!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
          },
          () => {
            const todoIndex = this.todos.indexOf(todo);
            this.todos.splice(todoIndex, 1);
            sweetalert('Deleted!', 'Your To-Do has been deleted.', 'success');
          });
        },
        completeTodo(todo) {
          const todoIndex = this.todos.indexOf(todo);
          this.todos[todoIndex].done = true;
          sweetalert('Success!', 'To-Do completed!', 'success');
        },
        toggleView: function () {
            this.isList = !this.isList;
        },
      },
    };
</script>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        padding: 0 4.5em;
        width: 100%;
    }

    .toggle {
        background: none;
        border: 0 none;
        display: inline-block;
        cursor: pointer;
        margin: 1em 0;
        opacity: 0.33;
        padding: 0 0.5em;
        font-size: 1em;
        width: auto;
    }

    .toggle img {
        height: 1.5em;
        width: 1.5em;
    }

    .toggle:hover {
        opacity: 1;
    }

    .toggle.list {
        display: inline-block;
        opacity: 1;
        padding: 0 0.5em;
    }

    .row.button-row {
        display: flex;
        justify-content: flex-end;
    }

    @media screen and (max-width: 840px) {
        .row {
            display: block;
            padding: 0 2em;
        }
    }
</style>
