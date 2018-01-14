<template>
    <div class="create">
            <div class="create-form"  v-bind:class="{ active: isActive }">
                <h2 class='mobile-only'>Add a new task</h2>
                <div class="field">
                    <label>Title</label>
                    <input v-model="titleText" type="text" class="styled-input">
                </div>
                <div class="field">
                    <label>Description</label>
                    <input v-model="descriptionText" type="text" class="styled-input">
                </div>
                <button class="primary" v-on:click="sendForm()">
                    Create
                </button>
                <button class="secondary mobile-only" v-on:click="toggleForm">Cancel</button>
            </div>
        <button class="toggle-form mobile-only" v-on:click="toggleForm">+</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        titleText: '',
        descriptionText: '',
        isCreating: false,
        isActive: false,
      };
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
        background: #ffffff;
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.16);
        display: flex;
        margin: 0 0 4.5em;
        padding: 2em 4.5em;
        text-align: left;
        width: 100%;
    }

    .create-form .primary {
        font-size: 1.5em;
        font-weight: 700;
        max-width: 10em;
        padding: 0.75rem 1rem;
    }

    .field {
        text-align: left;
        padding: 0 0.5em;
        width: calc(50% - 80px);
    }

    .field label {
        color: #333333;
        display: block;
        font-weight: 700;
        font-size: 1.125em;
        margin-bottom: 0.5em
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

    .toggle-form {
        background: #FFFFFF;
        border: 0 none;
        border-radius: 0.5em;
        bottom: 0.33em;
        box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        color: #333333;
        font-size: 3em;
        line-height: 1;
        height: 1em;
        position: fixed;
        right: 0.33em;
        width: 1em;
        z-index: 2;
    }

    .toggle-form:hover {
        box-shadow: 0 4px 4px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
        color: #e41f35;
        cursor: pointer;
    }

    .create-form h2 {
        border-bottom: 1px solid #CCCCCC;
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

    @media screen and (max-width: 840px) {
        .create-form {
            background: #ffffff;
            bottom: 0;
            display: none;
            left: 0;
            margin: 0;
            opacity: 0;
            padding: 2em;
            position: fixed;
            right: 0;
            top: 0;
            transform: all 300ms ease;
            z-index: 3;
        }

        .active.create-form {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            opacity: 1;
        }

        .mobile-only {
            display: block;
        }

        .toggle-form {
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
