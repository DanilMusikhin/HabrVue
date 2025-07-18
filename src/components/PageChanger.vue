<template>
    <div class="page__wrapper">
        <div 
            v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            class="page"
            :class="{
                'current-page': pageNumber === page
            }"
            @click="emit('changePage', pageNumber)"
        >
            {{ pageNumber }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    },
    page: {
        type: Number,
        required: true
    }
})
const emit = defineEmits(['changePage'])
</script>