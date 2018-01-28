<template>
    <div class="header">
        <div class="row" v-if="todo.project.length || todo.dueDate.length">
            <div class="header-left" v-if="!isEditing && todo.project.length || viewStatus">
                <div class="todo-done" v-on:click="completeTodo(todo)" v-if="!isEditing && !todo.done && viewStatus"></div>
                <div class="completed" v-if="!isEditing && todo.done && viewStatus" disabled>
                    <img src="../assets/checked.svg"/>
                </div>
                <p class="projects" v-if="todo.project.length">
                    {{ todo.project }}
                </p>
            </div>
            <p class="date" v-if="todo.dueDate.length && todo.project.length">
                {{ todo.dueDate }}
            </p>
            <p class="date left" v-if="todo.dueDate.length && todo.project.length < 1">
                {{ todo.dueDate }}
            </p>
        </div>
        <div class="header-row">
            {{ todo.title }}
        </div>
    </div>
</template>

<script type = "text/javascript" >
 export default {
        props: [
            'todo',
            'projects',
            'isList',
        ],
        data() {
          return {
            isEditing: false,
          };
        },
        computed: {
            viewStatus() {
                return this.$store.state.isList;
            },
        },
        methods: {
          completeTodo(todo) {
            this.$emit('complete-todo', todo);
          },
        },
    };
</script>

<style>
   .header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        font-size: 2em;
        font-weight: 300;
        line-height: 90%;
        margin-bottom: 0.5rem;
    }

    .header p {
        margin: 0;
    }

    .header .row {
        border-bottom: 1px solid #CCCCCC;
        justify-content: space-between;
        margin-bottom: 0.5em;
        padding: 0 0 0.25rem;
    }

   .header-row {
        width: 100%;
    }

    .header-left {
    	width: 66.66%;
    }

    .header .projects {
        color: #847974;
        font-size: 14px;
        font-weight: 700;
        position: relative;
    }

    .header .date {
        text-align: right;
        width: 33.33%;
    }

    .date {
        font-size: 14px;
        font-weight: 600;
    }

    .date.left {
        text-align: left;
    }


    /* List view */
   .list .header {
        justify-content: flex-start;
    }

    .list .projects {
        margin-bottom: 0.5em;
        width: auto;
    }

    .list .header-left {
        display: flex;
    }

    .list .left {
    	text-align: right;
    }

    /* Media queries */
    @media screen and (max-width: 540px) {
        .card .header {
            font-size: 1.5em;
        }
    }
</style>