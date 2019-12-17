class Ingredient {
  constructor(input = {}) {
    this.name = input.name;
    this.weight = input.weight;
    this.rating = input.rating;
    this.price = input.price;
    this.currency = input.currency;
    this.link = input.link;
    this.calories = input.kcal;
    this.weightAbsolute = input.weightAbsolute;
    this.measureType = input.measureType;
    this.pricePerKilo = input.pricePerKilo;
    this.priceTotal = this.priceTotal();
    this.caloriesTotal = this.calTotal();
    this.quantity = 1;
  }

  calTotal() {
    return Math.round((this.weight / 100) * this.calories);
  }

  priceTotal() {
    return this.quantity * this.price;
  }
}

module.exports = Ingredient;
