function table() {
    setSelectedCard();
    document.getElementById('menuTab').checked = menu;
    tableAccounts();
    displayBalance();
    tableContent();
}
function tableAccounts() {
    var buf = `
        <caption>口座選択</caption>
        <tr>
            <th class="colDate">
                口座名
            </th>
            <th class="colSummary">
                メモ
            </th>
            <th class="colAmount">
                残高
            </th>
            <th class="remove">
                操作
            </th>
        </tr>`;
    var buf2 = `
        <caption>完了した口座</caption>
        <tr>
            <th class="colDate">
                口座名
            </th>
            <th class="colSummary">
                メモ
            </th>
            <th class="colAmount">
                残高
            </th>
            <th class="remove">
                操作
            </th>
        </tr>`;
    var len = cards.length;
    for (i = 0; i < len; i++) {
        if (!cards[i].removed) {
            buf += `
                <tr id="card${i}">
                    <td>
                        <span class="cardName" onClick="selectCard('${i}')">${cards[i].getName()}</span>
                    </td>
                    <td onClick="editCardMode(${i})" class="memo_summary">
                        ${cards[i].getMemo()}
                    </td>
                    <td>
                        ${cards[i].getBalanceText()}
                    </td>
                    <td>
                        <button class="circleButton trashButton" onClick="usedCard(${i})"><span class="fas fa-trash-alt"></span></button>
                    </td>
                <tr>
                <tr id="card${i}_edit" style="display:none">
                    <td>
                        <input name="cardName" class="inputBox name" value="${cards[i].getName()}"
                    </td>
                    <td class="memo_summary">
                        <input name="cardMemo" class="inputBox memo" value="${cards[i].getMemo()}"
                    </td>
                    <td>
                    ${cards[i].getBalanceText()}
                    </td>
                    <td>
                        <button class="circleButton editButton" onClick="editCard(${i})"></button>
                        
                    </td>
                <tr>`} else {
            buf2 += `
                <tr id="card${i}">
                    <td>
                        <span class="cardName" onClick="selectCard('${i}')">${cards[i].getName()}</span>
                    </td>
                    <td onClick="editCardMode(${i})" class="memo_summary">
                        ${cards[i].getMemo()}
                    </td>
                    <td>
                        ${cards[i].getBalanceText()}
                    </td>
                    <td>
                        <button class="circleButton removeButton" ${document.getElementById('removePermissionCard').checked ? '' : 'disabled '}onClick="removeCard(${i})"></button>
                        
                    </td>
                <tr>
                <tr id="card${i}_edit" style="display:none">
                    <td>
                        <input name="cardName" class="inputBox name" value="${cards[i].getName()}"
                    </td>
                    <td class="memo_summary">
                        <input name="cardMemo" class="inputBox memo" value="${cards[i].getMemo()}"
                    </td>
                    <td>
                    ${cards[i].getBalanceText()}
                    </td>
                    <td>
                        <button class="circleButton editButton" onClick="editCard(${i})"></button>
                        
                    </td>
                <tr>`
        }
    }
    document.getElementsByClassName('accountList')[0].innerHTML = buf;
    document.getElementsByClassName('accountList_removed')[0].innerHTML = buf2;
}

function displayBalance() {
    document.getElementById('balance').innerHTML = `
    <p>${card.getName()}</p>
    <p class="balanceTitle">残高</p>
    <p class="balanceAmount">${card.getBalanceText()}</p>`
}

function tableContent() {
    var _table = document.getElementsByClassName('transaction')[0]
    var buf = `
<caption>決済履歴</caption>
<colgroup>
    <col>
    <col class="colAmount">
    <col class="buttons">
</colgroup>`;
    var len = card.getTransactions().length;
    let oldDate = '00000000';
    let newDate = '';
    for (var i = len - 1; 0 <= i; i--) {
        newDate = card.getTransaction(i).getFullDateYYYYMMDD();
        if (oldDate !== newDate) { 
            buf+=`
<tr id="ts${i}-date" class="dateRow">
    <td colspan='3'>
        ${card.getTransaction(i).getFullDate()}
    </td>
</tr>`
        }
        buf +=`
<tr id="ts${i}" class="displayRow">
    <td onClick="editMode(${i})">
        ${card.getTransaction(i).getSummary()}
    </td>
    <td onClick="editMode(${i})">
        ${card.getTransaction(i).getAmountText()}
    </td>
    <td>
        <button class="circleButton removeButton" ${document.getElementById('removePermissionTransaction').checked ? '' : 'disabled '}onClick="removeTransaction(${i})"></button>
    </td>
</tr>
<tr id="ts${i}_edit" class="editRow" style="display: none;">
    <td colspan="2">
        <table class="editTable" >
            <tr id="ts${i}-date_edit" class="dateRow edit">
                <td>
                    <table id="ts${i}_Date" class="dateTable"><tr>
                        <td><span onclick="nextDate('ts${i}_Date',true)" class="fas fa-chevron-circle-left nextButton"></span></td>
                        <td>
                            <table class="inputTable"><tr><td>                
                                <input name="year" class="yearEdit year inputBox" value="${card.getTransaction(i).getFullYear()}">
                            </td><td>
                                    年
                            </td></tr></table>
                        </td>
                        <td>
                            <table class="inputTable"><tr><td>
                            <input name="month" class="dateEdit month inputBox" value="${card.getTransaction(i).getMonth()}">
                            </td><td>
                                    月
                            </td></tr></table>
                        </td>
                        <td>
                            <table class="inputTable"><tr><td>
                            <input name="day" class="dateEdit day inputBox" value="${card.getTransaction(i).getDay()}">
                            </td><td>
                                    日
                            </td></tr></table>
                        </td>
                        <td><span onclick="nextDate('ts${i}_Date',false)" class="fas fa-chevron-circle-right nextButton"></span></td>
                    </tr><tr class="editDateError">
                        <td colspan="5">無効な日付です</td>
                        </tr></table>
                </td>
            </tr>
            <tr class="edit">
                <td class="memo_summary">
                    <table style="table-layout:auto;"><tr>
                        <td>
                            <input name="summary" class="inputBox summary" value="${card.getTransaction(i).getSummary()}">
                        </td>
                        <td class="colAmountEdit" style="white-space:nowrap;">
                            <input id="charge_${i}" class="charge" type="checkbox" ${card.getTransaction(i).getAmount() > 0 ? "checked" : ""}><label for="charge_${i}" class="normalButton chargeLabel"></label>
                            <input name="amount" class="amount" value="${Math.abs(card.getTransaction(i).getAmount())}"> 円
                        </td>
                        </tr><tr class="editAmountError">
                            <td colspan="2">数値を入れてください</td>
                    </tr></table>
                </td>
            </tr>
        </table>
    </td>
    <td class="buttons" style="text-align:center;">
        <button class="circleButton editButton editTransaction" onClick="editTransaction(${i})"></button>
    </td>
</tr>


`       ;
        oldDate=newDate;
    }
    _table.innerHTML = buf;
}