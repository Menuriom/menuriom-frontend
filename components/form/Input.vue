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

input::placeholder {
    opacity: 0.75;
}

.wrapper:has(input:focus) {
    box-shadow: 0px 0px 0px 2px theme("colors.zinc.500");
}
</style>

<template>
    <div class="flex flex-col gap-1">
        <div
            class="wrapper relative flex items-center bg-neutral-700 dark:bg-black2 text-white rounded-md"
            :class="{ error: !!error, 'input-box-shadow': !!shadow }"
            @click="focus()"
        >
            <input
                ref="input"
                class="w-full bg-transparent rounded-b-md outline-none text-sm"
                :class="[!!label ? 'p-1 px-3 pb-1.5 mt-6' : 'p-4']"
                v-maska
                :data-maska="mask"
                :required="required"
                :name="name"
                :type="type"
                :value="modelValue"
                :placeholder="isFocused || !label ? placeholder : ''"
                dir="auto"
                @input="updateData($event.target.value)"
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
                <span class="flex -mb-0.5 text-xs opacity-90" :class="{ 'text-purple-200': isFocused || !!modelValue }"> {{ label }} </span>
                <span class="absolute end-0 -me-3 text-rose-400 text-lg" v-show="required">*</span>
            </span>
        </div>
        <small class="flex items-start gap-0.5 text-xs text-rose-300" v-if="!!error">
            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ error }}
        </small>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const props = defineProps({
    name: String,
    placeholder: String,
    label: String,
    required: { type: Boolean, default: false },
    modelValue: String,
    type: { type: String, default: "text" },
    mask: String,
    error: { type: String, default: "" },
    shadow: { type: Boolean, default: true },
    iconName: { type: String },
});
// const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const input = ref(""); // Dom Ref

let isFocused = ref(false);
const focus = () => input.value.focus();

const updateData = (val) => {
    emit("update:modelValue", val);

    try {
        focus();
    } catch (e) {}
};
</script>
