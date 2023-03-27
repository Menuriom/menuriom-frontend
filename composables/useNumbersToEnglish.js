const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
// sample: ۰۹۱۵۸۱۶۵۶۶۴
// edited: 09158165664

export const useNumbersToEnglish = (string) => {
    if (typeof string !== "string") return string;
    for (let i = 0; i < 10; i++) string = string.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    return string;
};
