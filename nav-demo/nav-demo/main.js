//工具函数
function getFormLoaclStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName, attributes) {
  var element = document.createElement(tagName)
  for (var key in attributes) {
    element[key] = attributes[key]
  }
  return element
}

//1.初始化
var keys = {
  '0': ['q','w','e','r','t','y','u','i','o','p'],
  '1': ['a','s','d','f','g','h','j','k','l',],
  '2': ['z','x','c','v','b','n','m'],
  'length': 3
}
var hash = {
  'q': 'qq.com',
  'w': 'weibo.com',
  'e': 'ele.me',
  'r': undefined,
  't': undefined,
  'y': undefined,
  'u': undefined,
  'i': 'iqiyi.com',
  'o': undefined,
  'p': undefined,
  'a': undefined,
  's': undefined,
  'd': 'douban.com',
  'f': undefined,
  'g': undefined,
  'h': undefined,
  'j': undefined,
  'k': undefined,
  'l': undefined,
  'z': 'zhihu.com',
  'x': undefined,
  'c': undefined,
  'v': undefined,
  'b': 'bilibili.com',
  'n': undefined,
  'm': undefined
}
var hashInLoaclStorage = getFormLoaclStorage('abc')
if (hashInLoaclStorage) {
  hash = hashInLoaclStorage
}

//2.生成键盘
for (var index = 0; index < keys['length']; index++) {
  var divElement = tag('div',{className: 'row'})
  mainWrapper.appendChild(divElement)

  row = keys[index]

  for (var index2 = 0; index2 < row.length; index2++) {
    var spanElement = tag('span', { textContent: row[index2], className: 'text'})

    var buttonElement = tag('button', { textContent: '编辑', id: row[index2]})
    buttonElement.onclick = function (e) {
      var key = e.target.id
      var imgNow = e.target.previousSibling
      var newWebsite = prompt('请给我一个网址')
      hash[key] = newWebsite
      imgNow.src = 'http://' + newWebsite + '/favicon.ico'
      imgNow.onerror = function () {
        imgNow.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      localStorage.setItem('abc', JSON.stringify(hash))
    }

    var imgElement = tag('img')
    if (hash[row[index2]] === undefined) {
      imgElement.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    } else {
      imgElement.src = 'http://' + hash[row[index2]] + '/favicon.ico'
    }
    imgElement.onerror = function (e) {
      e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }

    var kbdElement = tag('kbd', { className: 'key' })
    kbdElement.appendChild(spanElement)
    kbdElement.appendChild(imgElement)
    kbdElement.appendChild(buttonElement)

    divElement.appendChild(kbdElement)
  }
}


//3.键盘事件监听
document.onkeypress = function (keyboard) {
  key = keyboard['key']
  website = hash[key]
  // location.href = 'http://'+website
  window.open('http://'+website, '_blank')
}