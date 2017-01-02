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

SRD_Cleric.prototype.getPerLevelEffects = function getPerLevelEffects() {
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
    this.getSkillProficienciesNote(2, [
        SKILLS.history,
        SKILLS.insight,
        SKILLS.medicine,
        SKILLS.persuasion,
        SKILLS.religion,
    ]),
  ];
}

this.SRD_Cleric = SRD_Cleric;
