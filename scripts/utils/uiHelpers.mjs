/**
 * Function to convert a given number to Indian currency (INR)
 * @param number - number to be converted
 * @param decimalPlaces - decimal places to which the number should be rounded off to
 * @returns number converted to INR currency
 */
export const convertNumberToIndianCurrency = (number, decimalPlaces = 0) => {
  number = +number;
  return number.toLocaleString("en-IN", {
    maximumFractionDigits: decimalPlaces,
    style: "currency",
    currency: "INR",
  });
};

/**
 * Function to get a number from the given locale string
 * @param localeString - locale string from which the number is to be extracted
 * @returns number extracted from locale string
 */
export const getNumberFromLocaleString = (localeString) => {
  return parseFloat(localeString.replace(/[^0-9-.]/g, ""));
};

/**
 * Function to get percentage of current value in the given slider range
 * @param min - minimum value in range
 * @param max - maximum value in range
 * @param value - current value
 * @returns percentage (or portion) of slider
 */
export const getSliderProgressRange = (min, max, value) => {
  return ((value - min) / (max - min)) * 100;
};
