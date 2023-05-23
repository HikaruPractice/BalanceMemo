var cards=[];
var selected=-1;
var card;
var menu=true;
{
    console.log('ページが更新されました'+`${new Date().getMinutes()}分${new Date().getSeconds()}秒`)
    loadFromLocalStorage();
}

function setSelectedCard(){
    if (selected === -1 || selected>=cards.length){
        card = new Card('[未選択]');
        menu=true;
        document.getElementById('content').style.display='none';
    }else{
        document.getElementById('content').style.display='';
        card = cards[selected];
        menu=false;
    }
}



// function setSelectedCard(){
//     var len= cards.length;
//     for (i=0;i<len;i++){
//         if (cards[i].getName()===selected){
//             card = cards[i];
//             menu=false;
//             return;
//         }
//     }
//     card = new Card('');
//     menu=true;
// }

window.onload = () => {
    
    table();
    dateInputboxReset(document.getElementsByName('year')[0], document.getElementsByName('month')[0],document.getElementsByName('day')[0]);
    dateInputboxReset(document.getElementsByName('newCardyear')[0], document.getElementsByName('newCardmonth')[0],document.getElementsByName('newCardday')[0]);
}


function removeEnableCard(){
    tableAccounts();
}

function createCard(){
    var name=document.getElementsByName('newCard')[0].value;
    var memo=document.getElementsByName('newCardMemo')[0].value;
    var initialBalance = document.getElementsByName('newCardBalance')[0].value;
    if (initialBalance>0){
        var year = document.getElementsByName('newCardyear')[0].value;
        var month = document.getElementsByName('newCardmonth')[0].value;
        var day = document.getElementsByName('newCardday')[0].value;
        if (!checkDateFormat(year,month,day)){
            document.getElementById('newCardDayError').style.display = 'table-row';
            return;
        }
        var initialTransactions = [
            [year,month,day,Number(initialBalance),'初期残高']
        ]
        cards.push(new Card(name,memo,initialTransactions));
    }else{
        cards.push(new Card(name,memo));
    }
    selected=cards.length-1;
    saveToLocalStrorage();

    dateInputboxReset(document.getElementsByName('newCardyear')[0], document.getElementsByName('newCardmonth')[0],document.getElementsByName('newCardday')[0]);
    document.getElementsByName('newCard')[0].value="";
    document.getElementsByName('newCardBalance')[0].value="";
    document.getElementsByName('newCardMemo')[0].value="";

}

function selectCard(n){
    selected=Number(n);
    saveToLocalStrorage();
}

function usedCard(n){
    cards[n].setRemoved(true);
    selected=-1;
    saveToLocalStrorage();
}

function removeCard(n){
    cards.splice(n,1);
    selected=-1;
    saveToLocalStrorage();
}

function editCard(index){
    var target = document.getElementById(`card${index}_edit`);
    var name=target.getElementsByClassName('name')[0].value;
    var memo=target.getElementsByClassName('memo')[0].value;
    cards[index].setName(name);
    cards[index].setMemo(memo);
    cards[index].setRemoved(false);
    selected=-1;
    saveToLocalStrorage();

}

function editCardMode(n){
    resetEditCardMode()
    document.getElementById(`card${n}`).style.display="none";
    document.getElementById(`card${n}_edit`).style.display="";
}

function resetEditCardMode(){
    var len = cards.length;
    for(i=0;i<len;i++){
        document.getElementById(`card${i}`).style.display="";
        document.getElementById(`card${i}_edit`).style.display="none";
    }
}

function removeEnableTransaction(){
    tableContent();
}

function addTransaction() {
    var year = document.getElementsByName('year')[0].value;
    var month = document.getElementsByName('month')[0].value;
    var day = document.getElementsByName('day')[0].value;
    if (!checkDateFormat(year,month,day)){
        document.getElementById('dayError').style.display = 'table-row';
        return;
    }
    var amount = document.getElementsByName('amount')[0].value;
    if (amount === ""){
        document.getElementById('amountError').style.display = 'table-row';
        return;
    }
    var charge = document.getElementsByName('charge')[0].checked;
    amount = Number(numberToASC(amount)) * (charge?1:-1);
    if (amount === NaN){
        document.getElementById('amountError').style.display = 'table-row';
        return;
    }
    var summary = document.getElementsByName('summary')[0].value;
    card.addTransaction([year, month, day], amount, summary);

    saveToLocalStrorage();
    dateInputboxReset(document.getElementsByName('year')[0], document.getElementsByName('month')[0],document.getElementsByName('day')[0]);
    document.getElementsByName('amount')[0].value="";
    document.getElementsByName('charge')[0].checked=false;
    document.getElementsByName('summary')[0].value="";


}

function editTransaction(index){
    var target = document.getElementById(`ts${index}_edit`);
    var year=target.getElementsByClassName('year')[0].value;
    var month=target.getElementsByClassName('month')[0].value;
    var day=target.getElementsByClassName('day')[0].value;
    var amount=0;
    var summary=target.getElementsByClassName('summary')[0].value;
    
    var amountAbs=target.getElementsByClassName('amount')[0].value;
    var charge=target.getElementsByClassName('charge')[0].checked;
    amount=(charge?1:-1)*amountAbs;

    card.editTransaction([year,month,day],amount,summary,index);
    saveToLocalStrorage();
}

function multiEditTransaction(){
    var transactionsArray=new Array();

    var target;
    var year;
    var month;
    var day;
    var amount;
    var summary;
    
    var amountAbs;
    var charge;

    var len=card.getTransactions().length;

    for (i=0;i<len;i++){    
        target = document.getElementById(`ts${i}_edit`);
        year=target.getElementsByClassName('year')[0].value;
        month=target.getElementsByClassName('month')[0].value;
        day=target.getElementsByClassName('day')[0].value;
        summary=target.getElementsByClassName('summary')[0].value;
        
        amountAbs=target.getElementsByClassName('amount')[0].value;
        charge=target.getElementsByClassName('charge')[0].checked;

        amount=(charge?1:-1)*amountAbs;

        transactionsArray.push([year,month,day,amount,summary])
    }
    card.setTransactions(transactionsArray);
    card.sortTransactions();
    document.getElementById('removePermissionTransaction').checked=false;
    document.getElementById('multiEditMode').checked=false;
    document.getElementById('multiEditSave').style.display="none";

    saveToLocalStrorage();
}

function removeTransaction(index) {
    card.removeTransaction(index);
    saveToLocalStrorage();
}




function editMode(n){
    resetEditMode()
    document.getElementById(`ts${n}`).style.display="none";
    document.getElementById(`ts${n}_edit`).style.display="";
}

function resetEditMode(){
    var len = card.getTransactions().length;
    for(i=0;i<len;i++){
        document.getElementById(`ts${i}`).style.display="";
        document.getElementById(`ts${i}_edit`).style.display="none";
    }
}

function multiEditMode(){
    var mode = document.getElementById('multiEditMode').checked;
    var len = card.getTransactions().length;
    if (mode){
        document.getElementById('multiEditSave').style.display="";
        for(i=0;i<len;i++){
            document.getElementById('removePermissionTransaction').disabled=true;
            document.getElementById(`ts${i}`).style.display="none";
            document.getElementById(`ts${i}_edit`).style.display="";
            document.getElementsByClassName('editTransaction')[len-i-1].disabled=true;
        }
    }else{        
        document.getElementById('multiEditSave').style.display="none";
        for(i=0;i<len;i++){
            document.getElementById('removePermissionTransaction').disabled=false;
            document.getElementById(`ts${i}`).style.display="";
            document.getElementById(`ts${i}_edit`).style.display="none";
            document.getElementsByClassName('editTransaction')[len-i-1].disabled=false;
        }
    }

}

function numberToASC(string) {
    var buf = '';
    if (typeof string !== 'string') {
        return string;
    } else {
        var len = string.length;
        for (i = 0; i < len; i++) {
            var temp = string.charAt(i);
            switch (temp) {
                case '０':
                    buf += '0';
                    break;
                case '１':
                    buf += '1';
                    break;
                case '２':
                    buf += '2';
                    break;
                case '３':
                    buf += '3';
                    break;
                case '４':
                    buf += '4';
                    break;
                case '５':
                    buf += '5';
                    break;
                case '６':
                    buf += '6';
                    break;
                case '７':
                    buf += '7';
                    break;
                case '８':
                    buf += '8';
                    break;
                case '９':
                    buf += '9';
                    break;
                default:
                    buf += temp;
            }
        }
        return buf;
    }
}

function checkDateFormat(year,month,day){
    var testDate = new Date(year,month-1,day)
    if (isNaN(testDate.getTime())){
        return false;
    }
    if ( testDate.getFullYear()!==Number(year) ||testDate.getMonth()+1 !== Number(month) || testDate.getDate() !== Number(day)){
        return false;
    }
    return true;
}

function dateInputboxReset(yearBox,monthBox,dayBox){
    var now=new Date();
    yearBox.value=now.getFullYear();
    monthBox.value=now.getMonth()+1;
    dayBox.value=now.getDate();
}