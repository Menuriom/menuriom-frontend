import axios from "axios";
import { delay, getRequestConfig } from "~/composables/useServerUtil";

// brands ---------------------------------------------------------
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
    let { url, headers } = getRequestConfig(`/api/v1/panel/brands/${brandID}/settings`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _languages = [];
    let _currency = "";
    let _languageLimit = 2;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _languages = response.data.languages;
            _currency = response.data.currency;
            _languageLimit = response.data.languageLimit;
        })
        .catch((e) => {
            throw e;
        });

    return { _languages, _currency, _languageLimit };
};
export const getBrandInfo = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/brands/${brandID}`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _info = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _info = response.data;
        })
        .catch((e) => {
            throw e;
        });

    return { _info };
};
// ---------------------------------------------------------

// branches ---------------------------------------------------------
export const getBranchInfo = async (branchID, brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/branches/${branchID}`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _info = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _info = response.data;
        })
        .catch((e) => {
            throw e;
        });

    return { _info };
};
export const getBranchList = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/branches/`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _canCreateNewBranch = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = [..._records, ...response.data.records];
            _canCreateNewBranch = response.data.canCreateNewBranch;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _canCreateNewBranch };
};
// ---------------------------------------------------------

// staff ---------------------------------------------------------
export const getStaffList = async (brandID, branchID, pp, lastRecordID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff`, { brand: brandID });
    const params = [];
    params.push(`pp=${pp ? pp : "25"}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    if (branchID) params.push(`branchID=${branchID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _total = 0;
    let _canInviteNewMembers = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = [..._records, ...response.data.records];
            _total = Number(response.data.total);
            _canInviteNewMembers = response.data.canInviteNewMembers;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _canInviteNewMembers, _total };
};
// ---------------------------------------------------------

// general APIs ---------------------------------------------------------
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
        .get(url, { headers: headers })
        .then((response) => (_currencies = { ...response.data }))
        .catch((e) => {
            throw e;
        });

    return { _currencies };
};
// ---------------------------------------------------------
