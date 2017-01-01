function SRD_Cleric(charId, classId) {
  this.charId = charId;
  this.classId = classId;
}

SRD_Cleric.prototype = Object.create(SRD_Class.prototype);
SRD_Cleric.prototype.constructor = SRD_Cleric;

SRD_Cleric.prototype.getClassName = function getClassName() {
  return "Cleric";
}

SRD_Cleric.prototype.getHitDieInt = function getHitDieInt() {
  return 8;
}

SRD_Cleric.prototype.getSpellSlotMap = function getSpellSlotMap() {
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

SRD_Cleric.prototype.getProficiencies = function getProficiencies() {
  return {
    save: ["wisdomSave", "charismaSave"],
    armor: ["Light Armor", "Medium Armor", "Shields"],
    weapon: ["Simple Weapons"],
  };
}

SRD_Cleric.prototype.getNotes = function getNotes() {
  return [
    { // TODO: Make UI for selecting skill proficiencies
      "name" : "Cleric Action Item: Choose Two Skill Proficiencies",
      "color" : "a", // Red
      "description" : (
        "Choose **two** from:\n\n" +
        "* History\n* Insight\n* Medicine\n* Persuasion\n* Religion\n\n" +
        "To set these proficiencies on your character:\n" +
        "1. Click the \"Cleric\" class on your character, then click the \"Edit\" button in the upper right of the dialog.\n" +
        "2. Scroll to the bottom of the dialog and click \"Add Proficiency.\" A new row will be created.\n" +
        "3. Choose \"Skill\" in the first dropdown of the new row, and in the second dropdown, make your choice from the skills listed above.\n" +
        "4. Repeat the previous two steps to select your second proficiency.\n\n" +
        "*Delete this note once you complete this action item.*"
      )
    }
  ]
}

this.SRD_Cleric = SRD_Cleric;
