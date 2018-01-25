<template>
	<div class="left-nav" v-bind:class="{ open:openStatus }">
		<nav class="actions">
			<h2>Projects</h2>
			<projects></projects>
			<h2>Tags</h2>
			<tags></tags>
		</nav>

		<nav class="views">
			<ul>
				<li><img src="../assets/calendar.svg"/>Due today</li>
				<li><img src="../assets/calendar.svg"/>Due this week</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import Projects from './Projects';
	import Tags from './Tags';

	export default {
        props: ['isOpen'],
        components: {
        	Projects,
        	Tags,
        },
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

	.actions h2 {
		border-bottom: 1px solid #CCCCCC;
		font-size: 1em;
		padding-bottom: 0.25em;
	}

	.actions .secondary {
		background: none;
		border: 0 none;
		color: #e41f35;
		padding: 1em 0;
		text-align: left;
		width: auto;
	}

	.left-nav .views {
		border-top: 1px solid #CCCCCC;
		padding-top: 1em;
	}

	.projects, .tags {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-bottom: 5em;
		width: 100%;
	}

	.views img {
		height: auto;
		margin-right: 0.5em;
		transform: translateY(2px);
		width: 1.25em;
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
