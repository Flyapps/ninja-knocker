/**
 * ...
 * @author Danny Marcowitz
 */

 var allEnemies = {"enemies": [
        		{"id": "ninja1", "killedByWeapon": "A", "bitmapLoc": "images/enemies/1.png", 
					   "frameWidth": "154", "frameHeight": "169", "icon": "images/enemies/i1.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 2500},
				{"id": "ninja2", "killedByWeapon": "B", "bitmapLoc": "images/enemies/2.png", 
					   "frameWidth": "150", "frameHeight": "161", "icon": "images/enemies/i2.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 7700},
				{"id": "ninja3", "killedByWeapon": "A", "bitmapLoc": "images/enemies/3.png", 
					   "frameWidth": "151", "frameHeight": "160", "icon": "images/enemies/i3.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 130},
				{"id": "ninja4", "killedByWeapon": "B", "bitmapLoc": "images/enemies/4.png", 
					   "frameWidth": "153", "frameHeight": "160", "icon": "images/enemies/i4.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 0},
				{"id": "ninja5", "killedByWeapon": "B", "bitmapLoc": "images/enemies/5.png", 
					   "frameWidth": "159", "frameHeight": "169", "icon": "images/enemies/i5.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 2500},
				{"id": "ninja6", "killedByWeapon": "A", "bitmapLoc": "images/enemies/6.png", 
					   "frameWidth": "193", "frameHeight": "176", "icon": "images/enemies/i6.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 2500},
				{"id": "ninja7", "killedByWeapon": "A", "bitmapLoc": "images/enemies/7.png", 
					   "frameWidth": "149", "frameHeight": "169", "icon": "images/enemies/i7.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 350},
				{"id": "ninja8", "killedByWeapon": "A", "bitmapLoc": "images/enemies/8.png", 
					   "frameWidth": "147", "frameHeight": "169", "icon": "images/enemies/i8.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 350},
				{"id": "ninja9", "killedByWeapon": "B", "bitmapLoc": "images/enemies/9.png", 
					   "frameWidth": "144", "frameHeight": "160", "icon": "images/enemies/i9.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 350},
				{"id": "ninja10", "killedByWeapon": "A", "bitmapLoc": "images/enemies/10.png", 
					   "frameWidth": "140", "frameHeight": "160", "icon": "images/enemies/i10.png", "idleFrame": 1, "deathFrame": 0,"attackFrame":2, "knocksToUnlock": 7300},
				{"id": "ninja11", "killedByWeapon": "B", "bitmapLoc": "images/enemies/11.png", 
					   "frameWidth": "163", "frameHeight": "159", "icon": "images/enemies/i11.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 2700},
				{"id": "ninja12", "killedByWeapon": "B", "bitmapLoc": "images/enemies/12.png", 
					   "frameWidth": "156", "frameHeight": "160", "icon": "images/enemies/i12.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 7000},
				{"id": "ninja13", "killedByWeapon": "A", "bitmapLoc": "images/enemies/13.png", 
					   "frameWidth": "149", "frameHeight": "162", "icon": "images/enemies/i13.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 0},
				{"id": "ninja14", "killedByWeapon": "A", "bitmapLoc": "images/enemies/14.png", 
					   "frameWidth": "147", "frameHeight": "160", "icon": "images/enemies/i14.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 3000},
				{"id": "ninja15", "killedByWeapon": "B", "bitmapLoc": "images/enemies/15.png", 
					   "frameWidth": "135", "frameHeight": "160", "icon": "images/enemies/i15.png", "idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 500},
				{"id": "ninja16", "killedByWeapon": "B", "bitmapLoc": "images/enemies/16.png", 
					   "frameWidth": "164", "frameHeight": "159", "icon": "images/enemies/i16.png" ,"idleFrame": 1, "deathFrame": 0, "attackFrame":2, "knocksToUnlock": 3300},
    ]
};

function EnemyDB() {
}

EnemyDB.prototype.getAllEnemies = function() {
	return allEnemies.enemies;
}