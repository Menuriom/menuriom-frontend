<style scoped>
.input-box-shadow {
    /* box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 5%); */
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
    box-shadow: 0px 0px 0px 2px theme("colors.neutral.500");
}
</style>

<template>
    <div class="flex flex-col gap-1">
        <div
            class="wrapper relative flex items-center bg-neutral-700 text-white rounded-md"
            :class="{ error: !!error, 'input-box-shadow': !!shadow }"
            @click="focus()"
        >
            <input
                ref="input"
                class="w-full bg-transparent rounded-b-md outline-none text-sm"
                :class="[!!label ? 'p-0.5 px-3 pb-2 mt-6' : 'p-4']"
                v-maska
                :data-maska="mask"
                :required="required"
                :name="name"
                :type="type"
                :value="modelValue"
                :placeholder="isFocused || !label ? placeholder : ''"
                :dir="modelValue ? 'auto' : ''"
                @input="updateData($event.target.value)"
                @focus="isFocused = true"
                @blur="isFocused = false"
            />
            <small class="text-xs text-purple-300 pe-2 transition-all" :class="[isFocused || !!modelValue ? 'mt-5' : '']" v-if="unit">{{ unit }}</small>
            <span
                class="absolute flex items-center gap-2 opacity-90 f-josefin"
                :class="[isFocused || !!modelValue ? 'start-3 top-2 opacity-75' : 'start-4 top-5']"
            >
                <Icon
                    class="icon w-4 h-4 bg-zinc-100"
                    :class="{ 'bg-purple-200': isFocused || !!modelValue }"
                    :name="iconName"
                    :folder="iconFolder"
                    :size="isFocused || !!modelValue ? '14px' : '16px'"
                    v-if="iconName"
                />
                <span class="flex text-xs opacity-90" :class="{ 'text-purple-200': isFocused || !!modelValue }"> {{ label }} </span>
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
    unit: String,
    error: { type: String, default: "" },
    shadow: { type: Boolean, default: true },
    iconName: { type: String },
    iconFolder: { type: String, default: "icons" },
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
