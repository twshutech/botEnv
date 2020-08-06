/*******************************************************************************
*
* Iframe Detector Background JS
* _________________________________________
* [2018] Pericror
* All Rights Reserved
* Use of this source code is governed by the license found in the LICENSE file.
********************************************************************************/

function updateBadge(response) {
    console.log('update badge',response)
    return
    if(response != undefined){
        if(response.iframes != null && response.iframes.src != null){
            return
        }
    }
};

// Add listener to update badge when tab loads
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab);
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.sendMessage(tabId, {from: 'background', 'tabId': tabId});
    }
});

// Listens for content messages
chrome.runtime.onMessage.addListener(function (msg, sender) {
    console.log('msg',msg,'sender',sender);
    if (msg.from === 'content'&&msg.videoSrc){
        chrome.tabs.update(msg.tabId, {
            url: msg.videoSrc
        });
        chrome.contextMenus.update("iframe_src_picker",{
            linkUrl: msg.videoSrc
        });
        //updateContextMenu(msg.iframes.src);
    }
});

// Context menu on click event listener.
chrome.contextMenus.onClicked.addListener((info, tab) =>  {
    console.log('info',info, 'tab', tab);
    if(info['frameUrl']){
        chrome.tabs.update(tab.id, {
            url: info.frameUrl
        });
    }
    else if(info.linkUrl){
        chrome.tabs.update(tab.id, {
            url: info.linkUrl
        });
    }
});

chrome.contextMenus.create({
  id:"iframe_src_picker",
  title: "Page iframes sources",
  contexts: ["all"],
});