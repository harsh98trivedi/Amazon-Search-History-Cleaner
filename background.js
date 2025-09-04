// This function will be injected into the active Amazon page.
function clearSearchSuggestions() {
  const searchInput = document.getElementById("twotabsearchtextbox");

  // First, focus on the search input to make the suggestions appear.
  if (searchInput) {
    searchInput.focus();
  } else {
    console.log("Amazon Search Cleaner: Could not find the search bar.");
    return;
  }

  let itemsCleared = 0;
  console.log(
    "Amazon Search Cleaner: Looking for search suggestions to clear..."
  );

  // Set a short delay to allow the suggestion dropdown to appear after focus.
  setTimeout(() => {
    // Use an interval to repeatedly clear items as they appear.
    const intervalId = setInterval(() => {
      // The 'X' buttons to delete search suggestions.
      const deleteButtons = document.querySelectorAll(
        ".s-suggestion-deleteDistinct"
      );

      if (deleteButtons.length === 0) {
        clearInterval(intervalId); // Stop the loop.

        if (itemsCleared > 0) {
          const message = `Amazon Search Cleaner: Successfully cleared search suggestions.`;
          console.log(message);
          alert(message);
        } else {
          const message =
            "Amazon Search Cleaner: No search suggestions to clear.";
          console.log(message);
        }

        // Un-focus the search bar when done.
        if (searchInput) {
          searchInput.blur();
        }
        return;
      }

      itemsCleared += deleteButtons.length;
      console.log(`Clearing ${deleteButtons.length} search suggestions...`);

      deleteButtons.forEach((button) => {
        if (button && typeof button.click === "function") {
          button.click();
        }
      });
    }, 200); // Run every 200ms for a quick clear.
  }, 500); // Wait 500ms for the suggestions to load after focusing.
}

// Listen for a click on the extension icon.
chrome.action.onClicked.addListener((tab) => {
  // Check if we are on a valid Amazon page.
  if (tab.url && new URL(tab.url).hostname.includes("amazon.")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: clearSearchSuggestions,
    });
  } else {
    console.log("This extension only works on Amazon websites.");
  }
});
