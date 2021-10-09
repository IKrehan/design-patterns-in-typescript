import {IWeaponBehavior} from './interfaces'
class CharacterPattern {
  constructor(private weaponBehavior: IWeaponBehavior) {
    this.weaponBehavior = weaponBehavior;
  }

  fight(): string {
    return `The character attacks ${this.weaponBehavior.useWeapon()}!`;
  }

  run(): string {
    return "The character runs!";
  }

  jump(): string {
    return "The character jumps!";
  }
}

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

class MagicBehavior implements IWeaponBehavior {
  useWeapon(): string {
    return `with magic`;
  }
}

export default () => {
  const warriorPattern = new CharacterPattern(new SwordBehavior());
  console.log("[WARRIOR] ", warriorPattern.fight());

  const knightPattern = new CharacterPattern(new SwordBehavior());
  console.log("[KNIGHT] ", knightPattern.fight());

  const archerPattern = new CharacterPattern(new BowBehavior());
  console.log("[ARCHER] ", archerPattern.fight());

  const scoutPattern = new CharacterPattern(new BowBehavior());
  console.log("[SCOUT] ", scoutPattern.fight());

  const magePattern = new CharacterPattern(new MagicBehavior());
  console.log("[MAGE] ", magePattern.fight());

  const witchPattern = new CharacterPattern(new MagicBehavior());
  console.log("[WITCH] ", witchPattern.fight());
}
