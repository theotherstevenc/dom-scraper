let style = document.createElement('style');
style.setAttribute('id', 'dom-scraper')

style.textContent = `
  .copy-prev-ext:hover {
    background: #2d95de !important;
  }
`;

document.head.appendChild(style);

let markupBtn = document.createElement(`button`)
markupBtn.setAttribute('class', 'copy-prev-ext')
markupBtn.setAttribute('style', 'position: absolute; bottom: 1em; right: 1.4em; padding: 0.4em; font-size: 1.4em; z-index: 9999; font-weight: 600; background: #43a1e2; color: white; border: 1px solid #3681B5; border-radius: 3px; box-shadow: 1px 2px 8px -3px #333; transition: all .2s;')
markupBtn.innerHTML = `Copy Previews`
document.body.appendChild(markupBtn)

document.querySelector(".copy-prev-ext").addEventListener("click", function() {

  let frameObj = ''
  frameObj = document.querySelector("#cat-tab-builder > iframe")

    let frameContent = frameObj.contentWindow.document.body.innerHTML;
  
    const parser = new DOMParser();
    const htmlString = frameContent;
    const newDOM = parser.parseFromString(htmlString, "text/html");

    let htmlmarkup = 
`
<h1>${document.querySelector("div.breadcrumbs-bar__breadcrumbs.cat-title h4").innerText}</h1>
`
    let previews = 0
    previews = newDOM.querySelectorAll('.client.loaded.ember-view img')

    if(previews.length != 0) {
    console.log(`number of preview screenshots: ${previews.length}`)

    previews.forEach(function (preview, i) {
      let strSrc = preview.src.replace('-thumb450', '')
      let processCode = strSrc.replace('.png', '.html') 
      let altclass = preview.alt.replace(/\s+/g, '-').replace('.', '-').replace('!', '').toLowerCase()
        htmlmarkup += 
`
<div class="ds-ext-preview ds-ext-preview-class-${altclass}">
  <h2><a target="_blank" href="${processCode}">${newDOM.querySelectorAll('.clickable.project-name')[i].innerHTML}</a></h2>
  <a target="_blank" href="${processCode}"><img src="${strSrc}" alt="${preview.alt}"></a>
</div>
`
})    
    
    let txt = document.createElement('textarea')
    txt.setAttribute('id', 'temp-textarea')
    txt.setAttribute('style', 'display:none;')
    txt.innerHTML = htmlmarkup
    document.body.appendChild(txt) 

    navigator.clipboard.writeText(txt.value)
    document.querySelector(".copy-prev-ext").innerText = 'Copied!'

    function myGreeting() {
      document.querySelector(".copy-prev-ext").innerText = 'Copy Previews'
    }

    setTimeout(myGreeting, 1800)
    txt.remove()

  } else {
    alert('No screenshots have been generated!')
  }

})
