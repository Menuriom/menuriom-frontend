export const checkLimitations = (LimitationsToCheck = [], Brand, style = "OR") => {
    const Limitations = {};
    Brand.limitations.forEach((limitation) => (Limitations[limitation.limit] = { ...limitation }));

    if (style == "AND") {
        for (let i = 0; i < LimitationsToCheck.length; i++) {
            if (Limitations[LimitationsToCheck[i][0]].value !== LimitationsToCheck[i][1]) return false;
        }
        return true;
    } else {
        for (let i = 0; i < LimitationsToCheck.length; i++) {
            if (Limitations[LimitationsToCheck[i][0]].value === LimitationsToCheck[i][1]) return true;
        }
        return false;
    }
};
