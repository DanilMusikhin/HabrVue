<template>
    <div class="post">
        <div>
            <div><strong>Индетификатор:</strong> {{ props.post.id }}</div>
            <div><strong>Название:</strong> {{ props.post.title }}</div>
            <div><strong>Описание:</strong> {{ props.post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
            <my-button @click="emit('remove', props.post.id)">Удалить</my-button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['remove'])
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns{
    display: flex;
    align-items: center;
}
</style>