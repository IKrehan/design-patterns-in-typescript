import {Pizza, PizzaDecorator} from './interfaces'

class BasePizza implements Pizza {
  getDesc() {
    return 'Pizza'
  }

  getCost() {
    return 15;
  }
}

class PepperoniDecorator implements PizzaDecorator {
  constructor(public basePizza: Pizza) {
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
  constructor(public basePizza: Pizza) {
    this.basePizza = basePizza;
  }

  getDesc() {
    return this.basePizza.getDesc() + ' Mussarela';
  }

  getCost() {
    return this.basePizza.getCost() + 5;
  }
}


export default () => {
  const pizza = new BasePizza();
  console.log(pizza.getDesc(), pizza.getCost());

  const pizzaMussarela = new MussarelaDecorator(pizza);
  console.log(pizzaMussarela.getDesc(), pizzaMussarela.getCost());

  const pizzaMussarelaPepperoni = new PepperoniDecorator(pizzaMussarela);
  console.log(pizzaMussarelaPepperoni.getDesc(), pizzaMussarelaPepperoni.getCost());


  const pizzaDoublePepperoni = new PepperoniDecorator(new PepperoniDecorator(pizza));
  console.log(pizzaDoublePepperoni.getDesc(), pizzaDoublePepperoni.getCost());
}
