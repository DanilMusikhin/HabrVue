<template>
    <div>
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
        <!-- Постраничный вывод постов -->
        <page-changer :totalPages="totalPages" :page="page" ref="observerTarget"/> 
        <div ref="observerTarget"></div>
    </div>
    
</template>

<script setup>
import PostForm from '@/components/PostForm.vue'
import PostLists from '@/components/PostLists.vue'
import PageChanger from '@/components/PageChanger.vue'
import { computed, onMounted, ref, watch} from 'vue'
import axios from 'axios'

const posts = ref([])
const dialogVisible = ref(false)
const selectedSort = ref('')
const sortOptions = ref([
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По содержимому'}
])
const searchQuery = ref('')
const page = ref(0)
const limit = 10
const totalPages = ref(0)
const isPostLoading = ref(true)
const observerTarget = ref(null)

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

function changePage(pageNumber) {
    page.value = pageNumber
}

async function loadMorePosts() {
    try {
        page.value += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _page: page.value,
                _limit: limit,
            }
        })
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
        posts.value = [...posts.value, ...response.data]
    } catch (e) {
        alert('Ошибка запроса к https://jsonplaceholder.typicode.com/posts')
    } finally {
        isPostLoading.value = false
    }
}

onMounted(async () => {
    await loadMorePosts()
    const options = {
        rootMargin: '0px',
        threshold: 1.0
    }
    const callback = async (entries, observer) => {
        if (entries[0].isIntersecting && page.value < totalPages.value) { // только при входе
            await loadMorePosts()
        }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(observerTarget.value)
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

// watch(page, async() => {
//     await fetchPosts()
// })
</script>

<style>
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
    margin-right: 10px;
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.current-page {
    border: 4px solid teal;
}
</style>