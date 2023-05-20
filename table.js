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
                削除
            </th>
        </tr>`;
        var len=cards.length;
        for (i=0;i<len;i++){   
        buf+=`
        <tr>
            <td>
                <span class="cardName" onClick="selectCard('${i}')">${cards[i].getName()}</span>
            </td>
            <td>
                ${cards[i].getBalance()}
            </td>
            <td>
                ${cards[i].getMemo()}
            </td>
            <td>
                <button class="removeButton" onClick="removeCard(${i})">削除</button>
                
            </td>`
            
        }
        document.getElementsByClassName('accountList')[0].innerHTML=buf;
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
    <col  style="width: 60px;">
    <col style="width: 20px;">
    <col  class="colSummary">
    <col class="remove">
</colgroup>
<tr>
    <th>
        日付
    </th>
    <th colspan="2">
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
`<tr id="ts${i}" style="display:table-row;" onClick="editMode(${i})">
    <td>
        ${card.getTransaction(i).getMonth()}/${card.getTransaction(i).getDay()}
    </td>
    <td  class="noRightBorder">
        ${card.getTransaction(i).getAmount()}
    </td>
    <td  class="noLeftBorder">
        円
    </td>
    <td>
        ${card.getTransaction(i).getSummary()}
    </td>
    <td>
        <button class="removeButton" onClick="removeTransaction(${i})">削除</button>
    </td>
</tr>
<tr id="ts${i}_edit" style="display:none;">
    <td>
        <input name="year" class="yearEdit year" value="${card.getTransaction(i).getFullYear()}"><br>
        <input name="month" class="dateEdit month" value="${card.getTransaction(i).getMonth()}">/
        <input name="day" class="dateEdit day" value="${card.getTransaction(i).getDay()}">
    </td>
    <td  class="noRightBorder">
        <label><input class="charge" type="checkbox" ${card.getTransaction(i).getAmount()>0?"checked":""}>入金</label>
        <input name="amount" class="inputBox amount" value="${Math.abs(card.getTransaction(i).getAmount())}">
    </td>
    <td class="noLeftBorder">
        円
    </td>
    <td>
        <input name="summary" class="inputBox summary" value="${card.getTransaction(i).getSummary()}">
    </td>
    <td>
        <button class="removeButton" onClick="editTransaction(${i})">編集</button>
    </td>
</tr>
`;
    }
    _table.innerHTML = buf;
}