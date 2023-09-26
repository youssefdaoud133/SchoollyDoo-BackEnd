const { URL } = require("url");

// Function to check if an S3 pre-signed URL has expired
function isS3UrlExpired(preSignedUrl) {
  try {
    // Parse the URL
    const url = new URL(preSignedUrl);

    // Extract the expiration time in seconds
    const expirationParam = url.searchParams.get("X-Amz-Expires");
    if (expirationParam) {
      const expirationSeconds = parseInt(expirationParam);

      if (!isNaN(expirationSeconds)) {
        // Extract the date and time components from the 'X-Amz-Date' parameter
        const isoDate = url.searchParams.get("X-Amz-Date");
        const year = parseInt(isoDate.substr(0, 4));
        const month = parseInt(isoDate.substr(4, 2)) - 1; // Months are 0-based in JavaScript
        const day = parseInt(isoDate.substr(6, 2));
        const hour = parseInt(isoDate.substr(9, 2));
        const minute = parseInt(isoDate.substr(11, 2));
        const second = parseInt(isoDate.substr(13, 2));

        // Create a Date object with the extracted components
        const expirationTime = new Date(
          Date.UTC(year, month, day, hour, minute, second)
        );

        // Add the expiration time in seconds
        expirationTime.setSeconds(
          expirationTime.getSeconds() + expirationSeconds
        );

        // Compare the current time with the expiration time
        const currentTime = new Date();
        return currentTime >= expirationTime;
      }
    }
  } catch (error) {
    console.error("Error parsing the URL:", error);
  }

  // If expiration time cannot be determined, consider it as expired
  return true;
}

// Export the function for use in other modules
module.exports = isS3UrlExpired;
