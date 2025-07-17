<template>
    <div class="app">
        <h1>Хабр2.0</h1>
        <my-button @click="showDialog" :class="`create`">Создать пост</my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-lists :posts="posts" @remove="removePost"/>
    </div>
    
</template>

<script setup>
import PostForm from './components/PostForm.vue'
import PostLists from './components/PostLists.vue'
import { ref } from 'vue'
import axios from 'axios'

const posts = ref([
    {id: 1, title: 'Что-то', body: 'нужно'},
    {id: 2, title: 'Кто-то', body: 'есть'},
    {id: 3, title: 'Где-то', body: 'будет'},
])
const dialogVisible = ref(false)
fetchPosts()

function createPost(post) {
    posts.value.push(post.value)
    dialogVisible.value = false
}

function removePost(id) {
    posts.value = posts.value.filter(post => post.id !== id)
}

function showDialog() {
    dialogVisible.value = true
}

async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        posts.value = response.data;
    } catch (e) {
        alert('Ошибка запроса к https://jsonplaceholder.typicode.com/posts')
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
form {
    display: flex;
    flex-direction: column;
}
</style>