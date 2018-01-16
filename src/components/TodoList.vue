<template>
    <div class="todo-list">
        <div class="row button-row">
            <h1>Corey's to-do list</h1>
            <button v-on:click="toggleView" class="toggle" v-bind:class="{ list: isList }">
                <img src="../assets/list-view.svg"/>
            </button>
            <button v-on:click="toggleView" class="toggle" v-bind:class="{ list: !isList }">
                <img src="../assets/grid-view.svg"/>
            </button>
        </div>
        <div class="row empty-row" v-if="todos.length < 2">
            <p>Get started by adding a task.</p>
        </div>
        <transition fade mode="out-in">
            <div class="row" v-bind:class="{ list: isList }">
                <todo
                    v-on:delete-todo="deleteTodo"
                    v-on:complete-todo="completeTodo"
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo.sync="todo">
                </todo>
            </div>
        </transition>
    </div>
</template>

<script type = "text/javascript" >
    import sweetalert from 'sweetalert';
    import { mapState } from 'vuex';
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
        computed: {
            theCount () {
                return this.$store.state.listCount
            },
            ...mapState([
                'store',
            ]),
        },
      methods: {
        deleteTodo(todo) {
            const todoIndex = this.todos.indexOf(todo);
            this.todos.splice(todoIndex);
        },
        completeTodo(todo) {
          const todoIndex = this.todos.indexOf(todo);
          this.todos[todoIndex].done = true;
          sweetalert('Success!', 'To-Do completed!', 'success');
        },
        toggleView() {
            this.isList = !this.isList;
        },
      },
    };
</script>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        max-width: 80em;
        padding: 0 4.5em;
        width: 100%;
    }

    .toggle {
        background: none;
        border: 0 none;
        display: inline-block;
        cursor: pointer;
        margin: 0;
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
        align-items: center;
        background: #f2f2f2;
        border-bottom: 1px solid #CCCCCC;
        box-shadow: 0 1em 1em -1.5em rgba(0, 0, 0, 0.33);
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .empty-row {
        align-items: center;
        display: flex;
        justify-content: center;
        min-height: 50vh;
    }

    .empty-row p {
        color: #999999;
        font-size: 1.5em;
        font-weight: 400;
    }

    @media screen and (max-width: 991px) {
        .row {
            padding: 0 2em;
        }
    }

    @media screen and (max-width: 767px) {
        .row {
            display: block;
            padding: 0 1em;
        }

        .row.button-row {
            background: #FFFFFF;
        }
    }
</style>
