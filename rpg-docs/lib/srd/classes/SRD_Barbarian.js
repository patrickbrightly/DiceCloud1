function SRD_Barbarian(charId, classId) {
  this.charId = charId;
  this.classId = classId;
}

SRD_Barbarian.prototype = Object.create(SRD_Class.prototype);
SRD_Barbarian.prototype.constructor = SRD_Barbarian;

SRD_Barbarian.prototype.getClassName = function getClassName() {
  return "Barbarian";
}

SRD_Barbarian.prototype.getHitDieInt = function getHitDieInt() {
  return 12;
}

SRD_Barbarian.prototype.getPerLevelEffects = function getPerLevelEffects() {
  return {
    rages: "[2,2,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,0]",
  };
}

SRD_Barbarian.prototype.getProficiencies = function getProficiencies() {
  return {
    save: ["strengthSave", "constitutionSave"],
    armor: ["Light Armor", "Medium Armor", "Shields"],
    weapon: ["Simple Weapons", "Martial Weapons"],
  };
}

SRD_Barbarian.prototype.getFeatures = function getFeatures() {
  return [
    this.getRageFeature(),
    this.getUnarmoredDefenseFeature(),
  ];
}

SRD_Barbarian.prototype.getRageFeature = function getRageFeature() {
  return {
    coreFeature: {
      name : "Rage",
      enabled : false,
      alwaysEnabled : false,
      description :
        "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\n" +
        "While raging, you gain the following benefits if you aren't wearing heavy armor:\n\n" +
        "* You have advantage on Strength checks and Strength saving throws.\n" +
        "* When you make a melee weapon attack using Strength, you gain a " +
        "**{BarbarianLevel >= 16 ? \"+4\" : BarbarianLevel >= 9 ? \"+3\" : \"+2\"}**" +
        " bonus to the damage roll.\n" +
        "* You have resistance to bludgeoning, piercing, and slashing damage.\n\n" +
        "If you are able to cast spells, you can't cast them or concentrate on them while raging.\n\n" +
        "Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends" +
        " and you haven't attacked a hostile creature since your last turn or taken damage since then." +
        " You can also end your rage on your turn as a bonus action.\n\n" +
        "{BarbarianLevel < 20 ? " +
        "\"Once you have raged **rages** times, you must finish a long rest before you can rage again.\"" +
        " : \"You can rage an unlimited number of times without resting.\"}",
    },
    effects: [
      { stat: "rageDamage",
        operation: "base",
        calculation: "BarbarianLevel >= 16 ? 4 : BarbarianLevel >= 9 ? 3 : 2",
      },
      { stat: "bludgeoningMultiplier",
        operation: "mul",
        value: 0.5,
      },
      { stat: "piercingMultiplier",
        operation: "mul",
        value: 0.5,
      },
      { stat: "slashingMultiplier",
        operation: "mul",
        value: 0.5,
      },
      { stat: "strengthSave",
        operation: "advantage",
      },
    ],
  };
}

SRD_Barbarian.prototype.getUnarmoredDefenseFeature = function getUnarmoredDefenseFeature() {
  return {
    coreFeature: {
      name: "Unarmored Defense",
      enabled: true,
      alwaysEnabled: false,
      description:
        "While you are not wearing any armor, your Armor Class equals **{10+dexterityMod+constitutionMod}**." +
        " You can use a shield and still gain this benefit."
    },
    effects: [
      { stat: "armor",
        operation: "base",
        calculation: "10 + constitutionMod",
      },
      { stat: "dexterityArmor",
        operation: "base",
        calculation: "dexterityMod",
      },
    ],
  };
}

SRD_Barbarian.prototype.getNotes = function getNotes() {
  return [
    this.getSkillProficienciesNote(2, [
      SKILLS.animalHandling,
      SKILLS.athletics,
      SKILLS.intimidation,
      SKILLS.nature,
      SKILLS.perception,
      SKILLS.survival,
    ]),
  ];
}

this.SRD_Barbarian = SRD_Barbarian;
