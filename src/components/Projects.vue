<template>
	<div class="projects active">
		<ul class="project-list">
			<li v-for="(project, index) in $store.state.projects" :project.sync="project">
				{{ project.name }}
			</li>
		</ul>
		<div class="new-project" v-if="addingProject">
			<input class="styled-input" v-model="projectName" type="text"/>
			<button class="primary" v-on:click="sendNewProject">Start project</button>
		</div>
		<button class="secondary" v-if="!addingProject" v-on:click="toggleProjects">+ New project</button>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'projects',
        props: [
        	'isOpen',
        	'projects',
    	],
        data() {
          return {
            addingProject: false,
            projectName: '',
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
          sendNewProject(projectName) {
          	if (this.projectName.length > 0) {
          		const name = this.projectName;
          		var obj = {
          			name,
          		}
          		this.$store.commit('addProject', obj);
          		this.addingProject = !this.addingProject;
          		console.log(this.$store.state.projects);
          	}
          },
    	},
    }
</script>

<style>

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
</style>
