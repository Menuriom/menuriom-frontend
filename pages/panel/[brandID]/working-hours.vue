<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="calendar-clock.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.working-hours.Working Hours") }}</h1>
                </div>
            </div>
            <button class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0" @click="save()">
                <Icon class="w-4 h-4 bg-fgPrimary" name="floppy-disk.svg" folder="icons/light" size="16px" />
                {{ $t("panel.Save") }}
            </button>
        </header>
        <hr class="w-full border-bgSecondary" />
        <ul class="scroll-thin flex items-center gap-2 w-full -my-3 overflow-auto shrink-0">
            <li
                class="btn flex items-center gap-2 text-sm p-2 px-3 hover:px-5 border-2 rounded-xl shrink-0 bg-bgAccent cursor-pointer"
                :class="[selectedBranch === 'all' ? 'bg-bgSecondary border-primary border-opacity-75' : 'border-bgSecondary opacity-80']"
                @click="selectedBranch = 'all'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedBranch === 'all' ? 'bg-primary  shadow-md shadow-primary' : 'bg-fgPrimary']"
                    name="Stack.svg"
                    folder="icons/basil"
                    size="20px"
                />
                {{ $t("panel.staff.All Branches") }}
            </li>
            <li
                class="btn text-sm p-2 px-3 hover:px-5 border-2 rounded-xl shrink-0 bg-bgAccent cursor-pointer"
                :class="[selectedBranch === branch._id ? 'bg-bgSecondary border-primary border-opacity-75' : 'border-bgSecondary opacity-80']"
                v-for="(branch, i) in branches.list"
                :key="i"
                @click="selectedBranch = branch._id"
            >
                {{ branch.name }}
            </li>
        </ul>
        <hr class="w-full border-bgSecondary" />
        <div class="flex flex-col -my-2">
            <small class="opacity-75">
                {{ $t("panel.working-hours.All-branches working-hours setting will only apply to branches that have no hours set") }}
            </small>
            <small class="text-secondary">{{ $t("panel.working-hours.You can specify a custom hour for any branch") }}</small>
        </div>
        <section class="flex flex-col gap-2 w-full p-4 md:p-6 bg-bgAccent rounded-2xl" v-if="checkLimitations([['restaurant-detailed-info', true]], brand)">
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Saturdays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].saturday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].saturday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].saturday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].saturday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].saturday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Sundays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].sunday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].sunday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].sunday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].sunday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].sunday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Mondays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].monday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].monday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].monday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].monday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].monday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Tuesdays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].tuesday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].tuesday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].tuesday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].tuesday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].tuesday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Wednesdays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].wednesday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].wednesday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].wednesday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].wednesday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].wednesday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 border-b-2 border-bgSecondary min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Thursdays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].thursday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].thursday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].thursday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].thursday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].thursday.to"
                    />
                </div>
            </div>
            <div class="flex items-center gap-2 min-h-[3.5rem] pb-2">
                <span class="w-24">{{ $t("panel.working-hours.Fridays") }} :</span>
                <Switch class="" v-model:value="workingHours[selectedBranch].friday.open" />
                <small class="flex items-center gap-1 text-primary" v-if="workingHours[selectedBranch].friday.open">
                    {{ $t(`panel.working-hours.Open`) }}
                </small>
                <small class="flex items-center gap-1 text-primary" v-else> {{ $t(`panel.working-hours.Closed`) }} </small>
                <div class="flex flex-wrap items-center gap-2" v-if="workingHours[selectedBranch].friday.open">
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.From`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].friday.from"
                    />
                    <small class="flex items-center gap-1 text-primary"> {{ $t(`panel.working-hours.Till`) }} </small>
                    <input
                        class="w-40 bg-bgSecondary bg-opacity-75 p-1 px-3 rounded-xl shrink-0"
                        type="time"
                        v-model="workingHours[selectedBranch].friday.to"
                    />
                </div>
            </div>
        </section>
        <section class="flex flex-col gap-2 w-full p-4 md:p-6 bg-bgAccent rounded-2xl" v-else>
            <span class="opacity-75">{{ $t("panel.This feature is for the standard plan and above only") }}.</span>
            <nuxt-link class="text-purple-300 underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                {{ $t("panel.Upgrade your plan to get this feature") }}.
            </nuxt-link>
        </section>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Switch from "~/components/form/Switch.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const route = useRoute();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const selectedBranch = ref("all");
const workingHours = ref({
    all: {
        saturday: { open: true, from: "", to: "" },
        sunday: { open: true, from: "", to: "" },
        monday: { open: true, from: "", to: "" },
        tuesday: { open: true, from: "", to: "" },
        wednesday: { open: true, from: "", to: "" },
        thursday: { open: true, from: "", to: "" },
        friday: { open: true, from: "", to: "" },
    },
});
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/panel/working-hours`, { workingHours: workingHours.value }, { headers: { brand: route.params.brandID } })
        .then((response) => {
            toast.success(t(`panel.working-hours.Work hours updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
            if (process.server) console.log({ err });

            if (process.client) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            // LOGGER : log errors in sentry type thing
        })
        .finally(() => (saving.value = false));
};

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // LOGGER : log errors in sentry type thing
};

// getWorkingHours -------------------------------------------------
const getWorkingHours_results = await useFetch(`/api/v1/panel/working-hours/`, { lazy: process.client, headers: { brand: route.params.brandID } });
const loadingWorkingHours = computed(() => getWorkingHours_results.pending.value);

handleErrors(getWorkingHours_results.error.value);
watch(getWorkingHours_results.error, (err) => handleErrors(err));

const handleWorkingHours_results = (data) => {
    if (!data) return;
    workingHours.value = data.workingHours;
};
handleWorkingHours_results(getWorkingHours_results.data.value);
watch(getWorkingHours_results.data, (val) => handleWorkingHours_results(val));
// -------------------------------------------------

// getBranchList -------------------------------------------------
const branches = reactive({ list: [] });
const getBranchList_results = await useFetch(`/api/v1/panel/branches/`, { lazy: process.client, headers: { brand: route.params.brandID } });
const loadingBranches = computed(() => getBranchList_results.pending.value);

handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    if (!data) return;
    branches.list = data.records;
    branches.list.forEach((branch) => {
        if (workingHours.value[branch._id]) return;
        workingHours.value[branch._id] = {
            saturday: { open: false, from: "", to: "" },
            sunday: { open: false, from: "", to: "" },
            monday: { open: false, from: "", to: "" },
            tuesday: { open: false, from: "", to: "" },
            wednesday: { open: false, from: "", to: "" },
            thursday: { open: false, from: "", to: "" },
            friday: { open: false, from: "", to: "" },
        };
    });
};
handleBranchList_results(getBranchList_results.data.value);
watch(getBranchList_results.data, (val) => handleBranchList_results(val));
// -------------------------------------------------
</script>
