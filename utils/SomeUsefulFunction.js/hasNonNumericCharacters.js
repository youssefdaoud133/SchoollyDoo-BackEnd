function hasNonNumericCharacters(numberString) {
  // Regular expression to match any non-numeric characters
  const nonNumericRegex = /[^0-9]/g;

  // Check if the string contains any non-numeric characters
  return nonNumericRegex.test(numberString);
}

module.exports = hasNonNumericCharacters;
