class Ingredient {
  constructor(input = {}) {
    this.name = input.name;
    this.weight = input.weight;
    this.rating = input.rating;
    this.price = input.price;
    this.currency = input.currency;
    this.link = input.link;
    this.imageLink = input.imageLink;
    this.calories = input.kcal;
    this.weightAbsoulte = input.weightAbsoulte;
    this.measureType = input.measureType;
    this.pricePerKilo = input.pricePerKilo;
    this.quantity = 1;
    this.caloriesTotal = this.calTotal();
    this.priceTotal = this.priceTotal();
  }

  calTotal() {
    return Math.round((this.weight / 100) * this.calories);
  }

  priceTotal() {
    return this.quantity * this.price;
  }
}

module.exports = Ingredient;
