//config.js-----
// requirejs.config({
//     baseUrl : "js",
//     // paths : {
//     //      "moduleA": "lib/jquery.1.11.3"
//     // }
// });



//写在requirejs首个加载的js里的以下代码采生效，否则无效 
requirejs(['moduleA','moduleB','moduleC'],function(jq){
    console.log(a,b,c,d)
});