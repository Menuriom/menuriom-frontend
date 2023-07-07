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
        <div class="flex flex-wrap-reverse justify-center gap-4">
            <div class="flex flex-col items-start gap-4 w-full max-w-4xl p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-sm">link to your menu:</span>
                    <a class="bg-neutral-800 px-2 py-1 rounded-md text-sm text-neutral-300 hover:text-violet" :href="link" target="_blank">{{ link }}</a>
                </div>
                <hr class="w-full opacity-20" />
                <Input class="w-48" type="color" :label="$t('panel.qrcode.Background Color')" v-model="backgroundColor1" @input="renderOverlays()" />
                <Input class="w-48" type="color" :label="$t('panel.qrcode.Foreground Color')" v-model="foregroundColor1" @input="renderOverlays()" />
                <Switch class="" :label="$t('panel.qrcode.Randomize Dot Size')" v-model:value="randomSize" @update:value="renderAll()" />
                <Switch class="" :label="$t('panel.qrcode.Custom Corners')" v-model:value="customCorner" @update:value="renderOverlays()" />
                <!-- bg and fg colors -->
                <!-- ------------ -->
                <!-- dotImage -->
                <!-- randomSize -->
                <!-- ------------ -->
                <!-- customCorner -->
                <!-- ------------ -->
                <!-- withLogo -->
            </div>
            <div class="flex flex-col gap-4 w-full max-w-screen-xs p-4 rounded-lg bg-pencil-tip text-white shadow-nr10">
                <small class="w-full opacity-75 -mb-2">Make sure the colors have good contrast so that the code is easily scannable</small>
                <canvas class="w-full max-w-screen-xs aspect-square shadow-nr15 rounded-xl" ref="canvasEl"></canvas>
                <!-- <generateSVG class="shadow-nr15" /> -->
                <button class="btn text-sm p-2 rounded-md bg-violet" @click="saveCanvas()">Download QR Code</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Switch from "~/components/form/Switch.vue";
import QR from "~/composables/qrcodegen";

// TODO : image and random size is for standard and up
// pro can access more images and brand logo
// basic can have custom corners and gradient

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const selectedTab = "qrcode";

const link = `${runtimeConfig.public.BASE_URL}/r/${route.params.brandID}`;
// const value = `https://menuriom.com/r/${route.params.brandID}/`;
const borderMargin = ref(4);
const rotateTheCode = ref(true);
const size = 1024;

const backgroundGradient = ref(false);
const backgroundGradientType = ref("Linear"); // Linear | Radial
const backgroundGradientAngle = ref(0); // 0 | 45 | 90
const backgroundColor1 = ref("#ffffff");
const backgroundColor2 = ref("#fff");

const foregroundGradient = ref(false);
const foregroundGradientType = ref("Linear"); // Linear | Radial
const foregroundGradientAngle = ref(0); // 0 | 45 | 90
const foregroundColor1 = ref("#000");
const foregroundColor2 = ref("#000");

const dotImage = ref("/icons/qr-dots/Square.svg");
const radius = ref(1);
const randomSize = ref(false);

const customCorner = ref(false);
const cornerRingColor = ref("#000");
const cornerCenterColor = ref("#000");
const cornerRingRadius = ref(0.2); // 0 - 2 : .1
const cornerCenterRadius = ref(0.1); // 0 - 2 : .1

let logoImg;
const withLogo = ref(false);
const logoPadding = ref(2);
const logoBorderRadius = ref(1); // 0 - 7 : 1
const logoShadow = ref(true);
const logoShadowIntensity = ref(5); // 2 - 9 : 1
const logoSrc = ref("/file/logos/d7af7f85-bbd4-42f7-b067-733273217f9c.webp");

let img;
const cellNumbers = ref(0);
const cellLength = ref(0);

const cells = QR.QrCode.encodeText(link, QR.QrCode.Ecc.HIGH).getModules();
const canvasEl = ref(); // Dom Ref
let IMCctx;

const drawQR = () => {
    const canvas = canvasEl.value;
    const ctx = canvas.getContext("2d");

    const margin = borderMargin.value;
    cellLength.value = cells.length;
    cellNumbers.value = cells.length + margin * 2;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasScale = (size / cellNumbers.value) * devicePixelRatio;
    canvas.width = canvas.height = size * devicePixelRatio;
    ctx.scale(canvasScale, canvasScale);

    const imageModuleCanvas = document.createElement("canvas");
    imageModuleCanvas.width = imageModuleCanvas.height = canvas.width * 6;
    IMCctx = imageModuleCanvas.getContext("2d");
    IMCctx.scale(canvasScale * 6, canvasScale * 6);
    IMCctx.imageSmoothingQuality = "high";
    IMCctx.globalCompositeOperation = "luminosity";

    renderAll();
};

const renderAll = () => {
    drawModules();
    renderOverlays();
};

const drawModules = () => {
    IMCctx.clearRect(0, 0, cellNumbers.value, cellNumbers.value);
    cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
            if (!cell) return;
            const dotSize = randomSize.value ? radius.value * Math.max(Math.random(), 0.65) : radius.value;
            if (rotateTheCode.value) IMCctx.drawImage(img, rdx, cdx, dotSize + 0.025, dotSize + 0.025);
            else IMCctx.drawImage(img, cdx, rdx, dotSize + 0.025, dotSize + 0.025);
        });
    });
};

const renderOverlays = () => {
    const ctx = canvasEl.value.getContext("2d");
    const margin = borderMargin.value;

    const foregroundFillStyle = foregroundGradient.value
        ? gradientGenerator({
              type: foregroundGradientType.value,
              color1: foregroundColor1.value,
              color2: foregroundColor2.value,
              angle: foregroundGradientAngle.value,
          })
        : foregroundColor1.value;

    const backgroundFillStyle = backgroundGradient.value
        ? gradientGenerator({
              type: backgroundGradientType.value,
              color1: backgroundColor1.value,
              color2: backgroundColor2.value,
              angle: backgroundGradientAngle.value,
          })
        : backgroundColor1.value;

    // draw the code
    ctx.globalCompositeOperation = "destination-atop";
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(IMCctx.canvas, 0, 0, IMCctx.canvas.width, IMCctx.canvas.width, margin, margin, cellNumbers.value, cellNumbers.value);

    // draw foreground
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = foregroundFillStyle;
    ctx.fillRect(margin, margin, cellLength.value, cellLength.value);

    // draw background
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundFillStyle;
    ctx.fillRect(0, 0, cellNumbers.value, cellNumbers.value);

    ctx.globalCompositeOperation = "source-over";
    if (customCorner.value) drawCorners(backgroundFillStyle);
    if (withLogo.value) drawLogo(backgroundFillStyle);
};

const drawLogo = (backgroundFillStyle) => {
    const ctx = canvasEl.value.getContext("2d");

    const imageSize = Math.min(link.length / 2.5, 11);
    const pos = cellNumbers.value / 2 - imageSize / 2;

    ctx.save();

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
    logoImg.src = logoSrc.value;
    logoImg.onload = () => ctx.drawImage(img, pos, pos, imageSize, imageSize);
    // TODO : we dont need to draw logo image over and over : make it so that it draw once

    ctx.restore();
};

const drawCorners = (backgroundFillStyle) => {
    const ctx = canvasEl.value.getContext("2d");
    const margin = borderMargin.value;
    let offset = margin - 0.2;

    // hide the corners
    ctx.fillStyle = backgroundFillStyle;
    ctx.beginPath();
    ctx.rect(0 + offset, 0 + offset, 8, 8);
    ctx.rect(cellNumbers.value - (7.9 + offset), 0 + offset, 8.2, 8);
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

const gradientGenerator = (options = { type: "Linear", color1: "", color2: "", angle: 0 }) => {
    if (!options.color2) return options.color1;
    const width = cellNumbers.value;
    const ctx = canvasEl.value.getContext("2d");

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
    // basic
    // img.src = "/icons/qr-dots/Dot.svg";
    // img.src = "/icons/qr-dots/Square-Dot.svg";
    // img.src = "/icons/qr-dots/Square.svg";

    // standard
    // img.src = "/icons/qr-dots/Bars.svg";
    // img.src = "/icons/qr-dots/Sparkle.svg";
    // img.src = "/icons/qr-dots/Star.svg";
    // img.src = "/icons/qr-dots/Tile.svg";
    // img.src = "/icons/qr-dots/Panel.svg";
    // img.src = "/icons/qr-dots/Octagon.svg";
    // img.src = "/icons/qr-dots/Squares.svg";
    // img.src = "/icons/qr-dots/Rectangle-Fade.svg";

    // pro
    // img.src = "/icons/qr-dots/Circle-Heart.svg";
    // img.src = "/icons/qr-dots/Square-Rounded.svg";
    // img.src = "/icons/qr-dots/Skull.svg";
    // img.src = "/icons/qr-dots/Sushi-Roll.svg";
    // img.src = "/icons/qr-dots/Taco.svg";
    // img.src = "/icons/qr-dots/Pie-Cake.svg";
    // img.src = "/icons/qr-dots/Pie.svg";
    // img.src = "/icons/qr-dots/Paw.svg";
    // img.src = "/icons/qr-dots/Moon.svg";
    // img.src = "/icons/qr-dots/Fire.svg";

    // TODO : add more svg for pro

    // make image objects
    img = logoImg = new Image();

    img.src = dotImage.value;
    img.onload = () => drawQR();
});

const saveCanvas = () => {
    const dataURL = canvasEl.value.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "QR-Code.png";
    a.href = dataURL;
    a.click();
};
</script>
