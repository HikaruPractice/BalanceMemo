var cards;
var selected;
var card;
var menu=true;
{
    loadFromLocalStorage();
    setSelectedCard();
}


function setSelectedCard(){
    var len= cards.length;
    for (i=0;i<len;i++){
        if (cards[i].getName()===selected){
            card = cards[i];
            menu=false;
            return;
        }
    }
    card = new Card('');
    menu=true;
}

window.onload = () => {
    document.getElementById('menuTab').checked = menu;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    document.getElementsByName('year')[0].value = year;
    document.getElementsByName('month')[0].value = month;
    document.getElementsByName('day')[0].value = day;

}

function selectCard(name){
    selected=name;
    saveToLocalStrorage();
}

function addTransaction() {
    var year = document.getElementsByName('year')[0].value;
    var month = document.getElementsByName('month')[0].value;
    var day = document.getElementsByName('day')[0].value;
    var amount = Number(numberToASC(document.getElementsByName('amount')[0].value)) * -1;
    var summary = document.getElementsByName('summary')[0].value;
    card.addTransaction([year, month, day], amount, summary);
    saveToLocalStrorage();
}
function removeTransaction(index) {
    card.removeTransaction(index);
    saveToLocalStrorage();
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