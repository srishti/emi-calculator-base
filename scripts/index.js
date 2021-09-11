import * as helpers from "./utils/helpers.mjs";
import * as uiHelpers from "./utils/uiHelpers.mjs";
import * as uiConstants from "./utils/uiConstants.mjs";

// dom elements
let loanDomElements = {
  input: {},
  slider: {},
};

/**
 * Function to get common DOM elements
 */
const getDomElements = () => {
  // input elements
  loanDomElements.input.principal = document.getElementById("principal-input");
  loanDomElements.input.tenure = document.getElementById("tenure-input");
  loanDomElements.input.rate = document.getElementById("interest-rate-input");

  // slider elements
  loanDomElements.slider.principal =
    document.getElementById("principal-slider");
  loanDomElements.slider.tenure = document.getElementById("tenure-slider");
  loanDomElements.slider.rate = document.getElementById("interest-rate-slider");
};

/**
 * Function to set default values for input and slider
 */
const setInputAndSliderDefaultValues = () => {
  // slider defaults
  const sliderDefaultValues = {
    principal: uiConstants.SLIDER_DEFAULTS.PRINCIPAL.VALUE,
    tenure: uiConstants.SLIDER_DEFAULTS.TENURE.VALUE,
    rate: uiConstants.SLIDER_DEFAULTS.RATE.VALUE,
  };

  // set principal input text and slider value
  const formattedPrincipalValue = uiHelpers.convertNumberToIndianCurrency(
    sliderDefaultValues.principal
  );
  loanDomElements.input.principal.value = formattedPrincipalValue;
  loanDomElements.slider.principal.value = sliderDefaultValues.principal;

  // set tenure input text and slider value
  loanDomElements.input.tenure.value = sliderDefaultValues.tenure;
  loanDomElements.slider.tenure.value = sliderDefaultValues.tenure;

  // set interest rate input text and slider value
  loanDomElements.input.rate.value = sliderDefaultValues.rate;
  loanDomElements.slider.rate.value = sliderDefaultValues.rate;
};

/**
 * Funtion to update EMI-related elements on DOM
 * @param emi - EMI value
 */
const updateEmiOnDom = (emi) => {
  // show calculated EMI value on DOM
  const formattedEmi = uiHelpers.convertNumberToIndianCurrency(emi);

  const emiDomElement = document.getElementById("emi-value");
  emiDomElement.innerText = formattedEmi;
};

/**
 * Function to show results related to EMI and chart on DOM
 */
const showResults = () => {
  // calculate EMI value
  const principal = uiHelpers.getNumberFromLocaleString(
    loanDomElements.input.principal.value
  );
  const tenure = loanDomElements.input.tenure.value;
  const rate = loanDomElements.input.rate.value;

  const emi = helpers.getEmi(principal, tenure, rate);
  const totalInterest = helpers.getTotalInterest(principal, tenure, rate);

  updateEmiOnDom(emi);
};

/**
 * Function to update slider progress bar on DOM
 * @param {*} min - min value in the range of slider
 * @param {*} max - max value in the range of slider
 * @param {*} value - current value on the slider
 * @param {*} sliderElement - slider element to be updated on DOM
 */
const updateSliderProgress = (min, max, value, sliderElement) => {
  const sliderProgressRange = uiHelpers.getSliderProgressRange(min, max, value);

  sliderElement.style.background = `linear-gradient(to right, ${uiConstants.COLOR_PRIMARY} 0%, ${uiConstants.COLOR_PRIMARY} ${sliderProgressRange}%, ${uiConstants.COLOR_GRAY_LIGHT} ${sliderProgressRange}%, ${uiConstants.COLOR_GRAY_LIGHT} 100%)`;
};

/**
 * Function as event handler to respond to input changes in principal amount slider while seeking its progress bar
 * @param event
 */
const principalSliderSeekHandler = (event) => {
  const principalSliderValue = event.target.value;

  // update principal input text
  loanDomElements.input.principal.value =
    uiHelpers.convertNumberToIndianCurrency(principalSliderValue);

  // update principal slider progress
  updateSliderProgress(
    uiConstants.SLIDER_DEFAULTS.PRINCIPAL.MIN,
    uiConstants.SLIDER_DEFAULTS.PRINCIPAL.MAX,
    principalSliderValue,
    loanDomElements.slider.principal
  );

  showResults();
};

/**
 * Function as event handler to respond to input changes in tenure slider while seeking its progress bar
 * @param event
 */
const tenureSliderSeekHandler = (event) => {
  const tenureSliderValue = event.target.value;

  // update tenure input text
  loanDomElements.input.tenure.value = tenureSliderValue;

  // update tenure slider progress
  updateSliderProgress(
    uiConstants.SLIDER_DEFAULTS.TENURE.MIN,
    uiConstants.SLIDER_DEFAULTS.TENURE.MAX,
    tenureSliderValue,
    loanDomElements.slider.tenure
  );

  showResults();
};

/**
 * Function as event handler to respond to input changes in interest rate slider while seeking its progress bar
 * @param event
 */
const rateSliderSeekHandler = (event) => {
  const rateSliderValue = event.target.value;

  // update interest rate input text
  loanDomElements.input.rate.value = rateSliderValue;

  // update interest rate slider progress
  updateSliderProgress(
    uiConstants.SLIDER_DEFAULTS.RATE.MIN,
    uiConstants.SLIDER_DEFAULTS.RATE.MAX,
    rateSliderValue,
    loanDomElements.slider.rate
  );

  showResults();
};

/**
 * Function to attach event listeners to all sliders and input boxes for principal amount, tenure and interest rate
 * @param event
 */
const attachAllEventListeners = () => {
  // attaching event listeners on changing slider values (while seeking its progress bar) to update text boxes
  loanDomElements.slider.principal.addEventListener(
    "input",
    principalSliderSeekHandler
  );
  loanDomElements.slider.tenure.addEventListener(
    "input",
    tenureSliderSeekHandler
  );
  loanDomElements.slider.rate.addEventListener("input", rateSliderSeekHandler);
};

/**
 * Function to initialize application
 */
const initApp = () => {
  getDomElements();
  setInputAndSliderDefaultValues();
  attachAllEventListeners();
  showResults();
};

window.addEventListener("load", initApp);
