import axios from "axios";
import { delay, getRequestConfig } from "~/composables/useServerUtil";

export const getBrandList = async () => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/brands`, {});
    const params = [`pp=25`];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _canCreateNewBrand = false;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = [..._records, ...response.data.records];
            if (response.data.records.length == 0) _noMoreRecords = true;
            _canCreateNewBrand = response.data.canCreateNewBrand;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _noMoreRecords, _canCreateNewBrand };
};

export const getBrandSettings = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/brands/${brandID}/settings`, {});
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _languages = [];
    let _currency = "";

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _languages = response.data.languages;
            _currency = response.data.currency;
        })
        .catch((e) => {
            throw e;
        });

    return { _languages, _currency };
};

export const getLanguages = async () => {
    let { url, headers } = getRequestConfig(`/api/v1/general/language-list`, {});
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _languages = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => (_languages = { ...response.data }))
        .catch((e) => {
            throw e;
        });

    return { _languages };
};

export const getCurrencies = async () => {
    let { url, headers } = getRequestConfig(`/api/v1/general/currency-list`, {});
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _currencies = {};

    await axios
        .get(url, { headers: headers, timeout: 10 * 1000 })
        .then((response) => (_currencies = { ...response.data }))
        .catch((e) => {
            throw e;
        });

    return { _currencies };
};
