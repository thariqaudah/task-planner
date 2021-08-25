import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewTask from '../views/tasks/NewTask.vue'
import EditTask from '../views/tasks/EditTask.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/new',
		name: 'NewTask',
		component: NewTask,
	},
	{
		path: '/edit/:id',
		name: 'EditTask',
		component: EditTask,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
