<template>
    <div>
        <!-- <h1> {{ $store.state.post.limit }} </h1> -->
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
        <div v-intersection="loadMorePosts"></div>
    </div>
</template>

<script setup>
import PostForm from '@/components/PostForm.vue'
import PostLists from '@/components/PostLists.vue'
import PageChanger from '@/components/PageChanger.vue'
import { computed, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// actions
const loadMorePosts = () => store.dispatch('post/loadMorePosts')
// getters
const sortedAndSearchPosts = computed(() => store.getters['post/sortedAndSearchPosts'])
// state
const posts = computed({
    get: () => store.state.post.posts,
    set: (value) => store.commit("post/setPosts", value)
})
const dialogVisible = computed({
    get: () => store.state.post.dialogVisible,
    set: (value) => store.commit("post/setDialogVisible", value)
})
const selectedSort = computed({
    get: () => store.state.post.selectedSort,
    set: (value) => store.commit("post/setSelectedSort", value)
})
const sortOptions = computed(() => store.state.post.sortOptions)
const searchQuery = computed({
    get: () => store.state.post.searchQuery,
    set: (value) => store.commit("post/setSearchQuery", value)
})
const isPostLoading = computed(() => store.state.post.isPostLoading)
const totalPages = computed(() => store.state.post.totalPages)
const page = computed({
    get: () => store.state.post.page,
    set: (value) => store.commit("post/setPage", value)
})


function createPost(post) {
    posts.value.push(value)
    dialogVisible.value = false
}

function removePost(id) {
    posts.value = posts.filter(post => post.id !== id)
}

function showDialog() {
    dialogVisible.value = true
}

onMounted(async () => {
    await loadMorePosts()
})
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