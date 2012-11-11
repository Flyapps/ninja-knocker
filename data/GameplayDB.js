/**
 * ...
 * @author Danny Marcowitz
 */

var allPowerups = {"powerups": [
        		{"id": "shield",    "unlockedInVillage":1, "affectedEnemies": 1},
				{"id": "focus",     "unlockedInVillage":2, "duration":5 },
				{"id": "megaknock", "unlockedInVillage":3, "affectedEnemies":5},
				
    ]
};

var allMultipliers =
 	{"values": [1, 2,  3,  5,  7, 10,  25],
	 "thresh": [0, 5, 10, 20, 30, 50, 100]};

function GameplayDB() {
}

GameplayDB.prototype.getAllPowerups = function() {
	return allPowerups.powerups;
}

GameplayDB.prototype.getAllMultipliers = function() {
	return allMultipliers;
}