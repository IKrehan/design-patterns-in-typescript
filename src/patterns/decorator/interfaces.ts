export interface Pizza {
  getDesc(): string;
  getCost(): number
}

export interface PizzaDecorator extends Pizza {
  basePizza: Pizza;
}
