<script setup>
import Navbar from './components/Navbar.vue';

</script>

<template>
    <Navbar/>
    <div class="app">
        <router-view/>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
</style>