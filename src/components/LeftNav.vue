<template>
	<div class="left-nav" v-bind:class="{ open:openStatus }">
		<nav class="actions">
			<h2 class="active">Projects</h2>
			<h2>Tags</h2>
			<div class="projects active">
				<div class="new-project" v-if="addingProject">
					<input class="styled-input" />
					<button class="primary" v-on:click="toggleProjects">Start project</button>
				</div>
				<button class="secondary" v-if="!addingProject" v-on:click="toggleProjects">+ New project</button>
			</div>
			<div class="tags">
				<button class="secondary">+ New tag</button>
			</div>
		</nav>

		<nav class="views">
			<ul>
				<li>Due today</li>
				<li>Due this week</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
        props: ['isOpen'],
        data() {
          return {
            addingProject: false,
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
          toggleProjects() {
            this.addingProject = !this.addingProject;
          },
    	}
    }
</script>

<style>
	.left-nav {
		background: #FFFFFF;
		border-right: 1px solid #CCCCCC;
		bottom: 0;
		//box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
		display: flex;
		flex-direction: column;
		left: 0;
		justify-content: space-between;
		padding: 7em 1em 1em;
		position: fixed;
		text-align: left;
		top: 0;
		width: 15em;
	}

	.left-nav ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	.left-nav li {
		padding: 0.5em 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
	}

	.actions h2 {
		border-bottom: 1px solid #CCCCCC;
		font-size: 1em;
		padding-bottom: 0.25em;
		width: 50%;
	}

	.actions .secondary {
		background: none;
		border: 0 none;
		color: #e41f35;
		padding: 1em 0;
		text-align: left;
		width: auto;
	}

	.actions h2.active {
		border-bottom: 2px solid #e41f35;
	}

	.left-nav .views {
		border-top: 1px solid #CCCCCC;
		padding-top: 1em;
	}

	.left-nav .projects, .left-nav .tags {
		display: none;
		width: 100%;
	}

	.actions .active {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	/* new project */
	.new-project {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
	}

	.new-project .styled-input {
		font-size: 0.875rem;
		padding: 0.5rem 0.25rem;
		width: 100%;
	}

	.new-project .primary {
		font-size: 0.875rem;
		font-weight: 600;
		margin: 1em 0 2em;
		width: auto;
	}

	@media (max-width: 767px) {
		.left-nav {
			display: none;
		}

		.left-nav.open {
			display: flex;
		}
	}
</style>