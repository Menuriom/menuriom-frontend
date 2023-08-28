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

// menu category ---------------------------------------------------------
export const getCategoryIconList = async (brandID, records = []) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/icons`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _icons = records;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _icons = response.data.icons;
        })
        .catch((e) => {
            throw e;
        });

    return { _icons };
};
export const getCategoryList = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-categories`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _categories = [];
    let _canCreateNewCategory = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _categories = response.data.records;
            _canCreateNewCategory = response.data.canCreateNewCategory;
        })
        .catch((e) => {
            throw e;
        });

    return { _categories, _canCreateNewCategory };
};
export const getCategoryInfo = async (categoryID, brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-categories/${categoryID}`, { brand: brandID });
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

// menu items / dishes ---------------------------------------------------------
export const getDishesList = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-items`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _items = [];
    let _canCreateNewDish = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _items = response.data.records;
            _canCreateNewDish = response.data.canCreateNewItem;
        })
        .catch((e) => {
            throw e;
        });

    return { _items, _canCreateNewDish };
};
export const getMenuItem = async (ItemID, brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-items/${ItemID}`, { brand: brandID });
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
export const getSideItemGroupList = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-sides`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _canCreateNewGroup = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = response.data.records;
            _canCreateNewGroup = response.data.canCreateNewGroup;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _canCreateNewGroup };
};
// ---------------------------------------------------------

// menu styles ---------------------------------------------------------
export const loadMenuStyleSettings = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-styles`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _menuStyles = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _menuStyles = response.data.menuStyles;
        })
        .catch((e) => {
            throw e;
        });

    return { _menuStyles };
};
// ---------------------------------------------------------

// qr codes ---------------------------------------------------------
export const loadQRCodeSettings = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/menu-qrcode`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _QRSettings = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _QRSettings = response.data.qrSettings;
        })
        .catch((e) => {
            throw e;
        });

    return { _QRSettings };
};
// ---------------------------------------------------------

// staff ---------------------------------------------------------
export const getStaffList = async (brandID, branchID, records = [], pp = 25, lastRecordID, searchQuery = "") => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff`, { brand: brandID });
    const params = [];
    params.push(`pp=${pp}`);
    if (searchQuery) params.push(`searchQuery=${searchQuery}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    if (branchID) params.push(`branchID=${branchID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = records;
    let _total = 0;
    let _canInviteNewMembers = false;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records.push(...response.data.records);
            _total = Number(response.data.total);
            _canInviteNewMembers = response.data.canInviteNewMembers;
            if (response.data.records.length === 0) _noMoreRecords = true;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _canInviteNewMembers, _total, _noMoreRecords };
};
export const getStaffRolesList = async (brandID, fields) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff-roles`, { brand: brandID });
    const params = [];
    if (fields) params["fields"] = fields.join(",");
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _canCreateNewRoles = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = [..._records, ...response.data.records];
            _canCreateNewRoles = response.data.canCreateNewRoles;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _canCreateNewRoles };
};
export const getInviteList = async (records = [], pp = 25, lastRecordID) => {
    let { url, headers } = getRequestConfig(`/api/v1/account/invitation-list`, {});
    const params = [];
    params.push(`pp=${pp}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _totalBrands = 0;
    let _invites = records;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _totalBrands = response.data.totalBrands;
            const newInvites = response.data.invites.map((record) => {
                return { ...record, loading: false };
            });
            _invites = [..._invites, ...newInvites];

            if (newInvites.length === 0) _noMoreRecords = true;
        })
        .catch((e) => {
            throw e;
        });

    return { _invites, _noMoreRecords, _totalBrands };
};
export const getSentInviteList = async (brandID, records = [], pp = 25, lastRecordID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff/sent-invites`, { brand: brandID });
    const params = [];
    params.push(`pp=${pp}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _invites = records;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            const newInvites = response.data.records;
            _invites = [..._invites, ...newInvites];

            if (newInvites.length === 0) _noMoreRecords = true;
        })
        .catch((e) => {
            throw e;
        });

    return { _invites, _noMoreRecords };
};
// ---------------------------------------------------------

// roles ---------------------------------------------------------
export const getPermissionsList = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff-roles/permissions-list`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _permissions = [];

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _permissions = [...response.data.permissions];
        })
        .catch((e) => {
            throw e;
        });

    return { _permissions };
};
export const getRoleInfo = async (brandID, roleID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/staff-roles/${roleID}`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _permissions = [];
    let _name = [];

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _permissions = response.data.permissions;
            _name = response.data.name;
        })
        .catch((e) => {
            throw e;
        });

    return { _permissions, _name };
};
// ---------------------------------------------------------

// billing ---------------------------------------------------------
export const getCurrentPlan = async (brandID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/billing/current-plan`, { brand: brandID });
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _currentPlan = [];
    let _lastBill = [];

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _currentPlan = response.data.currentPlan;
            _lastBill = response.data.lastBill;
        })
        .catch((e) => {
            throw e;
        });

    return { _currentPlan, _lastBill };
};
export const getPurchasablePlans = async () => {
    let { url, headers } = getRequestConfig(`/api/v1/pricing/purchasable-plans`, {});
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _plans = [];

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _plans = response.data.plans;
        })
        .catch((e) => {
            throw e;
        });

    return { _plans };
};
export const getTransactionDetails = async (transactionID) => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/transactions/${transactionID}`, {});
    const params = [];
    url = encodeURI(`${url}?${params.join("&")}`);

    let _brandID = "";
    let _bill = {};
    let _transaction = {};

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _brandID = response.data.brandID;
            _bill = response.data.bill;
            _transaction = response.data.transaction;
        })
        .catch((e) => {
            throw e;
        });

    return { _brandID, _bill, _transaction };
};
export const getBillHistoryList = async (brandID, records = [], pp = 25, lastRecordID, searchQuery = "") => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/billing/list`, { brand: brandID });
    const params = [];
    params.push(`pp=${pp}`);
    if (searchQuery) params.push(`searchQuery=${searchQuery}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = records;
    let _total = 0;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records.push(...response.data.records);
            _total = Number(response.data.total);
            if (response.data.records.length === 0) _noMoreRecords = true;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _total, _noMoreRecords };
};
export const getBillTransactionsList = async (brandID, billID, records = [], pp = 25, lastRecordID, searchQuery = "") => {
    let { url, headers } = getRequestConfig(`/api/v1/panel/transactions`, { brand: brandID });
    const params = [];
    params.push(`pp=${pp}`);
    if (searchQuery) params.push(`searchQuery=${searchQuery}`);
    if (lastRecordID) params.push(`lastRecordID=${lastRecordID}`);
    if (billID) params.push(`billID=${billID}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = records;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records.push(...response.data.records);
            if (response.data.records.length === 0) _noMoreRecords = true;
        })
        .catch((e) => {
            throw e;
        });

    return { _records, _noMoreRecords };
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
