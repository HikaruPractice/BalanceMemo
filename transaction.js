const Transaction=function (date,amount,summary){
    var dateObject;
    if (typeof date === 'undefined'){
        dateObject = new Date();
    }else{
        dateObject=new Date(date[0],Number(date[1])-1,date[2])
    }
    this.year=dateObject.getFullYear();
    this.month=dateObject.getMonth()+1;
    this.day=dateObject.getDate();
    this.amount=Number(amount);
    this.summary=summary;
};

Transaction.prototype={
    infoDate:function(){console.log (`${this.year}年${this.month}月${this.day}日`);},
    infoAmount:function(){console.log(`${this.amount.toLocaleString()}円`);},
    infoSummary:function(){console.log(this.summary);},
    getDate:function(){return `${this.month}/${this.day}`},
    getFullYear:function(){return this.year},
    getMonth:function(){return this.month},
    getDay:function(){return this.day},
    getAmountText:function(){return `${this.amount.toLocaleString()}円`},
    getSummary:function(){return `${this.summary}`},
    getFullDate:function(){return `${this.year}/${this.month}/${this.day}`},
    getFullDate2:function(){
        var yearText=this.year.toString();
        var monthText=('0'+this.month.toString()).slice(-2);
        var dayText=('0'+this.day.toString()).slice(-2);
        return `${yearText}/${monthText}/${dayText}`
    },
    getFullDateYYYYMMDD:function(){return this.getFullDate2().replace(/\//g,'');},
    getAmount:function(){return this.amount},
    infoAll:function(){
        console.log(`[${this.getFullDate()},${this.getAmountText()},${this.getSummary()}]`);
    }
};
