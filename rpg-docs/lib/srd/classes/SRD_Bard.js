/**
 * Implementation of the Bard class, according to SRD v5.1.
 * TODO: Add spell list
 * TODO: Add starting equipment
 * TODO: Add features above Level 1
 */

function SRD_Bard(charId, classId) {
  this.charId = charId;
  this.classId = classId;
}

SRD_Bard.prototype = Object.create(SRD_Class.prototype);
SRD_Bard.prototype.constructor = SRD_Bard;

SRD_Bard.prototype.getClassName = function getClassName() {
  return "Bard";
}

SRD_Bard.prototype.getHitDieInt = function getHitDieInt() {
  return 8;
}

SRD_Bard.prototype.getPerLevelEffects = function getPerLevelEffects() {
  return {
    level1SpellSlots: "[2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]",
    level2SpellSlots: "[0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]",
    level3SpellSlots: "[0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]",
    level4SpellSlots: "[0,0,0,0,0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3]",
    level5SpellSlots: "[0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,3,3,3]",
    level6SpellSlots: "[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2]",
    level7SpellSlots: "[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2]",
    level8SpellSlots: "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]",
    level9SpellSlots: "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1]",
  };
}

SRD_Bard.prototype.getProficiencies = function getProficiencies() {
  return {
    save: ["dexteritySave", "charismaSave"],
    armor: ["Light Armor"],
    weapon: ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
  };
}

SRD_Bard.prototype.getFeatures = function getFeatures() {
  return [
    this.getBardicInspirationFeature(),
  ];
}

SRD_Bard.prototype.getBardicInspirationFeature = function getBardicInspirationFeature() {
  var bardicInspirationDieStr = this.getPerLevelCalculationString(
    "[6,6,6,6,8,8,8,8,8,10,10,10,10,10,12,12,12,12,12,12]"
  );

  return {
    coreFeature: {
      name: "Bardic Inspiration",
      uses: "max(charismaMod, 1)",
      description:
        "**Bardic Inspiration Die: d{" + bardicInspirationDieStr + "}**\n\n" +
        "You can inspire others through stirring words or music." +
        " To do so, you use a bonus action on your turn to choose one creature" +
        " other than yourself within 60 feet of you who can hear you." +
        " That creature gains one Bardic Inspiration die of the type listed above.\n\n" +
        "Once within the next 10 minutes, the creature can roll the die" +
        " and add the number rolled to one ability check, attack roll, or saving throw it makes." +
        " The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die," +
        " but must decide before the GM says whether the roll succeeds or fails." +
        " Once the Bardic Inspiration die is rolled, it is lost." +
        " A creature can have only one Bardic Inspiration die at a time.\n\n" +
        "You can use this feature **{max(charismaMod, 1)}** time(s)" +
        " and regain any expended uses when you finish a long rest.",
    },
    effects: [],
  };

}

SRD_Bard.prototype.getSpellListData = function getSpellListData() {
  var cantripsKnownStr = this.getPerLevelCalculationString(
    "[2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4]"
  );
  var spellsKnownStr = this.getPerLevelCalculationString(
    "[4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]"
  );

  return {
    spellcastingAbilityMod: "charismaMod",
    description:
      "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music." +
      " Your spells are part of your vast repertoire, magic that you can tune to different situations.\n\n" +
      "### **Cantrips**\n" +
      "At level **{BardLevel}**, you know **{" + cantripsKnownStr + "}**" +
      " cantrips of your choice from the bard spell list.\n\n" +
      "### **Spell Slots**\n" +
      "The Bard table shows how many spell slots you have to cast your spells of 1st level and higher." +
      " To cast one of these spells, you must expend a slot of the spell's level or higher." +
      " You regain all expended spell slots when you finish a long rest.\n\n" +
      "For example, if you know the 1st-level spell *cure wounds*" +
      " and have a 1st-level and a 2nd-level spell slot available," +
      " you can cast *cure wounds* using either slot.\n\n" +
      "### **Spells Known of 1st Level and Higher**\n" +
      "At level **{BardLevel}**, you know **{" + spellsKnownStr + "}**" +
      " spells of your choice from the bard spell list.\n\n" +
      " Each of these spells must be of a level for which you have spell slots." +
      " For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.\n\n" +
      "Additionally, when you gain a level in this class," +
      " you can choose one of the bard spells you know and replace it with another spell from the bard spell list," +
      " which also must be of a level for which you have spell slots.\n\n" +
      "### **Spellcasting Ability**\n" +
      "Charisma is your spellcasting ability for your bard spells." +
      " Your magic comes from the heart and soul you pour into the performance of your music or oration." +
      " You use your Charisma whenever a spell refers to your spellcasting ability." +
      " In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast" +
      " and when making an attack roll with one.\n\n" +
      "### **Ritual Casting**\n" +
      "You can cast any bard spell you know as a ritual if that spell has the ritual tag.\n\n" +
      "### **Spellcasting Focus**\n" +
      "You can use a musical instrument as a spellcasting focus for your bard spells.",
  };
}

SRD_Bard.prototype.getNotes = function getNotes() {
  return [
    this.getSkillProficienciesNote(3, [
      SKILLS.acrobatics,
      SKILLS.animalHandling,
      SKILLS.arcana,
      SKILLS.athletics,
      SKILLS.deception,
      SKILLS.history,
      SKILLS.insight,
      SKILLS.intimidation,
      SKILLS.investigation,
      SKILLS.medicine,
      SKILLS.nature,
      SKILLS.perception,
      SKILLS.performance,
      SKILLS.persuasion,
      SKILLS.religion,
      SKILLS.sleightOfHand,
      SKILLS.stealth,
      SKILLS.survival,
    ]),
    {
      "name" : "Action Item: Choose 3 Tool Proficiencies",
      "color" : "a", // Red
      "description" : (
        "As a Bard, you gain 3 proficiencies in musical instruments of your choice.\n\n" +
        "To set these proficiencies on your character:\n" +
        "1. Click the \"Bard\" class on your character, then click the \"Edit\" button in the upper right of the dialog.\n" +
        "2. Scroll to the bottom of the dialog and click \"Add Proficiency.\" A new row will be created.\n" +
        "3. Choose \"Tool\" in the first dropdown of the new row, and in the second dropdown, enter a musical instrument of your choice.\n" +
        "4. Repeat the previous two steps for each additional tool proficiency.\n\n" +
        "*Delete this note once you complete this action item.*"
      ),
    }
  ];
}

this.SRD_Bard = SRD_Bard;
