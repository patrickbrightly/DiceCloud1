Template.addClassDialog.events({
	"tap #addButton": function(event, instance) {
		var charId = instance.data.charId;
		var selectedClass = instance.find("#addClassMenu").selectedItem.label;
		if (!selectedClass) {
			throw "No selected class";
		}
		Classes.insert({
			charId: charId,
			name: selectedClass,
			level: 1,
		}, function(error, id) {
				if (error) {
					throw error;
				}
		});
	}
});

Template.addClassDialog.helpers({
  classList: SRD_Class.getSRDClassList(),
});
