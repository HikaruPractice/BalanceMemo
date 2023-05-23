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
            for (var i=0;i<len;i++){
                list[i]=list[i].split(/,|\//);
            }
            var transactionsArray=new Array();
            for (var i=4;i<len;i++){
                if (!checkDateFormat(list[i][0],list[i][1],list[i][2])){
                    break;
                }
                transactionsArray.push(list[i]);
            }
            var newCard = new Card(list[1][0],list[1][2],transactionsArray);
            cards.push(newCard);
            selected=cards.length-1;
            saveToLocalStrorage();
        }
    }
    document.getElementById('inputFile').value="";
}


function download_csv(file_name, data){
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom,data], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = file_name;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function outputFile(){
    var buf='';
    var target;
    const len=card.getTransactions().length;
    buf+=`口座名,残高,メモ`+'\n'
    buf+=`${card.getName().replace(/,/g,'_')},${card.getBalance()},${card.getMemo()}`+'\n'
    buf+='\n'
    buf+='日付,金額,摘要'+'\n';
    for (var i=0;i<len;i++){
        target=card.getTransaction(i)
        buf+=`${target.getFullDate2()},${target.getAmount()},${target.getSummary()}`+'\n'
    }
    download_csv(filenameFormat(card.getName()),buf);
}

function filenameFormat(string){
    var marksReg=/[\\/:\*\?\"<>\|]/g;
		
    var v=string;
    v=v.replace(marksReg, "-").replace(/\s/g,"_");
    return v;
}

