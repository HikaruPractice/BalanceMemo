function inputFile(){
    var files=document.getElementById('inputFile').files;
    
    for(file of files){
        var reader=new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload=(event)=>{
            var input=event.target.result;
            var list=input.split('\n');
            var len=list.length;
            if (len<2){
                return;
            }
            for (var i=1;i<len;i++){
                list[i]=list[i].split(/,|\//);
            }
            var transactionsArray=new Array();
            var newCard
            
            for (var i=1;i<len;i++){
                if (!checkDateFormat(list[i][0],list[i][1],list[i][2])){
                    if(i===1){
                        if (checkDateFormat(new Date().getFullYear(),list[i][0],list[i][1])){
                            list[i].unshift(new Date().getFullYear());
                            transactionsArray.push(list[i]);
                        }else{
                            break;
                        }
                    }else{
                        if(checkDateFormat(transactionsArray[(i-1)-1][0],list[i][0],list[i][1])){
                            list[i].unshift(transactionsArray[(i-1)-1][0]);
                            transactionsArray.push(list[i]);
                        }else{
                            break;
                        }
                    }
                }else{
                    transactionsArray.push(list[i]);
                }
            }
            if(transactionsArray.length===0){
                newCard = new Card(list[1][3],list[1][5]);
            }else{
                newCard = new Card(list[1][5],list[1][7],transactionsArray);
                newCard.sortTransactions();
            }
            cards.push(newCard);
            selected=cards.length-1;
            saveToLocalStrorage();
        }
    }
    document.getElementById('inputFile').value="";
}


function download(file_name, data,type){
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom,data], {type: type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = file_name;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function download_csv(file_name, data){
    download(file_name, data,'text/csv');
}
function download_txt(file_name, data){
    download(file_name, data,'text/plain');
}

function outputFile(){
    var buf='';
    var target;
    const len=card.getTransactions().length;
    var cardInfo=`${card.getName().replace(/,/g,'_')},${card.getBalance()},${card.getMemo()}`
    buf+='日付,金額,摘要,口座名,残高,メモ'+'\n';
    if(len===0){
        buf+=',,,'+cardInfo+'\n';
    }else{
        target=card.getTransaction(0);
        buf+=`${target.getFullDate2()},${target.getAmount()},${target.getSummary()},${cardInfo}`+'\n'
        for (var i=1;i<len;i++){
            target=card.getTransaction(i);
            buf+=`${target.getFullDate2()},${target.getAmount()},${target.getSummary()}`+'\n'
        }
    }

    download_csv(filenameFormat(card.getName()),buf);
}

function filenameFormat(string){
    var marksReg=/[\\/:\*\?\"<>\|]/g;
		
    var v=string;
    v=v.replace(marksReg, "-").replace(/\s/g,"_");
    return v;
}

function inputAll(){    
    if(!window.confirm('現在のデータが全て上書き削除されますがよろしいですか。')){
        return;
    }
var files=document.getElementById('inputAll').files;
    
for(file of files){
    var reader=new FileReader();
    reader.readAsText(file,'UTF-8');
    reader.onload=(event)=>{
        var input=event.target.result;
        localStorage.setItem('cards', input);
        document.location.reload();
    }
}
document.getElementById('inputFile').value="";
    
}

function outputAll(){
    var data={
        cards:cards,
        selected:selected
    }
    var jsonString = JSON.stringify(data);
    download_txt(filenameFormat('全カード残高'),jsonString);

}