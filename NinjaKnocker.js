var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var co = co || {}
if(!co.doubleduck) co.doubleduck = {}
co.doubleduck.Persistence = $hxClasses["co.doubleduck.Persistence"] = function() {
};
co.doubleduck.Persistence.__name__ = ["co","doubleduck","Persistence"];
co.doubleduck.Persistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
co.doubleduck.Persistence.getValue = function(key) {
	if(!co.doubleduck.Persistence.available) return "0";
	var val = localStorage[co.doubleduck.Persistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.Persistence.setValue = function(key,value) {
	if(!co.doubleduck.Persistence.available) return;
	localStorage[co.doubleduck.Persistence.GAME_PREFIX + key] = value;
}
co.doubleduck.Persistence.clearAll = function() {
	localStorage.clear();
}
co.doubleduck.Persistence.getTotalKnocks = function() {
	return Std.parseInt(co.doubleduck.Persistence.getValue("totalKnocks"));
}
co.doubleduck.Persistence.setTotalKnocks = function(totalKnocks) {
	co.doubleduck.Persistence.setValue("totalKnocks","" + totalKnocks);
}
co.doubleduck.Persistence.getVillageHighscore = function(villageId) {
	return Std.parseInt(co.doubleduck.Persistence.getValue("vill" + villageId + "_highscore"));
}
co.doubleduck.Persistence.setVillageHighscore = function(villageId,highscore) {
	co.doubleduck.Persistence.setValue("vill" + villageId + "_highscore","" + highscore);
}
co.doubleduck.Persistence.initGameData = function() {
	if(!co.doubleduck.Persistence.available) return;
	co.doubleduck.Persistence.initVar("totalKnocks");
	var villageDB = new VillageDB();
	var allVillages = villageDB.getAllVillages();
	var _g1 = 0, _g = allVillages.length;
	while(_g1 < _g) {
		var currLevel = _g1++;
		var villageId = allVillages[currLevel].id;
		co.doubleduck.Persistence.initVar("vill" + villageId + "_highscore");
	}
}
co.doubleduck.Persistence.printGameData = function() {
	if(!co.doubleduck.Persistence.available) return;
	console.log("totalKnocks = " + co.doubleduck.Persistence.getValue("totalKnocks"));
	var villageDB = new VillageDB();
	var allVillages = villageDB.getAllVillages();
	var _g1 = 0, _g = allVillages.length;
	while(_g1 < _g) {
		var currLevel = _g1++;
		var villageId = allVillages[currLevel].id;
		console.log("vill" + villageId + "_highscore = " + co.doubleduck.Persistence.getValue("vill" + villageId + "_highscore"));
	}
}
co.doubleduck.Persistence.initVar = function(initedVar) {
	var value = co.doubleduck.Persistence.getValue(initedVar);
	if(value == null) try {
		co.doubleduck.Persistence.setValue(initedVar,"0");
	} catch( e ) {
		co.doubleduck.Persistence.available = false;
		console.log("<<< failed to load critical data from localStorage");
	}
}
co.doubleduck.Persistence.prototype = {
	__class__: co.doubleduck.Persistence
}
co.doubleduck.Assets = $hxClasses["co.doubleduck.Assets"] = function() {
};
co.doubleduck.Assets.__name__ = ["co","doubleduck","Assets"];
co.doubleduck.Assets.loader = function() {
	if(co.doubleduck.Assets._loader == null) {
		co.doubleduck.Assets._loader = new createjs.PreloadJS();
		co.doubleduck.Assets._loader.initialize(false);
		co.doubleduck.Assets._loader.onFileLoad = co.doubleduck.Assets.handleFileLoaded;
		co.doubleduck.Assets._loader.onFileError = co.doubleduck.Assets.handleLoadError;
		co.doubleduck.Assets._loader.setMaxConnections(10);
	}
	return co.doubleduck.Assets._loader;
}
co.doubleduck.Assets.loadAndCall = function(uri,callbackFunc) {
	co.doubleduck.Assets.loader().loadFile(uri);
	co.doubleduck.Assets._loadCallbacks[uri] = callbackFunc;
}
co.doubleduck.Assets.loadAll = function() {
	var manifest = new Array();
	var db = new EnemyDB();
	var enemies = db.getAllEnemies();
	var _g = 0;
	while(_g < enemies.length) {
		var enemy = enemies[_g];
		++_g;
		manifest[manifest.length] = enemy.bitmapLoc;
		manifest[manifest.length] = enemy.icon;
	}
	manifest[manifest.length] = "images/villages/village1/bgstatic.png";
	manifest[manifest.length] = "images/villages/village1/midracha.png";
	manifest[manifest.length] = "images/villages/village2/bgstatic.png";
	manifest[manifest.length] = "images/villages/village2/midracha.png";
	manifest[manifest.length] = "images/villages/village3/bgstatic.png";
	manifest[manifest.length] = "images/villages/village3/midracha.png";
	manifest[manifest.length] = "images/villages/village4/bgstatic.png";
	manifest[manifest.length] = "images/villages/village4/midracha.png";
	manifest[manifest.length] = "images/menu/background.png";
	manifest[manifest.length] = "images/menu/btn_arrow_r.png";
	manifest[manifest.length] = "images/menu/btn_play.png";
	manifest[manifest.length] = "images/menu/vill_locked.png";
	manifest[manifest.length] = "images/menu/vill_1.png";
	manifest[manifest.length] = "images/menu/vill_2.png";
	manifest[manifest.length] = "images/menu/vill_3.png";
	manifest[manifest.length] = "images/menu/vill_4.png";
	manifest[manifest.length] = "images/menu/Splash.jpg";
	manifest[manifest.length] = "images/orientation_error.png";
	manifest[manifest.length] = "images/menu/help_btn.png";
	manifest[manifest.length] = "images/menu/help_scrn.png";
	manifest[manifest.length] = "images/menu/close_btn.png";
	manifest[manifest.length] = "images/menu/highscore.png";
	manifest[manifest.length] = "images/menu/knocks.png";
	manifest[manifest.length] = "images/menu/tap2play.png";
	manifest[manifest.length] = "images/hud/powerup_fill.png";
	manifest[manifest.length] = "images/hud/powerup_stroke.png";
	manifest[manifest.length] = "images/hud/gamepause.png";
	manifest[manifest.length] = "images/hud/5-sec-left.png";
	manifest[manifest.length] = "images/hud/paused.png";
	manifest[manifest.length] = "images/hud/btn_menu.png";
	manifest[manifest.length] = "images/hud/btn_replay.png";
	manifest[manifest.length] = "images/hud/btn_resume.png";
	manifest[manifest.length] = "images/font/Assets-69.png";
	manifest[manifest.length] = "images/font/Assets-70.png";
	manifest[manifest.length] = "images/font/Assets-71.png";
	manifest[manifest.length] = "images/font/Assets-72.png";
	manifest[manifest.length] = "images/font/Assets-73.png";
	manifest[manifest.length] = "images/font/Assets-74.png";
	manifest[manifest.length] = "images/font/Assets-75.png";
	manifest[manifest.length] = "images/font/Assets-76.png";
	manifest[manifest.length] = "images/font/Assets-77.png";
	manifest[manifest.length] = "images/font/Assets-78.png";
	manifest[manifest.length] = "images/font/Assets-79.png";
	manifest[manifest.length] = "images/font/Assets-80.png";
	manifest[manifest.length] = "images/font/minus.png";
	manifest[manifest.length] = "images/session_end/gameover.png";
	manifest[manifest.length] = "images/session_end/gameover-63.png";
	manifest[manifest.length] = "images/session_end/gameover-64.png";
	manifest[manifest.length] = "images/session_end/gameover-65.png";
	manifest[manifest.length] = "images/session_end/highscore.png";
	manifest[manifest.length] = "images/hero/hero.png";
	manifest[manifest.length] = "images/hero/shield.png";
	manifest[manifest.length] = "images/powerups/Assets_Zen.png";
	manifest[manifest.length] = "images/powerups/Assets_Fury_BG.png";
	manifest[manifest.length] = "images/powerups/Assets_Fury_Blast.png";
	manifest[manifest.length] = "images/powerups/Label_shield.png";
	manifest[manifest.length] = "images/powerups/Label_focus.png";
	manifest[manifest.length] = "images/powerups/Label_megaknock.png";
	if(co.doubleduck.Assets._useLocalStorage) co.doubleduck.Assets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(co.doubleduck.Assets.onLoadAll != null) co.doubleduck.Assets.onLoadAll();
	}
	co.doubleduck.Assets.loader().onProgress = co.doubleduck.Assets.handleProgress;
	co.doubleduck.Assets.loader().onFileLoad = co.doubleduck.Assets.manifestFileLoad;
	co.doubleduck.Assets.loader().loadManifest(manifest);
	co.doubleduck.Assets.loader().load();
}
co.doubleduck.Assets.manifestFileLoad = function(event) {
	if(co.doubleduck.Assets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			co.doubleduck.Persistence.setValue(event.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
co.doubleduck.Assets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = co.doubleduck.Persistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			co.doubleduck.Assets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
co.doubleduck.Assets.handleProgress = function(event) {
	co.doubleduck.Assets.loaded = event.loaded;
	if(event.loaded == event.total) {
		co.doubleduck.Assets.loader().onProgress = null;
		co.doubleduck.Assets.onLoadAll();
	}
}
co.doubleduck.Assets.handleLoadError = function(event) {
}
co.doubleduck.Assets.handleFileLoaded = function(event) {
	if(event != null) {
		co.doubleduck.Assets._cacheData[event.src] = event.result;
		var callbackFunc = Reflect.field(co.doubleduck.Assets._loadCallbacks,event.src);
		if(callbackFunc != null) callbackFunc();
	}
}
co.doubleduck.Assets.getAsset = function(uri) {
	var cache = Reflect.field(co.doubleduck.Assets._cacheData,uri);
	if(cache == null) {
		if(co.doubleduck.Assets.loader().getResult(uri) != null) {
			cache = co.doubleduck.Assets.loader().getResult(uri).result;
			co.doubleduck.Assets._cacheData[uri] = cache;
		}
	}
	return cache;
}
co.doubleduck.Assets.getRawImage = function(uri) {
	var cache = co.doubleduck.Assets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		co.doubleduck.Assets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		console.log("Requsted image that wasn't preloaded, consider preloading - \"" + uri + "\"");
	}
	return cache;
}
co.doubleduck.Assets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(co.doubleduck.Assets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
co.doubleduck.Assets.prototype = {
	__class__: co.doubleduck.Assets
}
co.doubleduck.Button = $hxClasses["co.doubleduck.Button"] = function(bmp,affectedByPause) {
	if(affectedByPause == null) affectedByPause = true;
	createjs.Container.call(this);
	this._bitmap = bmp;
	this._bitmap.mouseEnabled = true;
	this.image = this._bitmap.image;
	this.addChild(this._bitmap);
	this.onPress = $bind(this,this.handlePress);
	this._pauseable = affectedByPause;
};
co.doubleduck.Button.__name__ = ["co","doubleduck","Button"];
co.doubleduck.Button.__super__ = createjs.Container;
co.doubleduck.Button.prototype = $extend(createjs.Container.prototype,{
	handleEndPress: function() {
		co.doubleduck.Utils.tintBitmap(this._bitmap,1,1,1,1);
		if(createjs.Ticker.getPaused()) co.doubleduck.Game.getStage().update();
	}
	,handlePress: function() {
		if(createjs.Ticker.getPaused() && this._pauseable) return;
		if(this.onClick != null) {
			co.doubleduck.Utils.tintBitmap(this._bitmap,0.55,0.55,0.55,1);
			var tween = createjs.Tween.get(this._bitmap);
			tween.ignoreGlobalPause = true;
			tween.wait(200).call($bind(this,this.handleEndPress));
			if(createjs.Ticker.getPaused()) co.doubleduck.Game.getStage().update();
		}
	}
	,_pauseable: null
	,_bitmap: null
	,image: null
	,__class__: co.doubleduck.Button
});
co.doubleduck.DataLoader = $hxClasses["co.doubleduck.DataLoader"] = function() {
};
co.doubleduck.DataLoader.__name__ = ["co","doubleduck","DataLoader"];
co.doubleduck.DataLoader.getPowerup = function(id) {
	var result = null;
	var gdb = new GameplayDB();
	var allPowerups = gdb.getAllPowerups();
	var _g1 = 0, _g = allPowerups.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(allPowerups[i].id == id) {
			result = allPowerups[i];
			break;
		}
	}
	return result;
}
co.doubleduck.DataLoader.getEnemy = function(id) {
	var result = null;
	var enemyDB = new EnemyDB();
	var allEnemies = enemyDB.getAllEnemies();
	var _g1 = 0, _g = allEnemies.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(allEnemies[i].id == id) {
			result = allEnemies[i];
			break;
		}
	}
	return result;
}
co.doubleduck.DataLoader.getVillage = function(id) {
	var result = null;
	var villageDB = new VillageDB();
	var allVillages = villageDB.getAllVillages();
	var _g1 = 0, _g = allVillages.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(allVillages[i].id == id) {
			result = allVillages[i];
			break;
		}
	}
	return result;
}
co.doubleduck.DataLoader.prototype = {
	__class__: co.doubleduck.DataLoader
}
co.doubleduck.Enemy = $hxClasses["co.doubleduck.Enemy"] = function(id,killedByWeapon,bitmapLoc,frameWidth,frameHeight,idleFrame,deathFrame,attackFrame) {
	this.onDeath = null;
	var initObject = { };
	initObject.images = [co.doubleduck.Assets.getRawImage(bitmapLoc)];
	initObject.frames = { width : frameWidth, height : frameHeight, regX : frameWidth / 2, regY : frameHeight};
	initObject.animations = { };
	initObject.animations.idle = { frames : idleFrame, frequency : 20};
	initObject.animations.death = { frames : deathFrame, frequency : 20};
	initObject.animations.attack = { frames : attackFrame, frequency : 50, next : false};
	var enemySpriteSheet = new createjs.SpriteSheet(initObject);
	createjs.BitmapAnimation.call(this,enemySpriteSheet);
	this.scaleX = this.scaleY = co.doubleduck.Utils.map(this.y,co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.SPAWN_LINE * co.doubleduck.Game.getScale(),co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.MAX_SCALE_LINE * co.doubleduck.Game.getScale(),0.25 * co.doubleduck.Game.getScale(),co.doubleduck.Game.getScale());
	this._killedByWeapon = killedByWeapon;
	this._goingToDie = false;
	this._deathSignaled = false;
	this.gotoAndPlay("idle");
	createjs.Ticker.addListener(this);
};
co.doubleduck.Enemy.__name__ = ["co","doubleduck","Enemy"];
co.doubleduck.Enemy.create = function(id) {
	var enemy = co.doubleduck.DataLoader.getEnemy(id);
	var result = null;
	if(enemy != null) result = new co.doubleduck.Enemy(enemy.id,enemy.killedByWeapon,enemy.bitmapLoc,enemy.frameWidth,enemy.frameHeight,enemy.idleFrame,enemy.deathFrame,enemy.attackFrame);
	return result;
}
co.doubleduck.Enemy.getSpeed = function() {
	return co.doubleduck.Enemy._speed;
}
co.doubleduck.Enemy.setSpeed = function(speed) {
	co.doubleduck.Enemy._speed = speed;
	if(co.doubleduck.Enemy._speed > co.doubleduck.Enemy.MAX_ENEMY_SPEED) co.doubleduck.Enemy._speed = co.doubleduck.Enemy.MAX_ENEMY_SPEED;
}
co.doubleduck.Enemy.__super__ = createjs.BitmapAnimation;
co.doubleduck.Enemy.prototype = $extend(createjs.BitmapAnimation.prototype,{
	attack: function() {
		this.gotoAndPlay("attack");
	}
	,destroy: function() {
		this.onDeath = null;
		createjs.Ticker.removeListener(this);
	}
	,getKilledByWeapon: function() {
		return this._killedByWeapon;
	}
	,tick: function(elapsed) {
		if(!this._deathSignaled && this.y > co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.DEATH_ZONE_PERCENTAGE && this._goingToDie) this.die();
		if(co.doubleduck.Enemy._speed != 0) {
			var posFactor = co.doubleduck.Utils.map(this.y,co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.SPAWN_LINE,co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.MAX_SCALE_LINE,0.25,1);
			this.y += co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy._speed * (elapsed / 1000) * posFactor;
			if(this.y < co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.MAX_SCALE_LINE) this.scaleX = this.scaleY = posFactor * co.doubleduck.Game.getScale();
		}
	}
	,getHeight: function() {
		return this.spriteSheet._frameHeight;
	}
	,getWidth: function() {
		return this.spriteSheet._frameWidth;
	}
	,prepareForTermination: function() {
		this._goingToDie = true;
	}
	,removeMe: function() {
		if(this.parent != null && this.parent.getStage() != null) this.parent.getStage().removeChild(this);
		this.destroy();
	}
	,die: function() {
		var destX = this.x;
		this.gotoAndPlay("death");
		if(this._killedByWeapon == "A") {
			destX += co.doubleduck.Game.getViewport().width / 4;
			this.scaleX *= -1;
		} else destX -= co.doubleduck.Game.getViewport().width / 4;
		this._deathSignaled = true;
		createjs.Tween.get(this).to({ x : destX, alpha : 0},500).call($bind(this,this.removeMe));
		if(this.onDeath != null) this.onDeath(this._killedByWeapon);
	}
	,idle: function() {
		this.gotoAndPlay("idle");
	}
	,onDeath: null
	,_deathSignaled: null
	,_goingToDie: null
	,_killedByWeapon: null
	,__class__: co.doubleduck.Enemy
});
co.doubleduck.FontHelper = $hxClasses["co.doubleduck.FontHelper"] = function() {
};
co.doubleduck.FontHelper.__name__ = ["co","doubleduck","FontHelper"];
co.doubleduck.FontHelper._lastComma = null;
co.doubleduck.FontHelper.tintRed = function(src) {
	co.doubleduck.Utils.tintBitmap(src,1,0,0,1);
}
co.doubleduck.FontHelper.getMultiplier = function() {
	return co.doubleduck.Assets.getImage("images/font/Assets-69.png");
}
co.doubleduck.FontHelper.getComma = function() {
	return co.doubleduck.Assets.getImage("images/font/Assets-80.png");
}
co.doubleduck.FontHelper.getMinus = function() {
	var minus = co.doubleduck.Assets.getImage("images/font/minus.png");
	co.doubleduck.FontHelper.tintRed(minus);
	return minus;
}
co.doubleduck.FontHelper.getDigit = function(digit,redTint) {
	if(redTint == null) redTint = false;
	var assetNum = 0;
	if(digit == 0) assetNum = 79; else assetNum = 70 + digit - 1;
	var digit1 = co.doubleduck.Assets.getImage("images/font/Assets-" + assetNum + ".png");
	if(redTint) co.doubleduck.FontHelper.tintRed(digit1);
	return digit1;
}
co.doubleduck.FontHelper.getNumber = function(num,scale,redTint) {
	if(redTint == null) redTint = false;
	if(scale == null) scale = 1;
	if(num >= 0 && num < 10) {
		var bmp = co.doubleduck.FontHelper.getDigit(num);
		bmp.scaleX = bmp.scaleY = scale;
		if(redTint) co.doubleduck.FontHelper.tintRed(bmp);
		return bmp;
	} else {
		var result = new createjs.Container();
		var addMinus = num < 0;
		var minus = null;
		if(num < 0) {
			minus = co.doubleduck.FontHelper.getMinus();
			result.addChild(minus);
			minus.scaleX = minus.scaleY = scale;
			num = Math.abs(num) | 0;
		}
		var numString = "" + num;
		var digits = new Array();
		digits[digits.length] = co.doubleduck.FontHelper.getDigit(Std.parseInt(HxOverrides.substr(numString,0,1)),redTint || minus != null);
		digits[0].scaleX = digits[0].scaleY = scale;
		if(minus != null) digits[0].x = minus.image.width;
		result.addChild(digits[0]);
		if(numString.length == 4 || numString.length == 7) {
			co.doubleduck.FontHelper._lastComma = co.doubleduck.FontHelper.getComma();
			co.doubleduck.FontHelper._lastComma.scaleX = co.doubleduck.FontHelper._lastComma.scaleY = scale;
			if(redTint) co.doubleduck.FontHelper.tintRed(co.doubleduck.FontHelper._lastComma);
			co.doubleduck.FontHelper._lastComma.x = digits[0].x + digits[0].image.width;
			result.addChild(co.doubleduck.FontHelper._lastComma);
		}
		var _g1 = 1, _g = numString.length;
		while(_g1 < _g) {
			var i = _g1++;
			var index = digits.length;
			digits[index] = co.doubleduck.FontHelper.getDigit(Std.parseInt(HxOverrides.substr(numString,i,1)),redTint || minus != null);
			if(numString.length - i == 3 || numString.length - i == 6) digits[index].x = co.doubleduck.FontHelper._lastComma.x + co.doubleduck.FontHelper._lastComma.image.width; else digits[index].x = digits[index - 1].x + digits[index - 1].image.width;
			digits[index].scaleX = digits[index].scaleY = scale;
			result.addChild(digits[index]);
			if(numString.length - i == 4 || numString.length - i == 7) {
				co.doubleduck.FontHelper._lastComma = co.doubleduck.FontHelper.getComma();
				co.doubleduck.FontHelper._lastComma.scaleX = co.doubleduck.FontHelper._lastComma.scaleY = scale;
				if(redTint) co.doubleduck.FontHelper.tintRed(co.doubleduck.FontHelper._lastComma);
				co.doubleduck.FontHelper._lastComma.x = digits[index].x + digits[index].image.width;
				result.addChild(co.doubleduck.FontHelper._lastComma);
			}
		}
		return result;
	}
}
co.doubleduck.FontHelper.prototype = {
	__class__: co.doubleduck.FontHelper
}
co.doubleduck.Game = $hxClasses["co.doubleduck.Game"] = function(stage) {
	this._waitingToStart = false;
	this._orientError = null;
	this.STATE_SPLASH = 2;
	this.STATE_SESSION = 1;
	this.STATE_MENU = 0;
	co.doubleduck.Game._stage = stage;
	co.doubleduck.Game._viewport = new createjs.Rectangle(0,0,1,1);
	co.doubleduck.Game.hammer = new Hammer(js.Lib.document.getElementById("stageCanvas"));
	viewporter.preventPageScroll = true;
	viewporter.change($bind(this,this.handleViewportChanged));
	co.doubleduck.Persistence.initGameData();
	if(co.doubleduck.Game.HD) {
		co.doubleduck.Game.MAX_HEIGHT = 1281;
		co.doubleduck.Game.MAX_WIDTH = 853;
	}
	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(viewporter.isLandscape()) co.doubleduck.Assets.loadAndCall("images/orientation_error.png",$bind(this,this.waitForPortrait)); else co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.loadBarFill));
	} else co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.loadBarFill));
};
co.doubleduck.Game.__name__ = ["co","doubleduck","Game"];
co.doubleduck.Game._stage = null;
co.doubleduck.Game.hammer = null;
co.doubleduck.Game._totalKnocks = null;
co.doubleduck.Game.setTotalKnocks = function(num) {
	co.doubleduck.Game._totalKnocks = num;
	co.doubleduck.Persistence.setTotalKnocks(num);
}
co.doubleduck.Game.getViewport = function() {
	return co.doubleduck.Game._viewport;
}
co.doubleduck.Game.getScale = function() {
	return co.doubleduck.Game._scale;
}
co.doubleduck.Game.getStage = function() {
	return co.doubleduck.Game._stage;
}
co.doubleduck.Game.setScale = function() {
	var regScale = co.doubleduck.Game._viewport.height / co.doubleduck.Game.MAX_HEIGHT;
	var isFirefox = /Firefox/.test(navigator.userAgent);
	if(viewporter.ACTIVE && isFirefox) {
		co.doubleduck.Game._scale = co.doubleduck.Game._viewport.width / co.doubleduck.Game.MAX_WIDTH;
		co.doubleduck.Game._viewport.height = co.doubleduck.Game.MAX_HEIGHT * co.doubleduck.Game._scale;
	} else if(co.doubleduck.Game._viewport.width >= co.doubleduck.Game._viewport.height) co.doubleduck.Game._scale = regScale; else if(co.doubleduck.Game.MAX_WIDTH * regScale < co.doubleduck.Game._viewport.width) co.doubleduck.Game._scale = co.doubleduck.Game._viewport.width / co.doubleduck.Game.MAX_WIDTH; else co.doubleduck.Game._scale = regScale;
}
co.doubleduck.Game.prototype = {
	handleSessionEnd: function() {
		if(this._session != null) {
			co.doubleduck.Game._totalKnocks += this._session.getKnocks();
			co.doubleduck.Game.setTotalKnocks(co.doubleduck.Game._totalKnocks);
		}
	}
	,handleBackToMenu: function() {
		co.doubleduck.Game._stage.removeChild(this._session);
		this._session.destroy();
		this._session = null;
		this._state = this.STATE_MENU;
		this._menu = new co.doubleduck.Menu();
		this._menu.onStart = $bind(this,this.handleStart);
		co.doubleduck.Game._stage.addChild(this._menu);
		this._menu.toggleKnocksToUnlock(true);
	}
	,handleRestart: function() {
		co.doubleduck.Game._stage.removeChild(this._session);
		this._session.destroy();
		this._state = this.STATE_SESSION;
		this.startSession(this._session.getVillageId());
	}
	,handleStart: function() {
		co.doubleduck.Game._stage.removeChild(this._menu);
		this._state = this.STATE_SESSION;
		this.startSession(this._menu.getChosenId() + 1);
		this._menu.destroy();
		this._menu = null;
	}
	,startSession: function(villageId) {
		this._session = new co.doubleduck.Session(villageId);
		this._session.setRestartCallback($bind(this,this.handleRestart));
		this._session.setMenuCallback($bind(this,this.handleBackToMenu));
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		co.doubleduck.Game._stage.addChild(this._session);
	}
	,handleViewportChanged: function() {
		if(viewporter.isLandscape()) {
			if(this._orientError == null) {
				this._orientError = co.doubleduck.Assets.getImage("images/orientation_error.png");
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = js.Lib.window.innerWidth / 2;
				this._orientError.y = js.Lib.window.innerHeight / 2;
				co.doubleduck.Game._stage.addChildAt(this._orientError,co.doubleduck.Game._stage.getNumChildren());
				this._session.pause();
			}
		} else if(this._orientError != null) {
			co.doubleduck.Game._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) co.doubleduck.Game._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.showSplash));
			}
		}
	}
	,handleResize: function(e) {
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		co.doubleduck.Game._stage.canvas.width = screenW;
		co.doubleduck.Game._stage.canvas.height = screenH;
		if(!viewporter.isLandscape()) {
			if(!(viewporter.ACTIVE && screenH < screenW)) {
				co.doubleduck.Game._viewport.width = screenW;
				co.doubleduck.Game._viewport.height = screenH;
				co.doubleduck.Game.setScale();
			}
		}
		if(createjs.Ticker.getPaused()) co.doubleduck.Game._stage.update();
	}
	,removeSplash: function() {
		co.doubleduck.Game._stage.removeChild(this._splashScreen);
		this._splashScreen = null;
	}
	,showMenu: function() {
		this._splashScreen.onClick = null;
		co.doubleduck.Game._stage.removeChild(this._tapToPlay);
		this._tapToPlay = null;
		createjs.Tween.get(this._splashScreen).to({ y : this._splashScreen.y + co.doubleduck.Game.getViewport().height},1000).call($bind(this,this.removeSplash));
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.Game._stage.addChildAt(this._menu,0);
		this._menu.onStart = $bind(this,this.handleStart);
		this._state = this.STATE_MENU;
	}
	,textAlpha: function() {
		if(this._tapToPlay == null) return;
		if(this._tapToPlay.alpha == 0) createjs.Tween.get(this._tapToPlay).to({ alpha : 1},750).call($bind(this,this.textAlpha)); else if(this._tapToPlay.alpha == 1) createjs.Tween.get(this._tapToPlay).to({ alpha : 0},1500).call($bind(this,this.textAlpha));
	}
	,splashEnded: function() {
		js.Lib.document.body.bgColor = "#000000";
		co.doubleduck.Game._stage.removeChild(this._splash);
		this._splash = null;
		js.Lib.window.onresize = $bind(this,this.handleResize);
		this.handleResize(null);
		this._splashScreen = co.doubleduck.Assets.getImage("images/menu/Splash.jpg",true);
		this._splashScreen.scaleX = this._splashScreen.scaleY = co.doubleduck.Game.getScale();
		this._splashScreen.regX = this._splashScreen.image.width / 2;
		this._splashScreen.x = co.doubleduck.Game.getViewport().width / 2;
		co.doubleduck.Game._stage.addChildAt(this._splashScreen,0);
		this._tapToPlay = co.doubleduck.Assets.getImage("images/menu/tap2play.png");
		this._tapToPlay.regX = this._tapToPlay.image.width / 2;
		this._tapToPlay.regY = this._tapToPlay.image.height / 2;
		this._tapToPlay.x = co.doubleduck.Game.getViewport().width / 2;
		this._tapToPlay.y = this._splashScreen.image.height * co.doubleduck.Game.getScale() * 0.5;
		this._tapToPlay.scaleX = this._tapToPlay.scaleY = co.doubleduck.Game.getScale();
		this._tapToPlay.alpha = 0;
		this.textAlpha();
		co.doubleduck.Game._stage.addChildAt(this._tapToPlay,1);
		this._splashScreen.onClick = $bind(this,this.showMenu);
	}
	,handleDoneLoading: function() {
		createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		co.doubleduck.Game._stage.removeChild(this._loadingBar);
		co.doubleduck.Game._stage.removeChild(this._loadingStroke);
	}
	,updateLoading: function() {
		if(co.doubleduck.Assets.loaded != 1) {
			this._loadingBar.visible = true;
			var percent = co.doubleduck.Assets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
			co.doubleduck.Utils.waitAndCall(this,10,$bind(this,this.updateLoading));
		}
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#00A99D"; else js.Lib.document.body.bgColor = "#D94D00";
		this._splash = co.doubleduck.Assets.getImage("images/splash_logo.png");
		this._splash.regX = this._splash.image.width / 2;
		this._splash.regY = this._splash.image.height / 2;
		this._splash.x = js.Lib.window.innerWidth / 2;
		this._splash.y = js.Lib.window.innerHeight / 2;
		co.doubleduck.Game._stage.addChild(this._splash);
		this._loadingStroke = co.doubleduck.Assets.getImage("images/loading_stroke.png");
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		co.doubleduck.Game._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = co.doubleduck.Assets.getImage("images/loading_fill.png");
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		co.doubleduck.Game._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = js.Lib.window.innerHeight / 2 + 100;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		co.doubleduck.Game._stage.canvas.width = js.Lib.window.innerWidth;
		co.doubleduck.Game._stage.canvas.height = js.Lib.window.innerHeight;
		co.doubleduck.Game._totalKnocks = co.doubleduck.Persistence.getTotalKnocks();
		if(co.doubleduck.Game._totalKnocks == null) co.doubleduck.Game.setTotalKnocks(0);
		co.doubleduck.Assets.onLoadAll = $bind(this,this.handleDoneLoading);
		co.doubleduck.Assets.loadAll();
	}
	,waitForPortrait: function() {
		this._waitingToStart = true;
		this._orientError = co.doubleduck.Assets.getImage("images/orientation_error.png");
		this._orientError.regX = this._orientError.image.width / 2;
		this._orientError.regY = this._orientError.image.height / 2;
		this._orientError.x = js.Lib.window.innerWidth / 2;
		this._orientError.y = js.Lib.window.innerHeight / 2;
		co.doubleduck.Game._stage.addChildAt(this._orientError,co.doubleduck.Game._stage.getNumChildren());
	}
	,loadBarStroke: function() {
		co.doubleduck.Assets.loadAndCall("images/loading_stroke.png",$bind(this,this.showSplash));
	}
	,loadBarFill: function() {
		co.doubleduck.Assets.loadAndCall("images/loading_fill.png",$bind(this,this.loadBarStroke));
	}
	,_loadingStroke: null
	,_loadingBar: null
	,_tapToPlay: null
	,_splashScreen: null
	,_waitingToStart: null
	,_orientError: null
	,_state: null
	,_session: null
	,_menu: null
	,_splash: null
	,STATE_SPLASH: null
	,STATE_SESSION: null
	,STATE_MENU: null
	,__class__: co.doubleduck.Game
}
co.doubleduck.HUD = $hxClasses["co.doubleduck.HUD"] = function() {
	this._rightEnemiesCount = 0;
	this._leftEnemiesCount = 0;
	this.onMenuClick = null;
	this.onRestart = null;
	this.onPauseClick = null;
	createjs.Container.call(this);
	this._rightEnemies = new Array();
	this._leftEnemies = new Array();
	this._powerupStroke = co.doubleduck.Assets.getImage("images/hud/powerup_stroke.png");
	this._powerupStroke.scaleX = this._powerupStroke.scaleY = co.doubleduck.Game.getScale();
	this._powerupStroke.x = co.doubleduck.Game.getViewport().width / 2 - co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() / 2;
	this._powerupStroke.y = co.doubleduck.Game.getViewport().height * 0.13;
	this._powerupFill = co.doubleduck.Assets.getImage("images/hud/powerup_fill.png");
	this._powerupFill.scaleX = this._powerupFill.scaleY = this._powerupStroke.scaleX;
	this._powerupFill.x = this._powerupStroke.x;
	this._powerupFill.y = this._powerupStroke.y;
	this.addChild(this._powerupStroke);
	this.addChild(this._powerupFill);
	this.setPowerUpProgession(1);
	this.multiplier = co.doubleduck.FontHelper.getMultiplier();
	this.addChild(this.multiplier);
	this.multiplier.scaleX = this.multiplier.scaleY = co.doubleduck.Game.getScale();
	this.multiplier.x = this._powerupStroke.x + this._powerupStroke.image.width * co.doubleduck.Game.getScale() / 2;
	this.multiplier.y = this._powerupStroke.y;
	this._multiplierDigit = co.doubleduck.FontHelper.getNumber(1);
	this._multiplierDigit.scaleX = this._multiplierDigit.scaleY = co.doubleduck.Game.getScale();
	this._multiplierDigit.x = this.multiplier.x + this.multiplier.image.width * co.doubleduck.Game.getScale();
	this._multiplierDigit.y = this.multiplier.y;
	this.addChild(this._multiplierDigit);
	this._pauseBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/hud/gamepause.png"));
	this._pauseBtn.regX = this._pauseBtn.image.width;
	this._pauseBtn.scaleX = this._pauseBtn.scaleY = co.doubleduck.Game.getScale();
	this._pauseBtn.x = co.doubleduck.Game.getViewport().width - 10 * co.doubleduck.Game.getScale();
	this._pauseBtn.y = co.doubleduck.Game.getViewport().height * 0.03;
	this._pauseBtn.onClick = $bind(this,this.handlePauseClick);
	createjs.Ticker.addListener(this,false);
	this.addChild(this._pauseBtn);
	this._pauseScreenBG = new createjs.Shape();
	this._pauseScreenBG.graphics.beginFill("#000000");
	this._pauseScreenBG.graphics.drawRect(0,0,co.doubleduck.Game.getViewport().width,co.doubleduck.Game.getViewport().height);
	this._pauseScreenBG.graphics.endFill();
	this._pauseScreenBG.alpha = 0.5;
	this._pauseScreenBG.visible = false;
	this._pauseBtnScreenTitle = co.doubleduck.Assets.getImage("images/hud/paused.png");
	this._pauseBtnScreenTitle.regX = this._pauseBtnScreenTitle.image.width / 2;
	this._pauseBtnScreenTitle.regY = this._pauseBtnScreenTitle.image.height / 2;
	this._pauseBtnScreenTitle.scaleX = this._pauseBtnScreenTitle.scaleY = co.doubleduck.Game.getScale();
	this._pauseBtnScreenTitle.x = co.doubleduck.Game.getViewport().width / 2;
	this._pauseBtnScreenTitle.y = co.doubleduck.Game.getViewport().height * 0.4;
	this._pauseScreenBtnRestart = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/hud/btn_replay.png"),false);
	this._pauseScreenBtnRestart.regX = this._pauseScreenBtnRestart.image.width / 2;
	this._pauseScreenBtnRestart.regY = this._pauseScreenBtnRestart.image.height / 2;
	this._pauseScreenBtnRestart.scaleX = this._pauseScreenBtnRestart.scaleY = co.doubleduck.Game.getScale();
	this._pauseScreenBtnRestart.x = co.doubleduck.Game.getViewport().width / 2;
	this._pauseScreenBtnRestart.y = co.doubleduck.Game.getViewport().height * 0.65;
	this._pauseScreenBtnRestart.onClick = $bind(this,this.handleRestartClick);
	this._pauseScreenBtnResume = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/hud/btn_resume.png"),false);
	this._pauseScreenBtnResume.regX = this._pauseScreenBtnResume.image.width / 2;
	this._pauseScreenBtnResume.regY = this._pauseScreenBtnResume.image.height / 2;
	this._pauseScreenBtnResume.scaleX = this._pauseScreenBtnResume.scaleY = co.doubleduck.Game.getScale();
	this._pauseScreenBtnResume.onClick = $bind(this,this.handlePauseClick);
	this._pauseScreenBtnResume.y = this._pauseScreenBtnRestart.y;
	this._pauseScreenBtnResume.x = this._pauseScreenBtnRestart.x + this._pauseScreenBtnRestart.image.width * co.doubleduck.Game.getScale() + 15 * co.doubleduck.Game.getScale();
	this._pauseScreenBtnMenu = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/hud/btn_menu.png"),false);
	this._pauseScreenBtnMenu.regX = this._pauseScreenBtnMenu.image.width / 2;
	this._pauseScreenBtnMenu.regY = this._pauseScreenBtnMenu.image.height / 2;
	this._pauseScreenBtnMenu.scaleX = this._pauseScreenBtnMenu.scaleY = co.doubleduck.Game.getScale();
	this._pauseScreenBtnMenu.y = this._pauseScreenBtnRestart.y;
	this._pauseScreenBtnMenu.x = this._pauseScreenBtnRestart.x - this._pauseScreenBtnRestart.image.width * co.doubleduck.Game.getScale() - 15 * co.doubleduck.Game.getScale();
	this._pauseScreenBtnMenu.onClick = $bind(this,this.handleMenuClick);
	if(co.doubleduck.Game.DEBUG) {
		this._fps = new createjs.Text("0","Arial 22px","#FF0000");
		this.addChild(this._fps);
		this._fps.x = co.doubleduck.Game.getViewport().width - 100;
		this._fps.y = 250;
		createjs.Ticker.addListener(this);
	}
};
co.doubleduck.HUD.__name__ = ["co","doubleduck","HUD"];
co.doubleduck.HUD.__super__ = createjs.Container;
co.doubleduck.HUD.prototype = $extend(createjs.Container.prototype,{
	isMouseOnPause: function() {
		var posx = co.doubleduck.Game.getStage().mouseX - this.x - this._pauseBtn.x + this._pauseBtn.regX * co.doubleduck.Game.getScale();
		var posy = co.doubleduck.Game.getStage().mouseY - this.y - this._pauseBtn.y;
		if(posx >= 0 && posx <= this._pauseBtn.image.width * co.doubleduck.Game.getScale()) {
			if(posy >= 0 && posy <= this._pauseBtn.image.height * co.doubleduck.Game.getScale()) return true;
		}
		return false;
	}
	,handleRestartClick: function() {
		if(this.onRestart != null) {
			createjs.Ticker.setPaused(false);
			this.onRestart();
		}
	}
	,handleMenuClick: function() {
		if(this.onMenuClick != null) {
			createjs.Ticker.setPaused(false);
			this.onMenuClick();
		}
	}
	,removeTimePopup: function() {
		this.removeChild(this._timePopup);
	}
	,popupFiveSecs: function() {
		if(this._timePopup != null) return;
		this._timePopup = co.doubleduck.Assets.getImage("images/hud/5-sec-left.png");
		co.doubleduck.Utils.tintBitmap(this._timePopup,1,0,0,1);
		this._timePopup.scaleX = this._timePopup.scaleY = co.doubleduck.Game.getScale();
		this._timePopup.regX = this._timePopup.image.width / 2;
		this._timePopup.regY = this._timePopup.image.height / 2;
		this._timePopup.x = co.doubleduck.Game.getViewport().width / 2;
		this._timePopup.y = co.doubleduck.Game.getViewport().height * 0.7;
		this.addChild(this._timePopup);
		var moveTarget = co.doubleduck.Game.getViewport().height * 0.3;
		createjs.Tween.get(this._timePopup).to({ y : moveTarget, alpha : 0},2200).call($bind(this,this.removeTimePopup));
	}
	,showDecreaseSecond: function() {
		var second = co.doubleduck.FontHelper.getNumber(-1);
		second.scaleX = second.scaleY = co.doubleduck.Game.getScale();
		second.regX = 0;
		second.x = this._remainingSecs.x;
		second.y = this._remainingSecs.y + co.doubleduck.Game.getViewport().height * 0.05;
		this.addChild(second);
		createjs.Tween.get(second).to({ alpha : 0, y : second.y + co.doubleduck.Game.getViewport().height * (0.05 + Math.random() * 0.01)},1000);
	}
	,setPauseOverlay: function(flag) {
		this._pauseScreenBG.visible = flag;
		if(flag) {
			this.removeChild(this._pauseBtn);
			this.addChild(this._pauseScreenBG);
			this.addChild(this._pauseBtn);
			this.addChild(this._pauseBtnScreenTitle);
			this.addChild(this._pauseScreenBtnRestart);
			this.addChild(this._pauseScreenBtnResume);
			this.addChild(this._pauseScreenBtnMenu);
			this._pauseBtn.visible = false;
		} else {
			this.removeChild(this._pauseScreenBG);
			this.removeChild(this._pauseBtnScreenTitle);
			this.removeChild(this._pauseScreenBtnRestart);
			this.removeChild(this._pauseScreenBtnResume);
			this.removeChild(this._pauseScreenBtnMenu);
			this._pauseBtn.visible = true;
		}
		co.doubleduck.Game.getStage().update();
	}
	,removeLabel: function() {
		this.removeChild(this._powerupLabel);
		this._powerupLabel = null;
	}
	,labelPowerup: function(name) {
		this._powerupLabel = co.doubleduck.Assets.getImage("images/powerups/Label_" + name + ".png");
		this._powerupLabel.alpha = 1;
		this._powerupLabel.regX = this._powerupLabel.image.width / 2;
		this._powerupLabel.regY = this._powerupLabel.image.height / 2;
		this._powerupLabel.x = co.doubleduck.Game.getViewport().width / 2;
		this._powerupLabel.y = co.doubleduck.Game.getViewport().height / 2;
		this._powerupLabel.scaleX = this._powerupLabel.scaleY = co.doubleduck.Game.getScale();
		this.addChild(this._powerupLabel);
		createjs.Tween.get(this._powerupLabel).to({ y : co.doubleduck.Game.getViewport().height * 0.35, alpha : 0},1500).call($bind(this,this.removeLabel));
	}
	,timeScaleDown: function() {
		createjs.Tween.get(this._remainingSecs).to({ scaleX : this._remainingSecs.scaleX, scaleY : this._remainingSecs.scaleY},450);
	}
	,timeScaleUp: function() {
		createjs.Tween.get(this._remainingSecs).to({ scaleX : this._remainingSecs.scaleX * 1.5, scaleY : this._remainingSecs.scaleY * 1.5},450).call($bind(this,this.timeScaleDown));
	}
	,setRemainingSecs: function(secs) {
		if(this._remainingSecs != null) this.removeChild(this._remainingSecs);
		if(secs > 3) {
			this._remainingSecs = co.doubleduck.FontHelper.getNumber(secs);
			this._remainingSecs.scaleX = this._remainingSecs.scaleY = co.doubleduck.Game.getScale();
			this._remainingSecs.scaleX = this._remainingSecs.scaleY = co.doubleduck.Game.getScale();
		} else {
			this._remainingSecs = co.doubleduck.FontHelper.getNumber(secs,1,true);
			this._remainingSecs.scaleX = this._remainingSecs.scaleY = co.doubleduck.Game.getScale();
			this._remainingSecs.scaleX = this._remainingSecs.scaleY = co.doubleduck.Game.getScale();
			this.timeScaleUp();
		}
		this._remainingSecs.y = co.doubleduck.Game.getViewport().height * 0.03;
		this._remainingSecs.x = co.doubleduck.Game.getViewport().width / 2 + co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() * 0.18;
		this.addChild(this._remainingSecs);
	}
	,focusIcons: function(wpnType) {
		var icons = null;
		if(wpnType == "B") icons = this._leftEnemies; else icons = this._rightEnemies;
		var _g1 = 0, _g = icons.length;
		while(_g1 < _g) {
			var currIcon = _g1++;
			var currScale = icons[currIcon].scaleX;
			var targetScale = currScale * 1.5;
			createjs.Tween.get(icons[currIcon]).to({ scaleX : targetScale, scaleY : targetScale},300).to({ scaleX : currScale, scaleY : currScale},300);
		}
	}
	,updateMultiplier: function(multiplierId) {
		this.removeChild(this._multiplierDigit);
		this._multiplierDigit = co.doubleduck.FontHelper.getNumber(multiplierId);
		this._multiplierDigit.scaleX = this._multiplierDigit.scaleY = co.doubleduck.Game.getScale();
		this._multiplierDigit.x = this.multiplier.x + this.multiplier.image.width * co.doubleduck.Game.getScale();
		this._multiplierDigit.y = this.multiplier.y;
		this.addChild(this._multiplierDigit);
	}
	,addEnemyType: function(enemy) {
		if(enemy.killedByWeapon == "B") {
			this._leftEnemiesCount++;
			var enemyImg = co.doubleduck.Assets.getImage(enemy.icon);
			enemyImg.scaleX = enemyImg.scaleY = co.doubleduck.Game.getScale();
			enemyImg.regX = enemyImg.image.width * co.doubleduck.Game.getScale() / 2;
			enemyImg.regY = enemyImg.image.height * co.doubleduck.Game.getScale() / 2;
			enemyImg.y = co.doubleduck.Game.getViewport().height * 0.85 - (enemyImg.image.height * co.doubleduck.Game.getScale() + co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() * 0.02) * (this._leftEnemiesCount - 1);
			enemyImg.x = co.doubleduck.Game.getViewport().width / 2 - co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() / 3;
			this.addChild(enemyImg);
			this._leftEnemies[this._leftEnemies.length] = enemyImg;
		} else {
			this._rightEnemiesCount++;
			var enemyImg = co.doubleduck.Assets.getImage(enemy.icon);
			enemyImg.scaleX = enemyImg.scaleY = co.doubleduck.Game.getScale();
			enemyImg.regX = enemyImg.image.width / 2;
			enemyImg.regY = enemyImg.image.height / 2;
			enemyImg.y = co.doubleduck.Game.getViewport().height * 0.85 - (enemyImg.image.height * co.doubleduck.Game.getScale() + co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() * 0.02) * (this._rightEnemiesCount - 1);
			enemyImg.x = co.doubleduck.Game.getViewport().width / 2 + co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() / 3;
			this.addChild(enemyImg);
			this._rightEnemies[this._rightEnemies.length] = enemyImg;
		}
	}
	,tick: function() {
		if(co.doubleduck.Game.DEBUG) this._fps.text = "" + createjs.Ticker.getMeasuredFPS();
	}
	,setNumKnocks: function(numKnocks) {
		if(this._numKnocks != null) this.removeChild(this._numKnocks);
		this._numKnocks = co.doubleduck.FontHelper.getNumber(numKnocks);
		this.addChild(this._numKnocks);
		this._numKnocks.scaleX = this._numKnocks.scaleY = co.doubleduck.Game.getScale();
		this._numKnocks.y = co.doubleduck.Game.getViewport().height * 0.03;
		this._numKnocks.x = co.doubleduck.Game.getViewport().width / 2 - co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() * 0.45;
	}
	,setPowerUpProgession: function(progression) {
		var barMask = new createjs.Shape();
		barMask.graphics.beginFill("#00000000");
		var height = this._powerupFill.image.height * co.doubleduck.Game.getScale();
		barMask.graphics.drawRect(this._powerupFill.x,this._powerupFill.y + (1 - progression) * height,this._powerupFill.image.width * co.doubleduck.Game.getScale(),height * progression);
		barMask.graphics.endFill();
		this._powerupFill.mask = barMask;
	}
	,handlePauseClick: function() {
		if(this.onPauseClick != null) this.onPauseClick();
	}
	,_powerupLabel: null
	,_timePopup: null
	,_pauseScreenBtnResume: null
	,_pauseScreenBtnRestart: null
	,_pauseScreenBtnMenu: null
	,_pauseBtnScreenTitle: null
	,_pauseScreenBG: null
	,_pauseBtn: null
	,_currentlyScaling: null
	,_remainingSecs: null
	,_multiplierDigit: null
	,multiplier: null
	,_rightEnemies: null
	,_leftEnemies: null
	,_rightEnemiesCount: null
	,_leftEnemiesCount: null
	,_knocks: null
	,_fps: null
	,_numKnocks: null
	,_powerupFill: null
	,_powerupStroke: null
	,onMenuClick: null
	,onRestart: null
	,onPauseClick: null
	,__class__: co.doubleduck.HUD
});
co.doubleduck.Main = $hxClasses["co.doubleduck.Main"] = function() { }
co.doubleduck.Main.__name__ = ["co","doubleduck","Main"];
co.doubleduck.Main._stage = null;
co.doubleduck.Main._game = null;
co.doubleduck.Main.main = function() {
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	co.doubleduck.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	co.doubleduck.Main._game = new co.doubleduck.Game(co.doubleduck.Main._stage);
	createjs.Ticker.addListener(co.doubleduck.Main._stage);
	createjs.Touch.enable(co.doubleduck.Main._stage,true,false);
}
co.doubleduck.Menu = $hxClasses["co.doubleduck.Menu"] = function() {
	this._isSweeping = false;
	this.ROW_POS = 0.38;
	this.SCROLL_EASE = 0.008;
	this.UNFOCUS_SCALE = 0.6;
	this.FOCUS_SCALE = 1.1;
	createjs.Container.call(this);
	this._villDB = new VillageDB().getAllVillages();
	this.VILLAGES_COUNT = this._villDB.length;
	this._villageArray = new Array();
	this._locksArray = new Array();
	this._background = co.doubleduck.Assets.getImage("images/menu/background.png");
	this._background.scaleX = this._background.scaleY = co.doubleduck.Game.getScale();
	this._background.regX = this._background.image.width / 2;
	this._background.x = co.doubleduck.Game.getViewport().width / 2;
	this.addChildAt(this._background,0);
	this._selectRight = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/btn_arrow_r.png"));
	this._selectRight.scaleX = this._selectRight.scaleY = co.doubleduck.Game.getScale();
	this._selectRight.regX = this._selectRight.image.width;
	this._selectRight.regY = this._selectRight.image.height / 2;
	this._selectLeft = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/btn_arrow_r.png"));
	this._selectLeft.scaleX = this._selectLeft.scaleY = co.doubleduck.Game.getScale();
	this._selectLeft.scaleX *= -1;
	this._selectLeft.regX = this._selectLeft.image.width;
	this._selectLeft.regY = this._selectLeft.image.height / 2;
	this._selectRight.x = co.doubleduck.Game.getViewport().width - 10;
	this._selectRight.y = co.doubleduck.Game.getViewport().height * this.ROW_POS;
	this._selectLeft.x = 10;
	this._selectLeft.y = this._selectRight.y;
	this._selectRight.onClick = $bind(this,this.handleNextVillage);
	this._selectLeft.onClick = $bind(this,this.handlePrevVillage);
	this._villagesRow = new createjs.Container();
	this._villagesRow.x = co.doubleduck.Game.getViewport().width * 0.5;
	this._villagesRow.y = co.doubleduck.Game.getViewport().height * this.ROW_POS;
	this.addChild(this._villagesRow);
	this.FOCUS_SCALE *= co.doubleduck.Game.getScale();
	this.UNFOCUS_SCALE *= co.doubleduck.Game.getScale();
	this._chosenVillageId = 0;
	var _g1 = 0, _g = this.VILLAGES_COUNT;
	while(_g1 < _g) {
		var i = _g1++;
		this.loadVillImage(i);
	}
	this.targetVillage(0,true);
	this.addChild(this._selectLeft);
	this.addChild(this._selectRight);
	this._totalKnocksLabel = co.doubleduck.Assets.getImage("images/menu/knocks.png");
	this._totalKnocksLabel.scaleX = this._totalKnocksLabel.scaleY = co.doubleduck.Game.getScale() * 0.75;
	this._totalKnocksLabel.regX = this._totalKnocksLabel.image.width / 2;
	this._totalKnocksLabel.regY = this._totalKnocksLabel.image.height;
	this._totalKnocksLabel.x = co.doubleduck.Game.getViewport().width / 2;
	this._totalKnocksLabel.y = co.doubleduck.Game.getViewport().height * 0.7;
	this.addChild(this._totalKnocksLabel);
	this.updateTotalKnocks();
	if(co.doubleduck.Game.DEBUG) {
		var resetKnocks = new createjs.Text("reset knocks","bold 22px Arial","#FF0000");
		resetKnocks.regX = resetKnocks.getMeasuredWidth() / 2;
		resetKnocks.x = co.doubleduck.Game.getViewport().width / 2;
		resetKnocks.y = co.doubleduck.Game.getViewport().height * 0.6;
		resetKnocks.onClick = $bind(this,this.resetKnocksCount);
		this.addChild(resetKnocks);
	}
	var px = 18;
	this._knocksRemaining = new createjs.Text("Knocks to Unlock:\n100","bold 18px Arial","#FFFFFF");
	this._knocksRemaining.visible = false;
	this._knocksRemaining.textAlign = "center";
	this._knocksRemaining.scaleX = this._knocksRemaining.scaleY = co.doubleduck.Game.getScale();
	this._knocksRemaining.x = co.doubleduck.Game.getViewport().width / 2;
	this._knocksRemaining.y = this._villagesRow.y + 2;
	this._knocksRemaining.y += this._villageArray[0].image.height * this.FOCUS_SCALE / 2;
	this.addChild(this._knocksRemaining);
	this._highscore = new createjs.Text("High Score:\n","bold 30px Arial","#ff8c00");
	this._highscore.visible = false;
	this._highscore.textAlign = "center";
	this._highscore.scaleX = this._highscore.scaleY = co.doubleduck.Game.getScale();
	this._highscore.x = co.doubleduck.Game.getViewport().width / 2 - this._villageArray[0].image.width * this.FOCUS_SCALE * 0.4;
	this._highscore.rotation = -16;
	this._highscore.y = this._villagesRow.y - this._villageArray[0].image.height * this.FOCUS_SCALE * 0.4;
	this._highscoreShadow = new createjs.Text("High Score:\n","bold 30px Arial","#221100");
	this._highscoreShadow.alpha = 0.8;
	this._highscoreShadow.visible = false;
	this._highscoreShadow.textAlign = "center";
	this._highscoreShadow.scaleX = this._highscoreShadow.scaleY = co.doubleduck.Game.getScale();
	this._highscoreShadow.x = this._highscore.x + 1;
	this._highscoreShadow.rotation = this._highscore.rotation;
	this._highscoreShadow.y = this._highscore.y + 1;
	this.addChild(this._highscoreShadow);
	this.addChild(this._highscore);
	this._playButton = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/btn_play.png"));
	this._playButton.scaleX = this._playButton.scaleY = co.doubleduck.Game.getScale();
	this._playButton.regX = this._playButton.image.width;
	this._playButton.x = co.doubleduck.Game.getViewport().width / 2;
	this._playButton.y = co.doubleduck.Game.getViewport().height * 0.8;
	this._playButton.onClick = $bind(this,this.handlePlaySession);
	this.addChild(this._playButton);
	this._helpBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/help_btn.png"));
	this._helpBtn.scaleX = this._helpBtn.scaleY = co.doubleduck.Game.getScale();
	this._helpBtn.x = co.doubleduck.Game.getViewport().width / 2;
	this._helpBtn.y = this._playButton.y;
	this._helpScreenShown = false;
	this.addChild(this._helpBtn);
	this._helpBtn.onClick = $bind(this,this.showHelp);
	var totalWidth = (this._playButton.image.width + this._helpBtn.image.width + 20) * co.doubleduck.Game.getScale();
	this._playButton.x += totalWidth / 2;
	this._helpBtn.x -= totalWidth / 2;
	this._helpScreen = co.doubleduck.Assets.getImage("images/menu/help_scrn.png");
	this._helpScreen.scaleX = this._helpScreen.scaleY = co.doubleduck.Game.getScale();
	this._helpScreen.regX = this._helpScreen.image.width / 2;
	this._helpScreen.regY = this._helpScreen.image.height / 2;
	this._helpScreen.x = co.doubleduck.Game.getViewport().width / 2;
	this._helpScreen.y = co.doubleduck.Game.getViewport().height / 2;
	this._helpScreen.visible = false;
	this.addChild(this._helpScreen);
	this._closeHelpBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/close_btn.png"));
	this._closeHelpBtn.scaleX = this._closeHelpBtn.scaleY = co.doubleduck.Game.getScale() * 1.2;
	this._closeHelpBtn.regX = this._closeHelpBtn.image.width;
	this._closeHelpBtn.regY = 0;
	this._closeHelpBtn.x = co.doubleduck.Game.getViewport().width * 0.98;
	this._closeHelpBtn.y = co.doubleduck.Game.getViewport().height * 0.02;
	this._closeHelpBtn.visible = false;
	this.addChild(this._closeHelpBtn);
	if(co.doubleduck.Persistence.getTotalKnocks() == 0) this.showHelp(false);
	co.doubleduck.Game.hammer.onswipe = $bind(this,this.handleSwipe);
	this.toggleHighscore(true);
};
co.doubleduck.Menu.__name__ = ["co","doubleduck","Menu"];
co.doubleduck.Menu.__super__ = createjs.Container;
co.doubleduck.Menu.prototype = $extend(createjs.Container.prototype,{
	updateTotalKnocks: function() {
		if(this._totalKnocksValue != null) this.removeChild(this._totalKnocksValue);
		var knocks = co.doubleduck.Persistence.getTotalKnocks();
		this._totalKnocksValue = co.doubleduck.FontHelper.getNumber(knocks,1,false);
		this._totalKnocksValue.scaleX = this._totalKnocksValue.scaleY = co.doubleduck.Game.getScale();
		var textWidth = 0;
		if(knocks <= 9) {
			var bmp = this._totalKnocksValue;
			textWidth = bmp.image.width;
		} else {
			var cont = this._totalKnocksValue;
			var _g1 = 0, _g = cont.getNumChildren();
			while(_g1 < _g) {
				var i = _g1++;
				var digit = cont.getChildAt(i);
				textWidth += digit.image.width;
			}
		}
		this._totalKnocksValue.regX = textWidth / 2;
		this._totalKnocksValue.x = co.doubleduck.Game.getViewport().width / 2;
		this._totalKnocksValue.y = this._totalKnocksLabel.y;
		this.addChild(this._totalKnocksValue);
	}
	,getChosenId: function() {
		return this._chosenVillageId;
	}
	,handlePlaySession: function() {
		if(this._locksArray[this._chosenVillageId] == false && !this._helpScreenShown) {
			co.doubleduck.Game.hammer.onswipe = null;
			this.onStart();
		}
	}
	,handlePrevVillage: function() {
		if(this._chosenVillageId > 0) this.targetVillage(this._chosenVillageId - 1);
	}
	,handleNextVillage: function() {
		if(this._chosenVillageId < this.VILLAGES_COUNT - 1) this.targetVillage(this._chosenVillageId + 1);
	}
	,destroy: function() {
		this.onStart = null;
		if(this._isSweeping) createjs.Ticker.removeListener(this);
	}
	,tick: function(elapsed) {
		if(this._villagesRow.x == this._targetPos) {
			createjs.Ticker.removeListener(this);
			this._isSweeping = false;
			return;
		}
		this._villagesRow.x += (this._targetPos - this._villagesRow.x) * this.SCROLL_EASE * elapsed;
		var _g1 = 0, _g = this.VILLAGES_COUNT;
		while(_g1 < _g) {
			var i = _g1++;
			var scale = this.UNFOCUS_SCALE;
			var posx = (this._villageArray[i].x + this._villagesRow.x) / co.doubleduck.Game.getViewport().width;
			if(posx >= 0.3 && posx < 0.5) scale = co.doubleduck.Utils.map(posx,0.3,0.5,this.UNFOCUS_SCALE,this.FOCUS_SCALE); else if(posx > 0.5 && posx <= 0.7) scale = co.doubleduck.Utils.map(posx,0.5,0.7,this.FOCUS_SCALE,this.UNFOCUS_SCALE); else if(posx == 0.5) scale = this.FOCUS_SCALE;
			if(i == this._chosenVillageId) {
				if(posx > 0.49 && posx < 0.51) {
					this.toggleKnocksToUnlock(true);
					this.toggleHighscore(true);
				} else {
					this.toggleKnocksToUnlock(false);
					this.toggleHighscore(false);
				}
			}
			this._villageArray[i].scaleX = this._villageArray[i].scaleY = scale;
		}
	}
	,targetVillage: function(id,force) {
		if(force == null) force = false;
		this._villageArray[this._chosenVillageId].onClick = null;
		this._chosenVillageId = id;
		this._targetPos = co.doubleduck.Game.getViewport().width / 2 - this._villageArray[id].x;
		if(id == 0) this._selectLeft.visible = false; else this._selectLeft.visible = true;
		if(id == this.VILLAGES_COUNT - 1) this._selectRight.visible = false; else this._selectRight.visible = true;
		if(force) {
			this._isSweeping = false;
			this._villagesRow.x = this._targetPos;
			this._villageArray[id].scaleX = this._villageArray[id].scaleY = this.FOCUS_SCALE;
			this._villageArray[this._chosenVillageId].onClick = $bind(this,this.handlePlaySession);
		} else {
			this._isSweeping = true;
			createjs.Ticker.addListener(this);
		}
	}
	,loadVillImage: function(id) {
		if(id < 0 || id > 99 || id >= this.VILLAGES_COUNT) return;
		var uriImage;
		if(co.doubleduck.Persistence.getTotalKnocks() < this._villDB[id].knocksToUnlock) {
			this._locksArray[id] = true;
			uriImage = "images/menu/vill_locked.png";
		} else {
			this._locksArray[id] = false;
			uriImage = "images/menu/vill_" + (id + 1) + ".png";
		}
		this._villageArray[id] = co.doubleduck.Assets.getImage(uriImage,true);
		this._villageArray[id].regX = this._villageArray[id].image.width / 2;
		this._villageArray[id].regY = this._villageArray[id].image.height / 2;
		this._villageArray[id].scaleX = this._villageArray[id].scaleY = this.UNFOCUS_SCALE;
		this._villageArray[id].x = id * (co.doubleduck.Game.getViewport().width / 2);
		this._villagesRow.addChild(this._villageArray[id]);
	}
	,toggleHighscore: function(flag) {
		if(flag) {
			if(!this._highscore.visible) {
				var highscore = co.doubleduck.Persistence.getVillageHighscore(this._chosenVillageId + 1);
				if(highscore == null) highscore = 0;
				if(highscore > 0) {
					this._highscore.text = "High Score:\n" + highscore;
					this._highscore.visible = true;
					this._highscoreShadow.text = this._highscore.text;
					this._highscoreShadow.visible = true;
				}
			}
		} else if(this._highscore.visible) {
			this._highscore.visible = false;
			this._highscoreShadow.visible = false;
		}
	}
	,toggleKnocksToUnlock: function(flag) {
		if(flag) {
			if(!this._knocksRemaining.visible) {
				var remainingK = this._villDB[this._chosenVillageId].knocksToUnlock;
				remainingK -= co.doubleduck.Persistence.getTotalKnocks();
				if(remainingK > 0) {
					this._knocksRemaining.text = "Unlocks at " + this._villDB[this._chosenVillageId].knocksToUnlock;
					this._knocksRemaining.visible = true;
				}
				this._villageArray[this._chosenVillageId].onClick = $bind(this,this.handlePlaySession);
			}
		} else if(this._knocksRemaining.visible) this._knocksRemaining.visible = false;
	}
	,resetKnocksCount: function() {
		co.doubleduck.Game.setTotalKnocks(0);
		this.updateTotalKnocks();
	}
	,removeHelpScreen: function() {
		this._helpBtn.onClick = $bind(this,this.showHelp);
		this._helpScreen.visible = false;
	}
	,closeHelp: function() {
		this._closeHelpBtn.onClick = null;
		this._closeHelpBtn.visible = false;
		this._helpScreenShown = false;
		this._helpBtn.visible = true;
		createjs.Tween.get(this._helpScreen).to({ alpha : 0},600).call($bind(this,this.removeHelpScreen));
	}
	,showCloseHelpButton: function() {
		this._closeHelpBtn.visible = true;
		this._closeHelpBtn.alpha = 0;
		createjs.Tween.get(this._closeHelpBtn).to({ alpha : 1},500);
		this._closeHelpBtn.onClick = $bind(this,this.closeHelp);
	}
	,showHelp: function(fade) {
		if(fade == null) fade = true;
		this._helpScreenShown = true;
		this._helpBtn.onClick = null;
		this._helpBtn.visible = false;
		if(fade) {
			this._helpScreen.alpha = 0;
			createjs.Tween.get(this._helpScreen).to({ alpha : 1},500).call($bind(this,this.showCloseHelpButton));
		} else {
			this._helpScreen.alpha = 1;
			this.showCloseHelpButton();
		}
		this._helpScreen.visible = true;
	}
	,handleSwipe: function(event) {
		if(event.direction == "left") this.handleNextVillage(); else if(event.direction == "right") this.handlePrevVillage();
	}
	,_closeHelpBtn: null
	,_helpScreen: null
	,_helpBtn: null
	,_helpScreenShown: null
	,_villagesRow: null
	,_targetPos: null
	,_isSweeping: null
	,_highscoreShadow: null
	,_highscore: null
	,_knocksRemaining: null
	,_villDB: null
	,_totalKnocksValue: null
	,_totalKnocksLabel: null
	,_playButton: null
	,_selectLeft: null
	,_selectRight: null
	,_chosenVillageId: null
	,_locksArray: null
	,_villageArray: null
	,_background: null
	,ROW_POS: null
	,SCROLL_EASE: null
	,UNFOCUS_SCALE: null
	,FOCUS_SCALE: null
	,VILLAGES_COUNT: null
	,onStart: null
	,__class__: co.doubleduck.Menu
});
co.doubleduck.Player = $hxClasses["co.doubleduck.Player"] = function(x,y,spriteSheetLoc) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	var width = 500;
	var height = 400;
	if(!co.doubleduck.Game.HD) {
		width = 250;
		height = 200;
	}
	var playerSpriteSheet = new createjs.SpriteSheet({ images : [co.doubleduck.Assets.getRawImage(spriteSheetLoc)], frames : { width : width, height : height}, animations : { idle : { frames : [0], frequency : 60}, run : { frames : [1,2], frequency : 20, next : "run"}, attackLeft : { frames : [3], frequency : 20, next : false}, attackRight : { frames : [4], frequency : 20, next : false}}});
	createjs.BitmapAnimation.call(this,playerSpriteSheet);
	this.scaleX = this.scaleY = co.doubleduck.Game.getScale();
	this.regX = this.spriteSheet._frameWidth / 2;
	this.regY = this.spriteSheet._frameHeight;
	this.x = x;
	this.y = y;
	this.gotoAndPlay("idle");
	this._shield = co.doubleduck.Assets.getImage("images/hero/shield.png");
	this._shield.scaleX = this._shield.scaleY = co.doubleduck.Game.getScale();
	this._shield.regX = this._shield.image.width / 2;
	this._shield.regY = this._shield.image.height;
	this._shield.alpha = 1;
	this._shield.visible = true;
};
co.doubleduck.Player.__name__ = ["co","doubleduck","Player"];
co.doubleduck.Player.__super__ = createjs.BitmapAnimation;
co.doubleduck.Player.prototype = $extend(createjs.BitmapAnimation.prototype,{
	removeShield: function() {
		if(this.parent != null && this.parent.getStage() != null) this.parent.getStage().removeChild(this._shield);
		this._shield.visible = false;
	}
	,unshowShield: function() {
	}
	,showShield: function() {
	}
	,getHeight: function() {
		return this.spriteSheet._frameHeight;
	}
	,getWidth: function() {
		return this.spriteSheet._frameWidth;
	}
	,idle: function() {
		this.gotoAndPlay("idle");
	}
	,run: function(force) {
		if(force == null) force = false;
		if(!force) {
			if(this.currentAnimation == "attackLeft" || this.currentAnimation == "attackRight") {
				var now = createjs.Ticker.getTime(false);
				if(now - this._lastAttack < co.doubleduck.Player.ATTACK_DURATION) return;
			}
		}
		if(this.currentAnimation != "run") this.gotoAndPlay("run");
	}
	,attack: function(hitType) {
		this._lastAttack = createjs.Ticker.getTime(false);
		switch(hitType) {
		case co.doubleduck.Player.ATTACK_LEFT:
			this.gotoAndPlay("attackLeft");
			break;
		case co.doubleduck.Player.ATTACK_RIGHT:
			this.gotoAndPlay("attackRight");
			break;
		case co.doubleduck.Player.ATTACK_BOTH:
			this.gotoAndPlay("attackBoth");
			break;
		default:
		}
	}
	,getHit: function() {
	}
	,_shield: null
	,_lastAttack: null
	,__class__: co.doubleduck.Player
});
co.doubleduck.Session = $hxClasses["co.doubleduck.Session"] = function(villageId) {
	this._lastEnemyArrivalTime = 0;
	this._isPaused = false;
	this._lastRespawnTime = 0;
	this._sessionEnded = false;
	createjs.Container.call(this);
	var multisData = new GameplayDB().getAllMultipliers();
	co.doubleduck.Session.MULTI_VALUES = multisData.values;
	co.doubleduck.Session.MULTI_THRESH = multisData.thresh;
	this._villageData = co.doubleduck.DataLoader.getVillage(villageId);
	this._knocks = 0;
	this._multiplierId = 0;
	this._spreeCounter = 0;
	this._shieldEnabled = false;
	this._focusEnabled = false;
	this._megaknockEnabled = false;
	this.initBackground();
	this._megaknockBack = co.doubleduck.Assets.getImage("images/powerups/Assets_Fury_BG.png");
	this._megaknockBack.visible = false;
	this._megaknockBack.regX = this._megaknockBack.image.width / 2;
	this._megaknockBack.regY = this._megaknockBack.image.height / 2;
	this._megaknockBack.x = co.doubleduck.Game.getViewport().width / 2;
	this._megaknockBack.y = co.doubleduck.Game.getViewport().height / 2;
	this._megaknockBack.scaleX = this._megaknockBack.scaleY = co.doubleduck.Game.getScale();
	this._megaknockFire = co.doubleduck.Assets.getImage("images/powerups/Assets_Fury_Blast.png");
	this._megaknockFire.visible = false;
	this._megaknockFire.regX = this._megaknockFire.image.width / 2;
	this._megaknockFire.x = co.doubleduck.Game.getViewport().width / 2;
	this._focusGrad = co.doubleduck.Assets.getImage("images/powerups/Assets_Zen.png");
	this._focusGrad.alpha = 0;
	this._focusGrad.visible = false;
	this._focusGrad.regX = this._focusGrad.image.width / 2;
	this._focusGrad.regY = this._focusGrad.image.height / 2;
	this._focusGrad.x = co.doubleduck.Game.getViewport().width / 2;
	this._focusGrad.y = co.doubleduck.Game.getViewport().height / 2;
	this._focusGrad.scaleX = this._focusGrad.scaleY = co.doubleduck.Game.getScale();
	this._enemiesLayer = new createjs.Container();
	this._player = new co.doubleduck.Player(co.doubleduck.Game.getViewport().width / 2,co.doubleduck.Game.getViewport().height * 0.95,this._villageData.heroSprite);
	this._shield = co.doubleduck.Assets.getImage("images/hero/shield.png");
	this._shield.alpha = 0;
	this._shield.visible = false;
	this._shield.regX = this._shield.image.width / 2;
	this._shield.regY = this._shield.image.height;
	this._shield.x = this._player.x;
	this._shield.y = this._player.y;
	this._shield.scaleX = this._shield.scaleY = co.doubleduck.Game.getScale();
	this._hud = new co.doubleduck.HUD();
	this._hud.setNumKnocks(0);
	this._hud.onPauseClick = $bind(this,this.handlePauseClick);
	this.addChild(this._megaknockBack);
	this.addChild(this._megaknockFire);
	this.addChild(this._focusGrad);
	this.addChild(this._enemiesLayer);
	this.addChild(this._player);
	this.addChild(this._shield);
	this.addChild(this._hud);
	this._enemies = new Array();
	co.doubleduck.Enemy.setSpeed(co.doubleduck.Session.MIN_ENEMY_SPEED * 1.5);
	this.midracha._speed = co.doubleduck.Session.MIN_ENEMY_SPEED * 1.5;
	this._player.run();
	co.doubleduck.Game.getStage().onMouseUp = $bind(this,this.playerClick);
	this._enemiesFacingTermination = 0;
	var _g1 = 0, _g = this._villageData.enemies.length;
	while(_g1 < _g) {
		var currEnemy = _g1++;
		if(co.doubleduck.DataLoader.getEnemy(this._villageData.enemies[currEnemy]).knocksToUnlock <= co.doubleduck.Persistence.getTotalKnocks()) this._hud.addEnemyType(co.doubleduck.DataLoader.getEnemy(this._villageData.enemies[currEnemy]));
	}
	this._powerUpCounter = 0;
	this._hud.setPowerUpProgession(this._powerUpCounter);
	this._counterFrom = 3;
	this.digitTween();
};
co.doubleduck.Session.__name__ = ["co","doubleduck","Session"];
co.doubleduck.Session.MULTI_VALUES = null;
co.doubleduck.Session.MULTI_THRESH = null;
co.doubleduck.Session.__super__ = createjs.Container;
co.doubleduck.Session.prototype = $extend(createjs.Container.prototype,{
	setRestartCallback: function(func) {
		this.onRestart = func;
		this._hud.onRestart = func;
	}
	,setMenuCallback: function(func) {
		this.onBackToMenu = func;
		this._hud.onMenuClick = func;
	}
	,destroy: function() {
		createjs.Ticker.removeListener(this);
		this.onRestart = null;
		this.onBackToMenu = null;
		this.onSessionEnd = null;
	}
	,resume: function() {
		if(this._isPaused) {
			this._isPaused = false;
			createjs.Ticker.setPaused(false);
			this._pauseDuration = createjs.Ticker.getTime(false) - this._pauseDuration;
			this._endTime += this._pauseDuration;
			this._hud.setPauseOverlay(false);
		}
	}
	,pause: function() {
		if(this._sessionEnded) return;
		if(!this._isPaused) {
			this._isPaused = true;
			createjs.Ticker.setPaused(true);
			this._pauseDuration = createjs.Ticker.getTime(false);
			this._hud.setPauseOverlay(true);
		}
	}
	,handlePauseClick: function() {
		if(this._isPaused) this.resume(); else this.pause();
	}
	,getIsPaused: function() {
		return this._isPaused;
	}
	,endMegaKnock: function() {
		this._megaknockFire.visible = false;
		this._megaknockBack.visible = false;
		this._megaknockEnabled = false;
	}
	,startMegaKnock: function() {
		if(this._megaknockEnabled) return;
		this._megaknockEnabled = true;
		this._megaknockBack.alpha = 0;
		this._megaknockBack.visible = true;
		createjs.Tween.get(this._megaknockBack).to({ alpha : 1},200);
		co.doubleduck.Enemy.setSpeed(co.doubleduck.Enemy.getSpeed() * 4);
		var targetY = co.doubleduck.Game.getViewport().height * 0.3;
		this._megaknockFire.y = this._player.y - this._player.getHeight() / 2;
		this._megaknockFire.visible = true;
		createjs.Tween.get(this._megaknockFire).to({ y : targetY},1300,createjs.Ease.sineInOut).wait(100).to({ y : this._megaknockFire.y},300,createjs.Ease.sineInOut);
		this._player.run(true);
		var playerYTarget = this._player.y - this._megaknockFire.y + targetY;
		createjs.Tween.get(this._player).to({ y : playerYTarget},1300,createjs.Ease.sineInOut).wait(100).to({ y : this._player.y},300,createjs.Ease.sineInOut).call($bind(this,this.endMegaKnock));
	}
	,removeFocus: function() {
		this._focusGrad.visible = false;
	}
	,endFocus: function() {
		this._focusEnabled = false;
		createjs.Tween.get(this._focusGrad).to({ alpha : 0},300).call($bind(this,this.removeFocus));
		var _g1 = 0, _g = this._enemies.length;
		while(_g1 < _g) {
			var i = _g1++;
			var offset = co.doubleduck.Game.getViewport().width * 0.1;
			if(this._enemies[i].getKilledByWeapon() == "B") offset *= -1;
			createjs.Tween.get(this._enemies[i]).to({ x : this._enemies[i].x - offset},300);
		}
	}
	,startFocus: function() {
		if(this._focusEnabled) return;
		this._focusGrad.visible = true;
		this._focusEnabled = true;
		createjs.Tween.get(this._focusGrad).to({ alpha : 1},500);
		var _g1 = 0, _g = this._enemies.length;
		while(_g1 < _g) {
			var i = _g1++;
			var offset = co.doubleduck.Game.getViewport().width * 0.1;
			if(this._enemies[i].getKilledByWeapon() == "B") offset *= -1;
			createjs.Tween.get(this._enemies[i]).to({ x : this._enemies[i].x + offset},600);
		}
		co.doubleduck.Utils.waitAndCall(this,6000,$bind(this,this.endFocus));
	}
	,removeShield: function() {
		this._shield.visible = false;
	}
	,disableShield: function() {
		createjs.Tween.get(this._shieldEnabled).to({ alpha : 0},500).call($bind(this,this.removeShield));
		this._shieldEnabled = false;
	}
	,startShield: function() {
		if(this._shieldEnabled) return;
		this._shield.visible = true;
		this._shieldEnabled = true;
		createjs.Tween.get(this._shield).to({ alpha : 1},500);
	}
	,startPowerup: function(name) {
		switch(name) {
		case "shield":
			this.startShield();
			break;
		case "focus":
			this.startFocus();
			break;
		case "megaknock":
			this.startMegaKnock();
			break;
		default:
			return;
		}
		this._hud.labelPowerup(name);
	}
	,enablePowerUp: function() {
		var powerupsArray = new Array();
		var powerupsData = new GameplayDB().getAllPowerups();
		var _g1 = 0, _g = powerupsData.length;
		while(_g1 < _g) {
			var i = _g1++;
			var unlockedIn = powerupsData[i].unlockedInVillage;
			if(unlockedIn <= this._villageData.id) powerupsArray[powerupsArray.length] = powerupsData[i].id;
		}
		var chosenPower = "";
		if(powerupsArray.length == 1) chosenPower = powerupsArray[0]; else if(powerupsArray.length > 1) chosenPower = powerupsArray[Std.random(powerupsArray.length)];
		this.startPowerup(chosenPower);
	}
	,handleEnemyDeath: function(killedByWeapon) {
		if(this._sessionEnded) return;
		if(!this._megaknockEnabled) this._player.attack(killedByWeapon);
		this._enemiesFacingTermination--;
		this._knocks += co.doubleduck.Session.MULTI_VALUES[this._multiplierId];
		this._hud.setNumKnocks(this._knocks);
		this._powerUpCounter += 0.08;
		if(this._powerUpCounter >= 1) {
			this.enablePowerUp();
			this._powerUpCounter = co.doubleduck.Session.COMBO_RENEW_SIZE;
		}
	}
	,spreeReset: function() {
		this._spreeCounter = 0;
		this._multiplierId = 0;
		this._hud.updateMultiplier(co.doubleduck.Session.MULTI_VALUES[this._multiplierId]);
	}
	,spreeIncrease: function() {
		this._spreeCounter++;
		if(this._spreeCounter >= co.doubleduck.Session.MULTI_THRESH[this._multiplierId + 1]) {
			this._multiplierId++;
			this._hud.updateMultiplier(co.doubleduck.Session.MULTI_VALUES[this._multiplierId]);
		}
	}
	,handleTimeUp: function() {
		this._sessionEnded = true;
		this.midracha.destroy();
		this._hud.setRemainingSecs(0);
		createjs.Ticker.removeListener(this);
		co.doubleduck.Game.getStage().onMouseUp = null;
		this.onSessionEnd();
		var _g1 = 1, _g = this._enemies.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._enemies[i].destroy();
		}
		var sessionEnd = new co.doubleduck.SessionEnd(this._knocks,this._villageData.id);
		sessionEnd.setMenuCallback(this.onBackToMenu);
		sessionEnd.setRestartCallback(this.onRestart);
		this.addChild(sessionEnd);
	}
	,startAttack: function(args) {
		var now = createjs.Ticker.getTime(true);
		if(this._lastEnemyArrivalTime != 0 && now - this._lastEnemyArrivalTime > co.doubleduck.Session.TIME_BEFORE_ICON_FOCUS) this._hud.focusIcons(this._enemyAttacking.getKilledByWeapon());
		if(this._enemyAttacking != null && !this._sessionEnded) {
			if(this._shieldEnabled) this.disableShield(); else {
				if(this._remainingSecs > 3) {
					this._remainingSecs -= 1;
					this._endTime -= 1000;
					this._hud.setRemainingSecs(this._remainingSecs);
					this._hud.showDecreaseSecond();
				}
				this._enemyAttacking.attack();
			}
			co.doubleduck.Utils.waitAndCall(this,650,$bind(this,this.enemyAttack));
		}
	}
	,enemyAttack: function() {
		if(this._enemyAttacking != null && !this._sessionEnded) {
			this._enemyAttacking.idle();
			co.doubleduck.Utils.waitAndCall(this,1050,$bind(this,this.startAttack));
		}
	}
	,tick: function(elapsed) {
		if(!this._sessionEnded && createjs.Ticker.getTime(false) >= this._endTime) this.handleTimeUp();
		if(this._powerUpCounter <= 0) this._powerUpCounter = 0; else {
			this._powerUpCounter -= elapsed / 1000 * 0.05;
			this._hud.setPowerUpProgession(this._powerUpCounter);
		}
		var lastEnemy = this._enemies[this._enemies.length - 1];
		var firstEnemy = this._enemies[0];
		if(lastEnemy != null) {
			if(lastEnemy.y >= co.doubleduck.Game.getViewport().height * 0.22) {
				if(co.doubleduck.Enemy.getSpeed() > 0) this.spawnEnemy();
			}
		}
		if(firstEnemy != null) {
			if(firstEnemy.y > co.doubleduck.Game.getViewport().height * 0.8) {
				if(this._enemyAttacking == null) {
					this._enemyAttacking = firstEnemy;
					co.doubleduck.Enemy.setSpeed(0);
					this.midracha._speed = 0;
					this._player.idle();
					this.enemyAttack();
					this._lastEnemyArrivalTime = createjs.Ticker.getTime(true);
				}
			} else {
				this._enemyAttacking = null;
				var decrementFactor = 1;
				if(firstEnemy.y > co.doubleduck.Game.getViewport().height * 0.6) decrementFactor += co.doubleduck.Utils.map(firstEnemy.y,co.doubleduck.Game.getViewport().height * 0.6,co.doubleduck.Game.getViewport().height * 0.8);
				var spd = co.doubleduck.Enemy.getSpeed() - co.doubleduck.Session.ENEMY_SPEED_DECREMENT * decrementFactor * (elapsed / 1000);
				if(spd < co.doubleduck.Session.MIN_ENEMY_SPEED) spd = co.doubleduck.Session.MIN_ENEMY_SPEED;
				co.doubleduck.Enemy.setSpeed(spd);
				this.midracha._speed = spd;
				this._player.run();
			}
		} else {
			this._enemyAttacking = null;
			this.spawnEnemy();
		}
		if(this._megaknockEnabled) {
			if(firstEnemy != null) {
				if(firstEnemy.y >= this._megaknockFire.y) {
					this.killClosestEnemy();
					firstEnemy.die();
				}
			}
		}
	}
	,spawnEnemy: function() {
		var now = createjs.Ticker.getTime(false);
		if(now - this._lastRespawnTime < 180 / co.doubleduck.Enemy.getSpeed()) return;
		var totalKnocks = co.doubleduck.Persistence.getTotalKnocks();
		var randType = 0;
		var isFound = false;
		while(!isFound) {
			randType = Math.floor(Math.random() * this._villageData.enemies.length);
			if(co.doubleduck.DataLoader.getEnemy(this._villageData.enemies[randType]).knocksToUnlock <= totalKnocks) isFound = true;
		}
		var newEnemy = co.doubleduck.Enemy.create(this._villageData.enemies[randType]);
		this._enemiesLayer.addChildAt(newEnemy,0);
		this._lastRespawnTime = now;
		newEnemy.x = co.doubleduck.Game.getViewport().width / 2;
		if(this._enemies.length >= 1) {
			var lastEnemy = this._enemies[this._enemies.length - 1];
			var delta;
			delta = co.doubleduck.Utils.map(lastEnemy.y,co.doubleduck.Game.getViewport().height * 0.22,co.doubleduck.Game.getViewport().height * 0.8,co.doubleduck.Game.getViewport().height * (0.22 - co.doubleduck.Enemy.SPAWN_LINE),co.doubleduck.Game.getViewport().height * (0.22 - co.doubleduck.Enemy.SPAWN_LINE) * 5);
			newEnemy.y = lastEnemy.y - delta;
		} else newEnemy.y = co.doubleduck.Game.getViewport().height * co.doubleduck.Enemy.SPAWN_LINE;
		newEnemy.onDeath = $bind(this,this.handleEnemyDeath);
		this._enemies[this._enemies.length] = newEnemy;
		if(this._focusEnabled) {
			var offset = co.doubleduck.Game.getViewport().width * 0.1;
			if(newEnemy.getKilledByWeapon() == "B") offset *= -1;
			newEnemy.x += offset;
		}
	}
	,getKnocks: function() {
		return this._knocks;
	}
	,getVillageId: function() {
		return this._villageData.id;
	}
	,killClosestEnemy: function() {
		this._lastEnemyArrivalTime = 0;
		var closestEnemy = this._enemies[0];
		closestEnemy.prepareForTermination();
		this._enemiesFacingTermination++;
		this._enemies.splice(0,1);
		this.spreeIncrease();
		var enemySpeed = co.doubleduck.Enemy.getSpeed();
		enemySpeed += co.doubleduck.Session.ENEMY_SPEED_INCREMENT;
		if(enemySpeed > co.doubleduck.Session.MAX_ENEMY_SPEED) enemySpeed = co.doubleduck.Session.MAX_ENEMY_SPEED;
		co.doubleduck.Enemy.setSpeed(enemySpeed);
		this.midracha._speed = enemySpeed;
	}
	,resetBg: function() {
		if(co.doubleduck.Enemy.getSpeed() == 0) this._background.spriteSheet.getAnimation("idle").frequency = 0; else if(this._background.spriteSheet.getAnimation("idle").frequency == 0) {
			this._background.spriteSheet.getAnimation("idle").frequency = 30;
			this._background.gotoAndPlay("idle");
		}
	}
	,initBackground: function() {
		var bg = co.doubleduck.Assets.getImage("images/villages/village" + Std.string(this._villageData.id) + "/bgstatic.png");
		this.midracha = new co.doubleduck.Sidewalk("images/villages/village" + Std.string(this._villageData.id) + "/midracha.png");
		this.midracha.x = co.doubleduck.Game.getViewport().width / 2 - co.doubleduck.Game.MAX_WIDTH * co.doubleduck.Game.getScale() / 2;
		this.addChildAt(this.midracha,0);
		bg.scaleX = bg.scaleY = co.doubleduck.Game.getScale();
		bg.regX = bg.image.width / 2;
		bg.regY = bg.image.height / 2;
		bg.x = co.doubleduck.Game.getViewport().width / 2;
		bg.y = co.doubleduck.Game.getViewport().height / 2;
		this.addChildAt(bg,1);
	}
	,playerClick: function() {
		if(this._isPaused) return;
		if(this._counterFrom > 0) return;
		if(this._enemies.length == 0) return;
		if(this._megaknockEnabled) return;
		if(this._hud.isMouseOnPause()) return;
		var weaponType = "";
		if(co.doubleduck.Game.getStage().mouseX < co.doubleduck.Game.getViewport().width / 2) weaponType = "B"; else weaponType = "A";
		var closestEnemy = this._enemies[0];
		if(closestEnemy.getKilledByWeapon() == weaponType) this.killClosestEnemy(); else if(this._shieldEnabled) this.disableShield(); else this.spreeReset();
	}
	,calcSecs: function() {
		if(!this._sessionEnded) {
			this._hud.setRemainingSecs(this._remainingSecs);
			this._remainingSecs -= 1;
			if(this._remainingSecs <= 4) this._hud.popupFiveSecs();
			createjs.Tween.get(this).wait(1000).call($bind(this,this.calcSecs));
		}
	}
	,startGame: function() {
		this._endTime = 9999999999;
		createjs.Ticker.addListener(this);
	}
	,startClock: function() {
		this._startTime = createjs.Ticker.getTime(false);
		this._endTime = this._startTime + this._villageData.duration * 1000;
		this._remainingSecs = this._villageData.duration;
		this.calcSecs();
	}
	,digitTween: function() {
		var num = this._counterFrom;
		if(this.currDigit != null) this.removeChild(this.currDigit);
		this.currDigit = co.doubleduck.FontHelper.getNumber(num,co.doubleduck.Game.getScale(),true);
		this.currDigit.regX = this.currDigit.image.width / 2;
		this.currDigit.regY = this.currDigit.image.height / 2;
		this.currDigit.x = co.doubleduck.Game.getViewport().width / 2;
		this.currDigit.y = co.doubleduck.Game.getViewport().height / 2;
		this.addChildAt(this.currDigit,this.getChildIndex(this._hud));
		if(num == 0) {
			this.removeChild(this.currDigit);
			this.currDigit = null;
			this.startClock();
		} else if(num == 1) createjs.Tween.get(this.currDigit).to({ alpha : 0, scaleX : this.currDigit.scaleX * 2, scaleY : this.currDigit.scaleY * 2},800).wait(650).call($bind(this,this.digitTween)); else if(num == 2) {
			this.startGame();
			createjs.Tween.get(this.currDigit).to({ alpha : 0, scaleX : this.currDigit.scaleX * 2, scaleY : this.currDigit.scaleY * 2},800).wait(650).call($bind(this,this.digitTween));
		} else createjs.Tween.get(this.currDigit).to({ alpha : 0, scaleX : this.currDigit.scaleX * 2, scaleY : this.currDigit.scaleY * 2},800).wait(650).call($bind(this,this.digitTween));
		this._counterFrom -= 1;
	}
	,_lastEnemyArrivalTime: null
	,_pauseDuration: null
	,_isPaused: null
	,_lastRespawnTime: null
	,_counterFrom: null
	,currDigit: null
	,_enemyAttacking: null
	,midracha: null
	,_remainingSecs: null
	,_sessionEnded: null
	,_endTime: null
	,_startTime: null
	,_villageData: null
	,_megaknockFire: null
	,_megaknockBack: null
	,_megaknockEnabled: null
	,_focusGrad: null
	,_focusEnabled: null
	,_shield: null
	,_shieldEnabled: null
	,_hud: null
	,_enemiesFacingTermination: null
	,_player: null
	,_enemiesLayer: null
	,_enemies: null
	,_backMisc: null
	,_background: null
	,_powerUpCounter: null
	,_spreeCounter: null
	,_multiplierId: null
	,_knocks: null
	,onBackToMenu: null
	,onSessionEnd: null
	,onRestart: null
	,__class__: co.doubleduck.Session
});
co.doubleduck.SessionEnd = $hxClasses["co.doubleduck.SessionEnd"] = function(knocks,villageId) {
	createjs.Container.call(this);
	this._highScore = false;
	this._knocks = knocks;
	this._villageId = villageId;
	var shp = new createjs.Shape();
	shp.graphics.beginFill("#000000");
	shp.graphics.drawRect(0,0,co.doubleduck.Game.MAX_WIDTH,co.doubleduck.Game.MAX_HEIGHT);
	shp.graphics.endFill();
	shp.alpha = 0.5;
	this.addChild(shp);
	this._screenContainer = new createjs.Container();
	this.addChild(this._screenContainer);
	this._bg = co.doubleduck.Assets.getImage("images/session_end/gameover.png");
	this._bg.regY = this._bg.image.height / 2;
	this._bg.y = co.doubleduck.Game.MAX_HEIGHT * 0.32;
	this._screenContainer.addChild(this._bg);
	this._restartBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session_end/gameover-65.png"));
	this._screenContainer.addChild(this._restartBtn);
	this._menuBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session_end/gameover-64.png"));
	this._screenContainer.addChild(this._menuBtn);
	this._menuBtn.x = co.doubleduck.Game.MAX_WIDTH * 0.15;
	this._menuBtn.y = co.doubleduck.Game.MAX_HEIGHT * 0.60;
	this._menuBtn.mouseEnabled = false;
	this._menuBtn.alpha = 0;
	this._restartBtn.x = co.doubleduck.Game.MAX_WIDTH * 0.54;
	this._restartBtn.y = co.doubleduck.Game.MAX_HEIGHT * 0.60;
	this._restartBtn.mouseEnabled = false;
	this._restartBtn.alpha = 0;
	this.scaleX = this.scaleY = co.doubleduck.Game.getScale();
	this.regX = this._bg.image.width / 2;
	this.x = co.doubleduck.Game.getViewport().width / 2;
	this._screenContainer.y -= co.doubleduck.Game.MAX_HEIGHT;
	createjs.Tween.get(this._screenContainer).to({ y : 0},1000,createjs.Ease.bounceOut).call($bind(this,this.doScore));
	this.updateHighscore();
};
co.doubleduck.SessionEnd.__name__ = ["co","doubleduck","SessionEnd"];
co.doubleduck.SessionEnd.__super__ = createjs.Container;
co.doubleduck.SessionEnd.prototype = $extend(createjs.Container.prototype,{
	setRestartCallback: function(restartFunc) {
		this._restartBtn.onClick = restartFunc;
	}
	,setMenuCallback: function(menuFunc) {
		this._menuBtn.onClick = menuFunc;
	}
	,enableButtons: function() {
		this._menuBtn.mouseEnabled = true;
		this._restartBtn.mouseEnabled = true;
	}
	,checkUpdateVillage: function() {
		var unlockedArea = false;
		var villagedb = new VillageDB();
		var totalKnocks = co.doubleduck.Persistence.getTotalKnocks();
		var _g1 = 0, _g = villagedb.getAllVillages().length;
		while(_g1 < _g) {
			var i = _g1++;
			var currVillage = villagedb.getAllVillages()[i];
			var knocksToUnlock = currVillage.knocksToUnlock;
			var wasLocked = totalKnocks - this._knocks < knocksToUnlock;
			var isUnlocked = totalKnocks >= knocksToUnlock;
			unlockedArea = wasLocked && isUnlocked;
			if(unlockedArea) break;
		}
		if(unlockedArea) {
			this._unlockVillageBar = co.doubleduck.Assets.getImage("images/session_end/gameover-63.png");
			this._unlockVillageBar.regX = this._unlockVillageBar.image.width / 2;
			this._unlockVillageBar.regY = this._unlockVillageBar.image.height / 2;
			this._unlockVillageBar.x = co.doubleduck.Game.MAX_WIDTH * 0.70 * 1.5;
			this._unlockVillageBar.y = co.doubleduck.Game.MAX_HEIGHT * 0.48 * 0.5;
			this._unlockVillageBar.rotation = 20;
			this._unlockVillageBar.alpha = 0;
			createjs.Tween.get(this._unlockVillageBar).wait(200).to({ alpha : 1, x : co.doubleduck.Game.MAX_WIDTH * 0.75, y : co.doubleduck.Game.MAX_HEIGHT * 0.36},250,createjs.Ease.sineIn);
			this._screenContainer.addChildAt(this._unlockVillageBar,2);
		}
	}
	,setKnocks: function(num) {
		if(this._knocksDisplay != null) this._screenContainer.removeChild(this._knocksDisplay);
		this._knocksDisplay = co.doubleduck.FontHelper.getNumber(num);
		var numStr = "" + this._knocks;
		this._knocksDisplay.x = co.doubleduck.Game.MAX_WIDTH / 2 - numStr.length / 2 * 29;
		this._knocksDisplay.y = co.doubleduck.Game.MAX_HEIGHT * 0.43;
		this._screenContainer.addChildAt(this._knocksDisplay,1);
	}
	,updateHighscore: function() {
		var currScore = co.doubleduck.Persistence.getVillageHighscore(this._villageId);
		if(currScore == null) currScore = 0;
		if(this._knocks > currScore) {
			co.doubleduck.Persistence.setVillageHighscore(this._villageId,this._knocks);
			this._highScore = true;
		}
	}
	,showHighScore: function() {
		this._highscoreBar = co.doubleduck.Assets.getImage("images/session_end/highscore.png");
		this._highscoreBar.regX = this._highscoreBar.image.width / 2;
		this._highscoreBar.regY = this._highscoreBar.image.height / 2;
		this._highscoreBar.x = co.doubleduck.Game.MAX_WIDTH * 0.30 * 0.5;
		this._highscoreBar.y = co.doubleduck.Game.MAX_HEIGHT * 0.48 * 0.5;
		this._highscoreBar.rotation = -15;
		this._highscoreBar.alpha = 0;
		this._screenContainer.addChild(this._highscoreBar);
		createjs.Tween.get(this._highscoreBar).wait(200).to({ alpha : 1, x : co.doubleduck.Game.MAX_WIDTH * 0.25, y : co.doubleduck.Game.MAX_HEIGHT * 0.38},250,createjs.Ease.sineIn).call($bind(this,this.checkUpdateVillage));
	}
	,updateScore: function() {
		var now = createjs.Ticker.getTime(false);
		var interval = 500;
		if(this._knocks > 20) interval = 1200;
		var dTime = now - this._scoreStartTime;
		var relativeScore = this._knocks * (dTime / interval) | 0;
		if(relativeScore > this._knocks) relativeScore = this._knocks;
		this.setKnocks(relativeScore);
		if(now - interval > this._scoreStartTime) {
			if(this._highScore && this._highscoreBar == null) this.showHighScore(); else if(this._unlockVillageBar == null) this.checkUpdateVillage();
			this.setKnocks(this._knocks);
		} else if(relativeScore < this._knocks) createjs.Tween.get(this).wait(10).call($bind(this,this.updateScore));
	}
	,showButtons: function() {
		createjs.Tween.get(this._menuBtn).to({ alpha : 1},500).call($bind(this,this.enableButtons));
		createjs.Tween.get(this._restartBtn).to({ alpha : 1},500);
	}
	,doScore: function() {
		this._scoreStartTime = createjs.Ticker.getTime(false);
		this.updateScore();
		co.doubleduck.Utils.waitAndCall(this,500,$bind(this,this.showButtons));
	}
	,_highScore: null
	,_highscoreBar: null
	,_unlockVillageBar: null
	,_scoreStartTime: null
	,_knocksDisplay: null
	,_villageId: null
	,_knocks: null
	,_screenContainer: null
	,_menuBtn: null
	,_restartBtn: null
	,_bg: null
	,__class__: co.doubleduck.SessionEnd
});
co.doubleduck.Sidewalk = $hxClasses["co.doubleduck.Sidewalk"] = function(imageUri) {
	createjs.Container.call(this);
	this._parts = new Array();
	this._uri = imageUri;
	var currY = co.doubleduck.Game.getViewport().height * 1.5;
	while(currY > -1 * co.doubleduck.Game.getViewport().height) {
		var newPart = co.doubleduck.Assets.getImage(imageUri);
		newPart.y = currY;
		newPart.scaleX = newPart.scaleY = co.doubleduck.Game.getScale();
		this._parts[this._parts.length] = newPart;
		this.addChild(newPart);
		currY -= (newPart.image.height - 10) * co.doubleduck.Game.getScale();
	}
	this._speed = 0.05;
	createjs.Ticker.addListener(this);
};
co.doubleduck.Sidewalk.__name__ = ["co","doubleduck","Sidewalk"];
co.doubleduck.Sidewalk.__super__ = createjs.Container;
co.doubleduck.Sidewalk.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		createjs.Ticker.removeListener(this);
	}
	,tick: function(elapsed) {
		var lastPart = this._parts[0];
		if(lastPart.y > co.doubleduck.Game.getViewport().height) {
			var newPart = co.doubleduck.Assets.getImage(this._uri);
			newPart.y = this._parts[this._parts.length - 1].y - this._parts[this._parts.length - 1].image.height * co.doubleduck.Game.getScale() + 10;
			newPart.scaleX = newPart.scaleY = co.doubleduck.Game.getScale();
			this._parts[this._parts.length] = newPart;
			this.removeChild(lastPart);
			this._parts.splice(0,1);
			this.addChild(newPart);
		}
		var _g1 = 0, _g = this._parts.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._parts[i].y += co.doubleduck.Game.getViewport().height * this._speed * (elapsed / 1000);
		}
	}
	,_speed: null
	,_uri: null
	,_parts: null
	,__class__: co.doubleduck.Sidewalk
});
co.doubleduck.Utils = $hxClasses["co.doubleduck.Utils"] = function() {
};
co.doubleduck.Utils.__name__ = ["co","doubleduck","Utils"];
co.doubleduck.Utils.map = function(value,aMin,aMax,bMin,bMax) {
	if(bMax == null) bMax = 1;
	if(bMin == null) bMin = 0;
	if(value <= aMin) return bMin;
	if(value >= aMax) return bMax;
	return (value - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
co.doubleduck.Utils.waitAndCall = function(parent,delay,func,args) {
	createjs.Tween.get(parent).wait(delay).call(func,args);
}
co.doubleduck.Utils.tintBitmap = function(src,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var colorFilter = new createjs.ColorFilter(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	src.cache(src.x,src.y,src.image.width,src.image.height);
	src.filters = [colorFilter];
	src.updateCache();
}
co.doubleduck.Utils.prototype = {
	__class__: co.doubleduck.Utils
}
var haxe = haxe || {}
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serializeException: function(e) {
		this.buf.b += Std.string("x");
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += Std.string("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.b += Std.string("z");
				return;
			}
			this.buf.b += Std.string("i");
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += Std.string("k"); else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += Std.string("d");
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += Std.string("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += Std.string("n"); else {
								this.buf.b += Std.string("u");
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += Std.string("n"); else {
						this.buf.b += Std.string("u");
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += Std.string("h");
				break;
			case List:
				this.buf.b += Std.string("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += Std.string("h");
				break;
			case Date:
				var d = v;
				this.buf.b += Std.string("v");
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += Std.string("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case IntHash:
				this.buf.b += Std.string("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += Std.string(":");
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += Std.string("s");
				this.buf.b += Std.string(chars.length);
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += Std.string("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += Std.string("g");
				} else {
					this.buf.b += Std.string("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += Std.string("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += Std.string(":");
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += Std.string("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += Std.string("r");
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += Std.string("R");
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += Std.string("y");
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += Std.string(":");
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.charCodeAt(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.FlashJsConnection = $hxClasses["haxe.remoting.FlashJsConnection"] = function() { }
haxe.remoting.FlashJsConnection.__name__ = ["haxe","remoting","FlashJsConnection"];
haxe.remoting.FlashJsConnection.flashCall = function(flashObj,name,path,params) {
	try {
		var fobj = window.document[flashObj];
		if(fobj == null) fobj = window.document.getElementById[flashObj];
		if(fobj == null) throw "Could not find flash object '" + flashObj + "'";
		var data = null;
		try {
			data = fobj.flashJsRemotingCall(name,path,params);
		} catch( e ) {
		}
		if(data == null) throw "Flash object " + flashObj + " does not have an active FlashJsConnection";
		return data;
	} catch( e ) {
		var s = new haxe.Serializer();
		s.serializeException(e);
		return s.toString();
	}
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
co.doubleduck.Persistence.GAME_PREFIX = "NK_";
co.doubleduck.Persistence.available = co.doubleduck.Persistence.localStorageSupported();
co.doubleduck.Assets.onLoadAll = null;
co.doubleduck.Assets._loader = null;
co.doubleduck.Assets._cacheData = { };
co.doubleduck.Assets._loadCallbacks = { };
co.doubleduck.Assets.loaded = 0;
co.doubleduck.Assets._useLocalStorage = co.doubleduck.Persistence.available;
co.doubleduck.Enemy.DEATH_ZONE_PERCENTAGE = 0.77;
co.doubleduck.Enemy.SPAWN_LINE = 0.14;
co.doubleduck.Enemy.MAX_SCALE_LINE = 0.5;
co.doubleduck.Enemy.MAX_ENEMY_SPEED = 2;
co.doubleduck.Enemy._speed = 0.1;
co.doubleduck.Game._viewport = null;
co.doubleduck.Game._scale = 1;
co.doubleduck.Game.MAX_HEIGHT = 641;
co.doubleduck.Game.MAX_WIDTH = 427;
co.doubleduck.Game.HD = false;
co.doubleduck.Game.DEBUG = false;
co.doubleduck.Player.ATTACK_LEFT = "B";
co.doubleduck.Player.ATTACK_RIGHT = "A";
co.doubleduck.Player.ATTACK_BOTH = "C";
co.doubleduck.Player.ATTACK_DURATION = 300;
co.doubleduck.Session.MIN_ENEMY_SPEED = 0.22;
co.doubleduck.Session.MAX_ENEMY_SPEED = 0.6;
co.doubleduck.Session.ENEMY_SPEED_INCREMENT = 0.18;
co.doubleduck.Session.ENEMY_SPEED_DECREMENT = 0.13;
co.doubleduck.Session.COMBO_RENEW_SIZE = 0.33;
co.doubleduck.Session.TIME_BEFORE_ICON_FOCUS = 3000;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
js.Lib.onerror = null;
co.doubleduck.Main.main();
