<template>
	<nav class="left-nav" v-bind:class="{ open:isOpen }">
		<div class="actions">
			<h2 class="active">Projects</h2>
			<h2>Tags</h2>
			<div class="projects active">
				<button class="secondary">+ New project</button>
			</div>
			<div class="tags">
				<button class="secondary">+ New tag</button>
			</div>
		</div>

		<ul class="views">
			<li>Due today</li>
			<li>Due this week</li>
		</ul>
	</nav>
</template>

<script>

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
	}

	@media (max-width: 767px) {
		.left-nav {
			display: none;
		}
	}
</style>