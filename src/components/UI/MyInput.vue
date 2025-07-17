<template>
    <input v-model="modelValue" class="input" type="text">
</template>

<script setup>
defineOptions({
    name: 'MyInput'
})

const modelValue = defineModel()
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>