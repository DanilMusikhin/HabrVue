<template>
    <div>
        <h1>{{ $store.state.isAuth ? "Авторизован": "Авторизуйся!!!" }}</h1>
        <h1>Лайки: {{ $store.getters.doubleLikes }}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
        </div>
    </div>
</template>

<script setup>
</script>