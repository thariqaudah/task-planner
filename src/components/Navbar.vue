<template>
	<nav class="navbar">
		<h1 class="nav-brand"><i class="fas fa-paper-plane"></i> TaskPlanner</h1>

		<ul>
			<li>
				<router-link :to="{ name: 'Home' }">
					All Tasks
				</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'NewTask' }" class="btn">
					<i class="fas fa-plus-circle"></i> New
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
}
</script>

<style scoped>
.navbar {
	background: #fff;
	color: var(--secondary-color);
	min-height: 7vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 8rem;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
ul {
	display: flex;
}
ul li {
	margin-left: 1.4rem;
}
a:hover {
	color: var(--primary-color);
}
</style>
