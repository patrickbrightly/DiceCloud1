Classes = new Mongo.Collection("classes");

Schemas.Class = new SimpleSchema({
	charId:      {type: String, regEx: SimpleSchema.RegEx.Id, index: 1},
	name:		 {type: String, trim: false},
	level:		 {type: Number},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		},
	},
	color:   {
		type: String,
		allowedValues: _.pluck(colorOptions, "key"),
		defaultValue: "q",
	},
});

Classes.attachSchema(Schemas.Class);

Classes.attachBehaviour("softRemovable");
makeParent(Classes, "name"); //parents of effects and attacks

Classes.allow(CHARACTER_SUBSCHEMA_ALLOW);
Classes.deny(CHARACTER_SUBSCHEMA_DENY);

Classes.after.insert(function(userId, cls) {
	if (!Meteor.isServer) {
		return;
	}

	// NOTE: The rules here don't clobber similarly named custom classes
	// specifically because they're run on insert and not on update, while
	// custom classes are always insert as "New Class" before being renamed.
	// Keep that in mind if ever you consider changing this behavior!

	const classId = cls._id;
	const charId = cls.charId;
	const className = cls.name;

	var srdClass = null;

	// TODO: Add the rest of the SRD classes!
	switch (className) {
		case "Cleric":
			srdClass = new SRD_Cleric(charId, classId);
			break;
		default:
			break;
	}

	if (srdClass) {
		srdClass.insertAllEffectsAndProficiencies();
	}
});
