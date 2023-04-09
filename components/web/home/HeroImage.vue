<style scoped></style>

<template>
    <div
        class="relative xl:absolute xl:-top-6 1.5xl:-top-32 end-0 flex xl:inline-block flex-col-reverse sm:items-center w-full xl:w-auto -mb-24 xl:mb-0 xl:mt-32"
    >
        <div class="relative -top-10 sm:-end-14 flex items-end justify-start gap-4 sm:-rotate-45 rtl:sm:rotate-45">
            <div
                class="gradient absolute top-24 xl:top-16 1.5xl:-top-4 -end-2 xl:-start-8 1.5xl:start-0 w-screen max-w-2xl h-16 1.5xl:h-20 rounded-lg shadow-nr10"
            ></div>
            <img class="relative ms-auto w-48 sm:w-40 1.5xl:w-auto shadow-nr25" src="~/assets/images/menus/1.png" alt="menu1" />
            <img class="hidden sm:inline-block relative w-36 1.5xl:w-auto shadow-nr25" src="~/assets/images/menus/2.png" alt="menu2" />
            <img class="relative w-52 sm:w-48 1.5xl:w-auto -mb-4 xl:-mb-56 1.5xl:-mb-60 shadow-nr25" src="~/assets/images/menus/3.png" alt="menu3" />
        </div>
        <img
            class="relative xl:absolute top-12 xl:top-auto start-4 sm:start-auto sm:end-52 xl:-end-2 1.5xl:end-2 w-60 sm:w-56 1.5xl:w-auto -mb-56 xl:mb-0 xl:-mt-20 1.5xl:-mt-28 sm:rotate-45 rtl:sm:-rotate-45"
            src="~/assets/images/menus/4.png"
            alt="menu4"
        />
        <ul class="absolute top-1/4 end-1/3 w-40 sm:w-96 h-96 flex flex-col z-10">
            <li
                class="absolute top-0 end-0 sm:-end-10 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
            >
                <img class="w-4 1.5xl:w-auto" src="/icons/checked-box.png" alt="checked-box" />
                <span class="text-xs 1.5xl:text-base">Multilingual</span>
            </li>
            <li
                class="absolute top-20 end-0 sm:end-auto sm:start-10 1.5xl:start-0 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
            >
                <img class="w-4 1.5xl:w-auto" src="/icons/checked-box.png" alt="checked-box" />
                <span class="text-xs 1.5xl:text-base">Ordering System</span>
            </li>
            <li
                class="absolute top-40 -end-16 sm:-end-32 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
            >
                <img class="w-4 1.5xl:w-auto" src="/icons/checked-box.png" alt="checked-box" />
                <span class="text-xs 1.5xl:text-base">User Friendly Interface</span>
            </li>
            <li
                class="absolute top-60 -end-8 sm:end-auto sm:start-20 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
            >
                <img class="w-4 1.5xl:w-auto" src="/icons/checked-box.png" alt="checked-box" />
                <span class="text-xs 1.5xl:text-base">Customizable</span>
            </li>
            <li
                class="absolute top-80 sm:top-96 end-0 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
            >
                <img class="w-4 1.5xl:w-auto" src="/icons/checked-box.png" alt="checked-box" />
                <span class="text-xs 1.5xl:text-base">Responsive Design</span>
            </li>
        </ul>
    </div>
</template>

<script setup></script>
