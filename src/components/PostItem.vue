<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong> {{ props.post.title }}</div>
            <div><strong>Описание:</strong> {{ props.post.body }}</div>
        </div>
        <my-button @click="removePost">Удалить</my-button>
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

function removePost() {
    emit('remove', props.post.id)
}
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
</style>