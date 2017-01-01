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
  getSpellSlotMap: function getSpellSlotMap() {
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
    this.insertEffectSpellSlots();
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

  insertEffectSpellSlots: function insertEffectSpellSlots() {
    const spellSlotMap = this.getSpellSlotMap();
    _.each(spellSlotMap, function(value, key) {
      this.insertEffectSpellSlot(key, value);
    }, this);
  },

  insertEffectSpellSlot: function insertEffectSpellSlot(statName, spellSlotArrayStr) {
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
