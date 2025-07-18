<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script setup>
defineOptions({
    name: 'MyButton'
})
</script>

<style scoped>
.btn {
    padding: 10px 10px;
    background: none;
    color: teal;
    border: 1px solid teal;
    margin: 10px;
}
.create {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>