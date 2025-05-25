async function goToCompanyPeopleSection(companyName = "Apple") {
    // Type into the search box
    const searchInput = document.querySelector('input[placeholder="Search"]');
    if (!searchInput) return console.log("Search input not found!");
  
    searchInput.value = companyName;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  
    // Press Enter to submit search
    const keyboardEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    searchInput.dispatchEvent(keyboardEvent);
  
    console.log("Searching...");
    await new Promise(r => setTimeout(r, 3000)); // wait for search results to load
  
    // Click the first search result link
    const firstResult = document.querySelector("main a[href*='/company/'], main a[href*='/school/']");
    if (!firstResult) return console.log("No company or school profile found!");
  
    firstResult.click();
    console.log("Navigating to company page...");
    await new Promise(r => setTimeout(r, 4000)); // wait for company page to load
  
    // Click on the "People" tab
    const peopleTab = [...document.querySelectorAll("a")].find(a =>
      a.innerText.trim().toLowerCase() === "people"
    );
  
    if (peopleTab) {
      peopleTab.click();
      console.log("Navigating to People section...");
    } else {
      console.log("People tab not found.");
    }
  }
  
  
async function sendConnectionRequests() {
    const connectButtons = [...document.querySelectorAll("button")].filter(btn =>
      btn.innerText.includes("Connect")
    );
    let maxLen = Math.max(connectButtons.length,20);
    for (let i = 0; i < connectButtons.length; i++) {
      console.log(`Clicking Connect button #${i + 1}`);
      connectButtons[i].click();
  
      // Wait for modal to open
      await new Promise(r => setTimeout(r, 1500));
  
      // Find the "Send without a note" button
      const sendBtn = [...document.querySelectorAll("button")].find(btn =>
        btn.innerText.trim() === "Send without a note"
      );
  
      if (sendBtn) {
        console.log(`Clicking 'Send without a note' button`);
        sendBtn.click();
      } else {
        console.log("Could not find 'Send without a note' button");
      }
  
      // Wait before moving to the next connection
      await new Promise(r => setTimeout(r, 1500));
    }
  
    console.log("Finished sending connection requests.");
  }
  
  // Call the function
  (async()=>{
    await goToCompanyPeopleSection("Apple");
    await sendConnectionRequests();
  })();
  