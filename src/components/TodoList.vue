<template>
    <div class="row">
        <todo
            v-on:delete-todo="deleteTodo"
            v-on:complete-todo="completeTodo"
            v-for="todo in todos"
            :key="todo.id"
            :todo.sync="todo">
        </todo>
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

    @media screen and (max-width: 840px) {
        .row {
            display: block;
        }
    }
</style>
