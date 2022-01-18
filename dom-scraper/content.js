
  let style = document.createElement('style');
  style.textContent = `
     .btn-extension {
      position: absolute;
      bottom: 1em;
      right: 1.4em;
      padding: 0.4em;
      font-size: 1.4em;
      z-index: 9999;
      font-weight: 600;
      background: #43a1e2;
      color: white;
      border: 1px solid #3681B5;
      border-radius: 3px;
      box-shadow: 1px 2px 8px -3px #333;
      transition: all .2s;
    }
    .btn-extension:hover {
      background: #2d95de !important;
    }    
  `;
  document.head.appendChild(style)

  let btnExtension = document.createElement(`button`)
  btnExtension.setAttribute('class', 'btn-extension')
  btnExtension.innerHTML = `Copy Previews`
  document.body.appendChild(btnExtension)

document.querySelector(".btn-extension").addEventListener("click", function() {

  let frameObj = document.querySelector("#cat-tab-builder > iframe")
  let frameContent = frameObj.contentWindow.document.body.innerHTML

  const parser = new DOMParser()
  const htmlString = frameContent
  const newDOM = parser.parseFromString(htmlString, "text/html")

  let htmlmarkup = 
  `
    <h1>${document.querySelector("div.breadcrumbs-bar__breadcrumbs.cat-title h4").innerText}</h1>
  `
  let previews = 0
  previews = newDOM.querySelectorAll('.client.loaded.ember-view img')

  if(previews.length != 0) {

    console.log(`number of preview screenshots generated: ${previews.length}`)

    previews.forEach(function (preview, i) {
      let imgFullSizeURL = preview.src.replace('-thumb450', '')
      let processedURL = imgFullSizeURL.replace('.png', '.html') 
      let parsedTitle = preview.alt.replace(/\s+/g, '-').replace('.', '-').replace('!', '').toLowerCase()
      htmlmarkup += 
      `
        <div class="ds-ext-preview ds-ext-preview-class-${parsedTitle}">
          <h2><a target="_blank" href="${processedURL}">${newDOM.querySelectorAll('.clickable.project-name')[i].innerHTML}</a></h2>
            <a target="_blank" href="${processedURL}"><img src="${imgFullSizeURL}" style="max-width:100%" alt="${preview.alt}"></a>
        </div>
      `
    })    

    let JStextArea = document.createElement('textarea')
    JStextArea.setAttribute('id', 'temp-textarea')
    JStextArea.setAttribute('style', 'display:none;')
    JStextArea.innerHTML = htmlmarkup
    document.body.appendChild(JStextArea) 

    navigator.clipboard.writeText(JStextArea.value)
    document.querySelector(".btn-extension").innerText = 'Copied!'

    function successMsg() {
      document.querySelector(".btn-extension").innerText = 'Copy Previews'
    }

    setTimeout(successMsg, 1800)
    JStextArea.remove()

  } else {
    alert('No screenshots have been generated!')
  }

})
