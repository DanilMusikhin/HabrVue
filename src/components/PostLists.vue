<template>
    <div v-if="props.posts.length > 0">
        <h3>Список постов</h3>
        <post-item v-for="post in posts" :key="post.id" :post="post" @remove="removePost"/>
    </div>
    <div v-else>
        <h3 style="color: red;">Список постов пуст</h3>
    </div>
</template>

<script setup>
import PostItem from '@/components/PostItem.vue'

const props = defineProps({
    posts: {
        type: Array
    }
})
const emits = defineEmits(["remove"])

function removePost(id) {
    emits("remove", id)
}
</script>