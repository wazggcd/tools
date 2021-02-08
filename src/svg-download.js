// 一个简单方法下载网页上的svg图片
// 参考：https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
function svgDownload(dom, fileName = 'output') {
  //get svg source.
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(dom);
  //add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  //add xml declaration
  source = `<?xml version="1.0" standalone="no"?>\r\n${source}`
  //convert svg source to URI data scheme.
  let href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`

  // download
  const a = document.createElement('a')
  a.href = href
  a.download = `${fileName}.svg`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}