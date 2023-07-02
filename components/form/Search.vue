<style scoped>
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
            class="wrapper relative flex items-center p-2 gap-2 bg-neutral-700 text-white rounded-md"
            :class="{ 'input-box-shadow': !!shadow }"
            @click="focus()"
        >
            <button class="flex items-center justify-center p-1 rounded-md shrink-0 cursor-pointer" @click="$emit(`search`)">
                <Icon class="icon w-5 h-5 gradient shrink-0" name="search.svg" folder="icons/light" size="18px" />
            </button>
            <input
                ref="input"
                class="w-full py-1 bg-transparent rounded-b-md outline-none text-sm"
                name="search"
                :value="modelValue"
                :placeholder="`${$t(`panel.Search`)}...`"
                :dir="modelValue ? 'auto' : ''"
                @keyup="keyup($event)"
                @input="updateData($event.target.value)"
                @focus="isFocused = true"
                @blur="isFocused = false"
            />
            <button
                class="flex items-center justify-center bg-neutral-500 p-1 rounded-md shrink-0 cursor-pointer"
                v-if="modelValue"
                @click="$emit(`clear:search`)"
            >
                <Icon class="icon w-5 h-5 bg-white" name="Cross.svg" folder="icons/basil" size="24px" />
            </button>
        </div>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const props = defineProps({
    modelValue: String,
    shadow: { type: Boolean, default: true },
});
// const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue", "clear:search", "search"]);

const input = ref(""); // Dom Ref

let isFocused = ref(false);
const focus = () => input.value.focus();

const keyup = (e) => {
    if (e.key === "Enter") emit("search");
};

const updateData = (val) => {
    emit("update:modelValue", val);

    try {
        focus();
    } catch (e) {}
};
</script>
