<style scoped>
.rs-range {
    width: 100%;
    -webkit-appearance: none;
}
.rs-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: theme("colors.neutral.400");
}
.rs-range::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: theme("colors.neutral.400");
}

.rs-range::-webkit-slider-thumb {
    height: 3rem;
    width: 3rem;
    border-radius: 3rem;
    background: transparent;
    -webkit-appearance: none;
    margin-top: -2rem;
}
.rs-range::-moz-range-thumb {
    height: 3rem;
    width: 3rem;
    border-radius: 3rem;
    background: transparent;
    -webkit-appearance: none;
    margin-top: -1.5rem;
}

.bubble > span {
    min-width: 3rem;
    padding-inline: 0.5rem;
    background-color: theme("colors.pencil-tip");
    transition: all 0.2s ease;
    transition-property: background-color, width, height;
    pointer-events: none;
    border-radius: 999px;
    color: theme("colors.baby-blue");
}
</style>

<template>
    <div class="flex flex-col items-center justify-center w-full mt-4 mb-8">
        <div class="relative flex items-center w-full group">
            <div class="bubble absolute flex flex-col items-center gap-1 pointer-events-none" ref="bubble">
                <span class="flex items-center justify-center border-2 border-dolphin group-hover:border-violet h-10 group-hover:h-12">
                    {{ modelValue >= rangeSliderMax ? `${rangeSliderMax}+` : modelValue }}
                </span>
                <small class="text-xs opacity-75 -mb-4" v-if="placeholder">{{ placeholder }}</small>
            </div>
            <input class="rs-range" type="range" :value="modelValue" :min="rangeSliderMin" :max="rangeSliderMax" @input="updateValue($event.target.value)" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: String, default: "1" },
    placeholder: String,
    modelValue: Number,
});
const emit = defineEmits(["update:modelValue"]);

const bubble = ref(); // Dom Ref
const rangeSliderMax = ref(20);
const rangeSliderMin = ref(1);

const updateValue = (value) => {
    const bulletPosition = value / rangeSliderMax.value;
    bubble.value.style["inset-inline-start"] = `calc(${bulletPosition * 96}% - 2rem)`;

    emit("update:modelValue", value);
};
</script>
