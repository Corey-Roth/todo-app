<template>
	<div class="tags active">
		<ul class="tags-list">
			<li v-for="(tag, index) in $store.state.globalTags" :project.sync="tag.index" v-if="index > 0">
				{{ tag.name }}
			</li>
		</ul>

		<transition name="fade" mode="out-in">
			<div class="new-tag" v-if="addingTag">
				<input class="styled-input" v-model="tagName" type="text"/>
				<button class="primary" v-on:click="sendNewTag">Create tag</button>
			</div>
		</transition>

		<transition name="fade" mode="out-in">
			<button class="secondary" v-if="!addingTag" v-on:click="toggleTags">+ New tag</button>
		</transition>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'tags',
        props: [
        	'isOpen',
        	'tags',
    	],
        data() {
          return {
            addingTag: false,
            tagName: '',
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
          toggleTags() {
            this.addingTag = !this.addingTag;
          },
          sendNewTag(tagName) {
          	if (this.tagName.length > 0) {
          		const name = this.tagName;
          		const id = this._uid;
          		var obj = {
          			name,
          			id,
          		}
          		this.$store.commit('addGlobalTag', obj);
          		this.addingTag = !this.addingTag;
          	}
          },
    	},
    }
</script>

<style>

	/* new project */
	.new-tag {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
	}

	.new-tag .styled-input {
		font-size: 0.875rem;
		padding: 0.5rem 0.25rem;
		width: 100%;
	}

	.new-tag .primary {
		font-size: 0.875rem;
		font-weight: 600;
		margin: 1em 0 2em;
		width: auto;
	}

	.tag-list {
		max-height: 10em;
		overflow-y: auto;
	}
</style>
