const Card=function(name,transactionsArray){
    this.name=name;
    this.transactions=new Array();
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
    
}


Card.prototype={
    setName:function(name){this.name=name;},
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
    removeTransaction:function(transactionIndex){this.transactions.splice(transactionIndex,1);},
    getName:function(){return this.name},
    getTransactions:function(){return this.transactions;},
    getTransaction:function(transactionIndex){return this.transactions[transactionIndex];},
    getBalance:function(){
        var sum=0;
        for(var i=0;i<this.transactions.length;i++){
            sum+=this.transactions[i].getAmount();
        }
        return sum;
    },
    getBalanceText:function(){return this.getBalance().toLocaleString()+'円';}
}


