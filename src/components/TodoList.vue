<template>
    <div class="todo-list">
        <div class="row button-row">
            <h1>Corey's to-do list</h1>
            <button v-on:click="toggleTheView()" class="toggle" v-bind:class="{ list: viewStatus }">
                <img src="../assets/list-view.svg"/>
            </button>
            <button v-on:click="toggleTheView()" class="toggle" v-bind:class="{ list: !viewStatus }">
                <img src="../assets/grid-view.svg"/>
            </button>
        </div>
        <div class="row empty-row" v-if="todos.length < 2">
            <img src="../assets/new-task.svg"/>
            <p>Get started by adding a task.</p>
        </div>
        <transition fade mode="out-in">
            <div class="row card-row" v-bind:class="{ list: viewStatus }">
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
      props: [
        'todos',
        'isList',
        ],
      components: {
        Todo,
      },

      data() {
        return {
        };
      },
        computed: {
            theCount() {
                return this.$store.state.listCount;
            },
            viewStatus() {
                return this.$store.state.isList;
            },
            ...mapState([
                'store',
            ]),
        },
      methods: {
        deleteTodo(todo) {
            const todoIndex = this.todos.indexOf(todo);
            this.todos.splice(todoIndex, 1);
        },
        completeTodo(todo) {
          const todoIndex = this.todos.indexOf(todo);
          this.todos[todoIndex].done = true;
          sweetalert('Success!', 'To-Do completed!', 'success');
        },
        toggleTheView() {
            this.$store.commit('toggleView');
        },
      },
    };
</script>

<style>

    .todo-list {
        //max-width: 95rem;
        padding-left: 15rem;
    }

    .todo-list .row {
        //max-width: 76em;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        max-width: 80em;
        padding: 0 4.5em;
        width: 100%;
    }

    .card-row {
        align-items: flex-start;
    }

    .card-row.list {
        max-width: 48em;
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

    .toggle:last-of-type, .toggle.list:last-of-type {
        padding-right: 0;
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

    .row.empty-row {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 30vh;
        padding: 10vh 0;
    }

    .empty-row img {
        height: auto;
        transform: translateX(1em);
        width: 15em;
    }

    .empty-row p {
        color: #999999;
        font-size: 1.5em;
        font-weight: 400;
        margin: 0;
        width: 100%;
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
            max-width: calc(100vw - 2em);
            padding: 1em 0;
        }

        .todo-list {
            padding: 1em 0 0;
        }
    }
</style>
