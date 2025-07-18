<script setup>
import router from '@/router/router';

</script>

<template>
    <div class="navbar">
        <div>Хабр2.0</div>
        <div class="navbar__btns">
            <my-button @click="router.push('/posts')">Посты</my-button>
            <my-button @click="router.push('/about')">О сайте</my-button>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    /* box-shadow: 0 1px 7px gray; */
    border: 1px solid teal;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
</style>