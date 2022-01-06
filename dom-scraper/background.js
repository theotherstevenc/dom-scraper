console.log('background testing 1,2,3')

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

  let msg = {
    txt: "arbitrary and unnecessary, however it can be useful!"
  }

  chrome.tabs.sendMessage(tab.id, msg)
}