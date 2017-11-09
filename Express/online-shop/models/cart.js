module.exports = function Cart(oldCart) { //obiekt nie w bazie danych bo nie na mongoose
    //opieram sie na starym koszyku
    this.items = oldCart.items || {}; //jak jest undefined to badz pustym obiektem

    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) { //sprawdzam czy taki item istnieje w koszyku
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}; //tworze nowy produkt w koszyku
        } 
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price; //cena total - cena jednego
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };
    
    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr; //zwrocenie obiektow produktow jako tablice
    }; 
};