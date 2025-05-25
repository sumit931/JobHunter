// console.log("popup.js loaded");
// document.getElementById("ping").addEventListener("click",()=>{
//     chrome.runtime.sendMessage({
//         type:"PING"
//     })
// })
document.getElementById("saveName").addEventListener("click",()=>{
    const name = document.getElementById("nameInput").value;
    chrome.storage.local.set({username:name});
})

chrome.storage.local.get("username",(data)=>{
    if(data.username){
        document.getElementById("nameInput").value = data.username;
    }
})