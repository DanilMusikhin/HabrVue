import About from "@/components/About.vue";
import Main from "@/pages/Main.vue";
import PostPage from "@/pages/PostPage.vue";
import PostsPage from "@/pages/PostsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router