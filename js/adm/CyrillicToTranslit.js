﻿'use strict';
var config = { preset: "ru" };
function cyrillicToTranslit(config) {
  const _preset = config ? config.preset : "ru";

  const _firstLetterAssociations = {
    "а": "a",
    "б": "b",
    "в": "v",
    "ґ": "g",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "e",
    "є": "ye",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "і": "i",
    "ї": "yi",
    "й": "i",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sch",
    "ъ": "",
    "ы": "i",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
  };

  if (_preset === "uk") {
    Object.assign(_firstLetterAssociations, {
      "г": "h",
      "и": "y",
      "й": "y",
      "х": "kh",
      "ц": "ts",
      "щ": "shch",
      "'": "",
      "’": "",
      "ʼ": "",
    });
  }

  const _associations = Object.assign({}, _firstLetterAssociations);

  if (_preset === "uk") {
    Object.assign(_associations, {
      "є": "ie",
      "ї": "i",
      "й": "i",
      "ю": "iu",
      "я": "ia",
    });
  }

  function transform(input, spaceReplacement) {
    if (!input) {
      return "";
    }

    let newStr = "";
    for (let i = 0; i < input.length; i++) {
      const isUpperCaseOrWhatever = input[i] === input[i].toUpperCase();
      let strLowerCase = input[i].toLowerCase();
      if (strLowerCase === " " && spaceReplacement) {
        newStr += spaceReplacement;
        continue;
      }
      let newLetter = _preset === "uk" && strLowerCase === "г" && i > 0 && input[i - 1].toLowerCase() === "з"
        ? "gh"
        : (i === 0 ? _firstLetterAssociations : _associations)[strLowerCase];
      if ("undefined" === typeof newLetter) {
        newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
      }
      else {
        newStr += isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter;
      }
    }
    return newStr;
  }

  return {
    transform: transform
  };
};
