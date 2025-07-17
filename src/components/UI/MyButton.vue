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
    padding: 10px 5px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
.create {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>