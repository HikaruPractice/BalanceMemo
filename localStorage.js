


function loadFromLocalStorage() {
    var jsonString = localStorage.getItem('cards');
    var buf = JSON.parse(jsonString);
    var len = Object.keys(buf.cards).length;
    cards=[];
    for (i=0;i<len;i++){
        cards.push(new Card(buf.cards[i].name,buf.cards[i].transactions))
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