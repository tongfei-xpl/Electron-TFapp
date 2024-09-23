var h1 = document.getElementById("h1").style
var h2 = document.getElementById("h2").style
var m1 = document.getElementById("m1").style
var m2 = document.getElementById("m2").style
var s1 = document.getElementById("s1").style
var s2 = document.getElementById("s2").style

var h = "00", m = "00", s = "00", LastH, LastM, LastS;


function clock(){
    var DateTime = new Date();
    LastH = h;
    LastM = m;
    LastS = s;
    h = DateTime.getHours().toString();
    m = DateTime.getMinutes().toString();
    s = DateTime.getSeconds().toString();

    if(h[1] == undefined){
        h = "0" + h;
    }
    if(m[1] == undefined){
        m = "0" + m;
    }
    if(s[1] == undefined){
        s = "0" + s;
    }

    // console.log(parseInt(h[0]) + 1);

    return clockSet(h,m,s,LastH,LastM,LastS)
}

setTimeout(clock, 0);
setInterval(clock, 1000);



function clockSet(h,m,s,LastH,LastM,LastS){
    // if(LastH[0] != h[0] && h[0] == 0){
    //     h1.transform = "translateY(" + ((parseInt(LastH[0]) + 1) * 62) + "px)"
    //     setTimeout(() => {h1.transition = "none",h1.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {h1.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastH[0] != h[0]){
    //     h1.transform = "translateY(" + (h[0] * 62) + "px)"
    // }

    // if(LastH[1] != h[1] && h[1] == 0){
    //     h2.transform = "translateY(" + ((parseInt(LastH[1]) + 1) * 62) + "px)"
    //     setTimeout(() => {h2.transition = "none",h2.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {h2.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastH[1] != h[1]){
    //     h2.transform = "translateY(" + (h[1] * 62) + "px)"
    // }

    // if(LastM[0] != m[0] && m[0] == 0){
    //     m1.transform = "translateY(" + ((parseInt(LastM[0]) + 1) * 62) + "px)"
    //     setTimeout(() => {m1.transition = "none",m1.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {m1.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastM[0] != m[0]){
    //     m1.transform = "translateY(" + (m[0] * 62) + "px)"
    // }

    // if(LastM[1] != m[1] && m[1] == 0){
    //     m2.transform = "translateY(" + ((parseInt(LastM[1]) + 1) * 62) + "px)"
    //     setTimeout(() => {m2.transition = "none",m2.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {m2.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastM[1] != m[1]){
    //     m2.transform = "translateY(" + (m[1] * 62) + "px)"
    // }

    // if(LastS[0] != s[0] && s[0] == 0){
    //     s1.transform = "translateY(" + ((parseInt(LastS[0]) + 1) * 62) + "px)"
    //     setTimeout(() => {s1.transition = "none",s1.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {s1.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastS[0] != s[0]){
    //     s1.transform = "translateY(" + (s[0] * 62) + "px)"
    // }

    // if(LastS[1] != s[1] && s[1] == 0){
    //     s2.transform = "translateY(" + ((parseInt(LastS[1]) + 1) * 62) + "px)"
    //     setTimeout(() => {s2.transition = "none",s2.transform = "translateY(0)"}, 800);
    //     setTimeout(() => {s2.transition = "all 0.4s ease-in-out"}, 900);
    // }else if(LastS[1] != s[1]){
    //     s2.transform = "translateY(" + (s[1] * 62) + "px)"
    // }

    clockSetFun(h,LastH,h1,h2)
    clockSetFun(m,LastM,m1,m2)
    clockSetFun(s,LastS,s1,s2)
}



function clockSetFun(Time,LastTime,event1,event2){
    let clockEvent = [event1,event2]
    for(let varNumber = 0;varNumber < 2;varNumber++){
        if(LastTime[varNumber] != Time[varNumber] && Time[varNumber] == 0){
            clockEvent[varNumber].transform = "translateY(" + ((parseInt(LastTime[varNumber]) + 1) * 62) + "px)"
            setTimeout(() => {clockEvent[varNumber].transition = "none",clockEvent[varNumber].transform = "translateY(0)"}, 800);
            setTimeout(() => {clockEvent[varNumber].transition = "all 0.4s ease-in-out"}, 900);
        }else if(LastTime[varNumber] != Time[varNumber]){
            clockEvent[varNumber].transform = "translateY(" + (Time[varNumber] * 62) + "px)"
        }
    }
}

let dateText = document.getElementById("dateText")
let dayText = document.getElementById("dayText")
let dateTextDate = new Date();
let dateYear = dateTextDate.getFullYear()
let dateMon = ()=>{
    if((dateTextDate.getMonth() + 1).toString()[1] == undefined){
        return "0" + (dateTextDate.getMonth() + 1)
    }
    return dateTextDate.getMonth() + 1
}
let dateDate = ()=>{
    if(dateTextDate.getDate().toString()[1] == undefined){
        return "0" + dateTextDate.getDate()
    }
    return dateTextDate.getDate()
}
dateText.innerText = dateYear + "/" + dateMon() + "/" + dateDate()
dayText.innerText = ["日", "一", "二", "三", "四", "五", "六"][dateTextDate.getDay()]


let box = document.getElementById('box').style
window.myAPI.setUserselect((_,data)=>{
    box.setProperty('-webkit-app-region', data)
})

window.myAPI.setBrowserWindow((_,data)=>{
    let jsonData = JSON.stringify(Object.assign({},{
        x: window.screenX.toString(),
        y: window.screenY.toString()
    },
    data))
    myAPI.saveBrowserWindow(jsonData)
})