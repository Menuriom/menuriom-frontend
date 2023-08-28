<style scoped></style>

<template>
    <label class="flex items-center gap-2 w-auto max-w-max cursor-pointer" @click="toggle()">
        <div class="relative flex items-center w-12 h-6 rounded-full" :class="[value ? 'bg-primary' : 'bg-neutral-600']">
            <b class="absolute w-4.5 h-4.5 transition-all rounded-full" :class="[value ? 'start-6 ms-0.5 bg-neutral-100' : 'start-1 bg-pencil-tip']"></b>
        </div>
        <span class="text-sm" v-if="label">{{ label }}</span>
    </label>
</template>

<script setup>
const props = defineProps({
    label: String,
    value: Boolean,
});
const emit = defineEmits(["update:value"]);

const toggle = () => {
    emit("update:value", !props.value);
};
</script>
