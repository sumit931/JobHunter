async function goToCompanyPeopleSection(companyName = "Apple") {
    const searchInput = document.querySelector('input[placeholder="Search"]');
    if (!searchInput) return console.log("Search input not found!");
  
    searchInput.value = companyName;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  
    const keyboardEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    searchInput.dispatchEvent(keyboardEvent);
  
    console.log("Searching...");
    await new Promise(r => setTimeout(r, 3000));
  
    const firstResult = document.querySelector("main a[href*='/company/'], main a[href*='/school/']");
    if (!firstResult) return console.log("No company or school profile found!");
  
    firstResult.click();
    console.log("Navigating to company page...");
    await new Promise(r => setTimeout(r, 4000));
  
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
  
  async function sendConnectionRequests(numberOfConnections = 5) {
    while(true){
    const connectButtons = [...document.querySelectorAll("button")].filter(btn =>
      btn.innerText.includes("Connect")
    );
    if(connectButtons.length>=numberOfConnections)break;
    const showMoreBtn = [...document.querySelectorAll('button')]
    .find(btn => btn.innerText.trim().toLowerCase() === "show more results");

    if (showMoreBtn) {
      showMoreBtn.click();
      await new Promise(r=>setTimeout(r,1500));

      // console.log("Clicked 'Show more' button.");
    } else {
      break;
      // console.log("'Show more' button not found.");
    }
  }
    const connectButtons = [...document.querySelectorAll("button")].filter(btn =>
      btn.innerText.includes("Connect")
    );   

    let maxLen = Math.min(connectButtons.length, numberOfConnections);
    // let maxLen = 2;
    for (let i = 0; i < maxLen; i++) {
      console.log(`Clicking Connect button #${i + 1}`);
      connectButtons[i].click();
  
      await new Promise(r => setTimeout(r, 1500));
  
      const sendBtn = [...document.querySelectorAll("button")].find(btn =>
        btn.innerText.trim() === "Send without a note"
      );
  
      if (sendBtn) {
        console.log("Clicking 'Send without a note' button");
        sendBtn.click();
      } else {
        console.log("Could not find 'Send without a note' button");
      }
  
      await new Promise(r => setTimeout(r, 1500));
    }
  
    console.log("Finished sending connection requests.");
  }
  
  async function runTheScript(companyName,numberOfConnections) {
    await goToCompanyPeopleSection(companyName);
    await new Promise(r => setTimeout(r, 3000));
    await sendConnectionRequests(numberOfConnections);
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start" && message.companyName) {
      console.log("Received company name:", message.companyName);
      runTheScript(message.companyName, message.numberOfConnections)
        .then(() => {
          sendResponse({ status: "success" });
        })
      return true; // This is important! It tells Chrome to keep the message channel open for the async response
    }
  });
  