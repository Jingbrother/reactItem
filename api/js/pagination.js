function Pagination(ele, options) {
  this.ele = ele

  // 把用户传递进来的信息保存一下
  this.options = options || {}

  // 准备一些分页信息
  this.default = {
    pageInfo: {
      pagenum: 1, // 当前页数
      pagesize: 10, // 每页多少条
      total: 1000, // 数据总数
      totalpage: 100 // 页码总数
    },
    textInfo: {
      first: 'first',
      prev: 'prev',
      list: '',
      next: 'next',
      last: 'last'
    }
  }

  // 当页码发生改变的时候就执行这个函数
  this.change = this.options.change || function () {}

  // 提前准备一个变量，保存 list 里面的元素
  this.list = null

  // 调用过的入口函数
  this.init()
}

Pagination.prototype.init = function () {
  this.setDefault()
  this.setStyle()
  this.dongcidaci()
}

// 使用用户传递的信息替换我自己的信息
Pagination.prototype.setDefault = function () {
  if (this.options.pageInfo) {
    for (let attr in this.options.pageInfo) {
      this.default.pageInfo[attr] = this.options.pageInfo[attr]
    }
  }

  if (this.options.textInfo) {
    for (let attr in this.options.textInfo) {
      this.default.textInfo[attr] = this.options.textInfo[attr]
    }
  }
}

// 给大盒子设置样式
Pagination.prototype.setStyle = function () {
  this.ele.innerHTML = ''
  setCss(this.ele, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })

  // 设置完样式就添加元素
  this.createEle()
  // 添加列表
  this.creteList()
  // 添加文本框
  this.go()
  // 禁用的判断
  this.isDis()

  // 动过以后要执行函数
  this.change(this.default.pageInfo.pagenum)
}

// 添加上一页下一页首页末页列表标签到 this.ele 里面
Pagination.prototype.createEle = function () {
  for (let attr in this.default.textInfo) {
    const div = document.createElement('div')
    div.className = attr
    if (attr === 'list') {
      this.list = div
      setCss(div, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })
    } else {
      setCss(div, {
        border: '1px solid #333',
        padding: '0 5px',
        margin: '0 5px',
        width:'70px',
        height:'50px',
        textAlign:'center',
        lineHeight:'50px'
      })
    }
    div.innerHTML = this.default.textInfo[attr]
    this.ele.appendChild(div)
  }
}

// 设置页码
Pagination.prototype.creteList = function () {
  const pagenum = this.default.pageInfo.pagenum
  const totalpage = this.default.pageInfo.totalpage
  if (totalpage <= 9) { // 小于九个直接渲染
    for (let i = 1; i <= totalpage; i++) {
      const p = this.crealeP(i)
      this.list.appendChild(p)
    }
  } else { // 大于九个分成几个步骤来渲染
    if (pagenum < 5) {
      // 1 2 3 4 5 ... 99 100
      for (let i = 1; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      this.list.appendChild(span)

      for (let i = totalpage - 1; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }
    } else if (pagenum === 5) {
      // 1 2 3 4 5 6 7 ... 99 100
      for (let i = 1; i <= 7; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      this.list.appendChild(span)

      for (let i = totalpage - 1; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }

    } else if (pagenum > 5 && pagenum < totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      this.list.appendChild(span)

      for (let i = pagenum - 2; i <= pagenum + 2; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span2 = document.createElement('span')
      span2.innerHTML = '...'
      this.list.appendChild(span2)

      for (let i = totalpage - 1; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }
    } else if (pagenum === totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      this.list.appendChild(span)

      for (let i = totalpage - 6; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }

    } else if (pagenum > totalpage - 4) {
      for (let i = 1; i <= 2; i++) {
        this.list.appendChild(this.crealeP(i))
      }

      const span = document.createElement('span')
      span.innerHTML = '...'
      this.list.appendChild(span)

      for (let i = totalpage - 4; i <= totalpage; i++) {
        this.list.appendChild(this.crealeP(i))
      }
    }
  }
}

// 提取了一个专门用来创建 li 的函数
Pagination.prototype.crealeP = function (i) {
  // i 形参就是要拿到循环中的 i 我好渲染文字
  // 和当前页面进行比较
  const p = document.createElement('p')

  p.innerHTML = i
  setCss(p, {
    border: '1px solid #333',
    margin: '0 5px',
    padding: '0 5px',
    width: '46px',
    height: '46px',
    textAlign: 'center',
    lineHeight: '46PX'
  })

  if (i === this.default.pageInfo.pagenum) {
    setCss(p, {
      backgroundColor: 'orange'
    })
  }

  return p
}

// 设置文本款和按钮
Pagination.prototype.go = function () {
  const inp = document.createElement('input')
  const btn = document.createElement('button')
  setCss(inp, {
    outline: 'none',
    width: '50px',
    height: '20px'
  })
  inp.value = this.default.pageInfo.pagenum
  inp.type = 'number'
  setCss(btn, {
    outline: 'none',
    width: '46px',
    height: '46px',
    marginLeft: '5px'
  })
  btn.innerHTML = '跳往'
  this.ele.appendChild(inp)
  this.ele.appendChild(btn)
}

// 判断一下禁用
Pagination.prototype.isDis = function () {
  if (this.default.pageInfo.pagenum === 1) {
    this.ele.children[0].style.backgroundColor = '#ccc'
    this.ele.children[1].style.backgroundColor = '#ccc'
  }

  if (this.default.pageInfo.pagenum === this.default.pageInfo.totalpage) {
    this.ele.children[3].style.backgroundColor = '#ccc'
    this.ele.children[4].style.backgroundColor = '#ccc'
  }
}
// 动起来
Pagination.prototype.dongcidaci = function () {
  $('.next1').click((e)=>{
    if(this.default.pageInfo.pagenum !== this.default.pageInfo.totalpage){
      this.default.pageInfo.pagenum++
      this.setStyle()
    }
})
$('.cat-paging-up').click((e)=>{
    if(this.default.pageInfo.pagenum !== 1){
      this.default.pageInfo.pagenum--
      this.setStyle()
    }
})
  // 事件委托来做
  this.ele.addEventListener('click', e => {
    e = e || window.event
    const target = e.target
    if (target.className === 'first' && this.default.pageInfo.pagenum !== 1) {
      this.default.pageInfo.pagenum = 1
      this.setStyle()
    }

    if (target.className === 'prev' && this.default.pageInfo.pagenum !== 1) {
      this.default.pageInfo.pagenum--
      this.setStyle()
    }

    if (target.className === 'next' && this.default.pageInfo.pagenum !== this.default.pageInfo.totalpage) {
      this.default.pageInfo.pagenum++
      this.setStyle()
    }

    if (target.className === 'last' && this.default.pageInfo.pagenum !== this.default.pageInfo.totalpage) {
      this.default.pageInfo.pagenum = this.default.pageInfo.totalpage
      this.setStyle()
    }

    if (target.nodeName === 'P' && target.innerHTML - 0 !== this.default.pageInfo.pagenum) {
      this.default.pageInfo.pagenum = target.innerHTML - 0
      this.setStyle()
    }

    if (target.nodeName === 'BUTTON' && target.previousElementSibling.value - 0 !== this.default.pageInfo.pagenum) {
      this.default.pageInfo.pagenum = target.previousElementSibling.value - 0
      this.setStyle()
    }
  })
}

function setCss(ele, options) {
  for (let attr in options) {
    ele.style[attr] = options[attr]
  }
}
