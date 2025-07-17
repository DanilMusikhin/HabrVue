<template>
    <div v-if="props.posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="list">
            <post-item v-for="post in posts" :key="post.id" :post="post" @remove="removePost"/>
        </transition-group>
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

<style scoped>
/* Специальные классы для списков во Vue */
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
</style>