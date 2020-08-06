/*******************************************************************************
*
* Iframe Detector Content JS
* _________________________________________
* [2018] Pericror
* All Rights Reserved
* Use of this source code is governed by the license found in the LICENSE file.
********************************************************************************/

// Listen for popup iframe info request
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.from === 'popup'){return}
    else if(request.from === 'background')
    {
        var iframes = document.getElementsByTagName("iframe");
        var iframesArr = Array.from(iframes);
        var iframeObj = {
            src: null
        };
        var videos = document.getElementsByTagName("video");
        var videosArr = Array.from(videos);
        var videoSrc = null;
        // Pick iframe tag of elements
        for (var i = 0; i < iframesArr.length; i++) {
            item = iframesArr[i];
            src = item.src;
            iframeObj.src = src;
        }
        // Pick video tag of elements
        for (var i=0; i < videosArr.length; i++){
            videoSrc = videosArr[i].src;
        }
        chrome.runtime.sendMessage({
            from:    'content',
            subject: 'updateBadge',
            tabId: request.tabId,
            iframes: iframeObj,
            videoSrc: videoSrc
        });
    }else
    {
        var iframes = document.getElementsByTagName("iframe");
        var iframe_srcs = [];
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            
            // Add unique id to iframe to allow for deletion
            if(iframe.getAttribute('data-iframe-detector-id') == null)
            {
                iframe.setAttribute('data-iframe-detector-id', i);
            }
            
            iframe_srcs.push(iframe.getAttribute('src'));
        }
    }
});