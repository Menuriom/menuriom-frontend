<style scoped>
ol {
    min-height: 1.8rem;
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

.wrapper:focus-within {
    box-shadow: 0px 0px 0px 2px theme("colors.zinc.500");
}

.list {
    max-height: 10rem;
    overflow: auto;
}
</style>

<template>
    <div class="flex flex-col gap-1">
        <div
            class="wrapper relative flex bg-neutral-700 dark:bg-black2 text-white rounded-md"
            :class="{ error: !!error, 'input-box-shadow': !!shadow }"
            ref="dropdown"
        >
            <div class="relative flex items-center w-full" tabindex="0" @click="toggleDropdown()">
                <ol class="flex flex-wrap gap-2 w-full select-none shrink-0 grow" :class="[!!label ? 'p-1 px-3 pb-1.5 mt-6' : 'p-4']">
                    <li class="flex items-center gap-2 p-2 rounded-md bg-neutral-800" v-for="(selectedOption, i) in selectedOptions" :key="i">
                        <span class="text-sm">{{ selectedOption.name }}</span>
                        <button class="border border-red-800 rounded" @click="removeOption(i)">
                            <Icon class="w-4 h-4 bg-rose-300" name="Cross.svg" folder="icons/basil" size="20px" />
                        </button>
                    </li>
                </ol>
                <span
                    class="absolute flex items-center gap-2 opacity-90 f-josefin"
                    :class="[!!selectedOptions.length ? 'start-3 top-1.5 opacity-75' : 'start-4 top-4.5']"
                >
                    <Icon
                        class="icon w-4 h-4 bg-zinc-100"
                        :class="{ 'bg-purple-300': !!selectedOptions.length }"
                        :name="iconName"
                        :folder="iconFolder"
                        :size="!!selectedOptions.length ? '14px' : '16px'"
                        v-if="iconName"
                    />
                    <span class="flex text-xs opacity-90" :class="{ 'text-purple-200': !!selectedOptions.length }"> {{ label }} </span>
                    <span class="absolute end-0 -me-3 text-rose-400 text-lg" v-show="required">*</span>
                </span>
            </div>
            <span class="flex items-center my-2 mx-1 border-s-2 border-neutral-600" tabindex="0" @click="toggleDropdown()">
                <Icon class="w-4 h-4 bg-primary mx-2" name="arrow.svg" folder="icons" size="14px" />
            </span>
            <transition :name="openDirection === 'top' ? 'slide-down' : 'slide-up'" appear>
                <ul
                    class="list scroll-thin absolute w-full bg-dolphin border-2 border-primary rounded-md shadow-lg z-10"
                    :class="[openDirection === 'top' ? 'bottom-full mb-2' : 'top-full mt-2']"
                    tabindex="0"
                    v-if="open"
                >
                    <li
                        class="p-2 text-sm opacity-90 hover:bg-neutral-600 cursor-pointer"
                        :class="{ 'bg-neutral-500': selectedOptions && selectedOptions.includes(option) }"
                        v-for="(option, i) in options"
                        :key="i"
                        @click="selectOption(option)"
                    >
                        <slot :option="option"></slot>
                    </li>
                </ul>
            </transition>
        </div>
        <small class="flex items-start gap-0.5 text-xs text-rose-300" v-if="!!error">
            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ error }}
        </small>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
import fa from "~/locale/fa";

const props = defineProps({
    name: String,
    placeholder: String,
    label: String,
    required: { type: Boolean, default: false },
    selectedOptions: Object,
    options: Object,
    error: { type: String, default: "" },
    shadow: { type: Boolean, default: true },
    iconName: { type: String },
    iconFolder: { type: String, default: "icons" },
    formHtmlObject: Object,
});
const emit = defineEmits(["update:selectedOptions"]);

onMounted(() => {
    document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
});

const open = ref(false);
const openDirection = ref("bottom");
const dropdown = ref(null); //Ref to DOM
const toggleDropdown = (value) => {
    openDirection.value = props.formHtmlObject.clientHeight - dropdown.value.offsetTop < 200 ? "top" : "bottom";
    open.value = value !== undefined ? value : !open.value;
};
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) open.value = false;
};

const selectOption = (option) => {
    const options = new Set(props.selectedOptions);
    options.add(option);
    emit("update:selectedOptions", [...options]);
};
const removeOption = (index) => {
    const options = [...props.selectedOptions];
    options.splice(index, 1);
    emit("update:selectedOptions", options);
    setTimeout(() => (open.value = false), 5);
};
</script>
