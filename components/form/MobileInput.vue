<style scoped>
.dark.input-box-shadow {
    box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 40%);
}
.input-box-shadow {
    box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 10%);
}

.error {
    border: 2px solid theme("colors.rose.800");
}

span {
    transition: all 0.2s;
}
</style>

<template>
    <div class="flex flex-col gap-1">
        <div
            class="relative flex items-center bg-neutral-700 dark:bg-black2 text-white rounded-md"
            :class="{ error: !!error, 'input-box-shadow': !!shadow }"
            @click="focus()"
        >
            <input
                ref="input"
                class="w-full bg-transparent p-1 pb-1.5 px-3 mt-6 rounded-b-md outline-none text-sm"
                dir="ltr"
                v-maska
                data-maska="+9809#########"
                autocomplete="false"
                :required="required"
                :name="name"
                :type="type"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value.replaceAll(' ', ''))"
                @focus="isFocused = true"
                @blur="isFocused = false"
            />
            <span
                class="absolute flex items-center gap-2 opacity-90 f-josefin"
                :class="[isFocused || !!modelValue ? 'start-3 top-1.5 opacity-75' : 'start-4 top-5']"
            >
                <Icon
                    class="icon w-4 h-4 bg-zinc-100"
                    :class="{ 'w-3 h-3 bg-purple-300': isFocused || !!modelValue }"
                    :name="iconName"
                    folder="icons"
                    :size="isFocused || !!modelValue ? '12px' : '16px'"
                    v-if="iconName"
                />
                <span class="flex -mb-0.5 text-xs opacity-90" :class="{ 'text-purple-200': isFocused || !!modelValue }"> {{ placeholder }} </span>
            </span>
        </div>
        <small class="flex items-start text-xs text-rose-300" v-if="!!error">
            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ error }}
        </small>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const props = defineProps({
    name: String,
    placeholder: String,
    required: { type: Boolean, default: false },
    modelValue: String,
    type: String,
    error: { type: String, default: "" },
    shadow: { type: Boolean, default: true },
    iconName: { type: String },
});
// const { modelValue } = toRefs(props);
defineEmits(["update:modelValue"]);

const input = ref("");

let isFocused = ref(false);
const focus = () => input.value.focus();
</script>
