/**
 * ...
 * @author Danny Marcowitz
 */

 var allVillages = {"villages": [
        		{"id": "1", "heroSprite": "images/hero/hero.png", "knocksToUnlock":0, "duration":25, "enemies":["ninja3", "ninja4", "ninja13"]},
				{"id": "2", "heroSprite": "images/hero/hero.png", "knocksToUnlock":350, "duration":35, "enemies":["ninja9", "ninja7", "ninja8", "ninja15"]},
				{"id": "3", "heroSprite": "images/hero/hero.png", "knocksToUnlock":2500, "duration":45, "enemies":["ninja1", "ninja5", "ninja6", "ninja11", "ninja14", "ninja16"]},
				{"id": "4", "heroSprite": "images/hero/hero.png", "knocksToUnlock":7000,"duration":45, "enemies":["ninja14", "ninja16", "ninja6", "ninja12", "ninja10", "ninja2"]},
				
    ]
};

function VillageDB() {
}

VillageDB.prototype.getAllVillages = function() {
	return allVillages.villages;
}