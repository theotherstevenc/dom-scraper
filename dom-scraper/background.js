chrome.action.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

  let msg = {
    txt: "arbitrary and unnecessary, however it can be useful!"
  }

  chrome.tabs.sendMessage(tab.id, msg)
}