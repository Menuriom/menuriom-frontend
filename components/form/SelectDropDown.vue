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
            class="wrapper relative flex bg-bgSecondary bg-opacity-50 rounded-xl"
            :class="{ error: !!error, 'input-box-shadow': !!shadow, 'opacity-50': !!disabled }"
            ref="dropdown"
        >
            <div class="relative flex items-center w-full" tabindex="0" @click="toggleDropdown()">
                <img
                    class="ms-3 object-contain"
                    :class="[label ? 'pb-1 mt-6 -me-1' : customPadding, label ? 'w-5' : 'w-6']"
                    :src="selectedOption.icon"
                    v-if="selectedOption.icon"
                />
                <input
                    class="w-full bg-transparent rounded-b-md outline-none text-sm select-none pointer-events-none"
                    :class="[label ? 'p-1 px-3 pb-1.5 mt-6' : customPadding]"
                    :required="required"
                    :name="name"
                    :value="selectedOption.name"
                    :placeholder="!label ? placeholder : ''"
                    disabled
                />
                <span
                    class="absolute flex items-center gap-2 opacity-90 f-josefin"
                    :class="[!!selectedOption.value ? 'start-3 top-1.5 opacity-75' : 'start-4 top-4.5']"
                >
                    <Icon
                        class="icon w-4 h-4 bg-zinc-100"
                        :class="{ 'bg-purple-300': !!selectedOption.value }"
                        :name="iconName"
                        :folder="iconFolder"
                        :size="!!selectedOption.value ? '14px' : '16px'"
                        v-if="iconName"
                    />
                    <span class="flex text-xs opacity-90" :class="{ 'text-purple-200': !!selectedOption.value }"> {{ label }} </span>
                    <span class="absolute end-0 -me-3 text-rose-400 text-lg" v-show="required">*</span>
                </span>
            </div>
            <span class="flex items-center my-2 mx-1 border-s-2 border-neutral-600" tabindex="0" @click="toggleDropdown()">
                <Icon class="w-4 h-4 bg-primary mx-1.5 -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </span>
            <transition :name="openDirection === 'top' ? 'slide-down' : 'slide-up'" appear>
                <ul
                    class="list scroll-thin absolute w-full bg-bgSecondary rounded-xl shadow-nr25 z-10"
                    :class="[openDirection === 'top' ? 'bottom-full mb-2' : 'top-full mt-2']"
                    tabindex="0"
                    v-show="open"
                >
                    <li
                        class="p-2 text-sm hover:bg-secondary hover:bg-opacity-50 cursor-pointer"
                        :class="{ 'bg-fgPrimary bg-opacity-10': option.value == selectedOption.value }"
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
            <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ error }}
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
    selectedOption: Object,
    options: Object,
    error: { type: String, default: "" },
    shadow: { type: Boolean, default: true },
    iconName: { type: String },
    iconFolder: { type: String, default: "icons" },
    customPadding: { type: String, default: "p-4" },
    formHtmlObject: Object,
    disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["update:selectedOption"]);

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
    if (props.disabled) return;
    openDirection.value = props.formHtmlObject.clientHeight - dropdown.value.offsetTop < 200 ? "top" : "bottom";
    open.value = value !== undefined ? value : !open.value;
};
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) open.value = false;
};

const selectOption = (option) => {
    emit("update:selectedOption", option);
    open.value = false;
};
</script>
