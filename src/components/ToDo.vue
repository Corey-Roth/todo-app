<template>
    <div class="ui card">

        <transition name="fade" mode="out-in">
            <div class="content" v-if="!isEditing" key="saved">
                <div class="header">
                    {{ todo.title }}
                    <span class="right floated edit icon" v-on:click="showForm">
                        <i class="edit icon"><img src="../assets/edit.svg"/></i>
                    </span>
                </div>
                <div class="meta">
                    {{ todo.description }}
                </div>
            </div>

            <div class="content horz" v-if="isEditing" key="edited">
                <div class="form stacked">
                    <div class="field">
                        <label>Title</label>
                        <input type="text" v-model="todo.title" class="styled-input dark">
                    </div>
                    <div class="field">
                        <label>Project</label>
                        <input type="text" v-model="todo.description" class="styled-input dark">
                    </div>
                    <div class="ui two button attached buttons">
                        <button class="primary" v-on:click="hideForm">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade" mode="out-in">
            <div class="completed" v-if="!isEditing && todo.done" disabled>
                Completed
            </div>
            <div class="primary" v-on:click="completeTodo(todo)" v-if="!isEditing && !todo.done">
                Complete this task
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div class="secondary" v-on:click="deleteTodo(todo)" v-show="!isEditing">
                Delete
            </div>
        </transition>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['todo'],
        data() {
          return {
            isEditing: false,
          };
        },
        methods: {
          completeTodo(todo) {
            this.$emit('complete-todo', todo);
          },
          deleteTodo(todo) {
            this.$emit('delete-todo', todo);
          },
          showForm() {
            this.isEditing = true;
          },
          hideForm() {
            this.isEditing = false;
          },
        },
    };
</script>

<style>
    .card {
        background: #FFFFFF;
        border-radius: 0.25em;
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        display: inline-block;
        margin: 0.5em;
        padding: 2em;
        position: relative;
        text-align: left;
        width: calc(25% - 1rem);
    }

    .list {
        display: block;
        padding: 0;
    }

    .list .card {
        align-items: center;
        border-radius: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 0.25em 0;
        padding: 1.5em 4.5em;
        width: 100%;
    }

    .list .content {
        margin-bottom: 0;
        width: calc(100% - 12em);
    }

    .list .primary, .list .secondary, .list .completed {
        max-width: 12em;
    }

    .list .secondary {
        display: inline-block;
        max-width: none;
        padding: 1em 0 0;
        text-align: left;
        width: calc(100% - 12em);
    }

    .list .edit {
        margin-left: 0.5rem;
        position: static;
    }

    .list .header {
        justify-content: flex-start;
    }

    .card:hover {
        box-shadow: 0 4px 4px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
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

    .content {
        margin-bottom: 1em;
    }

    .header {
        display: flex;
        justify-content: space-between;
        font-size: 2em;
        font-weight: 300;
        line-height: 90%;
        margin-bottom: 0.5rem;
    }

    .edit {
        cursor: pointer;
        opacity: 0.66;
        position: relative;
        right: -0.5rem;
        top: -0.5rem;
    }

    .edit:hover {
        opacity: 1;
    }

    .edit img {
        width: 1.5rem;
    }

    .dark {
        border: 1px solid #cccccc;
        margin-bottom: 1.5em;
        padding: 0.5em 1em;
    }

    .list .stacked {
        align-items: flex-end;
        display: flex;
        margin: 0;
    }

    .list .stacked .field {
        padding: 0 0.5em;
        width: 50%;
    }

    .list .dark {
        margin-bottom: 0;
        padding: 1em;
    }

    .list .horz {
        width: 100%;
    }

    .stacked {
        display: block;
        margin-bottom: -1em;
        margin-left: -1em;
        margin-right: -1em;
        margin-top: -1em;
    }

    .stacked .primary {
        margin-bottom: 0;
    }

    .stacked .field {
        padding: 0;
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 100ms ease-out;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    @media screen and (max-width: 1024px) {
        .card {
            margin: 0 0.5rem 1rem;
            width: calc(50% - 1rem);
        }
    }

    @media screen and (max-width: 991px) {
        .list .card {
            padding: 1.5em 2em;
        }
    }

    @media screen and (max-width: 767px) {
        .card {
            border-radius: 0.25em;
            margin: 0 0 0.5rem;
            width: 100%;
        }

        .list .card {
            display: block;
            padding: 1.5em 1em;
        }

        .list .stacked {
            display: block;
        }

        .list .stacked .field {
            padding: 0;
            width: 100%;
        }

        .list .two .primary {
            max-width: 100%;
        }

        .list .content {
            margin-bottom: 2em;
            width: 100%;
        }

        .list .edit {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
        }

        .list .primary, .list .secondary, .list .completed {
            display: inline-block;
            padding: 1em;
            max-width: calc(75% - 1em);
        }

        .list .secondary {
            max-width: 25%;
        }
    }

    @media screen and (max-width: 540px) {
        .card .header {
            font-size: 1.5em;
        }
    }
</style>
