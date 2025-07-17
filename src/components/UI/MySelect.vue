<template>
    <select v-model="modelValue">
        <option disabled value="">Выберете из списка</option>
        <option v-for="option in props.options" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script setup>
defineOptions({
    name: 'MySelect'
})

const props = defineProps({
    options: {
        type: Array,
        default: () => [],
    }
})
const modelValue = defineModel()
</script>

<style scoped>
select {
    padding: 10px 5px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
</style>