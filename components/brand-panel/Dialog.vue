<style scoped>
.dialog {
    z-index: 100;
}
.dialog > .box {
    min-width: 22rem;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
}
</style>

<template>
    <Transition name="fade" appear>
        <div class="dialog fixed inset-0 flex items-center justify-center p-4" :class="{ open: open }" v-if="open">
            <div class="backdrop fixed inset-0 bg-neutral-500 bg-opacity-30" @click="close()"></div>
            <Transition name="slide-down" appear>
                <div class="box flex flex-col gap-3 p-3 sm:p-6 rounded-xl shadow-2xl w-max max-w-lg bg-pencil-tip text-white" v-show="open">
                    <div class="flex flex-col w-full" v-if="title || closeable || desc">
                        <div class="flex justify-between items-center gap-3">
                            <h3 class="text-2xl font-bold" v-if="title">{{ title }}</h3>
                            <button class="bg-white rounded-full p-2 hover:rotate-180 transition-all" @click="close()" v-if="closeable">
                                <img class="rotate-45" src="/icons/plus.svg" width="16" height="16" alt="Close" />
                            </button>
                        </div>
                        <p class="text-xs opacity-75" v-if="desc">{{ desc }}</p>
                    </div>
                    <slot />
                </div>
            </Transition>
        </div>
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
});

const open = computed(() => panelStore.popUpOpened === props.name);

const close = () => {
    if (props.closeable) panelStore.closePopUp();
};
</script>
