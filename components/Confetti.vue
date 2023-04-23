<style scoped></style>

<template>
    <div class="absolute pointer-events-none">
        <canvas class="w-full h-full" ref="canvasBox"></canvas>
    </div>
</template>

<script setup>
import confetti from "canvas-confetti";

const props = defineProps({
    run: Boolean,
});
const { run } = toRefs(props);

const emit = defineEmits(["update:run"]);

const canvasBox = ref(); // Dom Ref
const colors = ["#757AE9", "#28224B", "#EBF4FF", "#9f74cd", "#7ecfe1"];
let Confetti;

watch(run, async (newVal, oldVal) => {
    if (newVal) startConfetti();
});

onMounted(() => {
    Confetti = confetti.create(canvasBox.value, { resize: true, useWorker: true });
});

const startConfetti = () => {
    Confetti({ particleCount: 250, startVelocity: 30, spread: 360, colors });
    setTimeout(() => Confetti.reset(), 10000);
    emit("update:run", false);
};
</script>
