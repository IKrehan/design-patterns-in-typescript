# Strategy Pattern 🗺

## General Research 📚

**What is it?**

Strategy Pattern consists in decoupling algorithms from an object, intending the use of multiple behaviors for the same method. This pattern allows the encapsulated algorithms to vary independently from clients that use them.

## Domain Research 📚

**Whats is it for?**

This pattern is used to solve a common problem caused by inheritance trees: The impossibility of sharing properties horizontally without repeating code.

![Tree](docs/strategy-tree.png)

Let's say a parent A has a method X and the son B use the inherited method, but C, D and E implements their own, if two of them implements the same method the code will be repeated, as said previously in inheritance trees there is no way of sharing properties horizontally.

Strategy Pattern exists to solve this kind of brick wall created by inheritance.

## Applied Research 📚

**How it works?**

The Strategy Pattern use dependencies injections to decouple the algorithms from the class, so instead of running a hard coded behavior, the method will use one injected in the class, usually through the constructor.

![Problem UML](docs/strategy-problem-uml.png)

Here we have a class Character with some methods, some of the classes that inherited it will have to implement methods to adapt their needs, like the method Weapon.

So, both, the warrior and the Knight, will use Swords and the Archer a Bow. We will use Strategy Pattern to re-utilize the weapon behaviors in future Characters and also simplify implementations of new behaviors.

![Pattern UML](docs/strategy-uml.png)

Here we can see how a dependency injection is made, now the method weapon on Character will use the behavior that was injected through an interface, interfaces gives the possibility to create and use as many behaviors as we want. For example, if we want to add a Mage character we just need to implement a weapon behavior "Magic Behavior" and its ready to go, or if another bow user is going to be implemented, we can just re-utilize the existent behavior!

**How to do it?**

Before implementing the pattern itself let's create the situation to be resolved with it:

```typescript
abstract class Character {
  fight(): string {
    return 'The character attacks with fists!';
  }

  run(): string {
    return "The character runs";
  }

  jump(): string {
    return "The character jumps!";
  }
}

class Warrior extends Character {
  fight(): string {
    return 'The character attacks with a sword!';
  }
}

class Knight extends Character {
  fight(): string {
    return 'The character attacks with a sword!';
  }
}

class Archer extends Character {
  fight(): string {
    return 'The character attacks with a bow!';
  }
}

const warrior = new Warrior();
const knight = new Knight();
const archer = new Archer();

console.log(knight.fight());
// => The character attacks with a sword!

console.log(warrior.fight());
// => The character attacks with a sword!

console.log(archer.fight());
// => The character attacks with a bow!
```

Now that the problem with the implementation without pattern was exposed, we can apply the Strategy Pattern in the same situations to see the benefits of it.

```typescript
interface IWeaponBehavior {
  useWeapon(): string;
}
```

With the interface created we can make the dependency injection on the Character.

```typescript
class Character {
  weaponBehavior: IWeaponBehavior;

  constructor(weaponBehavior: IWeaponBehavior) {
    this.weaponBehavior = weaponBehavior;
  }

  fight(): string {
    return `The character attacks ${this.weaponBehavior.useWeapon()}!`;
  }

  run(): string {
    return "The character runs";
  }

  jump(): string {
    return "The character jumps!";
  }
}
```

The Character class is ready to be injected with a weapon behavior, let's create for swords and bows.

```typescript
class SwordBehavior implements IWeaponBehavior {
  useWeapon(): string {
    return `with a sword`;
  }
}

class BowBehavior implements IWeaponBehavior {
  useWeapon(): string {
    return `with a bow`;
  }
}
```

That's how the injection of these behaviors are done:

```typescript
const warrior = new Character(new SwordBehavior());
const knight = new Character(new SwordBehavior());
const archer = new Character(new BowBehavior());

console.log(warrior.fight());
// => The character attacks with a sword!

console.log(knight.fight());
// => The character attacks with a sword!

console.log(archer.fight());
// => The character attacks with a bow!
```

To reinforce the advantages of Strategy Pattern a Scout, a Mage and a Witch will be created. The Scout will use bows, so  we  can re-utilize the behavior from the archer. Both, Mage and Witch, will use magic, needing a new weapon behavior.

First step is to implement the MagicBehavior:

```typescript
class MagicBehavior implements IWeaponBehavior {
  useWeapon(): string {
    return `with magic`;
  }
}
```

Following, we are creating the characters:

```typescript
const scout = new Character(new BowBehavior());
const mage = new Character(new MagicBehavior());
const witch = new Character(new MagicBehavior());

console.log(scout.fight());
// => The character attacks with a bow!

console.log(mage.fight());
// => The character attacks with magic!

console.log(witch.fight());
// => The character attacks with magic!
```
