//修改放大镜插件为ES6 类写法,摒弃依赖jQuery的特性，更加灵活
//未实现
//小图位置，放大镜位置可调

class Fangda {
    constructor(data) {
        this.minPlace = data.minPlace || 'bottom',
        this.imgsrc = data.imgsrc || [],
        this.position = data.position || "outside", //inner
        this.fangda = data.fangda ? {
            ...data.fangda,
            width: data.fangda.width || "400px",
            height: data.fangda.height || "400px",
            position: data.fangda.position || "absolute",
            left: data.fangda.left || "400px",
            top: data.fangda.top || "0px",
            overflow: data.fangda.overflow || "hidden",
            display: data.fangda.display || "none",
        } : {
                width: "400px",
                height: "400px",
                position: "absolute",
                left: "400px",
                top: "0px",
                overflow: "hidden",
                display: "none",
            },
        this.big = data.big ? {
            ...data.big,
            width: data.big.width || "400px",
            height: data.big.height || "400px",
            position: data.big.position || "relative",
            imgsrc: data.big.imgsrc || [],
        } : {
                width: "400px",
                height: "400px",
                position: "relative",
                imgsrc: [],
            },
        this.min = data.min ? {
            ...data.min,
            width: data.min.width || "100px",
            height: data.min.height || "100px",
            imgsrc: data.min.imgsrc || [],
        } : {
                width: "100px",
                height: "100px",
                imgsrc: [],
            },
        this.move = data.move ? {
            ...data.move,
            width: data.move.width || "200px",
            height: data.move.height || "200px",
            position: data.move.position || "absolute",
            display:"none",
        } : {
                width: "200px",
                height: "200px",
                position: "absolute",
                // display:"none",
            }
        this.radio = ""
        this.size = ""
        this.create(data);
    }
    create() {
        let el = document.createElement('div');
        //构建正常盒  
        let big = this.createBig(el);
        //构造移动块
        let move = this.createMove(big);
        //构建放大盒子
        let fangda = this.createFangda(el);
        //构建小盒子
        let min = this.createMin(el);
        //插入图片判断
        this.judge(big, min);
        let img = this.computed(big, min, fangda, move);
        //事件
        big.addEventListener("mouseenter", () => {
            move.style.display = "block";
            fangda.style.display = "block";
            big.addEventListener("mousemove", (e) => {
                var xx = e.pageX - big.offsetLeft -this.dataFetch(move.style.width)/2
                var yy = e.pageY - big.offsetTop - this.dataFetch(move.style.height)/ 2;
                if (xx + this.dataFetch(move.style.width) >= this.dataFetch(big.style.width)) {
                    xx = this.dataFetch(big.style.width) - this.dataFetch(move.style.width);
                }
                if (xx <= 0) {
                    xx = 0;
                }
                if (yy + this.dataFetch(move.style.height) >= this.dataFetch(big.style.height)) {
                    yy = this.dataFetch(big.style.height) - this.dataFetch(move.style.height);
                }
                if (yy <= 0) {
                    yy = 0;
                }
                img.style.left = -this.size * xx+"px";
                img.style.top =  -this.size * yy+"px";
                move.style.left = xx+"px";
                move.style.top = yy+"px"
            })
        })
        big.addEventListener("mouseleave",()=>{
            move.style.display = "none";
            fangda.style.display = "none";
        })
        min.addEventListener('click',(e)=>{
             var num = e.target.dataset.imgId;
             for (var i=0;i<big.getElementsByTagName("img").length;i++){
                 if(i==num){
                      big.getElementsByTagName("img")[num].style.display ="block";

                      img.src = big.getElementsByTagName("img")[num].src
                 }
                 else{
                     big.getElementsByTagName("img")[i].style.display ="none";
                 }
             }
 
        })
        return el;
    }
    createMove(el) {
        let elc = document.createElement('span');
        this.elementStyle(elc, this.move);
        elc.style.zIndex = 3;
        el.appendChild(elc);
        return elc;
    }
    createFangda(el) {
        let elc = document.createElement('div');
        this.elementStyle(elc, this.fangda);
        el.appendChild(elc);
        return elc;
    }
    createMin(el) {
        let elc = document.createElement('div');
        this.elementStyle(elc, this.min);
        elc.style.width = this.big.width;
        el.appendChild(elc);
        return elc;
    }
    createBig(el) {
        let elc = document.createElement('div');
        this.elementStyle(elc, this.big);
        el.appendChild(elc);
        return elc;
    }
    elementStyle(el, data) {
        let str = ``;
        Object.entries(data).map((item => {
            str += `${item[0]}:${item[1]};`
        }))
        el.style = str;
    }
    judge(el, elc) {
        //插入大图
        if (this.big.imgsrc.length != 0) {
            this.elementImgBig(el, this.big);
        }
        else if (this.big.imgsrc.length == 0 && this.imgsrc.length != 0) {
            this.elementImgBig(el, this);
        }
        else if (this.big.imgsrc.length == 0 && this.imgsrc.length == 0 && this.min.imgsrc.length != 0) {
            this.elementImgBig(el, this.min);
        }
        else {
            return "error";
        }

        //插入小图
        if (this.min.imgsrc.length != 0) {
            this.elementImgMin(elc, this.min);
        }
        else if (this.min.imgsrc.length == 0 && this.imgsrc.length != 0) {
            this.elementImgMin(elc, this);
        }
        else if (this.min.imgsrc.length == 0 && this.imgsrc.length != 0 && this.big.imgsrc.length != 0) {
            this.elementImgMin(elc, this.big);
        }
        else {
            return "error";
        }
    }
    elementImgBig(el, data) {
        data.imgsrc.forEach((item => {
            var img = document.createElement("img");
            img.src = item;
            img.style = `
            width:${this.big.width};
            height:${this.big.height};
            position:absolute;`
            el.appendChild(img)
        }))
    }
    elementImgMin(el, data) {
        data.imgsrc.forEach((item,idx) => {
            var img = document.createElement("img");
            img.src = item;
            img.dataset.imgId  = idx
            img.style = `
            width:${this.min.width};
            height:${this.min.height};`
            el.appendChild(img)
        })
    }
    computed(big, min, fangda, move) {
        this.radio = this.dataFetch(this.big.width) / this.dataFetch(this.move.width)
        this.size = this.dataFetch(this.fangda.width)*this.radio / this.dataFetch(this.big.width)
        console.log(this.radio,this.size)
        var img = document.createElement("img");
        img.style = `
        width:${this.dataFetch(this.fangda.width) * this.radio}px;
        height:${this.dataFetch(this.fangda.height) * this.radio}px;
        position:absolute;`
        fangda.appendChild(img);
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

