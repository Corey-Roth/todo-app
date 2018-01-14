<template>
  <div class="ui centered card">
    <div class="content" v-show="!isEditing">
      <div class="header">
          {{ todo.title }}
      </div>
      <div class="meta">
          {{ todo.project }}
      </div>
      <div class="extra content">
          <span class="right floated edit icon" v-on:click="showForm">
          <i class="edit icon"></i>
        </span>
        <span class="right floated trash icon" v-on:click="deleteTodo(todo)">
          <i class="trash icon"></i>
        </span>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="todo.title" >
        </div>
        <div class="field">
          <label>Project</label>
          <input type="text" v-model="todo.project" >
        </div>
        <div class="ui two button attached buttons">
          <button class="ui basic blue button" v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>
    <div class="completed" v-show="!isEditing && todo.done" disabled>
        Completed
    </div>
    <div class="active" v-on:click="completeTodo(todo)" v-show="!isEditing && !todo.done">
        Complete this task
    </div>
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
        border-radius: 0.25em;
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        display: inline-block;
        margin: 0 1em;
        padding: 2em;
        width: 25%;
    }

    .card:hover {
        box-shadow: 0 4px 4px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
    }

    .active {
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

    .active:hover {
        background: #8B0000;
        box-shadow: 0 0 0 0;
        transform: translatey(1px);
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

    .content {
        margin-bottom: 1em;
    }

    .header {
        font-size: 2em;
        font-weight: 300;
        line-height: 90%;
        margin-bottom: 0.5rem;
    }
</style>
