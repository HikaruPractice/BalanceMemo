function table(){
    setSelectedCard();
    tableAccounts();
    displayBalance();
    tableContent();
    document.getElementById('menuTab').checked = menu;
}
function tableAccounts(){
        var buf=`
        <caption>口座選択</caption>
        <tr>
            <th class="colDate">
                口座名
            </th>
            <th class="colAmount">
                残高
            </th>
            <th class="colSummary">
                メモ
            </th>
            <th class="remove">
                操作
            </th>
        </tr>`;
        var buf2=`
        <caption>完了した口座</caption>
        <tr>
            <th class="colDate">
                口座名
            </th>
            <th class="colAmount">
                残高
            </th>
            <th class="colSummary">
                メモ
            </th>
            <th class="remove">
                操作
            </th>
        </tr>`;
        var len=cards.length;
        for (i=0;i<len;i++){   
            if (!cards[i].removed){
                buf+=`
                <tr id="card${i}">
                    <td>
                        <span class="cardName" onClick="selectCard('${i}')">${cards[i].getName()}</span>
                    </td>
                    <td>
                        ${cards[i].getBalanceText()}
                    </td>
                    <td onClick="editCardMode(${i})" class="memo_summary">
                        ${cards[i].getMemo()}
                    </td>
                    <td>
                        <button class="removeButton" onClick="usedCard(${i})">完了</button>
                        
                    </td>
                <tr>
                <tr id="card${i}_edit" style="display:none">
                    <td>
                        <input name="cardName" class="inputBox name" value="${cards[i].getName()}"
                    </td>
                    <td>
                    ${cards[i].getBalanceText()}
                    </td>
                    <td class="memo_summary">
                        <input name="cardMemo" class="inputBox memo" value="${cards[i].getMemo()}"
                    </td>
                    <td>
                        <button class="removeButton" onClick="editCard(${i})">編集</button>
                        
                    </td>
                <tr>`}else{
                buf2+=`
                <tr id="card${i}">
                    <td>
                        <span class="cardName" onClick="selectCard('${i}')">${cards[i].getName()}</span>
                    </td>
                    <td>
                        ${cards[i].getBalanceText()}
                    </td>
                    <td onClick="editCardMode(${i})" class="memo_summary">
                        ${cards[i].getMemo()}
                    </td>
                    <td>
                        <button class="removeButton" ${document.getElementById('removePermissionCard').checked?'':'disabled '}onClick="removeCard(${i})">削除</button>
                        
                    </td>
                <tr>
                <tr id="card${i}_edit" style="display:none">
                    <td>
                        <input name="cardName" class="inputBox name" value="${cards[i].getName()}"
                    </td>
                    <td>
                    ${cards[i].getBalanceText()}
                    </td>
                    <td class="memo_summary">
                        <input name="cardMemo" class="inputBox memo" value="${cards[i].getMemo()}"
                    </td>
                    <td>
                        <button class="removeButton" onClick="editCard(${i})">復元</button>
                        
                    </td>
                <tr>`
                }
        }
        document.getElementsByClassName('accountList')[0].innerHTML=buf;
        document.getElementsByClassName('accountList_removed')[0].innerHTML=buf2;
}

function displayBalance(){
    document.getElementById('balance').innerHTML = `
    <p>${card.getName()}</p>
    <p class="balanceTitle">残高</p>
    <p class="balanceAmount">${card.getBalanceText()}</p>`
}

function tableContent(){
    var _table = document.getElementsByClassName('transaction')[0]
    var buf =`
<caption>決済履歴</caption>
<colgroup>
    <col  class="colDate"> 
    <col  class="colAmount">
    <col  class="colSummary">
    <col class="remove">
</colgroup>
<tr>
    <th>
        日付
    </th>
    <th>
        金額
    </th>
    <th>
        摘要
    </th>
    <th>
        操作
    </th>
</tr>`;
    var len = card.getTransactions().length;
    for (var i = len - 1; 0 <= i; i--) {
        buf += 
`<tr id="ts${i}">
    <td onClick="editMode(${i})">
        ${card.getTransaction(i).getMonth()}/${card.getTransaction(i).getDay()}
    </td>
    <td onClick="editMode(${i})">

                    ${card.getTransaction(i).getAmount()}円
                </td>

    <td onClick="editMode(${i})" class="memo_summary">
        ${card.getTransaction(i).getSummary()}
    </td>
    <td>
        <button class="removeButton" ${document.getElementById('removePermissionTransaction').checked?'':'disabled '}onClick="removeTransaction(${i})">削除</button>
    </td>
</tr>
<tr id="ts${i}_edit" style="display:none;">
    <td>
        <table class="inputTable">
            <tr>
                <td colspan="3" style="text-align:left;">
                <input name="year" class="yearEdit year inputBox" value="${card.getTransaction(i).getFullYear()}">
                </td>
            </tr>
            <tr>
                <td>
                <input name="month" class="dateEdit month inputBox" value="${card.getTransaction(i).getMonth()}">
                </td>
                <td>        
                /
                </td>
                <td>
                <input name="day" class="dateEdit day inputBox" value="${card.getTransaction(i).getDay()}">
                </td>
            </tr>
        </table>
        
    </td>
    <td>
        <table class="inputTable">
            <tr>
                <td colspan="2" style="text-align:left;">
                    <label><input class="charge" type="checkbox" ${card.getTransaction(i).getAmount()>0?"checked":""}>入金</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input name="amount" class="inputBox amount" value="${Math.abs(card.getTransaction(i).getAmount())}">
                </td>
                <td>
                    円
                </td>
            </tr>
        </table>
    </td>
    <td class="memo_summary">
        <input name="summary" class="inputBox summary" value="${card.getTransaction(i).getSummary()}">
    </td>
    <td>
        <button class="removeButton editTransaction" onClick="editTransaction(${i})">編集</button>
    </td>
</tr>
`;
    }
    _table.innerHTML = buf;
}