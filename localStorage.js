


function loadFromLocalStorage() {
    cards=[];
    var jsonString = localStorage.getItem('cards');
    if ( jsonString === null){
        return;
    }
    var buf = JSON.parse(jsonString);
    if ( typeof buf.cards === 'undefined'){
        return;
    }
    var len = Object.keys(buf.cards).length;
    for (i=0;i<len;i++){
        cards.push(new Card(buf.cards[i].name,buf.cards[i].memo,buf.cards[i].transactions))
    }
    selected = buf.selected;
}
function saveToLocalStrorage() {
    var data={
        cards:cards,
        selected:selected
    }
    var jsonString = JSON.stringify(data);
    localStorage.setItem('cards', jsonString);
    location.reload();
}