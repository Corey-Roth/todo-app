<template>
    <div class="ui card" v-if="todo.title.length" v-bind:class="{ pinned:isPinned }">
        <transition name="fade" mode="out-in">
            <div class="content" v-if="!isEditing" key="saved">
                <div class="header">
                    <div class="row" v-if="todo.project.length || todo.dueDate.length">
                        <div class="header-left">
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
                <div class="description">
                    <p>{{ todo.description }}</p>
                </div>
            </div>

            <div class="content horz" v-if="isEditing" key="edited">
                <button class="close icon-btn" v-on:click="hideForm">
                    <img src="../assets/close.svg"/>
                </button>
                <div class="form stacked">
                    <div class="field">
                        <label>Title</label>
                        <input type="text" v-model="todo.title" class="styled-input dark">
                    </div>
                    <div class="field">
                        <input type="date" v-model="todo.dueDate" class="datepicker styled-input" tabindex="2">
                    </div>
                    <div class="field">
                        <label>Project</label>
                        <textarea type="text" v-model="todo.description" class="styled-input dark"></textarea>
                    </div>
                    <div class="field"  v-if="$store.state.projects.length > 1">
                        <label>Project</label>
                        <div class="styled-select">
                            <select v-model="todo.project">
                                <option v-for="(project, index) in $store.state.projects" :project.sync="project" v-if="index > 0">
                                    {{ project.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="field" v-if="$store.state.globalTags.length > 1">
                        <label>Tags</label>
                        <div class="styled-checkboxes" v-model="tags">
                                <div class="styled-checkboxes" v-for="(tags, index) in $store.state.globalTags" v-if="index > 0">
                                    <input type="checkbox" name="tags" :id="tags.name + '-card'" :value="tags.id"/>
                                    <label :for="tags.name + '-card'">{{ tags.name }}</label>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="content buttons">
            <transition name="fade" mode="out-in">
                <div class="completed" v-if="!isEditing && todo.done && !viewStatus" disabled>
                    <img src="../assets/checked.svg"/>
                </div>
                <div class="todo-done" v-on:click="completeTodo(todo)" v-if="!isEditing && !todo.done && !viewStatus">
                </div>
            </transition>
            <button class="primary save" v-on:click="hideForm" v-if="isEditing">Save</button>
            <div class="buttons-right">
                <transition name="fade" mode="out-in">
                    <div class="icon-btn" v-on:click="deleteTodo(todo)">
                        <img src="../assets/delete.svg"/>
                    </div>
                </transition>
                <span class="icon-btn" v-on:click="showForm">
                    <img src="../assets/edit.svg"/>
                </span>
                <div class="icon-btn" v-on:click="pinTodo" v-bind:class="{ pinned:isPinned }"><img src="../assets/pin.svg"/></div>
            </div>
        </div>

        <div class="footer" v-if="!isEditing && todo.tags.length">
            <p class="tags">
                {{ todo.tags }}
            </p>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: [
            'todo',
            'projects',
            'globalTags',
            'isList',
        ],
        data() {
          return {
            isEditing: false,
            isPinned: false,
            tags: '',
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
          deleteTodo(todo) {
            this.$emit('delete-todo', todo);
          },
          showForm() {
            this.isEditing = true;
          },
          hideForm() {
            this.isEditing = false;
          },
          pinTodo() {
            this.isPinned = !this.isPinned;
          }
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
        order: 1;
        padding: 1.5em 0 0;
        position: relative;
        text-align: left;
        width: calc(33.33% - 1rem);
    }

    .card.pinned {
        order: 0;
    }

    .card .content {
        padding: 0 1.5em;
    }

    .card:hover {
        box-shadow: 0 4px 4px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
    }

    .content {
        margin-bottom: 1.5em;
    }

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

    .buttons {
        align-items: center;
        display: flex;
        justify-content: space-between;
        position: relative;
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
        margin-top: 1rem;
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

    .footer {
        background: #1D83D8;
        color: #FFFFFF;
        display: flex;
        font-size: 14px;
        line-height: 1;
        margin-bottom: 0;
        margin-top: 1rem;
        padding: 0.75rem 1.5rem 0.75rem;
        text-align: left;
        width: 100%;
    }

    .header-row {
        width: 100%;
    }

    .header .projects {
        color: #847974;
        font-size: 14px;
        font-weight: 700;
        position: relative;
        width: 66.66%;
    }

    .header .date {
        text-align: right;
        width: 33.33%;
    }

    .date.left {
        text-align: left;
    }

    .footer .tags {
        margin: 0;
    }

    .card .primary, .card .secondary {
        display: inline-block;
        width: auto;
    }

    .card .secondary {
        padding: 1em;
    }

    /* List code */
    .list {
        display: block;
        padding: 0;
    }

    .list .card {
        align-items: flex-start;
        border-radius: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 0.25em 0;
        width: 100%;
    }

    .list .content {
        margin-bottom: 1em;
        padding: 0 0 0 2rem;
        width: calc(100% - 4rem);
    }

    .list .footer {
        padding: 0.5rem 4.5rem;
    }

    .list .primary, .list .secondary, .list .completed {
        max-width: 12em;
    }

    .list .header {
        justify-content: flex-start;
    }

    .list .projects {
        margin-bottom: 0.5em;
        width: auto;
    }

    .list .buttons {
        flex-direction: column;
        justify-content: flex-end;
        margin-left: 1rem;
        padding: 0;
        width: 2rem;
    }

    .list .buttons-right {
        display: flex;
        flex-direction: column;
        min-width: 1px;
    }

    .list .icon-btn {
        margin: 0.5rem 0;
    }

    .list .header-row, .list .row {
        display: flex;
    }

    .list .todo-done {
        margin-right: 0.5rem;
    }

    .list .description {
        padding-right: 2rem;
    }

    .date {
        font-size: 14px;
        font-weight: 600;
    }

    .todo-done {
        border: 2px solid #E41f35;
        display: inline-block;
        height: 1.5rem;
        line-height: 1.1;
        padding: 0;
        width: 1.5rem;
    }

    .todo-done:hover {
        cursor: pointer;
    }

    .icon-btn {
        background: none;
        border: 0 none;
        cursor: pointer;
        height: 1.5em;
        opacity: 0.33;
        width: 1.5em;
    }

    .icon-btn img {
        max-height: 100%;
        max-width: 100%;
    }

    .icon-btn:hover, .icon-btn.pinned {
        opacity: 1;
    }

    .buttons-right {
        display: flex;
        justify-content: space-between;
        min-width: 7em;
    }

    .close {
        height: 2em;
        padding: 0;
        position: absolute;
        right: 1rem;
        top: 1rem;
        width: 2em;
    }

    .save {
        margin: 0;
    }

    .list .header-left {
        display: flex;
    }

    /* Media queries */

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
