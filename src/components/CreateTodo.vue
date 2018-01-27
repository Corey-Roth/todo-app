<template>
    <div class="create">
            <div class="action-row">
                <div class="row">
                    <button class="toggle-menu mobile-only" v-on:click="openTheMenu()" v-bind:class="{ open:openStatus }">
                        <img src="../assets/menu.svg"/>
                    </button>
                    <button class="toggle-form" v-on:click="toggleForm" v-bind:class="{ active: isActive }">+</button>
                </div>
            </div>

            <div class="create-form"  v-bind:class="{ active: isActive }">
                <transition name="slide" mode="out-in">
                    <div class="create-form-inner" v-show="{ active: isActive }">
                        <div class="row">
                            <h2>Add a new task</h2>
                            <div class="field">
                                <label>Title</label>
                                <input v-model="titleText" type="text" class="styled-input" tabindex="1">
                            </div>
                            <div class="field">
                                <input type="date" v-model="dueDate" class="datepicker styled-input" tabindex="2">
                            </div>
                            <div class="field">
                                <label>Description</label>
                                <textarea v-model="descriptionText" type="text" class="styled-input" tabindex="3"></textarea>
                            </div>
                            <div class="field hidden-mobile"  v-if="$store.state.projects.length > 1">
                                <label>Project</label>
                                <div class="styled-select">
                                    <select v-model="project" tabindex="4">
                                        <option v-for="(project, index) in $store.state.projects" v-if="index > 0">
                                            {{ project.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="field hidden-mobile" v-if="$store.state.globalTags.length > 1">
                                <label>Tags</label>
                                <div class="checkbox-group" v-model="tags">
                                    <div class="styled-checkboxes" v-for="(tags, index) in $store.state.globalTags" v-if="index > 0">
                                        <input type="checkbox" name="tags" :id="tags.name" :value="tags.id"/><label :for="tags.name">{{ tags.name }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="button-row">
                                <button class="primary small" v-on:click="sendForm()" tabindex="6">
                                    Create new task
                                </button>
                                <button class="secondary" v-on:click="toggleForm" tabindex="7">Cancel</button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    props: [
        'isOpen',
        'projects',
        'globalTags',
        'todoStore',
    ],
    data() {
      return {
        titleText: '',
        dueDate: '',
        descriptionText: '',
        project: '',
        tags: '',
        isCreating: false,
        isActive: false,
      };
    },
    computed: {
        openStatus() {
            return this.$store.state.isOpen
        },
        ...mapState([
            'store',
        ]),
    },
    methods: {
      sendForm() {
        if (this.titleText.length > 0 && this.descriptionText.length > 0) {
          const title = this.titleText;
          const description = this.descriptionText;
          const project = this.project;
          const tags = this.tags;
          const dueDate = this.dueDate;
          this.$emit('create-todo', {
            title,
            dueDate,
            description,
            project,
            tags,
            done: false,
            id: this._uid,
          });
          this.titleText = '';
          this.dueDate = '';
          this.descriptionText = '';
          this.isCreating = false;
          this.project = '';
          this.tags = '';
          this.isActive = !this.isActive;
        }
      },
        toggleForm() {
            this.isActive = !this.isActive;
        },
        openTheMenu() {
            this.$store.commit('toggleMenu');
        },
    },
  };
</script>

<style>
    .create-form {
        align-items: flex-end;
        background: rgba(255, 255, 255, 0.66);
        bottom: 0;
        display: none;
        left: 0;
        opacity: 0;
        padding-top: 1em;
        position: fixed;
        right: 0;
        text-align: left;
        top: 3em;
        transform: all 300ms ease;
        width: 100%;
        z-index: 2;
    }

    .active.create-form {
        align-items: flex-start;
        display: flex;
        justify-content: center;
        opacity: 1;
    }

    .create-form-inner {
        background: #FFFFFF;
        border-radius: 0.25em;
        border-top: 0 none;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
        padding: 2em;
        width: 24em;
    }

    .create-form-inner .row {
        flex-direction: column;
        flex-wrap: wrap;
        max-width: 76em;
        padding: 0;
    }

    .create-form .row {
        align-items: flex-end;
    }

    .small {
        font-size: 1.125em;
        font-weight: 400;
        padding: 1rem;
    }

    .create-form .button-row {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    .create-form .primary {
        margin: 0;
        max-width: 10em;
        width: auto;
    }

    .create-form .secondary {
        margin: 0;
        padding: 1rem;
        width: auto;
    }

    .field {
        text-align: left;
        margin-bottom: 1em;
        max-width: 30em;
        width: 100%;
    }

    .field label {
        color: #333333;
        display: block;
        font-weight: 300;
        font-size: 1.125em;
        margin-bottom: 0.25em
    }

    .styled-input {
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        border-radius: 0.25em;
        font-size: 1em;
        line-height: 1;
        padding: calc(1em - 1px);
        width: 100%;
    }

    textarea.styled-input {
        font-family: 'myriad-pro','Myriad Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
        min-height: 8em;
        max-width: 100%;
        min-width: 100%;
    }

    .datepicker {
        font-family: 'myriad-pro','Myriad Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    }

    .styled-select {
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        border-radius: 0.25em;
        position: relative;
    }

    .styled-select:after {
        font-size: 1.25em;
        content: "\25BC";
        line-height: 1;
        position: absolute;
        right: 0.5rem;
        top: 0.66rem;
    }

    .disabled {
        background: #ebebeb;
        cursor: not-allowed;
    }

    .styled-select:hover:after {
        color: #e41f35;
    }

    .disabled:hover:after {
        color: #333333;
    }

    .styled-select select {
        background: none;
        appearance: none;
        border: 0 none;
        font-size: 1em;
        padding: calc(0.5em - 1px);
        width: 100%;
    }

    .styled-input:focus {
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
    }

    .toggle-form {
        background: #FFFFFF;
        border: 0 none;
        color: #333333;
        font-size: 2.75em;
        line-height: 1;
        height: 1em;
        padding: 0;
    }

    .toggle-form:hover, .toggle-form.active {
        color: #e41f35;
        cursor: pointer;
    }

    .action-row {
        background: #FFFFFF;
        box-shadow: 0 4px 4px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        display: flex;
        left: 0;
        padding-left: 15rem;
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        z-index: 3;
    }

    .action-row .row {
       justify-content: flex-end;
    }

    .create-form h2 {
        border-bottom: 1px solid #CCCCCC;
        box-shadow: 0 0.75rem 0.5rem -1rem rgba(0, 0, 0, 0.33);
        font-size: 2em;
        font-weight: 300;
        margin: 0 0 0.5em;
        padding-bottom: 0.5rem;
        width: 100%;
    }

    .modal-enter-active, .modal-leave-active {
      transition: opacity 100ms ease-out;
    }

    .modal-enter, .modal-leave-to {
      opacity: 0;
    }

    .slide-enter-active, .slide-leave-active {
      transition: all 300ms ease;
    }

    .slide-enter {
      opacity: 0;
      transform: translateY(-2em);
    }

    .slide-enter-to {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-leave-to {
        opacity: 1;
        transform: translateY(-2em);
    }

    .mobile-only {
        display: none;
    }

    .toggle-form {
        display: block;
    }

    .toggle-menu {
        background: none;
        border: 0 none;
    }

    /*Checkboxes*/
    .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -0.25rem;
    }

    .styled-checkboxes {
        font-size: 1.125em;
        line-height: 90%;
        padding: 0 0.25rem;
    }

    .styled-checkboxes input {
        border: 0 none;
        height: 0;
        padding: 0;
        position: absolute;
        width: 0;
        z-index: -1;
    }

     .styled-checkboxes label {
        line-height: 90%;
     }

    .styled-checkboxes label:before {
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        content: "";
        display: inline-block;
        height: 1rem;
        line-height: 90%;
        margin-right: 4px;
        padding: 0 0 0 2px;
        position: relative;
        top: 3px;
        width: calc(1rem - 2px);
    }

    .styled-checkboxes input:checked + label:before {
        background: #ccc;
        //content: '✔';
    }


    @media screen and (max-width: 767px) {
        .mobile-only {
            display: block;
        }

        .create-form h2 {
            font-size: 1.25em;
        }

        .field {
            margin-bottom: 2em;
            padding: 0;
            width: 100%;
        }

        .action-row .row {
            display: flex;
            justify-content: space-between;
        }

        .create-form {
            padding-top: 0;
        }

        .create-form.active {
            position: fixed;
            top: 3em;
        }

        .create-form .styled-input {
            border: 1px solid #cccccc;
            background: #ffffff;
        }

        .create-form-inner {
            border-radius: 0;
            box-shadow: 0 0 0 0;
            padding: 1em 2em;
        }

        .hidden-mobile {
            display: none;
        }

        .toggle-menu {
            padding: 1em 0;
        }
    }
</style>
