<template>
    <div class="todo-list">
        <div class="row">
            <button v-on:click="toggleView" class="toggle">List view</button>
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
        cursor: pointer;
        margin: 1em 0;
        font-size: 1em;
    }

    .toggle:hover {
        color: #e41f35;
    }

    @media screen and (max-width: 840px) {
        .row {
            display: block;
            padding: 0 2em;
        }
    }
</style>
