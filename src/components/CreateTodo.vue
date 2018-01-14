<template>
    <div class="create-form">
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
    </div>
</template>

<script>
  export default {
    data() {
      return {
        titleText: '',
        descriptionText: '',
        isCreating: false,
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
    },
  };
</script>

<style>
    .create-form {
        align-items: flex-end;
        background: #CCCCCC;
        display: flex;
        margin: 0 0 4.5em;
        padding: 2em;
        width: 100%;
    }

    .create-form .primary {
        max-width: 10em;
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
        border: 0 none;
        border-radius: 0.25em;
        font-size: 1em;
        line-height: 1;
        padding: 1em;
        width: 100%;
    }
</style>
