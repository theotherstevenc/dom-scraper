chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, sendResponse) {
  
  let outerwrap = document.createElement('div')
  outerwrap.setAttribute('id', 'copy-btn-outer-container')
  outerwrap.setAttribute('style', 'background: #3e403e96; width: 100%; height: 100%; position: absolute; z-index: 9999;')

  let innerwrap = document.createElement('div')
  innerwrap.setAttribute('id', 'copy-btn-inner-container')
  innerwrap.setAttribute('style', 'display: flex; justify-content: center; align-items: center; height: 50%;')

  let btn = document.createElement('button')
  btn.innerText = 'copy the generated screenshots!'
  btn.setAttribute('id', 'copy-btn')
  btn.setAttribute('style', 'box-shadow: 0 1px 3px rgb(0 0 0 / 4%), 0 1px 2px rgb(0 0 0 / 8%); background: #43A1E2; border: 0.05em solid #3681B5; color: #fff; padding: 0.5em 1em; border-radius: 0.175em; font-size: 2.5em;cursor: pointer');

  innerwrap.appendChild(btn)
  outerwrap.appendChild(innerwrap)
  document.body.appendChild(outerwrap)

  document.getElementById('copy-btn').addEventListener("click", function() {
    
    let frameObj = document.querySelector("#cat-tab-builder > iframe")
    if(frameObj) {

      let frameContent = frameObj.contentWindow.document.body.innerHTML;
    
      const parser = new DOMParser();
      const htmlString = frameContent;
      const newDOM = parser.parseFromString(htmlString, "text/html");

      let htmlmarkup = 
`
<h1>${document.querySelector("div.breadcrumbs-bar__breadcrumbs.cat-title h4").innerText}</h1>
`
      let strSrc = ''
      let altclass = ''
      let previews = newDOM.querySelectorAll('.client.loaded.ember-view img')
      
      for (const preview of previews) {
        let strSrc = preview.src.replace('-thumb450', '')
        let altclass = preview.alt.replace(/\s+/g, '-').replace('.', '-').replace('!', '').toLowerCase()
          htmlmarkup += 
`
<div class="class-${altclass}">
  <h2>${preview.alt}</h2>
  <img src="${strSrc}" alt="${preview.alt}">
</div>
`
      }    
      
      let txt = document.createElement('textarea')
      txt.setAttribute('id', 'temp-textarea')
      txt.setAttribute('style', 'display:none;')
      txt.innerHTML = htmlmarkup
      document.body.appendChild(txt) 

      navigator.clipboard.writeText(txt.value)
      btn.remove()
      outerwrap.remove()

    } else {
      alert('no screenshots found!')
      btn.remove()
      outerwrap.remove()
    }

  })

}