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
    buf+=`口座名,${card.getName().replace(/,/g,'_')}`+'\n'
    buf+=`残高,${card.getBalance()}`+'\n'
    buf+='\n'
    buf+='日付,金額,摘要'+'\n';
    for (var i=0;i<len;i++){
        target=card.getTransaction(i)
        buf+=`${target.getFullDate()},${target.getAmount()},${target.getSummary()}`+'\n'
    }
    download_csv(filenameFormat(card.getName()),buf);
}

function filenameFormat(string){
    var marksReg=/[\\/:\*\?\"<>\|]/g;
		
    var v=string;
    v=v.replace(marksReg, "-").replace(/\s/g,"_");
    return v;
}