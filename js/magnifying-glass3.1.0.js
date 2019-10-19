//修改放大镜插件为ES6 类写法,摒弃依赖jQuery的特性，更加灵活
//抛弃内联样式，将元素定义交给使用者


class Fangda {
    constructor(data) {
        this.radio = ""
        this.size = ""
        this.imgsrc = data.imgsrc || []
        this.el = ""
        this.big = ""
        this.move = ""
        this.fangda = ""
        this.min = ""
        this.img = ""
        this.create(data);
    }
    create() {
        this.el = document.createElement('div');
        //构建正常盒  
        this.big = this.createBig();
        //构造移动块
        this.move = this.createMove();
        //构建放大盒子
        this.fangda = this.createFangda();
        //构建小盒子
        this.min = this.createMin();
        //插入图片判断
        this.judge(this.big, this.min);
        this.img = this.computed();
        //事件
        this.big.addEventListener("mouseenter", () => {
            this.move.style.display = "block";
            this.fangda.style.display = "block";
            this.big.addEventListener("mousemove", (e) => {
                var xx = e.pageX - this.big.offsetLeft - this.move.clientWidth / 2
                var yy = e.pageY - this.big.offsetTop - this.move.clientHeight / 2;
                if (xx + this.move.clientWidth >= this.big.clientWidth) {
                    xx = this.big.clientWidth - this.move.clientWidth;
                }
                if (xx <= 0) {
                    xx = 0;
                }
                if (yy + this.move.clientHeight >= this.big.clientHeight) {
                    yy = this.big.clientHeight - this.move.clientHeight;
                }
                if (yy <= 0) {
                    yy = 0;
                }
                this.img.style.left = -this.size * xx + "px";
                this.img.style.top = -this.size * yy + "px";
                this.move.style.left = xx + "px";
                this.move.style.top = yy + "px"
            })
        })
        this.big.addEventListener("mouseleave", () => {
            this.move.style.display = "none";
            this.fangda.style.display = "none";
        })
        this.min.addEventListener('click', (e) => {
            var num = e.target.dataset.imgId;
            for (var i = 0; i < this.big.getElementsByTagName("img").length; i++) {
                if (i == num) {
                    this.big.getElementsByTagName("img")[num].style.display = "block";
                    this.img.src = this.big.getElementsByTagName("img")[num].src
                }
                else {
                    this.big.getElementsByTagName("img")[i].style.display = "none";
                }
            }
        })
        return this.el;
    }
    createMove() {
        let elc = document.createElement('span');
        elc.classList.add("g_move");
        this.big.appendChild(elc);
        return elc;
    }
    createFangda() {
        let elc = document.createElement('div');
        elc.classList.add("g_fangda");
        this.el.appendChild(elc);
        return elc;
    }
    createMin() {
        let elc = document.createElement('div');
        elc.classList.add("g_min");
        el.appendChild(elc);
        return elc;
    }
    createBig() {
        let elc = document.createElement('div');
        elc.classList.add("g_big");
        this.el.appendChild(elc);
        return elc;
    }
    judge(el, elc) {
        this.elementImgBig(el, this);
        this.elementImgMin(elc, this);
    }
    elementImgBig(el, data) {
        data.imgsrc.forEach((item => {
            var img = document.createElement("img");
            img.src = item;
            img.classList.add("g_big_img");
            el.appendChild(img)
        }))
    }
    elementImgMin(el, data) {
        data.imgsrc.forEach((item, idx) => {
            var img = document.createElement("img");
            img.src = item;
            img.dataset.imgId = idx
            img.classList.add("g_min_img");
            el.appendChild(img)
        })
    }
    computed() {
        setTimeout(() => {
            this.radio = this.big.clientWidth / this.move.clientWidth;
            this.size = this.fangda.clientWidth * this.radio / this.big.clientWidth;
        }, 1000)
        var img = document.createElement("img");
        img.style = `
        position:absolute;`
        this.fangda.appendChild(img);
        return img;
    }
    dataFetch(data) {
        return Number(data.replace(/px/ig, ""));
    }
}

// let fd = new Fangda({
//     big: {
//         width: '444px'
//     },
//     imgsrc:['images/g1.jpg','images/g2.jpg','images/g3.jpg','images/g4.jpg']
// })

// // console.log(fd)
// console.log(fd.create())

