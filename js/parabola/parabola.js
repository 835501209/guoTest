class Parabola  {
    constructor(dafalutGood='',defalutCar=''){
       this.goods = dafalutGood;
       this.car = defalutCar;
       this.move = '';
       this.start = {x:0,y:0};
       this.end = {x:0,y:0};
    }
    init(){
        if(this.goods==""||this.car==""){
            return false;
        }
        else{
            this.create();
        }
    }
    create(){
        this.move=this.goods.cloneNode(true);
        this.start.x = this.goods.offsetLeft;
        this.start.y = this.goods.offsetTop;
        this.end.x = this.car.offsetLeft;
        this.end.y = this.car.offsetTop;
        document.body.appendChild(this.move)
        this.action();
    }
    action(){

    }
}