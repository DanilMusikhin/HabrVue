<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content"> 
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineOptions({
    name: "MyDialog"
})

defineProps({
    show: {
        type: Boolean,
        required: true,
    }
})

const emit = defineEmits(['update:show'])

function hideDialog() {
    emit('update:show', false)
}
</script>   

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
    margin: 15px 0;
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px; /* Закругление краев */
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>