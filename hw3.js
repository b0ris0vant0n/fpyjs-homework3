class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }

    setAvailable(status) {
        this.available = status
    }
}

class GoodsList {
    constructor(filter, sortPrice, sortDir) {
        this.goods = []
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    get list() {
        const saleList = this.goods.filter(good => this.filter.test(good.name))

        if (!this.sortPrice) {
            return saleList
        }
        
        if (!this.sortDir) {
            return saleList.sort((a, b) => (b.price - a.price))
        }

        return saleList.sort((a, b) => (a.price - b.price))

    }

    add(Good) {
        this.goods.push(Good)
    }

    remove(id) {
        const delId = this.goods.findIndex(good => good.id === id);
        if (delId != undefined) {
            this.goods.splice(delId, 1);
        }
        return delId;
    }
    
}   


class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available)
        this.amount = amount
    }
}

class Basket {
    constructor(){
        this.goods = []
    }

    get totalAmount() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0)
        
    }

    get totalSum() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)
    }

    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id)
        if (index > 0) {
            this.goods[index].amount += amount
        } else {
            let addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount)
            this.goods.push(addGood)
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        } 
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods.filter(item => item.available === false).forEach(value => this.remove(value));
    }

}
const polo1 = new Good(1, "Polo T-shirt for men", "color: white", ["S", "M", "XL"], 4500, true);
const polo2 = new Good(2, "Polo T-shirt for women", "color: red", ["S", "M", "L"], 4700, true);
const jacket = new Good(3, "Leather Jacket", "color: black", ["S", "M", "L"], 15500, true);
const jeans = new Good(4, "Jeans Levis", "color: blue", ["S", "M", "L"], 6000, true);
const tshirt = new Good(5, "T-Shirt", "color: grey", ["L", "XL"], 2500, true);


const catalog = new GoodsList(0, true, true)

catalog.add(polo1)
catalog.add(polo2)
catalog.add(jacket)
catalog.add(jeans)
catalog.add(tshirt)

const basket = new Basket()



basket.add(polo1, 1)
basket.add(polo2, 2)
basket.add(tshirt, 1)
basket.add(jacket, 2)
basket.add(jeans, 1)

console.log(basket)

console.log(`Общее количество товаров в корзине: ${basket.totalAmount}`)
console.log(`Общая сумму товаров в корзине: ${basket.totalSum}`)