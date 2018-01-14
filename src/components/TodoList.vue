<template>

	<div class="row">
		<div class='ui centered card' v-for="todo in todos">
			<div class='content'>
				<div class='header'>
					{{ todo.title }}
				</div>
				<div class='meta'>
					{{ todo.project }}
				</div>
				<div class='extra content'>
					<span class='right floated edit icon'>
						<i class='edit icon'></i>
					</span>
				</div>
			</div>
			<button class='completed' v-show="todo.done">
				Completed
			</button>
			<button class='active' v-show="!todo.done">
				Complete
			</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['todos'],
	};
</script>

<style>

	.row {
		align-content: space-around;
		display: flex;
	}

	.ui.card {
		border-radius: 0.25em;
		box-shadow: 0 2px 2px 0 rgba(20,0,0,0.16), 0 0 0 1px rgba(20,0,0,0.08);
		display: inline-block;
		margin: 0 1em;
		padding: 2em;
		width: 25%;
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