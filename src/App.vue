<template>
    <div class="app">
        <h1>Хабр2.0</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="showDialog" :class="`create`">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-lists :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostLoading"/>
        <div v-else>Идет загрузка...</div>
        <div class="page__wrapper">
            <div v-for="page in totalPage" :key="page" class="page">{{ page }}</div>
        </div>
    </div>
    
</template>

<script setup>
import PostForm from './components/PostForm.vue'
import PostLists from './components/PostLists.vue'
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'

const posts = ref([])
const dialogVisible = ref(false)
const selectedSort = ref('')
const sortOptions = ref([
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По содержимому'}
])
const searchQuery = ref('')
const page = ref(1)
const limit = ref(10)
const totalPage = ref(0)
const isPostLoading = ref(true)

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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: page.value,
                _limit: limit.value,
            }
        })
        totalPage.value = Math.ceil(response.headers['x-total-count'] / limit.value)
        posts.value = response.data;
        isPostLoading.value = false;
    } catch (e) {
        alert('Ошибка запроса к https://jsonplaceholder.typicode.com/posts')
    }
}

onMounted(async () => {
    await fetchPosts()
})

// 
// ### Дале показаны 2 варианта отслеживания сортировки массива по фильтру ###
// 

// watch(selectedSort, () => {
//     posts.value.sort((post1, post2) => {
//         return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
//     })
// })

const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => post1[selectedSort.value.toLowerCase()]?.localeCompare(post2[selectedSort.value.toLowerCase()]))
})

// 
// 
// 

const sortedAndSearchPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.includes(searchQuery.value))
})
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
.app__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 7px;
}
.current_page {
    border: 2px solid teal;
}
</style>