<style scoped></style>

<template>
    <label class="flex items-center gap-2 w-auto max-w-max cursor-pointer" @click="toggle()">
        <div class="relative flex items-center w-12 h-6 rounded-full" :class="[value ? 'bg-violet' : 'bg-neutral-600']">
            <b class="absolute w-5 h-5 bg-pencil-tip transition-all rounded-full" :class="[value ? 'start-6' : 'start-1']"></b>
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
