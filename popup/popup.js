document.getElementById("sendConnection").addEventListener("click", async () => {
    const companyName = document.getElementById("companyInput").value.trim();
    let numberOfConnections = parseInt(document.getElementById("numberOfConnections").value.trim()) || 5;
  
    if (!companyName) {
      alert("Please enter a company name");
      return;
    }
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (!tab || !tab.url.includes("linkedin.com")) {
      alert("Please open a LinkedIn page and try again.");
      return;
    }
  
    try {
      // Inject content.js if not already injected
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
  
      // Send message to content.js
      chrome.tabs.sendMessage(tab.id, { 
        action: "start", 
        companyName, 
        numberOfConnections: Number(numberOfConnections) 
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
          alert("Failed to communicate with content script.");
        } else {
          console.log("Message sent successfully");
        }
      });
    } catch (e) {
      console.error("Script injection failed:", e);
      alert("Could not inject script into this page.");
    }
  });
  