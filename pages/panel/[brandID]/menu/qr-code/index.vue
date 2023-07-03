<style scoped></style>

<template>
    <div>
        <!-- <canvas id="canvas" style="width: 256px; height: 256px" ref="canvasEl"></canvas> -->
        <generateSVG class="shadow-nr15" />
    </div>
</template>

<script setup>
import QR from "~/composables/qrcodegen";
import { h } from "vue";

const defaultErrorCorrectLevel = "Q";
const ErrorCorrectLevelMap = {
    L: QR.QrCode.Ecc.LOW,
    M: QR.QrCode.Ecc.MEDIUM,
    Q: QR.QrCode.Ecc.QUARTILE,
    H: QR.QrCode.Ecc.HIGH,
};

const SUPPORTS_PATH2D = () => {
    try {
        new Path2D().addPath(new Path2D());
    } catch (e) {
        return false;
    }
    return true;
};

function generatePath(modules, margin = 0) {
    const ops = [];
    modules.forEach(function (row, y) {
        let start = null;
        row.forEach(function (cell, x) {
            if (!cell && start !== null) {
                ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
                start = null;
                return;
            }

            if (x === row.length - 1) {
                if (!cell) return;

                if (start === null) ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
                else ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);

                return;
            }

            if (cell && start === null) start = x;
        });
    });
    return ops.join("");
}

// ====================================================

const numCells = ref(0);
const fgPath = ref("");
const generateSVG = () => {
    const value = "https://menuriom.com/r/64490245ee8237588e025c8b";
    const level = "H" || defaultErrorCorrectLevel;
    const margin = 4;
    const size = 256;
    const background = "#fff";
    const foreground = "#000";

    const cells = QR.QrCode.encodeText(value, ErrorCorrectLevelMap[level]).getModules();
    numCells.value = cells.length + margin * 2;
    console.log({ numCells: numCells.value });

    const imageSize = 12;
    const pos = numCells.value / 2 - imageSize / 2;

    // Drawing strategy: instead of a rect per module, we're going to create a
    // single path for the dark modules and layer that on top of a light rect,
    // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
    // way faster than DOM ops.
    // For level 1, 441 nodes -> 2
    // For level 40, 31329 -> 2
    fgPath.value = generatePath(cells, margin);

    const props = {
        width: size,
        height: size,
        "shape-rendering": `crispEdges`,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${numCells.value} ${numCells.value}`,
    };

    return h("svg", props, [
        // ...
        h("path", { fill: background, d: `M0,0 h${numCells.value}v${numCells.value}H0z` }),
        h("path", { fill: foreground, d: fgPath.value }),
        h("rect", { x: pos, y: pos, height: imageSize, width: imageSize, fill: background, rx: "2" }),
        h("image", { href: "/avatar.webp", x: pos, y: pos, height: imageSize, width: imageSize }),
    ]);
};

const canvasEl = ref(); // Dom Ref
const generateCanvas = () => {
    const value = "https://menuriom.com";
    const level = "" || defaultErrorCorrectLevel;
    const margin = 0;
    const size = 256;
    const background = "#fff";
    const foreground = "#000";

    const canvas = canvasEl.value;
    const ctx = canvas.getContext("2d");

    const cells = QR.QrCode.encodeText(value, ErrorCorrectLevelMap[level]).getModules();
    const numCells = cells.length + margin * 2;

    const devicePixelRatio = window.devicePixelRatio || 1;

    const scale = (size / numCells) * devicePixelRatio;
    canvas.height = canvas.width = size * devicePixelRatio;
    ctx.scale(scale, scale);

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, numCells, numCells);

    ctx.fillStyle = foreground;
    if (SUPPORTS_PATH2D()) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
    } else {
        cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
                if (cell) ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            });
        });
    }
};

// onMounted(() => {
//     generateCanvas();
// });
</script>
