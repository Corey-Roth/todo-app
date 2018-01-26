<template>
    <div class="ui card" v-if="todo.title.length">
        <transition name="fade" mode="out-in">
            <div class="content" v-if="!isEditing" key="saved">
                <div class="header">
                    <div class="row">
                        <p class="projects">
                            {{ todo.project }}
                        </p>
                        <p class="date">
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
                    <div class="ui two button attached buttons">
                        <button class="primary" v-on:click="hideForm">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <div class="content buttons">
            <div class="buttons-main">
                <transition name="fade" mode="out-in">
                    <div class="completed" v-if="!isEditing && todo.done" disabled>
                        Completed
                    </div>
                    <div class="primary" v-on:click="completeTodo(todo)" v-if="!isEditing && !todo.done">
                        Done
                    </div>
                </transition>
                <transition name="fade" mode="out-in">
                    <div class="secondary" v-on:click="deleteTodo(todo)" v-show="!isEditing">
                        Delete
                    </div>
                </transition>
            </div>
            <span class="right floated edit icon" v-on:click="showForm">
                <img src="../assets/edit.svg"/>
            </span>
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
        ],
        data() {
          return {
            isEditing: false,
            tags: '',
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
        padding: 1.5em 0 0;
        position: relative;
        text-align: left;
        width: calc(33.33% - 1rem);
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

    .edit {
        cursor: pointer;
        height: 1.5em;
        opacity: 0.66;
    }

    .edit:hover {
        opacity: 1;
    }

    .edit img {
        height: 1.5rem;
        width: 1.5rem;
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
        align-items: center;
        border-radius: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 0.25em 0;
        width: 100%;
    }

    .list .content {
        margin-bottom: 1em;
        padding: 0 4.5em;
        width: calc(100% - 12em);
    }

    .list .footer {
        padding: 0.5rem 4.5rem;
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

    .list .projects {
        margin-bottom: 0.5em;
    }

    .list .buttons {
        padding: 0;
        width: auto;
    }

    .date {
        font-size: 14px;
        font-weight: 600;
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
