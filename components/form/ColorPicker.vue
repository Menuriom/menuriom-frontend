<style scoped>
.tile {
    background: url("/tiles.svg");
    background-size: 10px;
    background-repeat: repeat;
}

input[type="range"] {
    -webkit-appearance: none;
    background: transparent;
}
input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 1rem;
    border-radius: 2rem;
    cursor: pointer;
    background: linear-gradient(270deg, v-bind("color.slice(0, 7)") 0%, transparent 100%);
}
input[type="range"]::-moz-range-track {
    width: 100%;
    height: 1rem;
    border-radius: 2rem;
    cursor: pointer;
    background: linear-gradient(270deg, v-bind("color.slice(0, 7)") 0%, transparent 100%);
}

input[type="range"]::-webkit-slider-thumb {
    height: 1rem;
    width: 1rem;
    border: 1px solid theme("colors.neutral.400");
    background: theme("colors.neutral.50");
    border-radius: 999rem;
    box-shadow: 0px 5px 15px -2px rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
}
input[type="range"]::-moz-range-thumb {
    height: 1rem;
    width: 1rem;
    border: 1px solid theme("colors.neutral.400");
    background: theme("colors.neutral.50");
    border-radius: 999rem;
    box-shadow: 0px 5px 15px -2px rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
}
</style>

<template>
    <div class="relative flex flex-col items-start gap-2 w-[166px] bg-bgSecondary bg-opacity-75 p-3 rounded-xl shadow-mr15 isolate">
        <div class="flex items-center justify-between gap-0 w-full">
            <label class="flex items-center gap-2 text-xs grow" v-if="label">{{ label }} </label>
            <button
                class="flex items-center justify-center p-1 rounded border border-neutral-500 border-opacity-50 shadow-nr15 shrink-0"
                :class="[!isColorLocked ? 'bg-white' : 'bg-primary']"
                @click="lockColor()"
                v-if="baseColor"
            >
                <Icon
                    class="w-2.5 h-2.5"
                    :class="[!isColorLocked ? 'bg-pencil-tip bg-opacity-30' : 'bg-white ']"
                    :name="isColorLocked ? 'lock-keyhole.svg' : 'lock-keyhole-open.svg'"
                    folder="icons"
                    size="11px"
                />
            </button>
        </div>
        <div class="flex items-center gap-2">
            <div
                class="color_input relative flex items-center justify-end w-8 h-5 border border-neutral-500 border-opacity-25 shadow-nr10 rounded-md shrink-0"
                :style="`background-color: ${color.slice(0, 7)};`"
            >
                <input
                    class="absolute inset-0 w-full h-full rounded-full opacity-0"
                    type="color"
                    :value="color.slice(0, 7)"
                    @input="updateHue($event.target.value)"
                />
            </div>
            <div class="relative flex flex-col items-center justify-center w-full h-4">
                <span class="tile absolute inset-0 -z-10 rounded-full"></span>
                <input
                    class="w-full"
                    type="range"
                    min="0"
                    max="255"
                    dir="ltr"
                    :value="b16_to_b10(color.slice(7, 9))"
                    @input="updateTransparency($event.target.value)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: { type: String },
    color: { type: String, default: "#000000ff" },
    baseColor: { type: String },
});
const { baseColor } = toRefs(props);

const emit = defineEmits(["update:color"]);

const updateHue = (hue) => {
    const transparency = props.color.slice(7, 9);
    if (!isColorLocked.value) emit("update:color", `${hue}${transparency}`);
};
const updateTransparency = (transparency) => {
    const hue = props.color.slice(0, 7);
    if (!isColorLocked.value) emit("update:color", `${hue}${b10_to_b16(transparency)}`);
};

const isColorLocked = ref(baseColor.value ? true : false);
const lockColor = () => {
    isColorLocked.value = !isColorLocked.value;
    if (isColorLocked.value) emit("update:color", baseColor.value);
};
watch(baseColor, (val) => {
    if (isColorLocked.value) emit("update:color", val);
});

const b10_to_b16 = (numberString) => Number(numberString).toString(16).padStart(2, 0);
const b16_to_b10 = (string) => parseInt(string, 16);
</script>
