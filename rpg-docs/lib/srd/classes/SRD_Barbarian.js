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
    rages: "[2,2,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,999]",
  };
}

SRD_Barbarian.prototype.getProficiencies = function getProficiencies() {
  return {
    save: ["strengthSave", "constitutionSave"],
    armor: ["Light Armor", "Medium Armor", "Shields"],
    weapon: ["Simple Weapons", "Martial Weapons"],
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
