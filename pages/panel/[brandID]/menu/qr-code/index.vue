<style scoped></style>

<template>
    <div class="flex flex-col items-start gap-2">
        <canvas id="canvas" class="shadow-nr15 rounded-xl" style="width: 256px; height: 256px" ref="canvasEl"></canvas>
        <!-- <generateSVG class="shadow-nr15" /> -->
        <button class="btn p-2 rounded-md bg-white border" @click="saveCanvas()">Save</button>
        <p>make sure the colors has a good contrast in order to code be scannable</p>
    </div>
</template>

<script setup>
import QR from "~/composables/qrcodegen";
import { h } from "vue";

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

const generatePath = (modules, margin = 0) => {
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
};

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve(img);
        img.onerror = (e) => reject(e);
    });
};

// ====================================================

const value = "https://menuriom.com/r/64490245ee8237588e025c8b/";
const level = "H";
const margin = 4;
const size = 512;
const background = "#fff";
const foreground = "#000";
const dotStyle = "image";

const numCells = ref(0);
const fgPath = ref("");
const generateSVG = () => {
    const cells = QR.QrCode.encodeText(value, ErrorCorrectLevelMap[level]).getModules();
    numCells.value = cells.length + margin * 2;
    console.log({ numCells: numCells.value });

    const imageSize = 12;
    const pos = numCells.value / 2 - imageSize / 2;

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
const generateCanvas = (customDot) => {
    const radiuos = 0.55;
    const canvas = canvasEl.value;
    const ctx = canvas.getContext("2d");

    const cells = QR.QrCode.encodeText(value, ErrorCorrectLevelMap[level]).getModules();
    numCells.value = cells.length + margin * 2;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const scale = (size / numCells.value) * devicePixelRatio;
    canvas.height = canvas.width = size * devicePixelRatio;
    ctx.scale(scale, scale);

    const grd = ctx.createLinearGradient(0, numCells.value / 2, numCells.value / 2, numCells.value);
    grd.addColorStop(0, "#3871cd");
    grd.addColorStop(1, "#2e2f5f");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, numCells.value, numCells.value);

    ctx.fillStyle = grd || foreground;
    ctx.strokeStyle = grd || foreground;
    // if (SUPPORTS_PATH2D()) {
    if (0) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
    } else {
        console.log({ customDot });
        if (customDot && dotStyle === "image") {
            cells.forEach((row, rdx) => {
                row.forEach((cell, cdx) => {
                    if (!cell) return;
                    ctx.drawImage(customDot, cdx + margin, rdx + margin, 1, 1);
                });
            });
        }
        cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
                if (!cell) return;
                ctx.beginPath();
                switch (dotStyle) {
                    case "square":
                        ctx.fillRect(cdx + margin, rdx + margin, 1.05, 1.05);
                        break;
                    case "square-dot":
                        ctx.fillRect(cdx + margin, rdx + margin, radiuos * 1.3, radiuos * 1.3);
                        break;
                    case "triangle":
                        ctx.ellipse(cdx + margin + radiuos, rdx + margin + radiuos, radiuos, radiuos, Math.PI / 4, 4.7, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    case "half-moon":
                        ctx.ellipse(cdx + margin + radiuos, rdx + margin + radiuos, radiuos, radiuos, Math.PI / 4, 0, 1.2 * Math.PI);
                        ctx.fill();
                        break;
                    case "half-moon2":
                        ctx.ellipse(cdx + margin + radiuos, rdx + margin + radiuos, radiuos, radiuos, Math.PI / 4, 3, 2 * Math.PI);
                        ctx.fill();
                        break;
                    case "pins":
                        ctx.ellipse(cdx + margin + radiuos, rdx + margin + radiuos, radiuos / 2.5, radiuos / 2.5, Math.PI / 1, 4, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    case "pins2":
                        ctx.ellipse(cdx + margin + radiuos, rdx + margin + radiuos, radiuos / 2.5, radiuos / 2.5, Math.PI / 1, 2, 1.25 * Math.PI);
                        ctx.stroke();
                        break;
                    case "dot":
                        ctx.arc(cdx + margin + radiuos, rdx + margin + radiuos, radiuos, radiuos, 2 * Math.PI);
                        ctx.fill();
                        break;
                }
            });
        });
    }

    customCorners(ctx, radiuos);
    setLogo(ctx);
};
const setLogo = (ctx) => {
    const imageSize = Math.min(value.length / 2.5, 11);
    const pos = numCells.value / 2 - imageSize / 2;
    const bgRectMargin = 2;
    const borderRadius = 10;

    ctx.shadowColor = "#0006";
    // ctx.shadowColor = "#0008";
    ctx.shadowOffsetY = 15;
    ctx.shadowBlur = 20;
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.roundRect(pos - bgRectMargin / 2, pos - bgRectMargin / 2, imageSize + bgRectMargin, imageSize + bgRectMargin, borderRadius);
    ctx.fill();
    ctx.shadowColor = "#0001";

    ctx.beginPath();
    ctx.roundRect(pos, pos, imageSize, imageSize, Math.max(borderRadius - 1, 0));
    ctx.fill();

    ctx.clip();
    const img = new Image();
    // img.src = "/file/logos/d7af7f85-bbd4-42f7-b067-733273217f9c.webp";
    img.src = "/pricing/pro-g.png";
    img.src = "/fake-logo-dark.svg";
    // img.src = "/logo.svg";
    img.onload = () => ctx.drawImage(img, pos, pos, imageSize, imageSize);
    ctx.restore();
};
const customCorners = (ctx, radiuos) => {
    const offset = margin - 0.2;
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.rect(0 + offset, 0 + offset, 8, 8);
    ctx.rect(numCells.value - (7.5 + offset), 0 + offset, 8.2, 8);
    ctx.rect(0 + offset, numCells.value - (8 + offset), 8, 8.2);
    ctx.fill();

    ctx.strokeStyle = "#454545";
    const cornersRadius = 1;
    ctx.beginPath();
    ctx.roundRect(0 + margin + radiuos, 0 + margin + radiuos, 6, 6, cornersRadius);
    ctx.roundRect(numCells.value - (6 + margin + radiuos), 0 + margin + radiuos, 6, 6, cornersRadius);
    ctx.roundRect(0 + margin + radiuos, numCells.value - (6 + margin + radiuos), 6, 6, cornersRadius);
    ctx.stroke();

    ctx.fillStyle = "#9f74cd";
    const cornersCenterRadius = 1;
    ctx.beginPath();
    ctx.roundRect(1.5 + margin + radiuos, 1.5 + margin + radiuos, 3, 3, cornersCenterRadius);
    ctx.roundRect(numCells.value - (4.5 + margin + +radiuos), 1.5 + margin + radiuos, 3, 3, cornersCenterRadius);
    ctx.roundRect(1.5 + margin + radiuos, numCells.value - (4.5 + margin + radiuos), 3, 3, cornersCenterRadius);
    ctx.fill();
};

onMounted(async () => {
    // TODO : customDot images not loading currectly
    const img = await loadImage("/icons/code.svg");
    generateCanvas(img);
});

const saveCanvas = () => {
    const dataURL = canvasEl.value.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "QR-Code.png";
    a.href = dataURL;
    a.click();
};
</script>
