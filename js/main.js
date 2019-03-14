/**
 * http://www.codrops.com
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
{
    const chars = ['œ','¬','†','§','∆','∞','¢','∂','ß','ø'];
    const charsTotal = chars.length;
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    class Entry {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.image = this.DOM.el.querySelector('.content__img');
            this.DOM.title = {word: this.DOM.el.querySelector('.content__text')};
            charming(this.DOM.title.word);
            this.DOM.title.letters = Array.from(this.DOM.title.word.querySelectorAll('span')).sort(() => 0.5 - Math.random());
            this.DOM.title.letters.forEach(letter => letter.dataset.initial = letter.innerHTML);
            this.lettersTotal = this.DOM.title.letters.length;
            observer.observe(this.DOM.el);
        }
        enter(direction = 'down') {
            this.DOM.title.word.style.opacity = 1;

            this.timeouts = [];
            this.complete = false;
            let cnt = 0;
            this.DOM.title.letters.forEach((letter, pos) => { 
                let loopTimeout;
                const loop = () => {
                    letter.innerHTML = chars[getRandomInt(0,charsTotal-1)];
                    letter.style.color = ['#f58ae7','#ff00ff','#062d86'][getRandomInt(0,2)];
                    loopTimeout = setTimeout(loop, getRandomInt(75,150));
                    this.timeouts.push(loopTimeout);
                };
                loop();

                const timeout = setTimeout(() => {
                    clearTimeout(loopTimeout);
                    letter.innerHTML = letter.dataset.initial;
                    letter.style.color = '#00ffff';
                    ++cnt;
                    if ( cnt === this.lettersTotal ) {
                        this.complete = true;
                    }
                }, pos*80+100);

                this.timeouts.push(timeout);
            });
        }
        exit(direction = 'down') {
            this.DOM.title.word.style.opacity = 0;
            if ( this.complete ) return;
            for ( let i = 0, len = this.timeouts.length; i <= len - 1; ++i ) {
                clearTimeout(this.timeouts[i]);
            }
        }
    }

    let observer;
    let current = -1;
    let allentries = [];
    const sections = Array.from(document.querySelectorAll('.content__section'));
    // Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('.content__img'), () => {
        document.body.classList.remove('loading');
        if ('IntersectionObserver' in window) {
            document.body.classList.add('ioapi');

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if ( entry.intersectionRatio > 0.5 ) {
                        const newcurrent = sections.indexOf(entry.target);
                        if ( newcurrent === current ) return;
                        const direction = newcurrent > current;
                        if (current >= 0 ) {
                            allentries[current].exit(direction ? 'down' : 'up');
                        }
                        allentries[newcurrent].enter(direction ? 'down' : 'up');
                        current = newcurrent;
                    }
                });
            }, { threshold: 0.5 });

            sections.forEach(section => allentries.push(new Entry(section)));
        }
    });
}

//fade out when scrolling ---- https://codepen.io/nickcil/pen/sfutl

// $(window).scroll(function(){
//     $(".top").css("opacity", 1 - $(window).scrollTop() / 250);
//     $(".top2").css("opacity", 1 - $(window).scrollTop() / 400);
//   });

  // //facing cite:https://codepen.io/karlovidek/pen/PQaMOd
  // var titleWrap = document.getElementsByClassName('groupImage');
	// 		document.body.addEventListener('mousemove', cursorPositionHandler);

	// 		function cursorPositionHandler(e) {
	// 			var decimalX = e.clientX / window.innerWidth - 0.5;
	// 			var decimalY = e.clientY / window.innerHeight - 0.5;
	// 			TweenMax.to(titleWrap, 0.5, { rotationY: 10 * decimalX, rotationX: 10 * decimalY, ease: Quad.easeOut, transformPerspective: 700, transformOrigin: "center" });
	// 		}

//glitch

// name title cite: https://codepen.io/christhuong/pen/XxzNWK

const data = {
  font: {
    family: 'Unica One',
    size: 220,
    weight: 'bold'
  },
  colors: ['#ff00ff', '#00ffff', '#ddedf3'],
  text: ` Hao     * Xiang`,
  textlength: 0
}
const canvas = {
  elem: document.querySelector('canvas'),
  init() {
    return this.elem.getContext('2d')
  },
  resize() {
    var helloTextRect = document.querySelector("#hello").getBoundingClientRect();
    canvas.elem.width = innerWidth - helloTextRect.right;
    canvas.elem.height = innerHeight - 200;
  }
}
canvas.resize();
var ctx = canvas.init();

const pointer = {
  x: 0, y: 0,
  r: 180
}
class CHAR {
  constructor(char, x, y, color, layer) {
    this.char = char;
    this.cx = x;
    this.cy = y;
    this.color = color;
    this.layer = layer;
    this.r = 0;
    this.alpha = 0;
    this.dx = this.cx;
    this.dy = this.cy;
  }
  static measuretext(text) {
    return ctx.measureText(text).width;
  }
  static dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2)/2, 2) + Math.pow((y1 - y2)/2, 2));
  }
  static getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }
  static init(text, x, y) {
    ctx.font = `${data.font.weight} ${data.font.size}px ${data.font.family}`;
    
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'source-over';
    for (let color = 0; color < data.colors.length; color++) {
      let layer = 1;
      switch (color) {
        case 0:
          layer = 0.5;
          break;
        case 1:
          layer = 0.7;
          break;
        case 2:
          layer = 1;
          break;
      }
      const strs = text.split(' * ');
      const textlength = strs.map(str => this.measuretext(str));
      data.textlength = Math.max(...textlength);
      const textheight = this.measuretext('M') * 1.5;
      for (let i = 0; i < strs.length; i++) {
        let ww = 0;
        for (let j = 0; j < strs[i].length; j++) {
          const xx = x - textlength[i] / 2 + ww;
          const yy = i == 0 ? y - textheight / 2 : y + textheight / 2;
          chars.push(new CHAR(strs[i][j], Math.round(xx), Math.round(yy), data.colors[color], layer));
          ww += this.measuretext(strs[i][j]);
        }
      }
    }
  }
  static draw() {
    for (let i = 0; i < data.colors.length; i++) {
      ctx.fillStyle = data.colors[i];
      for (let j = 0; j < chars.length; j++) {
        if (chars[j].color == data.colors[i]) {
          ctx.fillText(chars[j].char, chars[j].dx, chars[j].dy);
        }
      }
    }
    
  }
  render() {
    this.dx += (this.cx - this.dx) * 0.2;
    this.dy += (this.cy - this.dy) * 0.2;
  }
  update() {
    var canvasRect = document.querySelector('canvas').getBoundingClientRect();
    const dis = CHAR.dist(pointer.x - canvasRect.x, pointer.y - canvasRect.y, this.cx, this.cy);
    if (dis < pointer.r) {
      this.alpha = CHAR.getAngle(pointer.x - canvasRect.x, pointer.y - canvasRect.y, this.cx, this.cy) + Math.PI;
      this.r = this.layer * dis * (pointer.r - dis) / pointer.r;
      this.dx += (this.cx + this.r * Math.cos(this.alpha) - this.dx) * 0.2;
      this.dy += (this.cy + this.r * Math.sin(this.alpha) - this.dy) * 0.2;
    
    } else {
      this.render()
    }
  }
}

let chars = [];
CHAR.init(data.text, canvas.elem.width / 2, canvas.elem.height / 2);
setTimeout(() => {
  chars = [];
  CHAR.init(data.text, canvas.elem.width / 2, canvas.elem.height / 2);
}, 10);

window.addEventListener('mousemove', e => {
  pointer.x = e.clientX; pointer.y = e.clientY;
})
window.addEventListener('touchmove', e => {
  e.preventDefault();
  pointer.x = e.targetTouches[0].clientX;
  pointer.y = e.targetTouches[0].clientY;
})
window.addEventListener('resize', () => {
  canvas.resize();
  chars = [];
  CHAR.init(data.text, canvas.elem.width / 2, canvas.elem.height / 2);
})

const run = () => {
  requestAnimationFrame(run);
  ctx.clearRect(canvas.elem.width / 2 - data.textlength, canvas.elem.height / 2 - 0.7 * data.textlength, 2 * data.textlength, 1.4 * data.textlength);
  var canvasRect = document.querySelector('canvas').getBoundingClientRect();
  if (
    pointer.x > canvasRect.x && pointer.y > canvasRect.y &&
    pointer.x < canvasRect.right && pointer.y < canvasRect.bottom &&
    Math.abs(pointer.x  - canvasRect.x - canvasRect.width / 2) < data.textlength &&
    Math.abs(pointer.y  - canvasRect.y - canvasRect.height / 2) < 0.7 * data.textlength) {
    chars.forEach(e => e.update())
  } else { chars.forEach(e => e.render()) }
  
  CHAR.draw();
}
setTimeout(run, 100);

