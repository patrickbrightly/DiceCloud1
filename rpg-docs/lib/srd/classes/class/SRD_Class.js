function SRD_Class(charId, classId) {
  this.charId = charId;
  this.classId = classId;
}

SRD_Class.prototype = {
  // Required abstract functions
  //   function getClassName() { return null; }
  //   function getHitDieInt() { return 0; }
  //   function getProficiencies() { return {}; }

  //----------------------------------
  // Begin optional abstract functions
  //----------------------------------
  getPerLevelEffects: function getPerLevelEffects() {
    return {};
  },
  insertCustomEffects: function insertCustomEffects() {
    return {};
  },
  //----------------------------------
  // End optional abstract functions
  //----------------------------------

  insertClassFeatures: function insertClassFeatures() {
    this.insertEffectHitPoints();
    this.insertEffectHitDice();
    this.insertPerLevelEffects();
    this.insertProficiencies();
    this.insertNotes();
  },

  // "d6": 4,
  // "d8": 5,
  // "d10": 6,
  // "d12": 7,
  insertEffectHitPoints: function insertEffectHitPoints() {
    const hitDie = this.getHitDieInt();
    const mult = (hitDie / 2) + 1;
    const add = (hitDie / 2) - 1;
    const levelString = this.getClassLevelString();
    const calculation =
      add + " + (" + mult + " * " + levelString + ")";

    return this.insertClassEffect({
      stat: "hitPoints",
      operation: "base",
      calculation: calculation,
    });
  },

  insertEffectHitDice: function insertEffectHitDice() {
    const hitDie = this.getHitDieInt();
    const statName = "d" + hitDie + "HitDice";
    // The hit die calculation is simply equal to the class level
    const calculation = this.getClassLevelString();

    return this.insertClassEffect({
      stat: statName,
      operation: "base",
      calculation: calculation,
    });
  },

  insertPerLevelEffects: function insertPerLevelEffects() {
    const spellSlotMap = this.getPerLevelEffects();
    _.each(spellSlotMap, function(value, key) {
      this.insertPerLevelEffect(key, value);
    }, this);
  },

  insertPerLevelEffect: function insertPerLevelEffect(statName, spellSlotArrayStr) {
    const levelString = this.getClassLevelString();
    const calculation =
      "subset(" + spellSlotArrayStr + ", index(" + levelString + "-1))";
    return this.insertClassEffect({
      stat: statName,
      operation: "base",
      calculation: calculation,
    });
  },

  insertClassEffect: function insertClassEffect(effect) {
    effect.charId = effect.charId || this.charId;
    effect.parent = effect.parent || this.getClassParent();
    return Effects.insert(effect);
  },

  insertProficiencies: function insertProficiencies() {
    const proficienciesByType = this.getProficiencies();
    _.each(proficienciesByType, function(value, key) {
      const proficiencyType = key;
      const proficiencies = value;
      _.each(proficiencies, function(proficiency) {
        this.insertClassProficiency({
          type: proficiencyType,
          name: proficiency,
        });
      }, this);
    }, this);
  },

  insertClassProficiency: function insertClassProficiency(proficiency) {
    proficiency.charId = proficiency.charId || this.charId;
    proficiency.parent = proficiency.parent || this.getClassParent();
    Proficiencies.insert(proficiency);
  },

  insertNotes: function insertNotes() {
    const notes = this.getNotes();
    _.each(notes, function(value) {
      this.insertNote(value);
    }, this);
  },

  insertNote: function insertNote(note) {
    note.charId = note.charId || this.charId;
    note.parent = note.parent || this.getClassParent();
    Notes.insert(note);
  },

  getClassLevelString: function getClassLevelString() {
    return this.getClassName() + "Level";
  },

  getClassParent: function getClassParent() {
    return { id: this.classId, collection: "Classes" };
  },

  // TODO: Make UI for selecting skill proficiencies and delete this function
  getSkillProficienciesNote: function getSkillProficienciesNote(numProficiencies, skillList) {
    var className = this.getClassName();
    var skillNames = _.map(skillList, function(skill) { return skill.name; });
    var skillListStr = "* " + skillNames.join("\n* ") + "\n\n";
    return {
      "name" : "Action Item: Choose " + numProficiencies + " Skill Proficiencies",
      "color" : "a", // Red
      "description" : (
        "As a " + className + ", you gain " + numProficiencies + " skill proficiencies.\n\n" +
        "Choose **" + numProficiencies + "** from:\n\n" +
        skillListStr +
        "To set these proficiencies on your character:\n" +
        "1. Click the \"" + className + "\" class on your character, then click the \"Edit\" button in the upper right of the dialog.\n" +
        "2. Scroll to the bottom of the dialog and click \"Add Proficiency.\" A new row will be created.\n" +
        "3. Choose \"Skill\" in the first dropdown of the new row, and in the second dropdown, make your choice from the skills listed above.\n" +
        "4. Repeat the previous two steps for each additional skill proficiency.\n\n" +
        "*Delete this note once you complete this action item.*"
      ),
    };
  }
}

SRD_Class.getSRDClassList = function() {
  return [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];
}

this.SRD_Class = SRD_Class;
