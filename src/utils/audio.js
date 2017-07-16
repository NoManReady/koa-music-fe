class Music {
  constructor() {
    this.canvas = Music._canvas
    this.ctx = this.canvas.getContext('2d')
    this.size = 128
    this.r = 40
    this.type = 1

    this.xhr = new XMLHttpRequest()

    // 初始化audiocontext
    this.ac = Music._ac
    // 获取过滤node
    this.filter = this.ac.createBiquadFilter()
    this.filter.type = 'allpass'
    // 获取频谱分析node
    this.analyerNode = this.ac.createAnalyser()
    this.analyerNode.fftSize = this.size * 2
    // 获取音量调节node
    this.voiceNode = this.ac.createGain()
    // 数据流对象
    this.bufferSource = null
    // 数据流连接
    this.filter.connect(this.analyerNode)
    this.analyerNode.connect(this.voiceNode)
    this.voiceNode.connect(this.ac.destination)
    this._init()
  }
  // 初始化
  _init() {
    this._loadCanvas()
  }
  // 设置canvas
  _loadCanvas() {
    let _canvasContainer = document.querySelector('.canves-container')
    this.canvas.width = _canvasContainer.clientWidth
    this.canvas.height = _canvasContainer.clientHeight
    // this.dots = this._dotedHandler()
  }
  // 切换音乐状态
  _toggleMusic() {
    if (this.ac.state === 'running') {
      this.stop()
    } else if (this.ac.state === 'suspended') {
      this.start()
    }
  }
  // 恢复
  _resume() {
    this.ac.resume()
  }
  // 停止
  _stop() {
    this.ac.suspend()
  }
  // 加载音乐
  _loadMusicByUrl(url) {
    if (!url) {
      return
    }
    this.xhr.abort()
    this.bufferSource = this.ac.createBufferSource()
    // 停止原先播放
    if (this.bufferSource) {
      this.bufferSource.stop(0)
      this.bufferSource = null
    }
    this.xhr.open('get', encodeURIComponent(url), true)
    this.xhr.responseType = 'arraybuffer'
    this.xhr.onload = () => {
      this._analyerSource(this.xhr.response)
    }
    this.xhr.send()
  }
  // 分析音乐资源(播放设置节点)
  _analyerSource(source) {
    this.ac.decodeAudioData(source, (buffer) => {
      this.bufferSource.buffer = buffer
      // 资源链接并播放
      this.bufferSource.connect(this.filter)
      this.bufferSource.start(0)
      // 淡入下一首曲目
      this.voiceNode.gain.linearRampToValueAtTime(0, this.ac.currentTime)
      this.voiceNode.gain.linearRampToValueAtTime(1, this.ac.currentTime + Music.FADE_TIME)
      // 在曲子快要结束时，淡出之
      this.voiceNode.gain.linearRampToValueAtTime(1, this.ac.currentTime + this.bufferSource.buffer.duration - Music.FADE_TIME)
      this.voiceNode.gain.linearRampToValueAtTime(0, this.ac.currentTime + this.bufferSource.buffer.duration)
      this.bufferSource.onended = function () {

      }
      this._analyserData()
    }, error => {
      console.error("decodeAudioData error", error.message)
    })
  }
  // 获取音谱数据，循环输出
  _analyserData() {
    let _frequencyBinCount = new Uint8Array(this.analyerNode.frequencyBinCount)
    const _round = () => {
      // 填充_frequencyBinCount数据
      this.analyerNode.getByteFrequencyData(_frequencyBinCount)
      this._timer = setTimeout(this._round.bind(this), 1000 / 60)
      this._draw(_frequencyBinCount)
    }
    window.requestAnimationFrame(this._round.bind(this))
  }
  // 初始化圆点
  _dotedHandler() {
    let dots = []
    for (let i = 0; i < this.size; i++) {
      let x = this._geRande(0, this.canvas.width),
        y = this._geRande(0, this.canvas.height),
        color = 'rgba(' + Math.ceil(this._geRande(0, 256)) + ',' + Math.ceil(this._geRande(0, 256)) + ',' + Math.ceil(this._geRande(0, 256)) + ',' + this._geRande(0, 1).toFixed(1) + ')'
      dots.push({
        x: x,
        y: y,
        color: color,
        direct: Math.random() > 0.5 ? 'go' : 'back'
      })
    }
    return dots
  }
  // 获取两数之间的随机值
  _geRande(m, n) {
    return Math.random() * (n - m) + m
  }
  // 绘画canvas
  _draw(arr) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 圆点位置随机处理
    if (this.drawType === 2) {
      this.dots.forEach((dot) => {
        if (dot.direct === 'back') {
          if (dot.x <= 0) {
            dot.x = this.canvas.width
          } else {
            dot.x -= (Math.random() * 2)
          }
        } else {
          if (dot.x >= this.canvas.width) {
            dot.x = 0
          } else {
            dot.x += (Math.random() * 2)
          }
        }

      })
    }
    for (let i = 0; i < this.size; i++) {
      this.ctx.beginPath()
      let h = arr[i] / 256 * this.canvas.height,
        w = canvas.width / this.size,
        line
      if (this.drawType == 1) {
        line = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
        line.addColorStop(0, 'red')
        line.addColorStop(0.5, 'green')
        line.addColorStop(1, 'blue')
        this.ctx.fillStyle = line
        this.ctx.fillRect(w * i, this.canvas.height - h, w * 0.6, h)
      } else if (this.drawType == 2) {
        let dot = this.dots[i],
          r = arr[i] / 256 * this.r
        line = this.ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r)
        line.addColorStop(0, '#fff')
        line.addColorStop(1, dot.color)
        this.ctx.fillStyle = line
        this.ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2, true)
      }
      this.ctx.fill()
    }
  }
  static get _canvas() {
    return document.getElementById('#canvas')
  }
  static get _ac() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
    if (window.AudioContext) {
      return new window.AudioContext()
    } else {
      throw Error('not support web audio api')
    }
  }
  static get _frame() {
    // return setTimeout('func', 1000/60)
  }
  static get FADE_TIME() {
    return 5
  }
}


// 文件读取器
class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context
    this.urlList = urlList
    this.onload = callback
    this.bufferList = new Array()
    this.loadCount = 0
  }
  loadBuffer(url, index) {
    let request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.responseType = "arraybuffer"

    let loader = this

    request.onload = function () {
      loader.context.decodeAudioData(
        request.response,
        function (buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url)
            return
          }
          loader.bufferList[index] = buffer
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList)
        }
      )
    }
    request.onerror = function () {
      alert('BufferLoader: XHR error')
    }
    request.send()
  }
  load() {
    for (let i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i)
  }
}
