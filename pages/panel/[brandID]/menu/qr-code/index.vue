<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/qrcode-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.qrcode.QR Code Editor") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.qrcode.Build and customize your QR code") }}
                </small>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto shrink-0">
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'qrcode' }"
                @click="selectedTab = 'qrcode'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'qrcode' ? 'bg-white' : 'bg-black']"
                    name="Stack.svg"
                    folder="icons/basil"
                    size="20px"
                />
                {{ $t("panel.qrcode.QR Code Style") }}
            </li>
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'qrcode-stand' }"
                @click="selectedTab = 'qrcode-stand'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'qrcode-stand' ? 'bg-white' : 'bg-black']"
                    name="Stack.svg"
                    folder="icons/basil"
                    size="20px"
                />
                {{ $t("panel.qrcode.QR Code Stand Frame") }}
            </li>
        </ul>
        <hr class="w-full border-gray-300 opacity-50" />
        <div class="flex flex-wrap-reverse gap-4">
            <div class="flex flex-col gap-4 w-full max-w-4xl p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
                link ------------ bg and fg colors ------------ dotImage randomSize ------------ customCorner ------------ withLogo
            </div>
            <div class="flex flex-col gap-4 w-full max-w-screen-2xs">
                <small class="w-full opacity-75 -mb-2">Make sure the colors have good contrast so that the code is easily scannable</small>
                <canvas class="w-full max-w-screen-2xs aspect-square shadow-nr15 rounded-xl" ref="canvasEl"></canvas>
                <!-- <generateSVG class="shadow-nr15" /> -->
                <button class="btn text-sm p-2 rounded-md bg-white border" @click="saveCanvas()">Download QR Code</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import QR from "~/composables/qrcodegen";
import { h } from "vue";

// TODO : image and random size is for standard and up
// pro can access more images and brand logo
// basic can have custom corners and gradient

const route = useRoute();

const selectedTab = "qrcode";

const value = `https://menuriom.com/r/${route.params.brandID}/`;
const borderMargin = ref(4);
const rotateTheCode = ref(true);
const size = 512;

const backgroundGradient = ref(false);
const backgroundGradientType = ref("Linear"); // Linear | Radial
const backgroundGradientAngle = ref(0); // 0 | 45 | 90
const backgroundColor1 = ref("#fff");
const backgroundColor2 = ref("#fff");

const foregroundGradient = ref(false);
const foregroundGradientType = ref("Linear"); // Linear | Radial
const foregroundGradientAngle = ref(0); // 0 | 45 | 90
const foregroundColor1 = ref("#000");
const foregroundColor2 = ref("#000");

const dotStyle = "image";
const dotImage = ref("/icons/qr-dots/Square.svg");
const radius = ref(1);
const randomSize = ref(false);

const customCorner = ref(false);
const cornerRingColor = ref("#000");
const cornerCenterColor = ref("#000");
const cornerRingRadius = ref(0.2); // 0 - 2 : .1
const cornerCenterRadius = ref(0.1); // 0 - 2 : .1

const withLogo = ref(false);
const logoPadding = ref(2);
const logoBorderRadius = ref(1); // 0 - 7 : 1
const logoShadow = ref(true);
const logoShadowIntensity = ref(5); // 2 - 9 : 1
const logoSrc = ref("/file/logos/d7af7f85-bbd4-42f7-b067-733273217f9c.webp");

const cellNumbers = ref(0);

// SVG method -------------------------------------------------
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
const generateSVG = () => {
    const cells = QR.QrCode.encodeText(value, QR.QrCode.Ecc.HIGH).getModules();
    cellNumbers.value = cells.length + margin * 2;
    console.log({ cellNumbers: cellNumbers.value });

    const imageSize = 12;
    const pos = cellNumbers.value / 2 - imageSize / 2;

    const fgPath = generatePath(cells, margin);

    const props = {
        width: size,
        height: size,
        "shape-rendering": `crispEdges`,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${cellNumbers.value} ${cellNumbers.value}`,
    };

    return h("svg", props, [
        // ...
        h("path", { fill: background, d: `M0,0 h${cellNumbers.value}v${cellNumbers.value}H0z` }),
        h("path", { fill: foreground, d: fgPath }),
        h("rect", { x: pos, y: pos, height: imageSize, width: imageSize, fill: background, rx: "2" }),
        h("image", { href: "/avatar.webp", x: pos, y: pos, height: imageSize, width: imageSize }),
    ]);
};
// -------------------------------------------------

const canvasEl = ref(); // Dom Ref
const generateCanvas = (customDot) => {
    const canvas = canvasEl.value;
    const ctx = canvas.getContext("2d");

    const margin = borderMargin.value;
    const cells = QR.QrCode.encodeText(value, QR.QrCode.Ecc.HIGH).getModules();
    cellNumbers.value = cells.length + margin * 2;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const scale = (size / cellNumbers.value) * devicePixelRatio;
    canvas.height = canvas.width = size * devicePixelRatio;
    ctx.scale(scale, scale);

    // draw dot modules
    if (dotStyle === "image" && customDot) {
        ctx.imageSmoothingQuality = "high";
        cells.forEach((row, rdx) => {
            row.forEach((cell, cdx) => {
                if (!cell) return;
                const dotSize = randomSize.value ? radius.value * Math.max(Math.random(), 0.6) : radius.value;
                if (rotateTheCode.value) ctx.drawImage(customDot, rdx + margin, cdx + margin, dotSize, dotSize);
                else ctx.drawImage(customDot, cdx + margin, rdx + margin, dotSize, dotSize);
            });
        });
    } else {
        // vector drawings
        cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
                if (!cell) return;
                const dotSize = randomSize.value ? radius.value * Math.max(Math.random(), 0.6) : radius.value;
                switch (dotStyle) {
                    case "square-dot":
                        ctx.fillRect(cdx + margin + 0.2, rdx + margin + 0.2, dotSize * 0.8, dotSize * 0.8);
                        break;
                    case "dot":
                        ctx.beginPath();
                        ctx.arc(cdx + margin + dotSize * 0.5, rdx + margin + dotSize * 0.5, dotSize * 0.5, dotSize * 0.5, 2 * Math.PI);
                        ctx.fill();
                        break;
                    default:
                        ctx.fillRect(cdx + margin, rdx + margin, dotSize + 0.05, dotSize + 0.05); // square
                        break;
                }
            });
        });
    }

    const foregroundFillStyle = foregroundGradient.value
        ? gradientGenerator(ctx, {
              type: foregroundGradientType.value,
              color1: foregroundColor1.value,
              color2: foregroundColor2.value,
              angle: foregroundGradientAngle.value,
          })
        : foregroundColor1.value;

    const backgroundFillStyle = backgroundGradient.value
        ? gradientGenerator(ctx, {
              type: backgroundGradientType.value,
              color1: backgroundColor1.value,
              color2: backgroundColor2.value,
              angle: backgroundGradientAngle.value,
          })
        : backgroundColor1.value;

    // draw foreground
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = foregroundFillStyle;
    ctx.fillRect(margin, margin, cells.length, cells.length);

    // draw background
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundFillStyle;
    ctx.fillRect(0, 0, cellNumbers.value, cellNumbers.value);

    ctx.globalCompositeOperation = "source-over";
    if (customCorner.value) customCorners(ctx, backgroundFillStyle);
    if (withLogo.value) setLogo(ctx, backgroundFillStyle);
};

const setLogo = (ctx, backgroundFillStyle) => {
    const imageSize = Math.min(value.length / 2.5, 11);
    const pos = cellNumbers.value / 2 - imageSize / 2;

    if (logoShadow.value) {
        ctx.shadowColor = `#000${logoShadowIntensity.value}`;
        ctx.shadowOffsetY = 15;
        ctx.shadowBlur = 20;
    }

    ctx.fillStyle = backgroundFillStyle;
    ctx.beginPath();
    ctx.roundRect(
        pos - logoPadding.value / 2,
        pos - logoPadding.value / 2,
        imageSize + logoPadding.value,
        imageSize + logoPadding.value,
        logoBorderRadius.value
    );
    ctx.fill();

    ctx.shadowColor = `#0000`;
    ctx.beginPath();
    ctx.roundRect(pos, pos, imageSize, imageSize, Math.max(logoBorderRadius.value - 1, 0));
    ctx.fill();

    ctx.clip();
    const img = new Image();
    img.src = logoSrc.value;
    img.onload = () => ctx.drawImage(img, pos, pos, imageSize, imageSize);
    ctx.restore();
};

const customCorners = (ctx, backgroundFillStyle) => {
    const margin = borderMargin.value;
    let offset = margin - 0.2;

    // TODO : make it work for gradient with globalCompositeOperation
    // hide the corners
    ctx.fillStyle = backgroundFillStyle;
    ctx.beginPath();
    ctx.rect(0 + offset, 0 + offset, 8, 8);
    ctx.rect(cellNumbers.value - (7.5 + offset), 0 + offset, 8.2, 8);
    ctx.rect(0 + offset, cellNumbers.value - (8 + offset), 8, 8.2);
    ctx.fill();

    offset = margin + radius.value / 2.5;

    // corner rings
    ctx.strokeStyle = cornerRingColor.value;
    ctx.beginPath();
    ctx.roundRect(0 + offset, 0 + offset, 6, 6, cornerRingRadius.value);
    ctx.roundRect(cellNumbers.value - (6 + offset), 0 + offset, 6, 6, cornerRingRadius.value);
    ctx.roundRect(0 + offset, cellNumbers.value - (6 + offset), 6, 6, cornerRingRadius.value);
    ctx.stroke();

    // corner centers
    ctx.fillStyle = cornerCenterColor.value;
    ctx.beginPath();
    ctx.roundRect(1.5 + offset, 1.5 + offset, 3, 3, cornerCenterRadius.value);
    ctx.roundRect(cellNumbers.value - (4.5 + offset), 1.5 + offset, 3, 3, cornerCenterRadius.value);
    ctx.roundRect(1.5 + offset, cellNumbers.value - (4.5 + offset), 3, 3, cornerCenterRadius.value);
    ctx.fill();
};

const gradientGenerator = (ctx, options = { type: "Linear", color1: "", color2: "", angle: 0 }) => {
    if (!options.color2) return options.color1;
    const width = cellNumbers.value;

    let grd;
    switch (options.type) {
        case "Linear":
            if (options.angle === 0) grd = ctx.createLinearGradient(0, width / 2, width, width / 2);
            if (options.angle === 45) grd = ctx.createLinearGradient(0, 0, width, width);
            if (options.angle === 90) grd = ctx.createLinearGradient(width / 2, width / 2, width / 2, width);
            break;
        case "Radial":
            grd = ctx.createRadialGradient(width / 2, width / 2, width / 5, width / 2, width / 2, width / 1.8);
            break;
    }
    grd.addColorStop(0, options.color1);
    grd.addColorStop(1, options.color2);

    return grd;
};

onMounted(async () => {
    const img = new Image();
    img.src = dotImage.value;
    // img.src = "/icons/qr-dots/Dot.svg";
    // img.src = "/icons/qr-dots/Square-Dot.svg";
    // img.src = "/icons/qr-dots/Square.svg";

    // TODO : Sort dots for standard and pro plans

    // img.src = "/icons/qr-dots/Rectangle-Fade.svg";
    // img.src = "/icons/qr-dots/Bars.svg";
    // img.src = "/icons/qr-dots/Skull.svg";
    // img.src = "/icons/qr-dots/Sparkle.svg";
    // img.src = "/icons/qr-dots/Star.svg";
    // img.src = "/icons/qr-dots/Squares.svg";
    // img.src = "/icons/qr-dots/Square-Rounded.svg";
    // img.src = "/icons/qr-dots/Sushi-Roll.svg";
    // img.src = "/icons/qr-dots/Taco.svg";
    // img.src = "/icons/qr-dots/Tile.svg";
    // img.src = "/icons/qr-dots/Pie-Cake.svg";
    // img.src = "/icons/qr-dots/Pie.svg";
    // img.src = "/icons/qr-dots/Paw.svg";
    // img.src = "/icons/qr-dots/Panel.svg";
    // img.src = "/icons/qr-dots/Moon.svg";
    // img.src = "/icons/qr-dots/Octagon.svg";
    // img.src = "/icons/qr-dots/Fire.svg";
    // img.src = "/icons/qr-dots/Circle-Heart.svg";

    img.onload = () => generateCanvas(img);
});

const saveCanvas = () => {
    const dataURL = canvasEl.value.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "QR-Code.png";
    a.href = dataURL;
    a.click();
};
</script>
