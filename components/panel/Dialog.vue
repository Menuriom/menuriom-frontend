<style scoped>
.dialog {
    z-index: 100;
    padding: 0;
    background: transparent;
}
.dialog > .box {
    min-width: 19rem;
    max-height: calc(100vh - 2rem);
    max-height: calc(100svh - 2rem);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
}
</style>

<template>
    <Transition name="fade" mode="out-in">
        <dialog aria-modal="true" class="dialog fixed inset-0 flex items-center justify-center" :class="{ open: open }" v-if="open">
            <div class="backdrop fixed inset-0 bg-neutral-900 bg-opacity-60 backdrop-grayscale" @click="close()"></div>
            <Transition name="slide-down" appear>
                <div
                    class="box flex flex-col gap-3 p-3 sm:p-6 rounded-xl shadow-2xl md:w-max max-w-lg bg-pencil-tip text-white"
                    :class="boxClass"
                    v-show="open"
                >
                    <div class="flex flex-col w-full" v-if="title || closeable || desc">
                        <div class="flex justify-between items-center gap-3">
                            <h3 class="text-2xl font-bold" v-if="title">{{ title }}</h3>
                            <slot name="title" />
                            <button class="bg-white rounded-full p-2 hover:rotate-180 transition-all shrink-0" @click="close()" v-if="closeable">
                                <img class="rotate-45" src="/icons/plus.svg" width="16" height="16" alt="Close" />
                            </button>
                        </div>
                        <p class="text-xs opacity-75" v-if="desc">{{ desc }}</p>
                    </div>
                    <slot />
                </div>
            </Transition>
        </dialog>
    </Transition>
</template>

<script setup>
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();

const props = defineProps({
    name: { type: String, default: null },
    title: { type: String },
    desc: { type: String },
    closeable: { type: Boolean, default: true },
    boxClass: { type: String },
});
const emit = defineEmits(["update:open"]);

const open = computed(() => panelStore.popUpOpened === props.name);
watch(open, (val) => {
    emit("update:open", val);
});

const close = () => {
    if (props.closeable) panelStore.closePopUp();
};
</script>
