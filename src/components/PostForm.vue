<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input v-model="post.title" placeholder="Название"></my-input>
        <my-input v-model="post.body" placeholder="Описание"></my-input>
        <my-button :class="`flex-end`" @click="createPost">Создать</my-button>
    </form>
</template>

<script setup>
import {ref} from 'vue'

const post = ref({title: '', body: ''})
const emits = defineEmits(['create'])


function createPost() {
    post.value.id = Date.now()
    emits('create', post)
    post.value = {title: '', body: ''}
}
</script>