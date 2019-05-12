import moment from 'moment';

export const getUrlParam = (param) => {
    let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    let r =window.location.search.substr(1).match(reg);
    if (r !== null){
        return decodeURIComponent(r[2])
    }else{
        return null;
    }
}
export const getUrlLastPathParam = () => {
    let arr =window.location.pathname.split('/')
    if (arr !== null){
        return arr[arr.length-1]
    }else{
        return null;
    }
}

export const dateDiff = (timestamp)=>{
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;
    var year = month * 12;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }

    // 计算差异时间的量级
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    // var zero = function (value) {
    //     if (value < 10) {
    //         return '0' + value;
    //     }
    //     return value;
    // };

    // 使用
    if (yearC >=1) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    } else if (monthC >= 1) {
        return parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    } else {
        return '刚刚';
    }
};

export const highlightKeyWord = (content,keyword)=>{
    var reg = new RegExp("(" + keyword + ")", "gi");
    let lastFlag=0;
    let flag = 0;
    let nextFlag=0;

    let newContent = '';
    if(content.indexOf(keyword,flag)!==-1){
        while(content.indexOf(keyword,flag)!==-1){
            lastFlag=flag;
            flag=content.indexOf(keyword,flag)+1;
            nextFlag=content.indexOf(keyword,flag)+1;
            let lastDiffFlag=flag-lastFlag;
            let nextDiffFlag=nextFlag-flag;

            if(lastDiffFlag<=30 && nextDiffFlag<=30){
                nextFlag === 0 ?
                newContent=newContent+content.substr(flag-1) :
                newContent=newContent+content.substr(flag-1,nextDiffFlag-1)
            }else if(lastDiffFlag<=30 && nextDiffFlag>30){
                newContent=newContent+content.substr(flag-1,30-1)
            }else if(lastDiffFlag>30 && nextDiffFlag<=30){
                nextFlag === 0 ?
                newContent=newContent+'......'+content.substr(flag-30-1) :
                newContent=newContent+'......'+content.substr(flag-30-1,30+nextDiffFlag-1)
            }else if(lastDiffFlag>30 && nextDiffFlag>30){
                newContent=newContent+'......'+content.substr(flag-30-1,60-1);
            }
        }
    }else{
        newContent=content;
    }
    var newstr = newContent.replace(reg, "<span style='color:#ec6149'>$1</span>");
    return newstr;
}

export const setCookie=(user_token,value,expireseconds)=>{
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireseconds * 1000);
    document.cookie=user_token+ "=" +escape(value)+
    ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
}
