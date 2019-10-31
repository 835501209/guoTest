//修改放大镜插件为ES6 类写法,摒弃依赖jQuery的特性，更加灵活
//抛弃内联样式，将元素样式定义交给使用者

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
        // this.create(data);
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
        //插入图片
        this.elementImgBig();
        this.elementImgMin();
        this.img = this.computed();
        //监听事件
        this.listen();
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
        this.el.appendChild(elc);
        return elc;
    }
    createBig() {
        let elc = document.createElement('div');
        elc.classList.add("g_big");
        this.el.appendChild(elc);
        return elc;
    }
    elementImgBig() {
        this.imgsrc.forEach((item => {
            var img = document.createElement("img");
            img.src = item;
            img.classList.add("g_big_img");
            this.big.appendChild(img)
        }))
    }
    elementImgMin() {
        this.imgsrc.forEach((item, idx) => {
            var img = document.createElement("img");
            img.src = item;
            img.dataset.imgId = idx
            img.classList.add("g_min_img");
            this.min.appendChild(img)
        })
    }
    computed() {
        var img = document.createElement("img");
        img.style = `position:absolute;`
        this.fangda.appendChild(img);
        return img;
    }
    listen(){
        this.big.addEventListener("mouseenter", () => {
            if(this.radio == ""){
                this.radio = this.big.clientWidth / this.move.clientWidth;
            }
            if(this.size == ""){
                this.size = this.fangda.clientWidth * this.radio / this.big.clientWidth;
            }
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
    }
}

//-------------  use  -------------//
// var box = document.querySelector(".box");
// let fd = new Fangda({ imgsrc:['images/g1.jpg','images/g2.jpg','images/g3.jpg','images/g4.jpg']})
// box.appendChild(fd.create())



//---------- default CSS ----------//
// .g_fangda{
//     width:400px;
//     height:400px;
//     overflow: hidden;
//     left:400px;
//     top:0px;
//     position: absolute;
// }
// .g_big{
//     width:400px;
//     height:400px;
// }
// .g_big .g_big_img{
//     width:400px;
//     height:400px;
//     position: absolute;
// }
// .g_min{
//     width:400px;
//     height:100px;
// }
// .g_min .g_min_img{
//     width:100px;
//     height:100px;
// }
// .g_move{
//     width:200px;
//     height:200px;
//     position: absolute;
//     z-index:3;
// }