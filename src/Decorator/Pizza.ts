interface Pizza {
  getDesc(): string;
  getCost(): number
}


class BasePizza implements Pizza {
  getDesc() {
    return 'Pizza'
  }

  getCost() {
    return 15;
  }
}

interface PizzaDecorator extends Pizza {
  basePizza: Pizza;
}

class PepperoniDecorator implements PizzaDecorator {
  basePizza: Pizza;

  constructor(basePizza: Pizza) {
    this.basePizza = basePizza;
  }

  getDesc() {
    return this.basePizza.getDesc() + ' Pepperoni';
  }

  getCost() {
    return this.basePizza.getCost() + 10;
  }
}

class MussarelaDecorator implements PizzaDecorator {
  basePizza: Pizza;

  constructor(basePizza: Pizza) {
    this.basePizza = basePizza;
  }

  getDesc() {
    return this.basePizza.getDesc() + ' Mussarela';
  }

  getCost() {
    return this.basePizza.getCost() + 5;
  }
}


const pizza = new BasePizza();
console.log(pizza.getDesc(), pizza.getCost());

const pizzaMussarela = new MussarelaDecorator(pizza);
console.log(pizzaMussarela.getDesc(), pizzaMussarela.getCost());

const pizzaMussarelaPepperoni = new PepperoniDecorator(pizzaMussarela);
console.log(pizzaMussarelaPepperoni.getDesc(), pizzaMussarelaPepperoni.getCost());


const pizzaDoublePepperoni = new PepperoniDecorator(new PepperoniDecorator(pizza));
console.log(pizzaDoublePepperoni.getDesc(), pizzaDoublePepperoni.getCost());

