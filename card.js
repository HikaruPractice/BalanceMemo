const Card=function(name,memo,transactionsArray,removed){
    if(typeof name !== 'string' || name === ''){
        this.name='(無名)';
    }else{
        this.name=name;
    }
    if(typeof memo !== 'string'){
        this.memo="";
    }else{
        this.memo=memo;
    }
    this.transactions=new Array();
    this.setTransactions(transactionsArray);
    this.removed=(removed===true)?true:false;
}


Card.prototype={
    setName:function(name){this.name=name;},
    setMemo:function(memo){this.memo=memo;},
    setRemoved:function(boolean){
        if (typeof boolean === 'boolean'){
            this.removed=boolean;
        }else{
            this.removed=true;
            console.log('Card.setRemoved()の引数にboolean以外が指定査定ます');
        }
    },
    setTransactions:function(transactionsArray){
        if(typeof transactionsArray !== 'undefined'){
            var buf=new Array();
            const n = transactionsArray.length;
            if (Array.isArray(transactionsArray[0])){
                for (var i=0;i<n;i++){
                    transaction=transactionsArray[i];
                    buf.push(new Transaction([transaction[0],transaction[1],transaction[2]],transaction[3],transaction[4]));
                }
            }else{
                for (var i=0;i<n;i++){
                    transaction=transactionsArray[i];
                    buf.push(new Transaction([transaction.year,transaction.month,transaction.day],transaction.amount,transaction.summary));
                }
            }
            this.transactions=buf;
        }
    },

    getName:function(){return this.name},
    getMemo:function(){return this.memo},
    getTransactions:function(){return this.transactions;},
    getTransaction:function(transactionIndex){return this.transactions[transactionIndex];},
    getBalance:function(){
        var sum=0;
        for(var i=0;i<this.transactions.length;i++){
            sum+=this.transactions[i].getAmount();
        }
        return sum;
    },
    getBalanceText:function(){return this.getBalance().toLocaleString()+'円';},

    infoTransactions:function(){
        for(var i=0;i<this.transactions.length;i++){
            this.transactions[i].infoAll();
        }
    },
    addTransaction:function(date,amount,summary){
        var newTransaction = new Transaction(date,amount,summary);
        var len = this.transactions.length;
        for (i=len-1;0<=i;i--){
            if (newTransaction.getFullDateYYYYMMDD() >=this.getTransaction(i).getFullDateYYYYMMDD()){
                this.transactions.splice(i+1,0,newTransaction);
                return;
            }
        }
        this.transactions.unshift(new Transaction(date,amount,summary));
        },
    editTransaction:function(date,amount,summary,transactionIndex){
        this.removeTransaction(transactionIndex);
        this.addTransaction(date,amount,summary);
    },
    removeTransaction:function(transactionIndex){this.transactions.splice(transactionIndex,1);},
    sortTransactions:function(){
        const len = this.transactions.length;
        for (var i=1;i<len;i++){
            for (var j=0;j<i;j++){
                if(this.getTransaction(i).getFullDateYYYYMMDD() < this.getTransaction(j).getFullDateYYYYMMDD()){
                    this.transactions.splice(j,0,this.transactions.splice(i,1)[0]);
                    break;
                }
            }
            for (var k=0;k<len;k++){
        }
        }
    }
}


