<template>
    <div class="create">
            <div class="action-row">
                <div class="row">
                    <button class="toggle-form" v-on:click="toggleForm" v-bind:class="{ active: isActive }">+</button>
                </div>
            </div>
            <div class="create-form"  v-bind:class="{ active: isActive }">
                <div class="create-form-inner">
                    <div class="row">
                        <h2>Add a new task</h2>
                        <div class="field">
                            <label>Title</label>
                            <input v-model="titleText" type="text" class="styled-input" tabindex="1">
                        </div>
                        <div class="field">
                            <label>Description</label>
                            <textarea v-model="descriptionText" type="text" class="styled-input" tabindex="2"></textarea>
                        </div>
                        <div class="field">
                            <label>Project</label>
                            <div class="styled-select">
                                <select>

                                </select>
                            </div>
                        </div>
                        <div class="field">
                            <label>Tags</label>
                            <div class="styled-select">
                                <select>

                                </select>
                            </div>
                        </div>
                        <button class="primary" v-on:click="sendForm()" tabindex="3">
                            Create new task
                        </button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    data() {
      return {
        titleText: '',
        descriptionText: '',
        isCreating: false,
        isActive: false,
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
      sendForm() {
        if (this.titleText.length > 0 && this.descriptionText.length > 0) {
          const title = this.titleText;
          const description = this.descriptionText;
          this.$emit('create-todo', {
            title,
            description,
            done: false,
            id: this._uid,
          });
          this.titleText = '';
          this.descriptionText = '';
          this.isCreating = false;
        }
      },
        toggleForm() {
            this.isActive = !this.isActive;
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
        //width: 71em;
        padding: 2em;
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

    .create-form .primary {
        font-size: 1.5em;
        font-weight: 400;
        padding: 1rem;
    }

    .field {
        text-align: left;
        margin-bottom: 1em;
        max-width: 20em;
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
        min-height: 8em;
        max-width: 100%;
        min-width: 100%;
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

    .styled-select:hover:after {
        color: #e41f35;
    }

    .styled-select select {
        background: none;
        appearance: none;
        border: 0 none;
        padding: calc(1em - 1px);
        width: 100%;
    }

    .styled-input:focus {
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
    }

    .toggle-form {
        background: #FFFFFF;
        border: 0 none;
        color: #333333;
        font-size: 3em;
        line-height: 1;
        height: 1em;
        width: 1em;
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

    .mobile-only {
        display: none;
    }

    .toggle-form {
        display: block;
    }

    @media screen and (max-width: 767px) {
        .mobile-only {
            display: block;
        }

        .create-form .primary {
            bottom: 2em;
            left: 2em;
            margin: 0;
            max-width: 100%;
            position: fixed;
            width: calc(66vw - 2em);
        }

        .create-form .secondary {
            bottom: 2em;
            padding: 2em 1em;
            position: fixed;
            right: 2em;
            width: calc(33vw - 2em);
        }

        .field {
            margin-bottom: 2em;
            padding: 0;
            width: 100%;
        }

        .create-form .styled-input {
            border: 1px solid #cccccc;
            background: #ffffff;
        }
    }
</style>
