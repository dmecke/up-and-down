/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $ = __webpack_require__(8);
	__webpack_require__(9);
	
	var Vue = __webpack_require__(10);
	
	var game = new _Game2.default();
	
	new Vue({
	    el: '#game',
	    data: {
	        game: game,
	        movingCardIndex: null
	    },
	    methods: {
	        toggleCard: function toggleCard(card, index) {
	            $('.card').removeClass('moving');
	            this.movingCardIndex = index;
	            $(card).closest('.card').addClass('moving');
	        },
	        dropCard: function dropCard(slot) {
	            if (null == this.movingCardIndex) return;
	
	            var handIndex = this.movingCardIndex;
	            var card = this.game.hand.cards[handIndex];
	
	            if (this.game.slot(slot).isValid(card)) {
	                this.game.dropCard(handIndex, slot, card);
	                $('.card').removeClass('moving');
	                this.movingCardIndex = null;
	            }
	        }
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Hand_1 = __webpack_require__(2);
	var SlotUp_1 = __webpack_require__(3);
	var SlotDown_1 = __webpack_require__(5);
	var Stack_1 = __webpack_require__(6);
	var Game = (function () {
	    function Game() {
	        this.stack = new Stack_1["default"]();
	        this.hand = new Hand_1["default"]();
	        this.slotOneUp = new SlotUp_1["default"]();
	        this.slotTwoUp = new SlotUp_1["default"]();
	        this.slotOneDown = new SlotDown_1["default"]();
	        this.slotTwoDown = new SlotDown_1["default"]();
	        this.hand.take(this.stack.draw(7));
	    }
	    Game.prototype.score = function () {
	        return this.stack.numberOfCards() + this.hand.numberOfCards();
	    };
	    Game.prototype.dropCard = function (handIndex, slot, card) {
	        this.slot(slot).drop(card);
	        // this.hand.cards.splice(handIndex, 1);
	        this.slot(slot).lastCard().rerotate();
	        var newCard = this.stack.drawOne();
	        newCard.rerotate();
	        this.hand.takeOne(newCard, handIndex);
	    };
	    Game.prototype.isGameOver = function () {
	        if (this.slotOneUp.canBeServedBy(this.hand)) {
	            return false;
	        }
	        if (this.slotTwoUp.canBeServedBy(this.hand)) {
	            return false;
	        }
	        if (this.slotOneDown.canBeServedBy(this.hand)) {
	            return false;
	        }
	        if (this.slotTwoDown.canBeServedBy(this.hand)) {
	            return false;
	        }
	        return true;
	    };
	    Game.prototype.slot = function (index) {
	        switch (index) {
	            case 0:
	                return this.slotOneUp;
	            case 1:
	                return this.slotTwoUp;
	            case 2:
	                return this.slotOneDown;
	            case 3:
	                return this.slotTwoDown;
	        }
	    };
	    return Game;
	}());
	exports.__esModule = true;
	exports["default"] = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Hand = (function () {
	    function Hand() {
	        this.cards = [];
	    }
	    Hand.prototype.take = function (cards) {
	        var card;
	        while (card = cards.pop()) {
	            this.cards.push(card);
	        }
	    };
	    Hand.prototype.takeOne = function (card, index) {
	        this.cards[index] = card;
	    };
	    Hand.prototype.numberOfCards = function () {
	        return this.cards.length;
	    };
	    return Hand;
	}());
	exports.__esModule = true;
	exports["default"] = Hand;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Slot_1 = __webpack_require__(4);
	var SlotUp = (function (_super) {
	    __extends(SlotUp, _super);
	    function SlotUp() {
	        _super.apply(this, arguments);
	    }
	    SlotUp.prototype.isValid = function (card) {
	        if (this.cards.length == 0) {
	            return true;
	        }
	        var lastCard = this.cards[this.cards.length - 1];
	        if (card.value == lastCard.value - 10) {
	            return true;
	        }
	        return card.value > lastCard.value;
	    };
	    return SlotUp;
	}(Slot_1["default"]));
	exports.__esModule = true;
	exports["default"] = SlotUp;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Slot = (function () {
	    function Slot() {
	        this.cards = [];
	    }
	    Slot.prototype.drop = function (card) {
	        this.cards.push(card);
	    };
	    Slot.prototype.canBeServedBy = function (hand) {
	        for (var i = 1; i <= hand.numberOfCards(); i++) {
	            if (this.isValid(hand.cards[i - 1])) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Slot.prototype.lastCard = function () {
	        return this.cards[this.cards.length - 1];
	    };
	    return Slot;
	}());
	exports.__esModule = true;
	exports["default"] = Slot;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Slot_1 = __webpack_require__(4);
	var SlotDown = (function (_super) {
	    __extends(SlotDown, _super);
	    function SlotDown() {
	        _super.apply(this, arguments);
	    }
	    SlotDown.prototype.isValid = function (card) {
	        if (this.cards.length == 0) {
	            return true;
	        }
	        var lastCard = this.cards[this.cards.length - 1];
	        if (card.value == lastCard.value + 10) {
	            return true;
	        }
	        return card.value < lastCard.value;
	    };
	    return SlotDown;
	}(Slot_1["default"]));
	exports.__esModule = true;
	exports["default"] = SlotDown;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Card_1 = __webpack_require__(7);
	var Stack = (function () {
	    function Stack() {
	        this.cards = [];
	        for (var i = 1; i <= 100; i++) {
	            this.cards.push(new Card_1["default"](i));
	        }
	        this.shuffleCards();
	    }
	    Stack.prototype.draw = function (amount) {
	        var cards = [];
	        for (var i = 1; i <= amount; i++) {
	            cards.push(this.cards.pop());
	        }
	        return cards;
	    };
	    Stack.prototype.drawOne = function () {
	        return this.draw(1)[0];
	    };
	    Stack.prototype.numberOfCards = function () {
	        return this.cards.length;
	    };
	    Stack.prototype.shuffleCards = function () {
	        for (var i = this.cards.length - 1; i > 0; i--) {
	            var j = Math.floor(Math.random() * (i + 1));
	            var temp = this.cards[i];
	            this.cards[i] = this.cards[j];
	            this.cards[j] = temp;
	        }
	    };
	    return Stack;
	}());
	exports.__esModule = true;
	exports["default"] = Stack;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Card = (function () {
	    function Card(value) {
	        this.value = value;
	        this.rerotate();
	    }
	    Card.prototype.rerotate = function () {
	        this.rotation = Math.random() * 6 - 3;
	    };
	    return Card;
	}());
	exports.__esModule = true;
	exports["default"] = Card;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.1.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-09-22T22:30Z
	 */
	( function( global, factory ) {
	
		"use strict";
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
	
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	
	var arr = [];
	
	var document = window.document;
	
	var getProto = Object.getPrototypeOf;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var fnToString = hasOwn.toString;
	
	var ObjectFunctionString = fnToString.call( Object );
	
	var support = {};
	
	
	
		function DOMEval( code, doc ) {
			doc = doc || document;
	
			var script = doc.createElement( "script" );
	
			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	
	
	
	var
		version = "3.1.1",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
	
			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}
	
			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&
	
				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},
	
		isPlainObject: function( obj ) {
			var proto, Ctor;
	
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
	
			proto = getProto( obj );
	
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}
	
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},
	
		isEmptyObject: function( obj ) {
	
			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;
	
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
	
		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {
	
				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}
	
				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}
	
			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},
	
		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");
	
		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
	
		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {
	
			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {
	
				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {
	
					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}
	
					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||
	
						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}
	
				return elem.disabled === disabled;
	
			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}
	
			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
	
			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
	
			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );
	
					if ( elem ) {
	
						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
	
						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}
	
					return [];
				}
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";
	
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	
	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}
	
		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}
	
		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}
	
		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}
	
		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}
	
		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						if ( elem ) {
	
							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );
	
			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :
	
							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
							matched.push( cur );
							break;
						}
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}
	
	function adoptValue( value, resolve, reject ) {
		var method;
	
		try {
	
			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );
	
			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );
	
			// Other non-thenables
			} else {
	
				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}
	
		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {
	
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},
	
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
	
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
	
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
	
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
	
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}
	
										returned = handler.apply( that, args );
	
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}
	
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
	
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;
	
										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {
	
											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);
	
											// Normal processors (resolve) also hook into progress
											} else {
	
												// ...and disregard older resolution values
												maxDepth++;
	
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}
	
										// Handle all other returned values
										} else {
	
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}
	
											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},
	
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {
	
												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}
	
												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {
	
													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}
	
													deferred.rejectWith( that, args );
												}
											}
										};
	
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {
	
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}
	
						return jQuery.Deferred( function( newDefer ) {
	
							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);
	
							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);
	
							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];
	
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(
						function() {
	
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
	
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,
	
						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}
	
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );
	
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};
	
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( singleValue ) {
			var
	
				// count of uncompleted subordinates
				remaining = arguments.length,
	
				// count of unprocessed arguments
				i = remaining,
	
				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),
	
				// the master Deferred
				master = jQuery.Deferred(),
	
				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};
	
			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );
	
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
	
					return master.then();
				}
			}
	
			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}
	
			return master.promise();
		}
	} );
	
	
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	
	jQuery.Deferred.exceptionHook = function( error, stack ) {
	
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};
	
	
	
	
	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};
	
	
	
	
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	
	jQuery.fn.ready = function( fn ) {
	
		readyList
			.then( fn )
	
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );
	
	jQuery.ready.then = readyList.then;
	
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );
	
	} else {
	
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );
	
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		if ( chainable ) {
			return elems;
		}
	
		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}
	
		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		cache: function( owner ) {
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
	
				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				return this.get( owner, key );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key !== undefined ) {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );
	
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}
	
				i = key.length;
	
				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}
	
		if ( data === "false" ) {
			return false;
		}
	
		if ( data === "null" ) {
			return null;
		}
	
		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}
	
		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}
	
		return data;
	}
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each( function() {
	
					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHiddenWithinTree = function( elem, el ) {
	
			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
	
			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&
	
				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&
	
				jQuery.css( elem, "display" ) === "none";
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	
	
	var defaultDisplayMap = {};
	
	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];
	
		if ( display ) {
			return display;
		}
	
		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );
	
		temp.parentNode.removeChild( temp );
	
		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;
	
		return display;
	}
	
	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
	
		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			display = elem.style.display;
			if ( show ) {
	
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";
	
					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}
	
		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}
	
		return elements;
	}
	
	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;
	
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );
	
		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );
	
		} else {
			ret = [];
		}
	
		if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}
	
		return ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;
	
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( nativeEvent ) {
	
			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );
	
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
	
			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}
	
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			if ( delegateCount &&
	
				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&
	
				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
	
				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},
	
				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},
	
		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;
	
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
	
		which: function( event ) {
			var button = event.button;
	
			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}
	
			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}
	
				if ( button & 2 ) {
					return 3;
				}
	
				if ( button & 4 ) {
					return 2;
				}
	
				return 0;
			}
	
			return event.which;
		}
	}, jQuery.event.addProp );
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
	
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
	
		/* eslint-disable max-len */
	
		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	
		/* eslint-enable */
	
		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
	
			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}
	
		return elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	
	
	( function() {
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
	
			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}
	
			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
	
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
	
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}
	
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;
	
		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;
	
		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
	
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
	
					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}
	
		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {
	
			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {
	
					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}
	
			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {
	
					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {
	
			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}
	
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}
	
				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}
	
				/* eslint-disable no-loop-func */
	
				anim.done( function() {
	
				/* eslint-enable no-loop-func */
	
					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}
	
			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;
	
		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];
	
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name,
				i = 0,
	
				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
	
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}
	
					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}
	
					return -1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}
	
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}
	
					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;
	
					if ( index < 0 ) {
						i = max;
	
					} else {
						i = one ? index : 0;
					}
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
	
						/* eslint-disable no-cond-assign */
	
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
	
						/* eslint-enable no-cond-assign */
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {
	
				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;
	
				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				if ( val == null ) {
					return null;
				}
	
				if ( jQuery.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}
	
				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": JSON.parse,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// Request state (becomes false upon send and true upon completion)
				completed,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// uncached part of the url
				uncached,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {
	
								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR );
	
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}
	
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
	
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}
	
					// Propagate others as results
					done( -1, e );
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Ignore repeat invocations
				if ( completed ) {
					return;
				}
	
				completed = true;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );
	
	
	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};
	
	
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
	
		var base, parsed, scripts;
	
		if ( !context ) {
	
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );
	
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}
	
		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
	
			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win, rect, doc,
				elem = this[ 0 ];
	
			if ( !elem ) {
				return;
			}
	
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}
	
			rect = elem.getBoundingClientRect();
	
			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;
	
				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}
	
			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );
	
	jQuery.parseJSON = JSON.parse;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	
	return jQuery;
	} );


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery UI - v1.11.1 - 2014-08-13
	* http://jqueryui.com
	* Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
	* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
	
	(function( factory ) {
		if ( true ) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(8) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
	
			// Browser globals
			factory( jQuery );
		}
	}(function( $ ) {
	/*!
	 * jQuery UI Core 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */
	
	
	// $.ui might exist from components with no dependencies, e.g., $.ui.position
	$.ui = $.ui || {};
	
	$.extend( $.ui, {
		version: "1.11.1",
	
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	});
	
	// plugins
	$.fn.extend({
		scrollParent: function( includeHidden ) {
			var position = this.css( "position" ),
				excludeStaticParent = position === "absolute",
				overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				scrollParent = this.parents().filter( function() {
					var parent = $( this );
					if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
						return false;
					}
					return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
				}).eq( 0 );
	
			return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
		},
	
		uniqueId: (function() {
			var uuid = 0;
	
			return function() {
				return this.each(function() {
					if ( !this.id ) {
						this.id = "ui-id-" + ( ++uuid );
					}
				});
			};
		})(),
	
		removeUniqueId: function() {
			return this.each(function() {
				if ( /^ui-id-\d+$/.test( this.id ) ) {
					$( this ).removeAttr( "id" );
				}
			});
		}
	});
	
	// selectors
	function focusable( element, isTabIndexNotNaN ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase();
		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
			return !!img && visible( img );
		}
		return ( /input|select|textarea|button|object/.test( nodeName ) ?
			!element.disabled :
			"a" === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			visible( element );
	}
	
	function visible( element ) {
		return $.expr.filters.visible( element ) &&
			!$( element ).parents().addBack().filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			}).length;
	}
	
	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ?
			$.expr.createPseudo(function( dataName ) {
				return function( elem ) {
					return !!$.data( elem, dataName );
				};
			}) :
			// support: jQuery <1.8
			function( elem, i, match ) {
				return !!$.data( elem, match[ 3 ] );
			},
	
		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},
	
		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});
	
	// support: jQuery <1.8
	if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
		$.each( [ "Width", "Height" ], function( i, name ) {
			var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
				type = name.toLowerCase(),
				orig = {
					innerWidth: $.fn.innerWidth,
					innerHeight: $.fn.innerHeight,
					outerWidth: $.fn.outerWidth,
					outerHeight: $.fn.outerHeight
				};
	
			function reduce( elem, size, border, margin ) {
				$.each( side, function() {
					size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
					if ( border ) {
						size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
					}
					if ( margin ) {
						size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
					}
				});
				return size;
			}
	
			$.fn[ "inner" + name ] = function( size ) {
				if ( size === undefined ) {
					return orig[ "inner" + name ].call( this );
				}
	
				return this.each(function() {
					$( this ).css( type, reduce( this, size ) + "px" );
				});
			};
	
			$.fn[ "outer" + name] = function( size, margin ) {
				if ( typeof size !== "number" ) {
					return orig[ "outer" + name ].call( this, size );
				}
	
				return this.each(function() {
					$( this).css( type, reduce( this, size, true, margin ) + "px" );
				});
			};
		});
	}
	
	// support: jQuery <1.8
	if ( !$.fn.addBack ) {
		$.fn.addBack = function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		};
	}
	
	// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
	if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
		$.fn.removeData = (function( removeData ) {
			return function( key ) {
				if ( arguments.length ) {
					return removeData.call( this, $.camelCase( key ) );
				} else {
					return removeData.call( this );
				}
			};
		})( $.fn.removeData );
	}
	
	// deprecated
	$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );
	
	$.fn.extend({
		focus: (function( orig ) {
			return function( delay, fn ) {
				return typeof delay === "number" ?
					this.each(function() {
						var elem = this;
						setTimeout(function() {
							$( elem ).focus();
							if ( fn ) {
								fn.call( elem );
							}
						}, delay );
					}) :
					orig.apply( this, arguments );
			};
		})( $.fn.focus ),
	
		disableSelection: (function() {
			var eventType = "onselectstart" in document.createElement( "div" ) ?
				"selectstart" :
				"mousedown";
	
			return function() {
				return this.bind( eventType + ".ui-disableSelection", function( event ) {
					event.preventDefault();
				});
			};
		})(),
	
		enableSelection: function() {
			return this.unbind( ".ui-disableSelection" );
		},
	
		zIndex: function( zIndex ) {
			if ( zIndex !== undefined ) {
				return this.css( "zIndex", zIndex );
			}
	
			if ( this.length ) {
				var elem = $( this[ 0 ] ), position, value;
				while ( elem.length && elem[ 0 ] !== document ) {
					// Ignore z-index if position is set to a value where z-index is ignored by the browser
					// This makes behavior of this function consistent across browsers
					// WebKit always returns auto if the element is positioned
					position = elem.css( "position" );
					if ( position === "absolute" || position === "relative" || position === "fixed" ) {
						// IE returns 0 when zIndex is not specified
						// other browsers return a string
						// we ignore the case of nested elements with an explicit value of 0
						// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
						value = parseInt( elem.css( "zIndex" ), 10 );
						if ( !isNaN( value ) && value !== 0 ) {
							return value;
						}
					}
					elem = elem.parent();
				}
			}
	
			return 0;
		}
	});
	
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	$.ui.plugin = {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args, allowDisconnected ) {
			var i,
				set = instance.plugins[ name ];
	
			if ( !set ) {
				return;
			}
	
			if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
				return;
			}
	
			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	};
	
	
	/*!
	 * jQuery UI Widget 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/jQuery.widget/
	 */
	
	
	var widget_uuid = 0,
		widget_slice = Array.prototype.slice;
	
	$.cleanData = (function( orig ) {
		return function( elems ) {
			var events, elem, i;
			for ( i = 0; (elem = elems[i]) != null; i++ ) {
				try {
	
					// Only trigger remove when necessary to save time
					events = $._data( elem, "events" );
					if ( events && events.remove ) {
						$( elem ).triggerHandler( "remove" );
					}
	
				// http://bugs.jquery.com/ticket/8235
				} catch( e ) {}
			}
			orig( elems );
		};
	})( $.cleanData );
	
	$.widget = function( name, base, prototype ) {
		var fullName, existingConstructor, constructor, basePrototype,
			// proxiedPrototype allows the provided prototype to remain unmodified
			// so that it can be used as a mixin for multiple widgets (#8876)
			proxiedPrototype = {},
			namespace = name.split( "." )[ 0 ];
	
		name = name.split( "." )[ 1 ];
		fullName = namespace + "-" + name;
	
		if ( !prototype ) {
			prototype = base;
			base = $.Widget;
		}
	
		// create selector for plugin
		$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
			return !!$.data( elem, fullName );
		};
	
		$[ namespace ] = $[ namespace ] || {};
		existingConstructor = $[ namespace ][ name ];
		constructor = $[ namespace ][ name ] = function( options, element ) {
			// allow instantiation without "new" keyword
			if ( !this._createWidget ) {
				return new constructor( options, element );
			}
	
			// allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if ( arguments.length ) {
				this._createWidget( options, element );
			}
		};
		// extend with the existing constructor to carry over any static properties
		$.extend( constructor, existingConstructor, {
			version: prototype.version,
			// copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend( {}, prototype ),
			// track widgets that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		});
	
		basePrototype = new base();
		// we need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend( {}, basePrototype.options );
		$.each( prototype, function( prop, value ) {
			if ( !$.isFunction( value ) ) {
				proxiedPrototype[ prop ] = value;
				return;
			}
			proxiedPrototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;
	
					this._super = _super;
					this._superApply = _superApply;
	
					returnValue = value.apply( this, arguments );
	
					this._super = __super;
					this._superApply = __superApply;
	
					return returnValue;
				};
			})();
		});
		constructor.prototype = $.widget.extend( basePrototype, {
			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for widgets that aren't DOM-based
			widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		});
	
		// If this widget is being redefined then we need to find all widgets that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if ( existingConstructor ) {
			$.each( existingConstructor._childConstructors, function( i, child ) {
				var childPrototype = child.prototype;
	
				// redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
			});
			// remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push( constructor );
		}
	
		$.widget.bridge( name, constructor );
	
		return constructor;
	};
	
	$.widget.extend = function( target ) {
		var input = widget_slice.call( arguments, 1 ),
			inputIndex = 0,
			inputLength = input.length,
			key,
			value;
		for ( ; inputIndex < inputLength; inputIndex++ ) {
			for ( key in input[ inputIndex ] ) {
				value = input[ inputIndex ][ key ];
				if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
					// Clone objects
					if ( $.isPlainObject( value ) ) {
						target[ key ] = $.isPlainObject( target[ key ] ) ?
							$.widget.extend( {}, target[ key ], value ) :
							// Don't extend strings, arrays, etc. with objects
							$.widget.extend( {}, value );
					// Copy everything else by reference
					} else {
						target[ key ] = value;
					}
				}
			}
		}
		return target;
	};
	
	$.widget.bridge = function( name, object ) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[ name ] = function( options ) {
			var isMethodCall = typeof options === "string",
				args = widget_slice.call( arguments, 1 ),
				returnValue = this;
	
			// allow multiple hashes to be passed on init
			options = !isMethodCall && args.length ?
				$.widget.extend.apply( null, [ options ].concat(args) ) :
				options;
	
			if ( isMethodCall ) {
				this.each(function() {
					var methodValue,
						instance = $.data( this, fullName );
					if ( options === "instance" ) {
						returnValue = instance;
						return false;
					}
					if ( !instance ) {
						return $.error( "cannot call methods on " + name + " prior to initialization; " +
							"attempted to call method '" + options + "'" );
					}
					if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
						return $.error( "no such method '" + options + "' for " + name + " widget instance" );
					}
					methodValue = instance[ options ].apply( instance, args );
					if ( methodValue !== instance && methodValue !== undefined ) {
						returnValue = methodValue && methodValue.jquery ?
							returnValue.pushStack( methodValue.get() ) :
							methodValue;
						return false;
					}
				});
			} else {
				this.each(function() {
					var instance = $.data( this, fullName );
					if ( instance ) {
						instance.option( options || {} );
						if ( instance._init ) {
							instance._init();
						}
					} else {
						$.data( this, fullName, new object( options, this ) );
					}
				});
			}
	
			return returnValue;
		};
	};
	
	$.Widget = function( /* options, element */ ) {};
	$.Widget._childConstructors = [];
	
	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: false,
	
			// callbacks
			create: null
		},
		_createWidget: function( options, element ) {
			element = $( element || this.defaultElement || this )[ 0 ];
			this.element = $( element );
			this.uuid = widget_uuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = $.widget.extend( {},
				this.options,
				this._getCreateOptions(),
				options );
	
			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();
	
			if ( element !== this ) {
				$.data( element, this.widgetFullName, this );
				this._on( true, this.element, {
					remove: function( event ) {
						if ( event.target === element ) {
							this.destroy();
						}
					}
				});
				this.document = $( element.style ?
					// element within the document
					element.ownerDocument :
					// element is window or document
					element.document || element );
				this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
			}
	
			this._create();
			this._trigger( "create", null, this._getCreateEventData() );
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,
	
		destroy: function() {
			this._destroy();
			// we can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element
				.unbind( this.eventNamespace )
				.removeData( this.widgetFullName )
				// support: jquery <1.6.3
				// http://bugs.jquery.com/ticket/9413
				.removeData( $.camelCase( this.widgetFullName ) );
			this.widget()
				.unbind( this.eventNamespace )
				.removeAttr( "aria-disabled" )
				.removeClass(
					this.widgetFullName + "-disabled " +
					"ui-state-disabled" );
	
			// clean up events and states
			this.bindings.unbind( this.eventNamespace );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		},
		_destroy: $.noop,
	
		widget: function() {
			return this.element;
		},
	
		option: function( key, value ) {
			var options = key,
				parts,
				curOption,
				i;
	
			if ( arguments.length === 0 ) {
				// don't return a reference to the internal hash
				return $.widget.extend( {}, this.options );
			}
	
			if ( typeof key === "string" ) {
				// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split( "." );
				key = parts.shift();
				if ( parts.length ) {
					curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
					for ( i = 0; i < parts.length - 1; i++ ) {
						curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
						curOption = curOption[ parts[ i ] ];
					}
					key = parts.pop();
					if ( arguments.length === 1 ) {
						return curOption[ key ] === undefined ? null : curOption[ key ];
					}
					curOption[ key ] = value;
				} else {
					if ( arguments.length === 1 ) {
						return this.options[ key ] === undefined ? null : this.options[ key ];
					}
					options[ key ] = value;
				}
			}
	
			this._setOptions( options );
	
			return this;
		},
		_setOptions: function( options ) {
			var key;
	
			for ( key in options ) {
				this._setOption( key, options[ key ] );
			}
	
			return this;
		},
		_setOption: function( key, value ) {
			this.options[ key ] = value;
	
			if ( key === "disabled" ) {
				this.widget()
					.toggleClass( this.widgetFullName + "-disabled", !!value );
	
				// If the widget is becoming disabled, then nothing is interactive
				if ( value ) {
					this.hoverable.removeClass( "ui-state-hover" );
					this.focusable.removeClass( "ui-state-focus" );
				}
			}
	
			return this;
		},
	
		enable: function() {
			return this._setOptions({ disabled: false });
		},
		disable: function() {
			return this._setOptions({ disabled: true });
		},
	
		_on: function( suppressDisabledCheck, element, handlers ) {
			var delegateElement,
				instance = this;
	
			// no suppressDisabledCheck flag, shuffle arguments
			if ( typeof suppressDisabledCheck !== "boolean" ) {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}
	
			// no element argument, shuffle and use this.element
			if ( !handlers ) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				element = delegateElement = $( element );
				this.bindings = this.bindings.add( element );
			}
	
			$.each( handlers, function( event, handler ) {
				function handlerProxy() {
					// allow widgets to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if ( !suppressDisabledCheck &&
							( instance.options.disabled === true ||
								$( this ).hasClass( "ui-state-disabled" ) ) ) {
						return;
					}
					return ( typeof handler === "string" ? instance[ handler ] : handler )
						.apply( instance, arguments );
				}
	
				// copy the guid so direct unbinding works
				if ( typeof handler !== "string" ) {
					handlerProxy.guid = handler.guid =
						handler.guid || handlerProxy.guid || $.guid++;
				}
	
				var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
					eventName = match[1] + instance.eventNamespace,
					selector = match[2];
				if ( selector ) {
					delegateElement.delegate( selector, eventName, handlerProxy );
				} else {
					element.bind( eventName, handlerProxy );
				}
			});
		},
	
		_off: function( element, eventName ) {
			eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
			element.unbind( eventName ).undelegate( eventName );
		},
	
		_delay: function( handler, delay ) {
			function handlerProxy() {
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}
			var instance = this;
			return setTimeout( handlerProxy, delay || 0 );
		},
	
		_hoverable: function( element ) {
			this.hoverable = this.hoverable.add( element );
			this._on( element, {
				mouseenter: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-hover" );
				},
				mouseleave: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-hover" );
				}
			});
		},
	
		_focusable: function( element ) {
			this.focusable = this.focusable.add( element );
			this._on( element, {
				focusin: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-focus" );
				},
				focusout: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-focus" );
				}
			});
		},
	
		_trigger: function( type, event, data ) {
			var prop, orig,
				callback = this.options[ type ];
	
			data = data || {};
			event = $.Event( event );
			event.type = ( type === this.widgetEventPrefix ?
				type :
				this.widgetEventPrefix + type ).toLowerCase();
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[ 0 ];
	
			// copy original event properties over to the new event
			orig = event.originalEvent;
			if ( orig ) {
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
			}
	
			this.element.trigger( event, data );
			return !( $.isFunction( callback ) &&
				callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
				event.isDefaultPrevented() );
		}
	};
	
	$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
		$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
			if ( typeof options === "string" ) {
				options = { effect: options };
			}
			var hasOptions,
				effectName = !options ?
					method :
					options === true || typeof options === "number" ?
						defaultEffect :
						options.effect || defaultEffect;
			options = options || {};
			if ( typeof options === "number" ) {
				options = { duration: options };
			}
			hasOptions = !$.isEmptyObject( options );
			options.complete = callback;
			if ( options.delay ) {
				element.delay( options.delay );
			}
			if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
				element[ method ]( options );
			} else if ( effectName !== method && element[ effectName ] ) {
				element[ effectName ]( options.duration, options.easing, callback );
			} else {
				element.queue(function( next ) {
					$( this )[ method ]();
					if ( callback ) {
						callback.call( element[ 0 ] );
					}
					next();
				});
			}
		};
	});
	
	var widget = $.widget;
	
	
	/*!
	 * jQuery UI Mouse 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/mouse/
	 */
	
	
	var mouseHandled = false;
	$( document ).mouseup( function() {
		mouseHandled = false;
	});
	
	var mouse = $.widget("ui.mouse", {
		version: "1.11.1",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var that = this;
	
			this.element
				.bind("mousedown." + this.widgetName, function(event) {
					return that._mouseDown(event);
				})
				.bind("click." + this.widgetName, function(event) {
					if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
						$.removeData(event.target, that.widgetName + ".preventClickEvent");
						event.stopImmediatePropagation();
						return false;
					}
				});
	
			this.started = false;
		},
	
		// TODO: make sure destroying one instance of mouse doesn't mess with
		// other instances of mouse
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName);
			if ( this._mouseMoveDelegate ) {
				this.document
					.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
					.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			}
		},
	
		_mouseDown: function(event) {
			// don't let more than one widget handle mouseStart
			if ( mouseHandled ) {
				return;
			}
	
			// we may have missed mouseup (out of window)
			(this._mouseStarted && this._mouseUp(event));
	
			this._mouseDownEvent = event;
	
			var that = this,
				btnIsLeft = (event.which === 1),
				// event.target.nodeName works around a bug in IE 8 with
				// disabled inputs (#7620)
				elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
			if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
				return true;
			}
	
			this.mouseDelayMet = !this.options.delay;
			if (!this.mouseDelayMet) {
				this._mouseDelayTimer = setTimeout(function() {
					that.mouseDelayMet = true;
				}, this.options.delay);
			}
	
			if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
				this._mouseStarted = (this._mouseStart(event) !== false);
				if (!this._mouseStarted) {
					event.preventDefault();
					return true;
				}
			}
	
			// Click event may never have fired (Gecko & Opera)
			if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
				$.removeData(event.target, this.widgetName + ".preventClickEvent");
			}
	
			// these delegates are required to keep context
			this._mouseMoveDelegate = function(event) {
				return that._mouseMove(event);
			};
			this._mouseUpDelegate = function(event) {
				return that._mouseUp(event);
			};
	
			this.document
				.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );
	
			event.preventDefault();
	
			mouseHandled = true;
			return true;
		},
	
		_mouseMove: function(event) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);
	
			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {
				return this._mouseUp( event );
			}
	
			if (this._mouseStarted) {
				this._mouseDrag(event);
				return event.preventDefault();
			}
	
			if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
				this._mouseStarted =
					(this._mouseStart(this._mouseDownEvent, event) !== false);
				(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
			}
	
			return !this._mouseStarted;
		},
	
		_mouseUp: function(event) {
			this.document
				.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );
	
			if (this._mouseStarted) {
				this._mouseStarted = false;
	
				if (event.target === this._mouseDownEvent.target) {
					$.data(event.target, this.widgetName + ".preventClickEvent", true);
				}
	
				this._mouseStop(event);
			}
	
			mouseHandled = false;
			return false;
		},
	
		_mouseDistanceMet: function(event) {
			return (Math.max(
					Math.abs(this._mouseDownEvent.pageX - event.pageX),
					Math.abs(this._mouseDownEvent.pageY - event.pageY)
				) >= this.options.distance
			);
		},
	
		_mouseDelayMet: function(/* event */) {
			return this.mouseDelayMet;
		},
	
		// These are placeholder methods, to be overriden by extending plugin
		_mouseStart: function(/* event */) {},
		_mouseDrag: function(/* event */) {},
		_mouseStop: function(/* event */) {},
		_mouseCapture: function(/* event */) { return true; }
	});
	
	
	/*!
	 * jQuery UI Position 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/position/
	 */
	
	(function() {
	
	$.ui = $.ui || {};
	
	var cachedScrollbarWidth, supportsOffsetFractions,
		max = Math.max,
		abs = Math.abs,
		round = Math.round,
		rhorizontal = /left|center|right/,
		rvertical = /top|center|bottom/,
		roffset = /[\+\-]\d+(\.[\d]+)?%?/,
		rposition = /^\w+/,
		rpercent = /%$/,
		_position = $.fn.position;
	
	function getOffsets( offsets, width, height ) {
		return [
			parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
			parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
		];
	}
	
	function parseCss( element, property ) {
		return parseInt( $.css( element, property ), 10 ) || 0;
	}
	
	function getDimensions( elem ) {
		var raw = elem[0];
		if ( raw.nodeType === 9 ) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: { top: 0, left: 0 }
			};
		}
		if ( $.isWindow( raw ) ) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
			};
		}
		if ( raw.preventDefault ) {
			return {
				width: 0,
				height: 0,
				offset: { top: raw.pageY, left: raw.pageX }
			};
		}
		return {
			width: elem.outerWidth(),
			height: elem.outerHeight(),
			offset: elem.offset()
		};
	}
	
	$.position = {
		scrollbarWidth: function() {
			if ( cachedScrollbarWidth !== undefined ) {
				return cachedScrollbarWidth;
			}
			var w1, w2,
				div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
				innerDiv = div.children()[0];
	
			$( "body" ).append( div );
			w1 = innerDiv.offsetWidth;
			div.css( "overflow", "scroll" );
	
			w2 = innerDiv.offsetWidth;
	
			if ( w1 === w2 ) {
				w2 = div[0].clientWidth;
			}
	
			div.remove();
	
			return (cachedScrollbarWidth = w1 - w2);
		},
		getScrollInfo: function( within ) {
			var overflowX = within.isWindow || within.isDocument ? "" :
					within.element.css( "overflow-x" ),
				overflowY = within.isWindow || within.isDocument ? "" :
					within.element.css( "overflow-y" ),
				hasOverflowX = overflowX === "scroll" ||
					( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
				hasOverflowY = overflowY === "scroll" ||
					( overflowY === "auto" && within.height < within.element[0].scrollHeight );
			return {
				width: hasOverflowY ? $.position.scrollbarWidth() : 0,
				height: hasOverflowX ? $.position.scrollbarWidth() : 0
			};
		},
		getWithinInfo: function( element ) {
			var withinElement = $( element || window ),
				isWindow = $.isWindow( withinElement[0] ),
				isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
			return {
				element: withinElement,
				isWindow: isWindow,
				isDocument: isDocument,
				offset: withinElement.offset() || { left: 0, top: 0 },
				scrollLeft: withinElement.scrollLeft(),
				scrollTop: withinElement.scrollTop(),
	
				// support: jQuery 1.6.x
				// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
				width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
				height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
			};
		}
	};
	
	$.fn.position = function( options ) {
		if ( !options || !options.of ) {
			return _position.apply( this, arguments );
		}
	
		// make a copy, we don't want to modify arguments
		options = $.extend( {}, options );
	
		var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
			target = $( options.of ),
			within = $.position.getWithinInfo( options.within ),
			scrollInfo = $.position.getScrollInfo( within ),
			collision = ( options.collision || "flip" ).split( " " ),
			offsets = {};
	
		dimensions = getDimensions( target );
		if ( target[0].preventDefault ) {
			// force left top to allow flipping
			options.at = "left top";
		}
		targetWidth = dimensions.width;
		targetHeight = dimensions.height;
		targetOffset = dimensions.offset;
		// clone to reuse original targetOffset later
		basePosition = $.extend( {}, targetOffset );
	
		// force my and at to have valid horizontal and vertical positions
		// if a value is missing or invalid, it will be converted to center
		$.each( [ "my", "at" ], function() {
			var pos = ( options[ this ] || "" ).split( " " ),
				horizontalOffset,
				verticalOffset;
	
			if ( pos.length === 1) {
				pos = rhorizontal.test( pos[ 0 ] ) ?
					pos.concat( [ "center" ] ) :
					rvertical.test( pos[ 0 ] ) ?
						[ "center" ].concat( pos ) :
						[ "center", "center" ];
			}
			pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
			pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";
	
			// calculate offsets
			horizontalOffset = roffset.exec( pos[ 0 ] );
			verticalOffset = roffset.exec( pos[ 1 ] );
			offsets[ this ] = [
				horizontalOffset ? horizontalOffset[ 0 ] : 0,
				verticalOffset ? verticalOffset[ 0 ] : 0
			];
	
			// reduce to just the positions without the offsets
			options[ this ] = [
				rposition.exec( pos[ 0 ] )[ 0 ],
				rposition.exec( pos[ 1 ] )[ 0 ]
			];
		});
	
		// normalize collision option
		if ( collision.length === 1 ) {
			collision[ 1 ] = collision[ 0 ];
		}
	
		if ( options.at[ 0 ] === "right" ) {
			basePosition.left += targetWidth;
		} else if ( options.at[ 0 ] === "center" ) {
			basePosition.left += targetWidth / 2;
		}
	
		if ( options.at[ 1 ] === "bottom" ) {
			basePosition.top += targetHeight;
		} else if ( options.at[ 1 ] === "center" ) {
			basePosition.top += targetHeight / 2;
		}
	
		atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
		basePosition.left += atOffset[ 0 ];
		basePosition.top += atOffset[ 1 ];
	
		return this.each(function() {
			var collisionPosition, using,
				elem = $( this ),
				elemWidth = elem.outerWidth(),
				elemHeight = elem.outerHeight(),
				marginLeft = parseCss( this, "marginLeft" ),
				marginTop = parseCss( this, "marginTop" ),
				collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
				collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
				position = $.extend( {}, basePosition ),
				myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );
	
			if ( options.my[ 0 ] === "right" ) {
				position.left -= elemWidth;
			} else if ( options.my[ 0 ] === "center" ) {
				position.left -= elemWidth / 2;
			}
	
			if ( options.my[ 1 ] === "bottom" ) {
				position.top -= elemHeight;
			} else if ( options.my[ 1 ] === "center" ) {
				position.top -= elemHeight / 2;
			}
	
			position.left += myOffset[ 0 ];
			position.top += myOffset[ 1 ];
	
			// if the browser doesn't support fractions, then round for consistent results
			if ( !supportsOffsetFractions ) {
				position.left = round( position.left );
				position.top = round( position.top );
			}
	
			collisionPosition = {
				marginLeft: marginLeft,
				marginTop: marginTop
			};
	
			$.each( [ "left", "top" ], function( i, dir ) {
				if ( $.ui.position[ collision[ i ] ] ) {
					$.ui.position[ collision[ i ] ][ dir ]( position, {
						targetWidth: targetWidth,
						targetHeight: targetHeight,
						elemWidth: elemWidth,
						elemHeight: elemHeight,
						collisionPosition: collisionPosition,
						collisionWidth: collisionWidth,
						collisionHeight: collisionHeight,
						offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
						my: options.my,
						at: options.at,
						within: within,
						elem: elem
					});
				}
			});
	
			if ( options.using ) {
				// adds feedback as second argument to using callback, if present
				using = function( props ) {
					var left = targetOffset.left - position.left,
						right = left + targetWidth - elemWidth,
						top = targetOffset.top - position.top,
						bottom = top + targetHeight - elemHeight,
						feedback = {
							target: {
								element: target,
								left: targetOffset.left,
								top: targetOffset.top,
								width: targetWidth,
								height: targetHeight
							},
							element: {
								element: elem,
								left: position.left,
								top: position.top,
								width: elemWidth,
								height: elemHeight
							},
							horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
							vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
						};
					if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
						feedback.horizontal = "center";
					}
					if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
						feedback.vertical = "middle";
					}
					if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
						feedback.important = "horizontal";
					} else {
						feedback.important = "vertical";
					}
					options.using.call( this, props, feedback );
				};
			}
	
			elem.offset( $.extend( position, { using: using } ) );
		});
	};
	
	$.ui.position = {
		fit: {
			left: function( position, data ) {
				var within = data.within,
					withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
					outerWidth = within.width,
					collisionPosLeft = position.left - data.collisionPosition.marginLeft,
					overLeft = withinOffset - collisionPosLeft,
					overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
					newOverRight;
	
				// element is wider than within
				if ( data.collisionWidth > outerWidth ) {
					// element is initially over the left side of within
					if ( overLeft > 0 && overRight <= 0 ) {
						newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
						position.left += overLeft - newOverRight;
					// element is initially over right side of within
					} else if ( overRight > 0 && overLeft <= 0 ) {
						position.left = withinOffset;
					// element is initially over both left and right sides of within
					} else {
						if ( overLeft > overRight ) {
							position.left = withinOffset + outerWidth - data.collisionWidth;
						} else {
							position.left = withinOffset;
						}
					}
				// too far left -> align with left edge
				} else if ( overLeft > 0 ) {
					position.left += overLeft;
				// too far right -> align with right edge
				} else if ( overRight > 0 ) {
					position.left -= overRight;
				// adjust based on position and margin
				} else {
					position.left = max( position.left - collisionPosLeft, position.left );
				}
			},
			top: function( position, data ) {
				var within = data.within,
					withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
					outerHeight = data.within.height,
					collisionPosTop = position.top - data.collisionPosition.marginTop,
					overTop = withinOffset - collisionPosTop,
					overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
					newOverBottom;
	
				// element is taller than within
				if ( data.collisionHeight > outerHeight ) {
					// element is initially over the top of within
					if ( overTop > 0 && overBottom <= 0 ) {
						newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
						position.top += overTop - newOverBottom;
					// element is initially over bottom of within
					} else if ( overBottom > 0 && overTop <= 0 ) {
						position.top = withinOffset;
					// element is initially over both top and bottom of within
					} else {
						if ( overTop > overBottom ) {
							position.top = withinOffset + outerHeight - data.collisionHeight;
						} else {
							position.top = withinOffset;
						}
					}
				// too far up -> align with top
				} else if ( overTop > 0 ) {
					position.top += overTop;
				// too far down -> align with bottom edge
				} else if ( overBottom > 0 ) {
					position.top -= overBottom;
				// adjust based on position and margin
				} else {
					position.top = max( position.top - collisionPosTop, position.top );
				}
			}
		},
		flip: {
			left: function( position, data ) {
				var within = data.within,
					withinOffset = within.offset.left + within.scrollLeft,
					outerWidth = within.width,
					offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
					collisionPosLeft = position.left - data.collisionPosition.marginLeft,
					overLeft = collisionPosLeft - offsetLeft,
					overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
					myOffset = data.my[ 0 ] === "left" ?
						-data.elemWidth :
						data.my[ 0 ] === "right" ?
							data.elemWidth :
							0,
					atOffset = data.at[ 0 ] === "left" ?
						data.targetWidth :
						data.at[ 0 ] === "right" ?
							-data.targetWidth :
							0,
					offset = -2 * data.offset[ 0 ],
					newOverRight,
					newOverLeft;
	
				if ( overLeft < 0 ) {
					newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
					if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
						position.left += myOffset + atOffset + offset;
					}
				} else if ( overRight > 0 ) {
					newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
					if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
						position.left += myOffset + atOffset + offset;
					}
				}
			},
			top: function( position, data ) {
				var within = data.within,
					withinOffset = within.offset.top + within.scrollTop,
					outerHeight = within.height,
					offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
					collisionPosTop = position.top - data.collisionPosition.marginTop,
					overTop = collisionPosTop - offsetTop,
					overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
					top = data.my[ 1 ] === "top",
					myOffset = top ?
						-data.elemHeight :
						data.my[ 1 ] === "bottom" ?
							data.elemHeight :
							0,
					atOffset = data.at[ 1 ] === "top" ?
						data.targetHeight :
						data.at[ 1 ] === "bottom" ?
							-data.targetHeight :
							0,
					offset = -2 * data.offset[ 1 ],
					newOverTop,
					newOverBottom;
				if ( overTop < 0 ) {
					newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
					if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
						position.top += myOffset + atOffset + offset;
					}
				} else if ( overBottom > 0 ) {
					newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
					if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
						position.top += myOffset + atOffset + offset;
					}
				}
			}
		},
		flipfit: {
			left: function() {
				$.ui.position.flip.left.apply( this, arguments );
				$.ui.position.fit.left.apply( this, arguments );
			},
			top: function() {
				$.ui.position.flip.top.apply( this, arguments );
				$.ui.position.fit.top.apply( this, arguments );
			}
		}
	};
	
	// fraction support test
	(function() {
		var testElement, testElementParent, testElementStyle, offsetLeft, i,
			body = document.getElementsByTagName( "body" )[ 0 ],
			div = document.createElement( "div" );
	
		//Create a "fake body" for testing based on method used in jQuery.support
		testElement = document.createElement( body ? "div" : "body" );
		testElementStyle = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none"
		};
		if ( body ) {
			$.extend( testElementStyle, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			});
		}
		for ( i in testElementStyle ) {
			testElement.style[ i ] = testElementStyle[ i ];
		}
		testElement.appendChild( div );
		testElementParent = body || document.documentElement;
		testElementParent.insertBefore( testElement, testElementParent.firstChild );
	
		div.style.cssText = "position: absolute; left: 10.7432222px;";
	
		offsetLeft = $( div ).offset().left;
		supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;
	
		testElement.innerHTML = "";
		testElementParent.removeChild( testElement );
	})();
	
	})();
	
	var position = $.ui.position;
	
	
	/*!
	 * jQuery UI Accordion 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/accordion/
	 */
	
	
	var accordion = $.widget( "ui.accordion", {
		version: "1.11.1",
		options: {
			active: 0,
			animate: {},
			collapsible: false,
			event: "click",
			header: "> li > :first-child,> :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
	
			// callbacks
			activate: null,
			beforeActivate: null
		},
	
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
	
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
	
		_create: function() {
			var options = this.options;
			this.prevShow = this.prevHide = $();
			this.element.addClass( "ui-accordion ui-widget ui-helper-reset" )
				// ARIA
				.attr( "role", "tablist" );
	
			// don't allow collapsible: false and active: false / null
			if ( !options.collapsible && (options.active === false || options.active == null) ) {
				options.active = 0;
			}
	
			this._processPanels();
			// handle negative values
			if ( options.active < 0 ) {
				options.active += this.headers.length;
			}
			this._refresh();
		},
	
		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: !this.active.length ? $() : this.active.next()
			};
		},
	
		_createIcons: function() {
			var icons = this.options.icons;
			if ( icons ) {
				$( "<span>" )
					.addClass( "ui-accordion-header-icon ui-icon " + icons.header )
					.prependTo( this.headers );
				this.active.children( ".ui-accordion-header-icon" )
					.removeClass( icons.header )
					.addClass( icons.activeHeader );
				this.headers.addClass( "ui-accordion-icons" );
			}
		},
	
		_destroyIcons: function() {
			this.headers
				.removeClass( "ui-accordion-icons" )
				.children( ".ui-accordion-header-icon" )
					.remove();
		},
	
		_destroy: function() {
			var contents;
	
			// clean up main element
			this.element
				.removeClass( "ui-accordion ui-widget ui-helper-reset" )
				.removeAttr( "role" );
	
			// clean up headers
			this.headers
				.removeClass( "ui-accordion-header ui-accordion-header-active ui-state-default " +
					"ui-corner-all ui-state-active ui-state-disabled ui-corner-top" )
				.removeAttr( "role" )
				.removeAttr( "aria-expanded" )
				.removeAttr( "aria-selected" )
				.removeAttr( "aria-controls" )
				.removeAttr( "tabIndex" )
				.removeUniqueId();
	
			this._destroyIcons();
	
			// clean up content panels
			contents = this.headers.next()
				.removeClass( "ui-helper-reset ui-widget-content ui-corner-bottom " +
					"ui-accordion-content ui-accordion-content-active ui-state-disabled" )
				.css( "display", "" )
				.removeAttr( "role" )
				.removeAttr( "aria-hidden" )
				.removeAttr( "aria-labelledby" )
				.removeUniqueId();
	
			if ( this.options.heightStyle !== "content" ) {
				contents.css( "height", "" );
			}
		},
	
		_setOption: function( key, value ) {
			if ( key === "active" ) {
				// _activate() will handle invalid values and update this.options
				this._activate( value );
				return;
			}
	
			if ( key === "event" ) {
				if ( this.options.event ) {
					this._off( this.headers, this.options.event );
				}
				this._setupEvents( value );
			}
	
			this._super( key, value );
	
			// setting collapsible: false while collapsed; open first panel
			if ( key === "collapsible" && !value && this.options.active === false ) {
				this._activate( 0 );
			}
	
			if ( key === "icons" ) {
				this._destroyIcons();
				if ( value ) {
					this._createIcons();
				}
			}
	
			// #5332 - opacity doesn't cascade to positioned elements in IE
			// so we need to add the disabled class to the headers and panels
			if ( key === "disabled" ) {
				this.element
					.toggleClass( "ui-state-disabled", !!value )
					.attr( "aria-disabled", value );
				this.headers.add( this.headers.next() )
					.toggleClass( "ui-state-disabled", !!value );
			}
		},
	
		_keydown: function( event ) {
			if ( event.altKey || event.ctrlKey ) {
				return;
			}
	
			var keyCode = $.ui.keyCode,
				length = this.headers.length,
				currentIndex = this.headers.index( event.target ),
				toFocus = false;
	
			switch ( event.keyCode ) {
				case keyCode.RIGHT:
				case keyCode.DOWN:
					toFocus = this.headers[ ( currentIndex + 1 ) % length ];
					break;
				case keyCode.LEFT:
				case keyCode.UP:
					toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
					break;
				case keyCode.SPACE:
				case keyCode.ENTER:
					this._eventHandler( event );
					break;
				case keyCode.HOME:
					toFocus = this.headers[ 0 ];
					break;
				case keyCode.END:
					toFocus = this.headers[ length - 1 ];
					break;
			}
	
			if ( toFocus ) {
				$( event.target ).attr( "tabIndex", -1 );
				$( toFocus ).attr( "tabIndex", 0 );
				toFocus.focus();
				event.preventDefault();
			}
		},
	
		_panelKeyDown: function( event ) {
			if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
				$( event.currentTarget ).prev().focus();
			}
		},
	
		refresh: function() {
			var options = this.options;
			this._processPanels();
	
			// was collapsed or no panel
			if ( ( options.active === false && options.collapsible === true ) || !this.headers.length ) {
				options.active = false;
				this.active = $();
			// active false only when collapsible is true
			} else if ( options.active === false ) {
				this._activate( 0 );
			// was active, but active panel is gone
			} else if ( this.active.length && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
				// all remaining panel are disabled
				if ( this.headers.length === this.headers.find(".ui-state-disabled").length ) {
					options.active = false;
					this.active = $();
				// activate previous panel
				} else {
					this._activate( Math.max( 0, options.active - 1 ) );
				}
			// was active, active panel still exists
			} else {
				// make sure active index is correct
				options.active = this.headers.index( this.active );
			}
	
			this._destroyIcons();
	
			this._refresh();
		},
	
		_processPanels: function() {
			this.headers = this.element.find( this.options.header )
				.addClass( "ui-accordion-header ui-state-default ui-corner-all" );
	
			this.headers.next()
				.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" )
				.filter( ":not(.ui-accordion-content-active)" )
				.hide();
		},
	
		_refresh: function() {
			var maxHeight,
				options = this.options,
				heightStyle = options.heightStyle,
				parent = this.element.parent();
	
			this.active = this._findActive( options.active )
				.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" )
				.removeClass( "ui-corner-all" );
			this.active.next()
				.addClass( "ui-accordion-content-active" )
				.show();
	
			this.headers
				.attr( "role", "tab" )
				.each(function() {
					var header = $( this ),
						headerId = header.uniqueId().attr( "id" ),
						panel = header.next(),
						panelId = panel.uniqueId().attr( "id" );
					header.attr( "aria-controls", panelId );
					panel.attr( "aria-labelledby", headerId );
				})
				.next()
					.attr( "role", "tabpanel" );
	
			this.headers
				.not( this.active )
				.attr({
					"aria-selected": "false",
					"aria-expanded": "false",
					tabIndex: -1
				})
				.next()
					.attr({
						"aria-hidden": "true"
					})
					.hide();
	
			// make sure at least one header is in the tab order
			if ( !this.active.length ) {
				this.headers.eq( 0 ).attr( "tabIndex", 0 );
			} else {
				this.active.attr({
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				})
				.next()
					.attr({
						"aria-hidden": "false"
					});
			}
	
			this._createIcons();
	
			this._setupEvents( options.event );
	
			if ( heightStyle === "fill" ) {
				maxHeight = parent.height();
				this.element.siblings( ":visible" ).each(function() {
					var elem = $( this ),
						position = elem.css( "position" );
	
					if ( position === "absolute" || position === "fixed" ) {
						return;
					}
					maxHeight -= elem.outerHeight( true );
				});
	
				this.headers.each(function() {
					maxHeight -= $( this ).outerHeight( true );
				});
	
				this.headers.next()
					.each(function() {
						$( this ).height( Math.max( 0, maxHeight -
							$( this ).innerHeight() + $( this ).height() ) );
					})
					.css( "overflow", "auto" );
			} else if ( heightStyle === "auto" ) {
				maxHeight = 0;
				this.headers.next()
					.each(function() {
						maxHeight = Math.max( maxHeight, $( this ).css( "height", "" ).height() );
					})
					.height( maxHeight );
			}
		},
	
		_activate: function( index ) {
			var active = this._findActive( index )[ 0 ];
	
			// trying to activate the already active panel
			if ( active === this.active[ 0 ] ) {
				return;
			}
	
			// trying to collapse, simulate a click on the currently active header
			active = active || this.active[ 0 ];
	
			this._eventHandler({
				target: active,
				currentTarget: active,
				preventDefault: $.noop
			});
		},
	
		_findActive: function( selector ) {
			return typeof selector === "number" ? this.headers.eq( selector ) : $();
		},
	
		_setupEvents: function( event ) {
			var events = {
				keydown: "_keydown"
			};
			if ( event ) {
				$.each( event.split( " " ), function( index, eventName ) {
					events[ eventName ] = "_eventHandler";
				});
			}
	
			this._off( this.headers.add( this.headers.next() ) );
			this._on( this.headers, events );
			this._on( this.headers.next(), { keydown: "_panelKeyDown" });
			this._hoverable( this.headers );
			this._focusable( this.headers );
		},
	
		_eventHandler: function( event ) {
			var options = this.options,
				active = this.active,
				clicked = $( event.currentTarget ),
				clickedIsActive = clicked[ 0 ] === active[ 0 ],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : clicked.next(),
				toHide = active.next(),
				eventData = {
					oldHeader: active,
					oldPanel: toHide,
					newHeader: collapsing ? $() : clicked,
					newPanel: toShow
				};
	
			event.preventDefault();
	
			if (
					// click on active header, but not collapsible
					( clickedIsActive && !options.collapsible ) ||
					// allow canceling activation
					( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
				return;
			}
	
			options.active = collapsing ? false : this.headers.index( clicked );
	
			// when the call to ._toggle() comes after the class changes
			// it causes a very odd bug in IE 8 (see #6720)
			this.active = clickedIsActive ? $() : clicked;
			this._toggle( eventData );
	
			// switch classes
			// corner classes on the previously active header stay after the animation
			active.removeClass( "ui-accordion-header-active ui-state-active" );
			if ( options.icons ) {
				active.children( ".ui-accordion-header-icon" )
					.removeClass( options.icons.activeHeader )
					.addClass( options.icons.header );
			}
	
			if ( !clickedIsActive ) {
				clicked
					.removeClass( "ui-corner-all" )
					.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" );
				if ( options.icons ) {
					clicked.children( ".ui-accordion-header-icon" )
						.removeClass( options.icons.header )
						.addClass( options.icons.activeHeader );
				}
	
				clicked
					.next()
					.addClass( "ui-accordion-content-active" );
			}
		},
	
		_toggle: function( data ) {
			var toShow = data.newPanel,
				toHide = this.prevShow.length ? this.prevShow : data.oldPanel;
	
			// handle activating a panel during the animation for another activation
			this.prevShow.add( this.prevHide ).stop( true, true );
			this.prevShow = toShow;
			this.prevHide = toHide;
	
			if ( this.options.animate ) {
				this._animate( toShow, toHide, data );
			} else {
				toHide.hide();
				toShow.show();
				this._toggleComplete( data );
			}
	
			toHide.attr({
				"aria-hidden": "true"
			});
			toHide.prev().attr( "aria-selected", "false" );
			// if we're switching panels, remove the old header from the tab order
			// if we're opening from collapsed state, remove the previous header from the tab order
			// if we're collapsing, then keep the collapsing header in the tab order
			if ( toShow.length && toHide.length ) {
				toHide.prev().attr({
					"tabIndex": -1,
					"aria-expanded": "false"
				});
			} else if ( toShow.length ) {
				this.headers.filter(function() {
					return $( this ).attr( "tabIndex" ) === 0;
				})
				.attr( "tabIndex", -1 );
			}
	
			toShow
				.attr( "aria-hidden", "false" )
				.prev()
					.attr({
						"aria-selected": "true",
						tabIndex: 0,
						"aria-expanded": "true"
					});
		},
	
		_animate: function( toShow, toHide, data ) {
			var total, easing, duration,
				that = this,
				adjust = 0,
				down = toShow.length &&
					( !toHide.length || ( toShow.index() < toHide.index() ) ),
				animate = this.options.animate || {},
				options = down && animate.down || animate,
				complete = function() {
					that._toggleComplete( data );
				};
	
			if ( typeof options === "number" ) {
				duration = options;
			}
			if ( typeof options === "string" ) {
				easing = options;
			}
			// fall back from options to animation in case of partial down settings
			easing = easing || options.easing || animate.easing;
			duration = duration || options.duration || animate.duration;
	
			if ( !toHide.length ) {
				return toShow.animate( this.showProps, duration, easing, complete );
			}
			if ( !toShow.length ) {
				return toHide.animate( this.hideProps, duration, easing, complete );
			}
	
			total = toShow.show().outerHeight();
			toHide.animate( this.hideProps, {
				duration: duration,
				easing: easing,
				step: function( now, fx ) {
					fx.now = Math.round( now );
				}
			});
			toShow
				.hide()
				.animate( this.showProps, {
					duration: duration,
					easing: easing,
					complete: complete,
					step: function( now, fx ) {
						fx.now = Math.round( now );
						if ( fx.prop !== "height" ) {
							adjust += fx.now;
						} else if ( that.options.heightStyle !== "content" ) {
							fx.now = Math.round( total - toHide.outerHeight() - adjust );
							adjust = 0;
						}
					}
				});
		},
	
		_toggleComplete: function( data ) {
			var toHide = data.oldPanel;
	
			toHide
				.removeClass( "ui-accordion-content-active" )
				.prev()
					.removeClass( "ui-corner-top" )
					.addClass( "ui-corner-all" );
	
			// Work around for rendering bug in IE (#5421)
			if ( toHide.length ) {
				toHide.parent()[ 0 ].className = toHide.parent()[ 0 ].className;
			}
			this._trigger( "activate", null, data );
		}
	});
	
	
	/*!
	 * jQuery UI Menu 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/menu/
	 */
	
	
	var menu = $.widget( "ui.menu", {
		version: "1.11.1",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left-1 top",
				at: "right top"
			},
			role: "menu",
	
			// callbacks
			blur: null,
			focus: null,
			select: null
		},
	
		_create: function() {
			this.activeMenu = this.element;
	
			// Flag used to prevent firing of the click handler
			// as the event bubbles up through nested menus
			this.mouseHandled = false;
			this.element
				.uniqueId()
				.addClass( "ui-menu ui-widget ui-widget-content" )
				.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length )
				.attr({
					role: this.options.role,
					tabIndex: 0
				});
	
			if ( this.options.disabled ) {
				this.element
					.addClass( "ui-state-disabled" )
					.attr( "aria-disabled", "true" );
			}
	
			this._on({
				// Prevent focus from sticking to links inside menu after clicking
				// them (focus should always stay on UL during navigation).
				"mousedown .ui-menu-item": function( event ) {
					event.preventDefault();
				},
				"click .ui-menu-item": function( event ) {
					var target = $( event.target );
					if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {
						this.select( event );
	
						// Only set the mouseHandled flag if the event will bubble, see #9469.
						if ( !event.isPropagationStopped() ) {
							this.mouseHandled = true;
						}
	
						// Open submenu on click
						if ( target.has( ".ui-menu" ).length ) {
							this.expand( event );
						} else if ( !this.element.is( ":focus" ) && $( this.document[ 0 ].activeElement ).closest( ".ui-menu" ).length ) {
	
							// Redirect focus to the menu
							this.element.trigger( "focus", [ true ] );
	
							// If the active item is on the top level, let it stay active.
							// Otherwise, blur the active item since it is no longer visible.
							if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {
								clearTimeout( this.timer );
							}
						}
					}
				},
				"mouseenter .ui-menu-item": function( event ) {
					var target = $( event.currentTarget );
					// Remove ui-state-active class from siblings of the newly focused menu item
					// to avoid a jump caused by adjacent elements both having a class with a border
					target.siblings( ".ui-state-active" ).removeClass( "ui-state-active" );
					this.focus( event, target );
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function( event, keepActiveItem ) {
					// If there's already an active item, keep it active
					// If not, activate the first item
					var item = this.active || this.element.find( this.options.items ).eq( 0 );
	
					if ( !keepActiveItem ) {
						this.focus( event, item );
					}
				},
				blur: function( event ) {
					this._delay(function() {
						if ( !$.contains( this.element[0], this.document[0].activeElement ) ) {
							this.collapseAll( event );
						}
					});
				},
				keydown: "_keydown"
			});
	
			this.refresh();
	
			// Clicks outside of a menu collapse any open menus
			this._on( this.document, {
				click: function( event ) {
					if ( this._closeOnDocumentClick( event ) ) {
						this.collapseAll( event );
					}
	
					// Reset the mouseHandled flag
					this.mouseHandled = false;
				}
			});
		},
	
		_destroy: function() {
			// Destroy (sub)menus
			this.element
				.removeAttr( "aria-activedescendant" )
				.find( ".ui-menu" ).addBack()
					.removeClass( "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front" )
					.removeAttr( "role" )
					.removeAttr( "tabIndex" )
					.removeAttr( "aria-labelledby" )
					.removeAttr( "aria-expanded" )
					.removeAttr( "aria-hidden" )
					.removeAttr( "aria-disabled" )
					.removeUniqueId()
					.show();
	
			// Destroy menu items
			this.element.find( ".ui-menu-item" )
				.removeClass( "ui-menu-item" )
				.removeAttr( "role" )
				.removeAttr( "aria-disabled" )
				.removeUniqueId()
				.removeClass( "ui-state-hover" )
				.removeAttr( "tabIndex" )
				.removeAttr( "role" )
				.removeAttr( "aria-haspopup" )
				.children().each( function() {
					var elem = $( this );
					if ( elem.data( "ui-menu-submenu-carat" ) ) {
						elem.remove();
					}
				});
	
			// Destroy menu dividers
			this.element.find( ".ui-menu-divider" ).removeClass( "ui-menu-divider ui-widget-content" );
		},
	
		_keydown: function( event ) {
			var match, prev, character, skip, regex,
				preventDefault = true;
	
			function escape( value ) {
				return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
			}
	
			switch ( event.keyCode ) {
			case $.ui.keyCode.PAGE_UP:
				this.previousPage( event );
				break;
			case $.ui.keyCode.PAGE_DOWN:
				this.nextPage( event );
				break;
			case $.ui.keyCode.HOME:
				this._move( "first", "first", event );
				break;
			case $.ui.keyCode.END:
				this._move( "last", "last", event );
				break;
			case $.ui.keyCode.UP:
				this.previous( event );
				break;
			case $.ui.keyCode.DOWN:
				this.next( event );
				break;
			case $.ui.keyCode.LEFT:
				this.collapse( event );
				break;
			case $.ui.keyCode.RIGHT:
				if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
					this.expand( event );
				}
				break;
			case $.ui.keyCode.ENTER:
			case $.ui.keyCode.SPACE:
				this._activate( event );
				break;
			case $.ui.keyCode.ESCAPE:
				this.collapse( event );
				break;
			default:
				preventDefault = false;
				prev = this.previousFilter || "";
				character = String.fromCharCode( event.keyCode );
				skip = false;
	
				clearTimeout( this.filterTimer );
	
				if ( character === prev ) {
					skip = true;
				} else {
					character = prev + character;
				}
	
				regex = new RegExp( "^" + escape( character ), "i" );
				match = this.activeMenu.find( this.options.items ).filter(function() {
					return regex.test( $( this ).text() );
				});
				match = skip && match.index( this.active.next() ) !== -1 ?
					this.active.nextAll( ".ui-menu-item" ) :
					match;
	
				// If no matches on the current filter, reset to the last character pressed
				// to move down the menu to the first item that starts with that character
				if ( !match.length ) {
					character = String.fromCharCode( event.keyCode );
					regex = new RegExp( "^" + escape( character ), "i" );
					match = this.activeMenu.find( this.options.items ).filter(function() {
						return regex.test( $( this ).text() );
					});
				}
	
				if ( match.length ) {
					this.focus( event, match );
					if ( match.length > 1 ) {
						this.previousFilter = character;
						this.filterTimer = this._delay(function() {
							delete this.previousFilter;
						}, 1000 );
					} else {
						delete this.previousFilter;
					}
				} else {
					delete this.previousFilter;
				}
			}
	
			if ( preventDefault ) {
				event.preventDefault();
			}
		},
	
		_activate: function( event ) {
			if ( !this.active.is( ".ui-state-disabled" ) ) {
				if ( this.active.is( "[aria-haspopup='true']" ) ) {
					this.expand( event );
				} else {
					this.select( event );
				}
			}
		},
	
		refresh: function() {
			var menus, items,
				that = this,
				icon = this.options.icons.submenu,
				submenus = this.element.find( this.options.menus );
	
			this.element.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length );
	
			// Initialize nested menus
			submenus.filter( ":not(.ui-menu)" )
				.addClass( "ui-menu ui-widget ui-widget-content ui-front" )
				.hide()
				.attr({
					role: this.options.role,
					"aria-hidden": "true",
					"aria-expanded": "false"
				})
				.each(function() {
					var menu = $( this ),
						item = menu.parent(),
						submenuCarat = $( "<span>" )
							.addClass( "ui-menu-icon ui-icon " + icon )
							.data( "ui-menu-submenu-carat", true );
	
					item
						.attr( "aria-haspopup", "true" )
						.prepend( submenuCarat );
					menu.attr( "aria-labelledby", item.attr( "id" ) );
				});
	
			menus = submenus.add( this.element );
			items = menus.find( this.options.items );
	
			// Initialize menu-items containing spaces and/or dashes only as dividers
			items.not( ".ui-menu-item" ).each(function() {
				var item = $( this );
				if ( that._isDivider( item ) ) {
					item.addClass( "ui-widget-content ui-menu-divider" );
				}
			});
	
			// Don't refresh list items that are already adapted
			items.not( ".ui-menu-item, .ui-menu-divider" )
				.addClass( "ui-menu-item" )
				.uniqueId()
				.attr({
					tabIndex: -1,
					role: this._itemRole()
				});
	
			// Add aria-disabled attribute to any disabled menu item
			items.filter( ".ui-state-disabled" ).attr( "aria-disabled", "true" );
	
			// If the active item has been removed, blur the menu
			if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
				this.blur();
			}
		},
	
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[ this.options.role ];
		},
	
		_setOption: function( key, value ) {
			if ( key === "icons" ) {
				this.element.find( ".ui-menu-icon" )
					.removeClass( this.options.icons.submenu )
					.addClass( value.submenu );
			}
			if ( key === "disabled" ) {
				this.element
					.toggleClass( "ui-state-disabled", !!value )
					.attr( "aria-disabled", value );
			}
			this._super( key, value );
		},
	
		focus: function( event, item ) {
			var nested, focused;
			this.blur( event, event && event.type === "focus" );
	
			this._scrollIntoView( item );
	
			this.active = item.first();
			focused = this.active.addClass( "ui-state-focus" ).removeClass( "ui-state-active" );
			// Only update aria-activedescendant if there's a role
			// otherwise we assume focus is managed elsewhere
			if ( this.options.role ) {
				this.element.attr( "aria-activedescendant", focused.attr( "id" ) );
			}
	
			// Highlight active parent menu item, if any
			this.active
				.parent()
				.closest( ".ui-menu-item" )
				.addClass( "ui-state-active" );
	
			if ( event && event.type === "keydown" ) {
				this._close();
			} else {
				this.timer = this._delay(function() {
					this._close();
				}, this.delay );
			}
	
			nested = item.children( ".ui-menu" );
			if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {
				this._startOpening(nested);
			}
			this.activeMenu = item.parent();
	
			this._trigger( "focus", event, { item: item } );
		},
	
		_scrollIntoView: function( item ) {
			var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
			if ( this._hasScroll() ) {
				borderTop = parseFloat( $.css( this.activeMenu[0], "borderTopWidth" ) ) || 0;
				paddingTop = parseFloat( $.css( this.activeMenu[0], "paddingTop" ) ) || 0;
				offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
				scroll = this.activeMenu.scrollTop();
				elementHeight = this.activeMenu.height();
				itemHeight = item.outerHeight();
	
				if ( offset < 0 ) {
					this.activeMenu.scrollTop( scroll + offset );
				} else if ( offset + itemHeight > elementHeight ) {
					this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );
				}
			}
		},
	
		blur: function( event, fromFocus ) {
			if ( !fromFocus ) {
				clearTimeout( this.timer );
			}
	
			if ( !this.active ) {
				return;
			}
	
			this.active.removeClass( "ui-state-focus" );
			this.active = null;
	
			this._trigger( "blur", event, { item: this.active } );
		},
	
		_startOpening: function( submenu ) {
			clearTimeout( this.timer );
	
			// Don't open if already open fixes a Firefox bug that caused a .5 pixel
			// shift in the submenu position when mousing over the carat icon
			if ( submenu.attr( "aria-hidden" ) !== "true" ) {
				return;
			}
	
			this.timer = this._delay(function() {
				this._close();
				this._open( submenu );
			}, this.delay );
		},
	
		_open: function( submenu ) {
			var position = $.extend({
				of: this.active
			}, this.options.position );
	
			clearTimeout( this.timer );
			this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
				.hide()
				.attr( "aria-hidden", "true" );
	
			submenu
				.show()
				.removeAttr( "aria-hidden" )
				.attr( "aria-expanded", "true" )
				.position( position );
		},
	
		collapseAll: function( event, all ) {
			clearTimeout( this.timer );
			this.timer = this._delay(function() {
				// If we were passed an event, look for the submenu that contains the event
				var currentMenu = all ? this.element :
					$( event && event.target ).closest( this.element.find( ".ui-menu" ) );
	
				// If we found no valid submenu ancestor, use the main menu to close all sub menus anyway
				if ( !currentMenu.length ) {
					currentMenu = this.element;
				}
	
				this._close( currentMenu );
	
				this.blur( event );
				this.activeMenu = currentMenu;
			}, this.delay );
		},
	
		// With no arguments, closes the currently active menu - if nothing is active
		// it closes all menus.  If passed an argument, it will search for menus BELOW
		_close: function( startMenu ) {
			if ( !startMenu ) {
				startMenu = this.active ? this.active.parent() : this.element;
			}
	
			startMenu
				.find( ".ui-menu" )
					.hide()
					.attr( "aria-hidden", "true" )
					.attr( "aria-expanded", "false" )
				.end()
				.find( ".ui-state-active" ).not( ".ui-state-focus" )
					.removeClass( "ui-state-active" );
		},
	
		_closeOnDocumentClick: function( event ) {
			return !$( event.target ).closest( ".ui-menu" ).length;
		},
	
		_isDivider: function( item ) {
	
			// Match hyphen, em dash, en dash
			return !/[^\-\u2014\u2013\s]/.test( item.text() );
		},
	
		collapse: function( event ) {
			var newItem = this.active &&
				this.active.parent().closest( ".ui-menu-item", this.element );
			if ( newItem && newItem.length ) {
				this._close();
				this.focus( event, newItem );
			}
		},
	
		expand: function( event ) {
			var newItem = this.active &&
				this.active
					.children( ".ui-menu " )
					.find( this.options.items )
					.first();
	
			if ( newItem && newItem.length ) {
				this._open( newItem.parent() );
	
				// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
				this._delay(function() {
					this.focus( event, newItem );
				});
			}
		},
	
		next: function( event ) {
			this._move( "next", "first", event );
		},
	
		previous: function( event ) {
			this._move( "prev", "last", event );
		},
	
		isFirstItem: function() {
			return this.active && !this.active.prevAll( ".ui-menu-item" ).length;
		},
	
		isLastItem: function() {
			return this.active && !this.active.nextAll( ".ui-menu-item" ).length;
		},
	
		_move: function( direction, filter, event ) {
			var next;
			if ( this.active ) {
				if ( direction === "first" || direction === "last" ) {
					next = this.active
						[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )
						.eq( -1 );
				} else {
					next = this.active
						[ direction + "All" ]( ".ui-menu-item" )
						.eq( 0 );
				}
			}
			if ( !next || !next.length || !this.active ) {
				next = this.activeMenu.find( this.options.items )[ filter ]();
			}
	
			this.focus( event, next );
		},
	
		nextPage: function( event ) {
			var item, base, height;
	
			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isLastItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.height();
				this.active.nextAll( ".ui-menu-item" ).each(function() {
					item = $( this );
					return item.offset().top - base - height < 0;
				});
	
				this.focus( event, item );
			} else {
				this.focus( event, this.activeMenu.find( this.options.items )
					[ !this.active ? "first" : "last" ]() );
			}
		},
	
		previousPage: function( event ) {
			var item, base, height;
			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isFirstItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.height();
				this.active.prevAll( ".ui-menu-item" ).each(function() {
					item = $( this );
					return item.offset().top - base + height > 0;
				});
	
				this.focus( event, item );
			} else {
				this.focus( event, this.activeMenu.find( this.options.items ).first() );
			}
		},
	
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop( "scrollHeight" );
		},
	
		select: function( event ) {
			// TODO: It should never be possible to not have an active item at this
			// point, but the tests don't trigger mouseenter before click.
			this.active = this.active || $( event.target ).closest( ".ui-menu-item" );
			var ui = { item: this.active };
			if ( !this.active.has( ".ui-menu" ).length ) {
				this.collapseAll( event, true );
			}
			this._trigger( "select", event, ui );
		}
	});
	
	
	/*!
	 * jQuery UI Autocomplete 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/autocomplete/
	 */
	
	
	$.widget( "ui.autocomplete", {
		version: "1.11.1",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: false,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
	
			// callbacks
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
	
		requestIndex: 0,
		pending: 0,
	
		_create: function() {
			// Some browsers only repeat keydown events, not keypress events,
			// so we use the suppressKeyPress flag to determine if we've already
			// handled the keydown event. #7269
			// Unfortunately the code for & in keypress is the same as the up arrow,
			// so we use the suppressKeyPressRepeat flag to avoid handling keypress
			// events when we know the keydown event was used to modify the
			// search term. #7799
			var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
				nodeName = this.element[ 0 ].nodeName.toLowerCase(),
				isTextarea = nodeName === "textarea",
				isInput = nodeName === "input";
	
			this.isMultiLine =
				// Textareas are always multi-line
				isTextarea ? true :
				// Inputs are always single-line, even if inside a contentEditable element
				// IE also treats inputs as contentEditable
				isInput ? false :
				// All other element types are determined by whether or not they're contentEditable
				this.element.prop( "isContentEditable" );
	
			this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];
			this.isNewMenu = true;
	
			this.element
				.addClass( "ui-autocomplete-input" )
				.attr( "autocomplete", "off" );
	
			this._on( this.element, {
				keydown: function( event ) {
					if ( this.element.prop( "readOnly" ) ) {
						suppressKeyPress = true;
						suppressInput = true;
						suppressKeyPressRepeat = true;
						return;
					}
	
					suppressKeyPress = false;
					suppressInput = false;
					suppressKeyPressRepeat = false;
					var keyCode = $.ui.keyCode;
					switch ( event.keyCode ) {
					case keyCode.PAGE_UP:
						suppressKeyPress = true;
						this._move( "previousPage", event );
						break;
					case keyCode.PAGE_DOWN:
						suppressKeyPress = true;
						this._move( "nextPage", event );
						break;
					case keyCode.UP:
						suppressKeyPress = true;
						this._keyEvent( "previous", event );
						break;
					case keyCode.DOWN:
						suppressKeyPress = true;
						this._keyEvent( "next", event );
						break;
					case keyCode.ENTER:
						// when menu is open and has focus
						if ( this.menu.active ) {
							// #6055 - Opera still allows the keypress to occur
							// which causes forms to submit
							suppressKeyPress = true;
							event.preventDefault();
							this.menu.select( event );
						}
						break;
					case keyCode.TAB:
						if ( this.menu.active ) {
							this.menu.select( event );
						}
						break;
					case keyCode.ESCAPE:
						if ( this.menu.element.is( ":visible" ) ) {
							if ( !this.isMultiLine ) {
								this._value( this.term );
							}
							this.close( event );
							// Different browsers have different default behavior for escape
							// Single press can mean undo or clear
							// Double press in IE means clear the whole form
							event.preventDefault();
						}
						break;
					default:
						suppressKeyPressRepeat = true;
						// search timeout should be triggered before the input value is changed
						this._searchTimeout( event );
						break;
					}
				},
				keypress: function( event ) {
					if ( suppressKeyPress ) {
						suppressKeyPress = false;
						if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
							event.preventDefault();
						}
						return;
					}
					if ( suppressKeyPressRepeat ) {
						return;
					}
	
					// replicate some key handlers to allow them to repeat in Firefox and Opera
					var keyCode = $.ui.keyCode;
					switch ( event.keyCode ) {
					case keyCode.PAGE_UP:
						this._move( "previousPage", event );
						break;
					case keyCode.PAGE_DOWN:
						this._move( "nextPage", event );
						break;
					case keyCode.UP:
						this._keyEvent( "previous", event );
						break;
					case keyCode.DOWN:
						this._keyEvent( "next", event );
						break;
					}
				},
				input: function( event ) {
					if ( suppressInput ) {
						suppressInput = false;
						event.preventDefault();
						return;
					}
					this._searchTimeout( event );
				},
				focus: function() {
					this.selectedItem = null;
					this.previous = this._value();
				},
				blur: function( event ) {
					if ( this.cancelBlur ) {
						delete this.cancelBlur;
						return;
					}
	
					clearTimeout( this.searching );
					this.close( event );
					this._change( event );
				}
			});
	
			this._initSource();
			this.menu = $( "<ul>" )
				.addClass( "ui-autocomplete ui-front" )
				.appendTo( this._appendTo() )
				.menu({
					// disable ARIA support, the live region takes care of that
					role: null
				})
				.hide()
				.menu( "instance" );
	
			this._on( this.menu.element, {
				mousedown: function( event ) {
					// prevent moving focus out of the text field
					event.preventDefault();
	
					// IE doesn't prevent moving focus even with event.preventDefault()
					// so we set a flag to know when we should ignore the blur event
					this.cancelBlur = true;
					this._delay(function() {
						delete this.cancelBlur;
					});
	
					// clicking on the scrollbar causes focus to shift to the body
					// but we can't detect a mouseup or a click immediately afterward
					// so we have to track the next mousedown and close the menu if
					// the user clicks somewhere outside of the autocomplete
					var menuElement = this.menu.element[ 0 ];
					if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
						this._delay(function() {
							var that = this;
							this.document.one( "mousedown", function( event ) {
								if ( event.target !== that.element[ 0 ] &&
										event.target !== menuElement &&
										!$.contains( menuElement, event.target ) ) {
									that.close();
								}
							});
						});
					}
				},
				menufocus: function( event, ui ) {
					var label, item;
					// support: Firefox
					// Prevent accidental activation of menu items in Firefox (#7024 #9118)
					if ( this.isNewMenu ) {
						this.isNewMenu = false;
						if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {
							this.menu.blur();
	
							this.document.one( "mousemove", function() {
								$( event.target ).trigger( event.originalEvent );
							});
	
							return;
						}
					}
	
					item = ui.item.data( "ui-autocomplete-item" );
					if ( false !== this._trigger( "focus", event, { item: item } ) ) {
						// use value to match what will end up in the input, if it was a key event
						if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
							this._value( item.value );
						}
					}
	
					// Announce the value in the liveRegion
					label = ui.item.attr( "aria-label" ) || item.value;
					if ( label && $.trim( label ).length ) {
						this.liveRegion.children().hide();
						$( "<div>" ).text( label ).appendTo( this.liveRegion );
					}
				},
				menuselect: function( event, ui ) {
					var item = ui.item.data( "ui-autocomplete-item" ),
						previous = this.previous;
	
					// only trigger when focus was lost (click on menu)
					if ( this.element[ 0 ] !== this.document[ 0 ].activeElement ) {
						this.element.focus();
						this.previous = previous;
						// #6109 - IE triggers two focus events and the second
						// is asynchronous, so we need to reset the previous
						// term synchronously and asynchronously :-(
						this._delay(function() {
							this.previous = previous;
							this.selectedItem = item;
						});
					}
	
					if ( false !== this._trigger( "select", event, { item: item } ) ) {
						this._value( item.value );
					}
					// reset the term after the select event
					// this allows custom select handling to work properly
					this.term = this._value();
	
					this.close( event );
					this.selectedItem = item;
				}
			});
	
			this.liveRegion = $( "<span>", {
					role: "status",
					"aria-live": "assertive",
					"aria-relevant": "additions"
				})
				.addClass( "ui-helper-hidden-accessible" )
				.appendTo( this.document[ 0 ].body );
	
			// turning off autocomplete prevents the browser from remembering the
			// value when navigating through history, so we re-enable autocomplete
			// if the page is unloaded before the widget is destroyed. #7790
			this._on( this.window, {
				beforeunload: function() {
					this.element.removeAttr( "autocomplete" );
				}
			});
		},
	
		_destroy: function() {
			clearTimeout( this.searching );
			this.element
				.removeClass( "ui-autocomplete-input" )
				.removeAttr( "autocomplete" );
			this.menu.element.remove();
			this.liveRegion.remove();
		},
	
		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "source" ) {
				this._initSource();
			}
			if ( key === "appendTo" ) {
				this.menu.element.appendTo( this._appendTo() );
			}
			if ( key === "disabled" && value && this.xhr ) {
				this.xhr.abort();
			}
		},
	
		_appendTo: function() {
			var element = this.options.appendTo;
	
			if ( element ) {
				element = element.jquery || element.nodeType ?
					$( element ) :
					this.document.find( element ).eq( 0 );
			}
	
			if ( !element || !element[ 0 ] ) {
				element = this.element.closest( ".ui-front" );
			}
	
			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}
	
			return element;
		},
	
		_initSource: function() {
			var array, url,
				that = this;
			if ( $.isArray( this.options.source ) ) {
				array = this.options.source;
				this.source = function( request, response ) {
					response( $.ui.autocomplete.filter( array, request.term ) );
				};
			} else if ( typeof this.options.source === "string" ) {
				url = this.options.source;
				this.source = function( request, response ) {
					if ( that.xhr ) {
						that.xhr.abort();
					}
					that.xhr = $.ajax({
						url: url,
						data: request,
						dataType: "json",
						success: function( data ) {
							response( data );
						},
						error: function() {
							response([]);
						}
					});
				};
			} else {
				this.source = this.options.source;
			}
		},
	
		_searchTimeout: function( event ) {
			clearTimeout( this.searching );
			this.searching = this._delay(function() {
	
				// Search if the value has changed, or if the user retypes the same value (see #7434)
				var equalValues = this.term === this._value(),
					menuVisible = this.menu.element.is( ":visible" ),
					modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	
				if ( !equalValues || ( equalValues && !menuVisible && !modifierKey ) ) {
					this.selectedItem = null;
					this.search( null, event );
				}
			}, this.options.delay );
		},
	
		search: function( value, event ) {
			value = value != null ? value : this._value();
	
			// always save the actual value, not the one passed as an argument
			this.term = this._value();
	
			if ( value.length < this.options.minLength ) {
				return this.close( event );
			}
	
			if ( this._trigger( "search", event ) === false ) {
				return;
			}
	
			return this._search( value );
		},
	
		_search: function( value ) {
			this.pending++;
			this.element.addClass( "ui-autocomplete-loading" );
			this.cancelSearch = false;
	
			this.source( { term: value }, this._response() );
		},
	
		_response: function() {
			var index = ++this.requestIndex;
	
			return $.proxy(function( content ) {
				if ( index === this.requestIndex ) {
					this.__response( content );
				}
	
				this.pending--;
				if ( !this.pending ) {
					this.element.removeClass( "ui-autocomplete-loading" );
				}
			}, this );
		},
	
		__response: function( content ) {
			if ( content ) {
				content = this._normalize( content );
			}
			this._trigger( "response", null, { content: content } );
			if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
				this._suggest( content );
				this._trigger( "open" );
			} else {
				// use ._close() instead of .close() so we don't cancel future searches
				this._close();
			}
		},
	
		close: function( event ) {
			this.cancelSearch = true;
			this._close( event );
		},
	
		_close: function( event ) {
			if ( this.menu.element.is( ":visible" ) ) {
				this.menu.element.hide();
				this.menu.blur();
				this.isNewMenu = true;
				this._trigger( "close", event );
			}
		},
	
		_change: function( event ) {
			if ( this.previous !== this._value() ) {
				this._trigger( "change", event, { item: this.selectedItem } );
			}
		},
	
		_normalize: function( items ) {
			// assume all items have the right format when the first item is complete
			if ( items.length && items[ 0 ].label && items[ 0 ].value ) {
				return items;
			}
			return $.map( items, function( item ) {
				if ( typeof item === "string" ) {
					return {
						label: item,
						value: item
					};
				}
				return $.extend( {}, item, {
					label: item.label || item.value,
					value: item.value || item.label
				});
			});
		},
	
		_suggest: function( items ) {
			var ul = this.menu.element.empty();
			this._renderMenu( ul, items );
			this.isNewMenu = true;
			this.menu.refresh();
	
			// size and position menu
			ul.show();
			this._resizeMenu();
			ul.position( $.extend({
				of: this.element
			}, this.options.position ) );
	
			if ( this.options.autoFocus ) {
				this.menu.next();
			}
		},
	
		_resizeMenu: function() {
			var ul = this.menu.element;
			ul.outerWidth( Math.max(
				// Firefox wraps long text (possibly a rounding bug)
				// so we add 1px to avoid the wrapping (#7513)
				ul.width( "" ).outerWidth() + 1,
				this.element.outerWidth()
			) );
		},
	
		_renderMenu: function( ul, items ) {
			var that = this;
			$.each( items, function( index, item ) {
				that._renderItemData( ul, item );
			});
		},
	
		_renderItemData: function( ul, item ) {
			return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
		},
	
		_renderItem: function( ul, item ) {
			return $( "<li>" ).text( item.label ).appendTo( ul );
		},
	
		_move: function( direction, event ) {
			if ( !this.menu.element.is( ":visible" ) ) {
				this.search( null, event );
				return;
			}
			if ( this.menu.isFirstItem() && /^previous/.test( direction ) ||
					this.menu.isLastItem() && /^next/.test( direction ) ) {
	
				if ( !this.isMultiLine ) {
					this._value( this.term );
				}
	
				this.menu.blur();
				return;
			}
			this.menu[ direction ]( event );
		},
	
		widget: function() {
			return this.menu.element;
		},
	
		_value: function() {
			return this.valueMethod.apply( this.element, arguments );
		},
	
		_keyEvent: function( keyEvent, event ) {
			if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
				this._move( keyEvent, event );
	
				// prevents moving cursor to beginning/end of the text field in some browsers
				event.preventDefault();
			}
		}
	});
	
	$.extend( $.ui.autocomplete, {
		escapeRegex: function( value ) {
			return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		},
		filter: function( array, term ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex( term ), "i" );
			return $.grep( array, function( value ) {
				return matcher.test( value.label || value.value || value );
			});
		}
	});
	
	// live region extension, adding a `messages` option
	// NOTE: This is an experimental API. We are still investigating
	// a full solution for string manipulation and internationalization.
	$.widget( "ui.autocomplete", $.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function( amount ) {
					return amount + ( amount > 1 ? " results are" : " result is" ) +
						" available, use up and down arrow keys to navigate.";
				}
			}
		},
	
		__response: function( content ) {
			var message;
			this._superApply( arguments );
			if ( this.options.disabled || this.cancelSearch ) {
				return;
			}
			if ( content && content.length ) {
				message = this.options.messages.results( content.length );
			} else {
				message = this.options.messages.noResults;
			}
			this.liveRegion.children().hide();
			$( "<div>" ).text( message ).appendTo( this.liveRegion );
		}
	});
	
	var autocomplete = $.ui.autocomplete;
	
	
	/*!
	 * jQuery UI Button 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/button/
	 */
	
	
	var lastActive,
		baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
		typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
		formResetHandler = function() {
			var form = $( this );
			setTimeout(function() {
				form.find( ":ui-button" ).button( "refresh" );
			}, 1 );
		},
		radioGroup = function( radio ) {
			var name = radio.name,
				form = radio.form,
				radios = $( [] );
			if ( name ) {
				name = name.replace( /'/g, "\\'" );
				if ( form ) {
					radios = $( form ).find( "[name='" + name + "'][type=radio]" );
				} else {
					radios = $( "[name='" + name + "'][type=radio]", radio.ownerDocument )
						.filter(function() {
							return !this.form;
						});
				}
			}
			return radios;
		};
	
	$.widget( "ui.button", {
		version: "1.11.1",
		defaultElement: "<button>",
		options: {
			disabled: null,
			text: true,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest( "form" )
				.unbind( "reset" + this.eventNamespace )
				.bind( "reset" + this.eventNamespace, formResetHandler );
	
			if ( typeof this.options.disabled !== "boolean" ) {
				this.options.disabled = !!this.element.prop( "disabled" );
			} else {
				this.element.prop( "disabled", this.options.disabled );
			}
	
			this._determineButtonType();
			this.hasTitle = !!this.buttonElement.attr( "title" );
	
			var that = this,
				options = this.options,
				toggleButton = this.type === "checkbox" || this.type === "radio",
				activeClass = !toggleButton ? "ui-state-active" : "";
	
			if ( options.label === null ) {
				options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
			}
	
			this._hoverable( this.buttonElement );
	
			this.buttonElement
				.addClass( baseClasses )
				.attr( "role", "button" )
				.bind( "mouseenter" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return;
					}
					if ( this === lastActive ) {
						$( this ).addClass( "ui-state-active" );
					}
				})
				.bind( "mouseleave" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return;
					}
					$( this ).removeClass( activeClass );
				})
				.bind( "click" + this.eventNamespace, function( event ) {
					if ( options.disabled ) {
						event.preventDefault();
						event.stopImmediatePropagation();
					}
				});
	
			// Can't use _focusable() because the element that receives focus
			// and the element that gets the ui-state-focus class are different
			this._on({
				focus: function() {
					this.buttonElement.addClass( "ui-state-focus" );
				},
				blur: function() {
					this.buttonElement.removeClass( "ui-state-focus" );
				}
			});
	
			if ( toggleButton ) {
				this.element.bind( "change" + this.eventNamespace, function() {
					that.refresh();
				});
			}
	
			if ( this.type === "checkbox" ) {
				this.buttonElement.bind( "click" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
				});
			} else if ( this.type === "radio" ) {
				this.buttonElement.bind( "click" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).addClass( "ui-state-active" );
					that.buttonElement.attr( "aria-pressed", "true" );
	
					var radio = that.element[ 0 ];
					radioGroup( radio )
						.not( radio )
						.map(function() {
							return $( this ).button( "widget" )[ 0 ];
						})
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				});
			} else {
				this.buttonElement
					.bind( "mousedown" + this.eventNamespace, function() {
						if ( options.disabled ) {
							return false;
						}
						$( this ).addClass( "ui-state-active" );
						lastActive = this;
						that.document.one( "mouseup", function() {
							lastActive = null;
						});
					})
					.bind( "mouseup" + this.eventNamespace, function() {
						if ( options.disabled ) {
							return false;
						}
						$( this ).removeClass( "ui-state-active" );
					})
					.bind( "keydown" + this.eventNamespace, function(event) {
						if ( options.disabled ) {
							return false;
						}
						if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {
							$( this ).addClass( "ui-state-active" );
						}
					})
					// see #8559, we bind to blur here in case the button element loses
					// focus between keydown and keyup, it would be left in an "active" state
					.bind( "keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
						$( this ).removeClass( "ui-state-active" );
					});
	
				if ( this.buttonElement.is("a") ) {
					this.buttonElement.keyup(function(event) {
						if ( event.keyCode === $.ui.keyCode.SPACE ) {
							// TODO pass through original event correctly (just as 2nd argument doesn't work)
							$( this ).click();
						}
					});
				}
			}
	
			this._setOption( "disabled", options.disabled );
			this._resetButton();
		},
	
		_determineButtonType: function() {
			var ancestor, labelSelector, checked;
	
			if ( this.element.is("[type=checkbox]") ) {
				this.type = "checkbox";
			} else if ( this.element.is("[type=radio]") ) {
				this.type = "radio";
			} else if ( this.element.is("input") ) {
				this.type = "input";
			} else {
				this.type = "button";
			}
	
			if ( this.type === "checkbox" || this.type === "radio" ) {
				// we don't search against the document in case the element
				// is disconnected from the DOM
				ancestor = this.element.parents().last();
				labelSelector = "label[for='" + this.element.attr("id") + "']";
				this.buttonElement = ancestor.find( labelSelector );
				if ( !this.buttonElement.length ) {
					ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
					this.buttonElement = ancestor.filter( labelSelector );
					if ( !this.buttonElement.length ) {
						this.buttonElement = ancestor.find( labelSelector );
					}
				}
				this.element.addClass( "ui-helper-hidden-accessible" );
	
				checked = this.element.is( ":checked" );
				if ( checked ) {
					this.buttonElement.addClass( "ui-state-active" );
				}
				this.buttonElement.prop( "aria-pressed", checked );
			} else {
				this.buttonElement = this.element;
			}
		},
	
		widget: function() {
			return this.buttonElement;
		},
	
		_destroy: function() {
			this.element
				.removeClass( "ui-helper-hidden-accessible" );
			this.buttonElement
				.removeClass( baseClasses + " ui-state-active " + typeClasses )
				.removeAttr( "role" )
				.removeAttr( "aria-pressed" )
				.html( this.buttonElement.find(".ui-button-text").html() );
	
			if ( !this.hasTitle ) {
				this.buttonElement.removeAttr( "title" );
			}
		},
	
		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "disabled" ) {
				this.widget().toggleClass( "ui-state-disabled", !!value );
				this.element.prop( "disabled", !!value );
				if ( value ) {
					if ( this.type === "checkbox" || this.type === "radio" ) {
						this.buttonElement.removeClass( "ui-state-focus" );
					} else {
						this.buttonElement.removeClass( "ui-state-focus ui-state-active" );
					}
				}
				return;
			}
			this._resetButton();
		},
	
		refresh: function() {
			//See #8237 & #8828
			var isDisabled = this.element.is( "input, button" ) ? this.element.is( ":disabled" ) : this.element.hasClass( "ui-button-disabled" );
	
			if ( isDisabled !== this.options.disabled ) {
				this._setOption( "disabled", isDisabled );
			}
			if ( this.type === "radio" ) {
				radioGroup( this.element[0] ).each(function() {
					if ( $( this ).is( ":checked" ) ) {
						$( this ).button( "widget" )
							.addClass( "ui-state-active" )
							.attr( "aria-pressed", "true" );
					} else {
						$( this ).button( "widget" )
							.removeClass( "ui-state-active" )
							.attr( "aria-pressed", "false" );
					}
				});
			} else if ( this.type === "checkbox" ) {
				if ( this.element.is( ":checked" ) ) {
					this.buttonElement
						.addClass( "ui-state-active" )
						.attr( "aria-pressed", "true" );
				} else {
					this.buttonElement
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				}
			}
		},
	
		_resetButton: function() {
			if ( this.type === "input" ) {
				if ( this.options.label ) {
					this.element.val( this.options.label );
				}
				return;
			}
			var buttonElement = this.buttonElement.removeClass( typeClasses ),
				buttonText = $( "<span></span>", this.document[0] )
					.addClass( "ui-button-text" )
					.html( this.options.label )
					.appendTo( buttonElement.empty() )
					.text(),
				icons = this.options.icons,
				multipleIcons = icons.primary && icons.secondary,
				buttonClasses = [];
	
			if ( icons.primary || icons.secondary ) {
				if ( this.options.text ) {
					buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );
				}
	
				if ( icons.primary ) {
					buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );
				}
	
				if ( icons.secondary ) {
					buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );
				}
	
				if ( !this.options.text ) {
					buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );
	
					if ( !this.hasTitle ) {
						buttonElement.attr( "title", $.trim( buttonText ) );
					}
				}
			} else {
				buttonClasses.push( "ui-button-text-only" );
			}
			buttonElement.addClass( buttonClasses.join( " " ) );
		}
	});
	
	$.widget( "ui.buttonset", {
		version: "1.11.1",
		options: {
			items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
		},
	
		_create: function() {
			this.element.addClass( "ui-buttonset" );
		},
	
		_init: function() {
			this.refresh();
		},
	
		_setOption: function( key, value ) {
			if ( key === "disabled" ) {
				this.buttons.button( "option", key, value );
			}
	
			this._super( key, value );
		},
	
		refresh: function() {
			var rtl = this.element.css( "direction" ) === "rtl",
				allButtons = this.element.find( this.options.items ),
				existingButtons = allButtons.filter( ":ui-button" );
	
			// Initialize new buttons
			allButtons.not( ":ui-button" ).button();
	
			// Refresh existing buttons
			existingButtons.button( "refresh" );
	
			this.buttons = allButtons
				.map(function() {
					return $( this ).button( "widget" )[ 0 ];
				})
					.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
					.filter( ":first" )
						.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
					.end()
					.filter( ":last" )
						.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
					.end()
				.end();
		},
	
		_destroy: function() {
			this.element.removeClass( "ui-buttonset" );
			this.buttons
				.map(function() {
					return $( this ).button( "widget" )[ 0 ];
				})
					.removeClass( "ui-corner-left ui-corner-right" )
				.end()
				.button( "destroy" );
		}
	});
	
	var button = $.ui.button;
	
	
	/*!
	 * jQuery UI Datepicker 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/datepicker/
	 */
	
	
	$.extend($.ui, { datepicker: { version: "1.11.1" } });
	
	var datepicker_instActive;
	
	function datepicker_getZindex( elem ) {
		var position, value;
		while ( elem.length && elem[ 0 ] !== document ) {
			// Ignore z-index if position is set to a value where z-index is ignored by the browser
			// This makes behavior of this function consistent across browsers
			// WebKit always returns auto if the element is positioned
			position = elem.css( "position" );
			if ( position === "absolute" || position === "relative" || position === "fixed" ) {
				// IE returns 0 when zIndex is not specified
				// other browsers return a string
				// we ignore the case of nested elements with an explicit value of 0
				// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
				value = parseInt( elem.css( "zIndex" ), 10 );
				if ( !isNaN( value ) && value !== 0 ) {
					return value;
				}
			}
			elem = elem.parent();
		}
	
		return 0;
	}
	/* Date picker manager.
	   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	   Settings for (groups of) date pickers are maintained in an instance object,
	   allowing multiple different settings on the same page. */
	
	function Datepicker() {
		this._curInst = null; // The current instance in use
		this._keyEvent = false; // If the last event was a key event
		this._disabledInputs = []; // List of date picker inputs that have been disabled
		this._datepickerShowing = false; // True if the popup picker is showing , false if not
		this._inDialog = false; // True if showing within a "dialog", false if not
		this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
		this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
		this._appendClass = "ui-datepicker-append"; // The name of the append marker class
		this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
		this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
		this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
		this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
		this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
		this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
		this.regional = []; // Available regional settings, indexed by language code
		this.regional[""] = { // Default regional settings
			closeText: "Done", // Display text for close link
			prevText: "Prev", // Display text for previous month link
			nextText: "Next", // Display text for next month link
			currentText: "Today", // Display text for current month link
			monthNames: ["January","February","March","April","May","June",
				"July","August","September","October","November","December"], // Names of months for drop-down and formatting
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
			dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
			weekHeader: "Wk", // Column header for week of the year
			dateFormat: "mm/dd/yy", // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: "" // Additional text to append to the year in the month headers
		};
		this._defaults = { // Global defaults for all the date picker instances
			showOn: "focus", // "focus" for popup on focus,
				// "button" for trigger button, or "both" for either
			showAnim: "fadeIn", // Name of jQuery animation for popup
			showOptions: {}, // Options for enhanced animations
			defaultDate: null, // Used when field is blank: actual date,
				// +/-number for offset from today, null for today
			appendText: "", // Display text following the input box, e.g. showing the format
			buttonText: "...", // Text for trigger button
			buttonImage: "", // URL for trigger button image
			buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext: false, // True to hide next/previous month links
				// if not applicable, false to just disable them
			navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
			gotoCurrent: false, // True if today link goes back to current selection instead
			changeMonth: false, // True if month can be selected directly, false if only prev/next
			changeYear: false, // True if year can be selected directly, false if only prev/next
			yearRange: "c-10:c+10", // Range of years to display in drop-down,
				// either relative to today's year (-nn:+nn), relative to currently displayed year
				// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths: false, // True to show dates in other months, false to leave blank
			selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
			showWeek: false, // True to show week of the year, false to not show it
			calculateWeek: this.iso8601Week, // How to calculate the week of the year,
				// takes a Date and returns the number of the week for it
			shortYearCutoff: "+10", // Short year values < this are in the current century,
				// > this are in the previous century,
				// string value starting with "+" for current year + value
			minDate: null, // The earliest selectable date, or null for no limit
			maxDate: null, // The latest selectable date, or null for no limit
			duration: "fast", // Duration of display/closure
			beforeShowDay: null, // Function that takes a date and returns an array with
				// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
				// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow: null, // Function that takes an input field and
				// returns a set of custom settings for the date picker
			onSelect: null, // Define a callback function when a date is selected
			onChangeMonthYear: null, // Define a callback function when the month or year is changed
			onClose: null, // Define a callback function when the datepicker is closed
			numberOfMonths: 1, // Number of months to show at a time
			showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths: 1, // Number of months to step back/forward
			stepBigMonths: 12, // Number of months to step back/forward for the big links
			altField: "", // Selector for an alternate field to store selected dates into
			altFormat: "", // The date format to use for the alternate field
			constrainInput: true, // The input is constrained by the current date format
			showButtonPanel: false, // True to show button panel, false to not show it
			autoSize: false, // True to size the input for the date format, false to leave as is
			disabled: false // The initial disabled state
		};
		$.extend(this._defaults, this.regional[""]);
		this.regional.en = $.extend( true, {}, this.regional[ "" ]);
		this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
		this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
	}
	
	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName: "hasDatepicker",
	
		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows: 4,
	
		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker: function() {
			return this.dpDiv;
		},
	
		/* Override the default settings for all instances of the date picker.
		 * @param  settings  object - the new settings to use as defaults (anonymous object)
		 * @return the manager object
		 */
		setDefaults: function(settings) {
			datepicker_extendRemove(this._defaults, settings || {});
			return this;
		},
	
		/* Attach the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
		 */
		_attachDatepicker: function(target, settings) {
			var nodeName, inline, inst;
			nodeName = target.nodeName.toLowerCase();
			inline = (nodeName === "div" || nodeName === "span");
			if (!target.id) {
				this.uuid += 1;
				target.id = "dp" + this.uuid;
			}
			inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {});
			if (nodeName === "input") {
				this._connectDatepicker(target, inst);
			} else if (inline) {
				this._inlineDatepicker(target, inst);
			}
		},
	
		/* Create a new instance object. */
		_newInst: function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
			return {id: id, input: target, // associated target
				selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
				drawMonth: 0, drawYear: 0, // month being drawn
				inline: inline, // is datepicker inline or not
				dpDiv: (!inline ? this.dpDiv : // presentation div
				datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
		},
	
		/* Attach the date picker to an input field. */
		_connectDatepicker: function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName)) {
				return;
			}
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).
				keypress(this._doKeyPress).keyup(this._doKeyUp);
			this._autoSize(inst);
			$.data(target, "datepicker", inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
		},
	
		/* Make attachments based on settings. */
		_attachments: function(input, inst) {
			var showOn, buttonText, buttonImage,
				appendText = this._get(inst, "appendText"),
				isRTL = this._get(inst, "isRTL");
	
			if (inst.append) {
				inst.append.remove();
			}
			if (appendText) {
				inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
				input[isRTL ? "before" : "after"](inst.append);
			}
	
			input.unbind("focus", this._showDatepicker);
	
			if (inst.trigger) {
				inst.trigger.remove();
			}
	
			showOn = this._get(inst, "showOn");
			if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
				input.focus(this._showDatepicker);
			}
			if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
				buttonText = this._get(inst, "buttonText");
				buttonImage = this._get(inst, "buttonImage");
				inst.trigger = $(this._get(inst, "buttonImageOnly") ?
					$("<img/>").addClass(this._triggerClass).
						attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
					$("<button type='button'></button>").addClass(this._triggerClass).
						html(!buttonImage ? buttonText : $("<img/>").attr(
						{ src:buttonImage, alt:buttonText, title:buttonText })));
				input[isRTL ? "before" : "after"](inst.trigger);
				inst.trigger.click(function() {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
						$.datepicker._hideDatepicker();
					} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else {
						$.datepicker._showDatepicker(input[0]);
					}
					return false;
				});
			}
		},
	
		/* Apply the maximum length for the date format. */
		_autoSize: function(inst) {
			if (this._get(inst, "autoSize") && !inst.inline) {
				var findMax, max, maxI, i,
					date = new Date(2009, 12 - 1, 20), // Ensure double digits
					dateFormat = this._get(inst, "dateFormat");
	
				if (dateFormat.match(/[DM]/)) {
					findMax = function(names) {
						max = 0;
						maxI = 0;
						for (i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
						"monthNames" : "monthNamesShort"))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
						"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
				}
				inst.input.attr("size", this._formatDate(inst, date).length);
			}
		},
	
		/* Attach an inline date picker to a div. */
		_inlineDatepicker: function(target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName)) {
				return;
			}
			divSpan.addClass(this.markerClassName).append(inst.dpDiv);
			$.data(target, "datepicker", inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css( "display", "block" );
		},
	
		/* Pop-up the date picker in a "dialog" box.
		 * @param  input element - ignored
		 * @param  date	string or Date - the initial date to display
		 * @param  onSelect  function - the function to call when a date is selected
		 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		 * @param  pos int[2] - coordinates for the dialog's position within the screen or
		 *					event - with x/y coordinates or
		 *					leave empty for default (screen centre)
		 * @return the manager object
		 */
		_dialogDatepicker: function(input, date, onSelect, settings, pos) {
			var id, browserWidth, browserHeight, scrollX, scrollY,
				inst = this._dialogInst; // internal instance
	
			if (!inst) {
				this.uuid += 1;
				id = "dp" + this.uuid;
				this._dialogInput = $("<input type='text' id='" + id +
					"' style='position: absolute; top: -100px; width: 0px;'/>");
				this._dialogInput.keydown(this._doKeyDown);
				$("body").append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], "datepicker", inst);
			}
			datepicker_extendRemove(inst.settings, settings || {});
			date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);
	
			this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if (!this._pos) {
				browserWidth = document.documentElement.clientWidth;
				browserHeight = document.documentElement.clientHeight;
				scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
					[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}
	
			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI) {
				$.blockUI(this.dpDiv);
			}
			$.data(this._dialogInput[0], "datepicker", inst);
			return this;
		},
	
		/* Detach a datepicker from its control.
		 * @param  target	element - the target input field or division or span
		 */
		_destroyDatepicker: function(target) {
			var nodeName,
				$target = $(target),
				inst = $.data(target, "datepicker");
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			$.removeData(target, "datepicker");
			if (nodeName === "input") {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).
					unbind("focus", this._showDatepicker).
					unbind("keydown", this._doKeyDown).
					unbind("keypress", this._doKeyPress).
					unbind("keyup", this._doKeyUp);
			} else if (nodeName === "div" || nodeName === "span") {
				$target.removeClass(this.markerClassName).empty();
			}
		},
	
		/* Enable the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 */
		_enableDatepicker: function(target) {
			var nodeName, inline,
				$target = $(target),
				inst = $.data(target, "datepicker");
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = false;
				inst.trigger.filter("button").
					each(function() { this.disabled = false; }).end().
					filter("img").css({opacity: "1.0", cursor: ""});
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().removeClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === target ? null : value); }); // delete entry
		},
	
		/* Disable the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 */
		_disableDatepicker: function(target) {
			var nodeName, inline,
				$target = $(target),
				inst = $.data(target, "datepicker");
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = true;
				inst.trigger.filter("button").
					each(function() { this.disabled = true; }).end().
					filter("img").css({opacity: "0.5", cursor: "default"});
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().addClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === target ? null : value); }); // delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},
	
		/* Is the first field in a jQuery collection disabled as a datepicker?
		 * @param  target	element - the target input field or division or span
		 * @return boolean - true if disabled, false if enabled
		 */
		_isDisabledDatepicker: function(target) {
			if (!target) {
				return false;
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] === target) {
					return true;
				}
			}
			return false;
		},
	
		/* Retrieve the instance data for the target control.
		 * @param  target  element - the target input field or division or span
		 * @return  object - the associated instance data
		 * @throws  error if a jQuery problem getting data
		 */
		_getInst: function(target) {
			try {
				return $.data(target, "datepicker");
			}
			catch (err) {
				throw "Missing instance data for this datepicker";
			}
		},
	
		/* Update or retrieve the settings for a date picker attached to an input field or division.
		 * @param  target  element - the target input field or division or span
		 * @param  name	object - the new settings to update or
		 *				string - the name of the setting to change or retrieve,
		 *				when retrieving also "all" for all instance settings or
		 *				"defaults" for all global defaults
		 * @param  value   any - the new value for the setting
		 *				(omit if above is an object or to retrieve a value)
		 */
		_optionDatepicker: function(target, name, value) {
			var settings, date, minDate, maxDate,
				inst = this._getInst(target);
	
			if (arguments.length === 2 && typeof name === "string") {
				return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
					(inst ? (name === "all" ? $.extend({}, inst.settings) :
					this._get(inst, name)) : null));
			}
	
			settings = name || {};
			if (typeof name === "string") {
				settings = {};
				settings[name] = value;
			}
	
			if (inst) {
				if (this._curInst === inst) {
					this._hideDatepicker();
				}
	
				date = this._getDateDatepicker(target, true);
				minDate = this._getMinMaxDate(inst, "min");
				maxDate = this._getMinMaxDate(inst, "max");
				datepicker_extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
					inst.settings.minDate = this._formatDate(inst, minDate);
				}
				if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				}
				if ( "disabled" in settings ) {
					if ( settings.disabled ) {
						this._disableDatepicker(target);
					} else {
						this._enableDatepicker(target);
					}
				}
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},
	
		// change method deprecated
		_changeDatepicker: function(target, name, value) {
			this._optionDatepicker(target, name, value);
		},
	
		/* Redraw the date picker attached to an input field or division.
		 * @param  target  element - the target input field or division or span
		 */
		_refreshDatepicker: function(target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst);
			}
		},
	
		/* Set the dates for a jQuery selection.
		 * @param  target element - the target input field or division or span
		 * @param  date	Date - the new date
		 */
		_setDateDatepicker: function(target, date) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},
	
		/* Get the date(s) for the first entry in a jQuery selection.
		 * @param  target element - the target input field or division or span
		 * @param  noDefault boolean - true if no default date is to be used
		 * @return Date - the current date
		 */
		_getDateDatepicker: function(target, noDefault) {
			var inst = this._getInst(target);
			if (inst && !inst.inline) {
				this._setDateFromField(inst, noDefault);
			}
			return (inst ? this._getDate(inst) : null);
		},
	
		/* Handle keystrokes. */
		_doKeyDown: function(event) {
			var onSelect, dateStr, sel,
				inst = $.datepicker._getInst(event.target),
				handled = true,
				isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
	
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
					case 9: $.datepicker._hideDatepicker();
							handled = false;
							break; // hide on tab out
					case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
										$.datepicker._currentClass + ")", inst.dpDiv);
							if (sel[0]) {
								$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
							}
	
							onSelect = $.datepicker._get(inst, "onSelect");
							if (onSelect) {
								dateStr = $.datepicker._formatDate(inst);
	
								// trigger custom callback
								onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
							} else {
								$.datepicker._hideDatepicker();
							}
	
							return false; // don't submit the form
					case 27: $.datepicker._hideDatepicker();
							break; // hide on escape
					case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
							break; // previous month/year on page up/+ ctrl
					case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
							break; // next month/year on page down/+ ctrl
					case 35: if (event.ctrlKey || event.metaKey) {
								$.datepicker._clearDate(event.target);
							}
							handled = event.ctrlKey || event.metaKey;
							break; // clear on ctrl or command +end
					case 36: if (event.ctrlKey || event.metaKey) {
								$.datepicker._gotoToday(event.target);
							}
							handled = event.ctrlKey || event.metaKey;
							break; // current on ctrl or command +home
					case 37: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
							}
							handled = event.ctrlKey || event.metaKey;
							// -1 day on ctrl or command +left
							if (event.originalEvent.altKey) {
								$.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, "stepBigMonths") :
									-$.datepicker._get(inst, "stepMonths")), "M");
							}
							// next month/year on alt +left on Mac
							break;
					case 38: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, -7, "D");
							}
							handled = event.ctrlKey || event.metaKey;
							break; // -1 week on ctrl or command +up
					case 39: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
							}
							handled = event.ctrlKey || event.metaKey;
							// +1 day on ctrl or command +right
							if (event.originalEvent.altKey) {
								$.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, "stepBigMonths") :
									+$.datepicker._get(inst, "stepMonths")), "M");
							}
							// next month/year on alt +right
							break;
					case 40: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, +7, "D");
							}
							handled = event.ctrlKey || event.metaKey;
							break; // +1 week on ctrl or command +down
					default: handled = false;
				}
			} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			} else {
				handled = false;
			}
	
			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
	
		/* Filter entered characters - based on date format. */
		_doKeyPress: function(event) {
			var chars, chr,
				inst = $.datepicker._getInst(event.target);
	
			if ($.datepicker._get(inst, "constrainInput")) {
				chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
				chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
			}
		},
	
		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp: function(event) {
			var date,
				inst = $.datepicker._getInst(event.target);
	
			if (inst.input.val() !== inst.lastVal) {
				try {
					date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						(inst.input ? inst.input.val() : null),
						$.datepicker._getFormatConfig(inst));
	
					if (date) { // only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				}
				catch (err) {
				}
			}
			return true;
		},
	
		/* Pop-up the date picker for a given input field.
		 * If false returned from beforeShow event handler do not show.
		 * @param  input  element - the input field attached to the date picker or
		 *					event - if triggered by focus
		 */
		_showDatepicker: function(input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
				input = $("input", input.parentNode)[0];
			}
	
			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
				return;
			}
	
			var inst, beforeShow, beforeShowSettings, isFixed,
				offset, showAnim, duration;
	
			inst = $.datepicker._getInst(input);
			if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if ( inst && $.datepicker._datepickerShowing ) {
					$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
				}
			}
	
			beforeShow = $.datepicker._get(inst, "beforeShow");
			beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false){
				return;
			}
			datepicker_extendRemove(inst.settings, beforeShowSettings);
	
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
	
			if ($.datepicker._inDialog) { // hide cursor
				input.value = "";
			}
			if (!$.datepicker._pos) { // position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight; // add the height
			}
	
			isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css("position") === "fixed";
				return !isFixed;
			});
	
			offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
			$.datepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
			$.datepicker._updateDatepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
				"static" : (isFixed ? "fixed" : "absolute")), display: "none",
				left: offset.left + "px", top: offset.top + "px"});
	
			if (!inst.inline) {
				showAnim = $.datepicker._get(inst, "showAnim");
				duration = $.datepicker._get(inst, "duration");
				inst.dpDiv.css( "z-index", datepicker_getZindex( $( input ) ) + 1 );
				$.datepicker._datepickerShowing = true;
	
				if ( $.effects && $.effects.effect[ showAnim ] ) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
				} else {
					inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
				}
	
				if ( $.datepicker._shouldFocusInput( inst ) ) {
					inst.input.focus();
				}
	
				$.datepicker._curInst = inst;
			}
		},
	
		/* Generate the date picker content. */
		_updateDatepicker: function(inst) {
			this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
			datepicker_instActive = inst; // for delegate hover events
			inst.dpDiv.empty().append(this._generateHTML(inst));
			this._attachHandlers(inst);
	
			var origyearshtml,
				numMonths = this._getNumberOfMonths(inst),
				cols = numMonths[1],
				width = 17,
				activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );
	
			if ( activeCell.length > 0 ) {
				datepicker_handleMouseover.apply( activeCell.get( 0 ) );
			}
	
			inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			if (cols > 1) {
				inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
			}
			inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
				"Class"]("ui-datepicker-multi");
			inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
				"Class"]("ui-datepicker-rtl");
	
			if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}
	
			// deffered render of the years select (to avoid flashes on Firefox)
			if( inst.yearshtml ){
				origyearshtml = inst.yearshtml;
				setTimeout(function(){
					//assure that inst.yearshtml didn't change.
					if( origyearshtml === inst.yearshtml && inst.yearshtml ){
						inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},
	
		// #6694 - don't focus the input if it's already focused
		// this breaks the change event in IE
		// Support: IE and jQuery <1.9
		_shouldFocusInput: function( inst ) {
			return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
		},
	
		/* Check positioning to remain on screen. */
		_checkOffset: function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth(),
				dpHeight = inst.dpDiv.outerHeight(),
				inputWidth = inst.input ? inst.input.outerWidth() : 0,
				inputHeight = inst.input ? inst.input.outerHeight() : 0,
				viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
				viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
	
			offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
	
			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
				Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
				Math.abs(dpHeight + inputHeight) : 0);
	
			return offset;
		},
	
		/* Find an object's position on the screen. */
		_findPos: function(obj) {
			var position,
				inst = this._getInst(obj),
				isRTL = this._get(inst, "isRTL");
	
			while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
				obj = obj[isRTL ? "previousSibling" : "nextSibling"];
			}
	
			position = $(obj).offset();
			return [position.left, position.top];
		},
	
		/* Hide the date picker from view.
		 * @param  input  element - the input field attached to the date picker
		 */
		_hideDatepicker: function(input) {
			var showAnim, duration, postProcess, onClose,
				inst = this._curInst;
	
			if (!inst || (input && inst !== $.data(input, "datepicker"))) {
				return;
			}
	
			if (this._datepickerShowing) {
				showAnim = this._get(inst, "showAnim");
				duration = this._get(inst, "duration");
				postProcess = function() {
					$.datepicker._tidyDialog(inst);
				};
	
				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
				} else {
					inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
						(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
				}
	
				if (!showAnim) {
					postProcess();
				}
				this._datepickerShowing = false;
	
				onClose = this._get(inst, "onClose");
				if (onClose) {
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
				}
	
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
					if ($.blockUI) {
						$.unblockUI();
						$("body").append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},
	
		/* Tidy up after a dialog display. */
		_tidyDialog: function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
		},
	
		/* Close date picker if clicked elsewhere. */
		_checkExternalClick: function(event) {
			if (!$.datepicker._curInst) {
				return;
			}
	
			var $target = $(event.target),
				inst = $.datepicker._getInst($target[0]);
	
			if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
					$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
					!$target.hasClass($.datepicker.markerClassName) &&
					!$target.closest("." + $.datepicker._triggerClass).length &&
					$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
				( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
					$.datepicker._hideDatepicker();
			}
		},
	
		/* Adjust one of the date sub-fields. */
		_adjustDate: function(id, offset, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
	
			if (this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset +
				(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
				period);
			this._updateDatepicker(inst);
		},
	
		/* Action for current link. */
		_gotoToday: function(id) {
			var date,
				target = $(id),
				inst = this._getInst(target[0]);
	
			if (this._get(inst, "gotoCurrent") && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},
	
		/* Action for selecting a new month/year. */
		_selectMonthYear: function(id, select, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
	
			inst["selected" + (period === "M" ? "Month" : "Year")] =
			inst["draw" + (period === "M" ? "Month" : "Year")] =
				parseInt(select.options[select.selectedIndex].value,10);
	
			this._notifyChange(inst);
			this._adjustDate(target);
		},
	
		/* Action for selecting a day. */
		_selectDay: function(id, month, year, td) {
			var inst,
				target = $(id);
	
			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}
	
			inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $("a", td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		},
	
		/* Erase the input field and hide the date picker. */
		_clearDate: function(id) {
			var target = $(id);
			this._selectDate(target, "");
		},
	
		/* Update the input field with the selected date. */
		_selectDate: function(id, dateStr) {
			var onSelect,
				target = $(id),
				inst = this._getInst(target[0]);
	
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if (inst.input) {
				inst.input.val(dateStr);
			}
			this._updateAlternate(inst);
	
			onSelect = this._get(inst, "onSelect");
			if (onSelect) {
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
			} else if (inst.input) {
				inst.input.trigger("change"); // fire the change event
			}
	
			if (inst.inline){
				this._updateDatepicker(inst);
			} else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (typeof(inst.input[0]) !== "object") {
					inst.input.focus(); // restore focus
				}
				this._lastInput = null;
			}
		},
	
		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate: function(inst) {
			var altFormat, date, dateStr,
				altField = this._get(inst, "altField");
	
			if (altField) { // update alternate field too
				altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
				date = this._getDate(inst);
				dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() { $(this).val(dateStr); });
			}
		},
	
		/* Set as beforeShowDay function to prevent selection of weekends.
		 * @param  date  Date - the date to customise
		 * @return [boolean, string] - is this date selectable?, what is its CSS class?
		 */
		noWeekends: function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ""];
		},
	
		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		 * @param  date  Date - the date to get the week for
		 * @return  number - the number of the week within the year that contains this date
		 */
		iso8601Week: function(date) {
			var time,
				checkDate = new Date(date.getTime());
	
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
	
			time = checkDate.getTime();
			checkDate.setMonth(0); // Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},
	
		/* Parse a string value into a date object.
		 * See formatDate below for the possible formats.
		 *
		 * @param  format string - the expected format of the date
		 * @param  value string - the date in the above format
		 * @param  settings Object - attributes include:
		 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
		 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
		 *					dayNames		string[7] - names of the days from Sunday (optional)
		 *					monthNamesShort string[12] - abbreviated names of the months (optional)
		 *					monthNames		string[12] - names of the months (optional)
		 * @return  Date - the extracted date value or null if value is blank
		 */
		parseDate: function (format, value, settings) {
			if (format == null || value == null) {
				throw "Invalid arguments";
			}
	
			value = (typeof value === "object" ? value.toString() : value + "");
			if (value === "") {
				return null;
			}
	
			var iFormat, dim, extra,
				iValue = 0,
				shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
					new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
				dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				year = -1,
				month = -1,
				day = -1,
				doy = -1,
				literal = false,
				date,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				},
				// Extract a number from the string value
				getNumber = function(match) {
					var isDoubled = lookAhead(match),
						size = (match === "@" ? 14 : (match === "!" ? 20 :
						(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
						minSize = (match === "y" ? size : 1),
						digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
						num = value.substring(iValue).match(digits);
					if (!num) {
						throw "Missing number at position " + iValue;
					}
					iValue += num[0].length;
					return parseInt(num[0], 10);
				},
				// Extract a name from the string value and convert to an index
				getName = function(match, shortNames, longNames) {
					var index = -1,
						names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
							return [ [k, v] ];
						}).sort(function (a, b) {
							return -(a[1].length - b[1].length);
						});
	
					$.each(names, function (i, pair) {
						var name = pair[1];
						if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
							index = pair[0];
							iValue += name.length;
							return false;
						}
					});
					if (index !== -1) {
						return index + 1;
					} else {
						throw "Unknown name at position " + iValue;
					}
				},
				// Confirm that a literal character matches the string value
				checkLiteral = function() {
					if (value.charAt(iValue) !== format.charAt(iFormat)) {
						throw "Unexpected literal at position " + iValue;
					}
					iValue++;
				};
	
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						checkLiteral();
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							day = getNumber("d");
							break;
						case "D":
							getName("D", dayNamesShort, dayNames);
							break;
						case "o":
							doy = getNumber("o");
							break;
						case "m":
							month = getNumber("m");
							break;
						case "M":
							month = getName("M", monthNamesShort, monthNames);
							break;
						case "y":
							year = getNumber("y");
							break;
						case "@":
							date = new Date(getNumber("@"));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "!":
							date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if (lookAhead("'")){
								checkLiteral();
							} else {
								literal = true;
							}
							break;
						default:
							checkLiteral();
					}
				}
			}
	
			if (iValue < value.length){
				extra = value.substr(iValue);
				if (!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
	
			if (year === -1) {
				year = new Date().getFullYear();
			} else if (year < 100) {
				year += new Date().getFullYear() - new Date().getFullYear() % 100 +
					(year <= shortYearCutoff ? 0 : -100);
			}
	
			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim) {
						break;
					}
					month++;
					day -= dim;
				} while (true);
			}
	
			date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
				throw "Invalid date"; // E.g. 31/02/00
			}
			return date;
		},
	
		/* Standard date formats. */
		ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y", // RFC 822
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd", // ISO 8601
	
		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
			Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
	
		/* Format a date object into a string value.
		 * The format can be combinations of the following:
		 * d  - day of month (no leading zero)
		 * dd - day of month (two digit)
		 * o  - day of year (no leading zeros)
		 * oo - day of year (three digit)
		 * D  - day name short
		 * DD - day name long
		 * m  - month of year (no leading zero)
		 * mm - month of year (two digit)
		 * M  - month name short
		 * MM - month name long
		 * y  - year (two digit)
		 * yy - year (four digit)
		 * @ - Unix timestamp (ms since 01/01/1970)
		 * ! - Windows ticks (100ns since 01/01/0001)
		 * "..." - literal text
		 * '' - single quote
		 *
		 * @param  format string - the desired format of the date
		 * @param  date Date - the date value to format
		 * @param  settings Object - attributes include:
		 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
		 *					dayNames		string[7] - names of the days from Sunday (optional)
		 *					monthNamesShort string[12] - abbreviated names of the months (optional)
		 *					monthNames		string[12] - names of the months (optional)
		 * @return  string - the date in the above format
		 */
		formatDate: function (format, date, settings) {
			if (!date) {
				return "";
			}
	
			var iFormat,
				dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				},
				// Format a number, with leading zero if necessary
				formatNumber = function(match, value, len) {
					var num = "" + value;
					if (lookAhead(match)) {
						while (num.length < len) {
							num = "0" + num;
						}
					}
					return num;
				},
				// Format a name, short or long as requested
				formatName = function(match, value, shortNames, longNames) {
					return (lookAhead(match) ? longNames[value] : shortNames[value]);
				},
				output = "",
				literal = false;
	
			if (date) {
				for (iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal) {
						if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
							literal = false;
						} else {
							output += format.charAt(iFormat);
						}
					} else {
						switch (format.charAt(iFormat)) {
							case "d":
								output += formatNumber("d", date.getDate(), 2);
								break;
							case "D":
								output += formatName("D", date.getDay(), dayNamesShort, dayNames);
								break;
							case "o":
								output += formatNumber("o",
									Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case "m":
								output += formatNumber("m", date.getMonth() + 1, 2);
								break;
							case "M":
								output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
								break;
							case "y":
								output += (lookAhead("y") ? date.getFullYear() :
									(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
								break;
							case "@":
								output += date.getTime();
								break;
							case "!":
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if (lookAhead("'")) {
									output += "'";
								} else {
									literal = true;
								}
								break;
							default:
								output += format.charAt(iFormat);
						}
					}
				}
			}
			return output;
		},
	
		/* Extract all possible characters from the date format. */
		_possibleChars: function (format) {
			var iFormat,
				chars = "",
				literal = false,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				};
	
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						chars += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d": case "m": case "y": case "@":
							chars += "0123456789";
							break;
						case "D": case "M":
							return null; // Accept anything
						case "'":
							if (lookAhead("'")) {
								chars += "'";
							} else {
								literal = true;
							}
							break;
						default:
							chars += format.charAt(iFormat);
					}
				}
			}
			return chars;
		},
	
		/* Get a setting value, defaulting if necessary. */
		_get: function(inst, name) {
			return inst.settings[name] !== undefined ?
				inst.settings[name] : this._defaults[name];
		},
	
		/* Parse existing date and initialise date picker. */
		_setDateFromField: function(inst, noDefault) {
			if (inst.input.val() === inst.lastVal) {
				return;
			}
	
			var dateFormat = this._get(inst, "dateFormat"),
				dates = inst.lastVal = inst.input ? inst.input.val() : null,
				defaultDate = this._getDefaultDate(inst),
				date = defaultDate,
				settings = this._getFormatConfig(inst);
	
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				dates = (noDefault ? "" : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = (dates ? date.getDate() : 0);
			inst.currentMonth = (dates ? date.getMonth() : 0);
			inst.currentYear = (dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},
	
		/* Retrieve the default date shown on opening. */
		_getDefaultDate: function(inst) {
			return this._restrictMinMax(inst,
				this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
		},
	
		/* A date may be specified as an exact value or a relative one. */
		_determineDate: function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
					var date = new Date();
					date.setDate(date.getDate() + offset);
					return date;
				},
				offsetString = function(offset) {
					try {
						return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
							offset, $.datepicker._getFormatConfig(inst));
					}
					catch (e) {
						// Ignore
					}
	
					var date = (offset.toLowerCase().match(/^c/) ?
						$.datepicker._getDate(inst) : null) || new Date(),
						year = date.getFullYear(),
						month = date.getMonth(),
						day = date.getDate(),
						pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
						matches = pattern.exec(offset);
	
					while (matches) {
						switch (matches[2] || "d") {
							case "d" : case "D" :
								day += parseInt(matches[1],10); break;
							case "w" : case "W" :
								day += parseInt(matches[1],10) * 7; break;
							case "m" : case "M" :
								month += parseInt(matches[1],10);
								day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
								break;
							case "y": case "Y" :
								year += parseInt(matches[1],10);
								day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
								break;
						}
						matches = pattern.exec(offset);
					}
					return new Date(year, month, day);
				},
				newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
					(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
	
			newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
			if (newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},
	
		/* Handle switch to/from daylight saving.
		 * Hours may be non-zero on daylight saving cut-over:
		 * > 12 when midnight changeover, but then cannot generate
		 * midnight datetime, so jump to 1AM, otherwise reset.
		 * @param  date  (Date) the date to check
		 * @return  (Date) the corrected date
		 */
		_daylightSavingAdjust: function(date) {
			if (!date) {
				return null;
			}
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},
	
		/* Set the date(s) directly. */
		_setDate: function(inst, date, noChange) {
			var clear = !date,
				origMonth = inst.selectedMonth,
				origYear = inst.selectedYear,
				newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
	
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
				this._notifyChange(inst);
			}
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? "" : this._formatDate(inst));
			}
		},
	
		/* Retrieve the date(s) directly. */
		_getDate: function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
				this._daylightSavingAdjust(new Date(
				inst.currentYear, inst.currentMonth, inst.currentDay)));
				return startDate;
		},
	
		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers: function(inst) {
			var stepMonths = this._get(inst, "stepMonths"),
				id = "#" + inst.id.replace( /\\\\/g, "\\" );
			inst.dpDiv.find("[data-handler]").map(function () {
				var handler = {
					prev: function () {
						$.datepicker._adjustDate(id, -stepMonths, "M");
					},
					next: function () {
						$.datepicker._adjustDate(id, +stepMonths, "M");
					},
					hide: function () {
						$.datepicker._hideDatepicker();
					},
					today: function () {
						$.datepicker._gotoToday(id);
					},
					selectDay: function () {
						$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
						return false;
					},
					selectMonth: function () {
						$.datepicker._selectMonthYear(id, this, "M");
						return false;
					},
					selectYear: function () {
						$.datepicker._selectMonthYear(id, this, "Y");
						return false;
					}
				};
				$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
			});
		},
	
		/* Generate the HTML for the current state of the date picker. */
		_generateHTML: function(inst) {
			var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
				controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
				monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
				selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
				cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
				printDate, dRow, tbody, daySettings, otherMonth, unselectable,
				tempDate = new Date(),
				today = this._daylightSavingAdjust(
					new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
				isRTL = this._get(inst, "isRTL"),
				showButtonPanel = this._get(inst, "showButtonPanel"),
				hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
				navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
				numMonths = this._getNumberOfMonths(inst),
				showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
				stepMonths = this._get(inst, "stepMonths"),
				isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
				currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
					new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
				minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				drawMonth = inst.drawMonth - showCurrentAtPos,
				drawYear = inst.drawYear;
	
			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if (maxDate) {
				maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
					maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
	
			prevText = this._get(inst, "prevText");
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
				this._getFormatConfig(inst)));
	
			prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
				"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
				" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
				(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));
	
			nextText = this._get(inst, "nextText");
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
				this._getFormatConfig(inst)));
	
			next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
				"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
				" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
				(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));
	
			currentText = this._get(inst, "currentText");
			gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText :
				this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
	
			controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
				this._get(inst, "closeText") + "</button>" : "");
	
			buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
				(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
				">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
	
			firstDay = parseInt(this._get(inst, "firstDay"),10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
	
			showWeek = this._get(inst, "showWeek");
			dayNames = this._get(inst, "dayNames");
			dayNamesMin = this._get(inst, "dayNamesMin");
			monthNames = this._get(inst, "monthNames");
			monthNamesShort = this._get(inst, "monthNamesShort");
			beforeShowDay = this._get(inst, "beforeShowDay");
			showOtherMonths = this._get(inst, "showOtherMonths");
			selectOtherMonths = this._get(inst, "selectOtherMonths");
			defaultDate = this._getDefaultDate(inst);
			html = "";
			dow;
			for (row = 0; row < numMonths[0]; row++) {
				group = "";
				this.maxRows = 4;
				for (col = 0; col < numMonths[1]; col++) {
					selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					cornerClass = " ui-corner-all";
					calender = "";
					if (isMultiMonth) {
						calender += "<div class='ui-datepicker-group";
						if (numMonths[1] > 1) {
							switch (col) {
								case 0: calender += " ui-datepicker-group-first";
									cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
								case numMonths[1]-1: calender += " ui-datepicker-group-last";
									cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
								default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
							}
						}
						calender += "'>";
					}
					calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
						(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
						(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
						this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
						row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
						"</div><table class='ui-datepicker-calendar'><thead>" +
						"<tr>";
					thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
					for (dow = 0; dow < 7; dow++) { // days of the week
						day = (dow + firstDay) % 7;
						thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
							"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
					}
					calender += thead + "</tr></thead><tbody>";
					daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					}
					leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
					numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
						calender += "<tr>";
						tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
							this._get(inst, "calculateWeek")(printDate) + "</td>");
						for (dow = 0; dow < 7; dow++) { // create date picker days
							daySettings = (beforeShowDay ?
								beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
							otherMonth = (printDate.getMonth() !== drawMonth);
							unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
								(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += "<td class='" +
								((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
								(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
								((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
								(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
								// or defaultDate is current printedDate and defaultDate is selectedDate
								" " + this._dayOverClass : "") + // highlight selected day
								(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
								(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
								(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
								(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
								((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
								(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
								(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
								(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
								(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
								(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
								(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
								"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + "</tr>";
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
								((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
					group += calender;
				}
				html += group;
			}
			html += buttonPanel;
			inst._keyEvent = false;
			return html;
		},
	
		/* Generate the month and year header. */
		_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
				secondary, monthNames, monthNamesShort) {
	
			var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
				changeMonth = this._get(inst, "changeMonth"),
				changeYear = this._get(inst, "changeYear"),
				showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
				html = "<div class='ui-datepicker-title'>",
				monthHtml = "";
	
			// month selection
			if (secondary || !changeMonth) {
				monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
			} else {
				inMinYear = (minDate && minDate.getFullYear() === drawYear);
				inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
				monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
				for ( month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += "<option value='" + month + "'" +
							(month === drawMonth ? " selected='selected'" : "") +
							">" + monthNamesShort[month] + "</option>";
					}
				}
				monthHtml += "</select>";
			}
	
			if (!showMonthAfterYear) {
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
			}
	
			// year selection
			if ( !inst.yearshtml ) {
				inst.yearshtml = "";
				if (secondary || !changeYear) {
					html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
				} else {
					// determine range of years to display
					years = this._get(inst, "yearRange").split(":");
					thisYear = new Date().getFullYear();
					determineYear = function(value) {
						var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
							(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
							parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					year = determineYear(years[0]);
					endYear = Math.max(year, determineYear(years[1] || ""));
					year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
					for (; year <= endYear; year++) {
						inst.yearshtml += "<option value='" + year + "'" +
							(year === drawYear ? " selected='selected'" : "") +
							">" + year + "</option>";
					}
					inst.yearshtml += "</select>";
	
					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
	
			html += this._get(inst, "yearSuffix");
			if (showMonthAfterYear) {
				html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
			}
			html += "</div>"; // Close datepicker_header
			return html;
		},
	
		/* Adjust one of the date sub-fields. */
		_adjustInstDate: function(inst, offset, period) {
			var year = inst.drawYear + (period === "Y" ? offset : 0),
				month = inst.drawMonth + (period === "M" ? offset : 0),
				day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
				date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
	
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period === "M" || period === "Y") {
				this._notifyChange(inst);
			}
		},
	
		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax: function(inst, date) {
			var minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				newDate = (minDate && date < minDate ? minDate : date);
			return (maxDate && newDate > maxDate ? maxDate : newDate);
		},
	
		/* Notify change of month/year. */
		_notifyChange: function(inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			if (onChange) {
				onChange.apply((inst.input ? inst.input[0] : null),
					[inst.selectedYear, inst.selectedMonth + 1, inst]);
			}
		},
	
		/* Determine the number of months to show. */
		_getNumberOfMonths: function(inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
		},
	
		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate: function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
		},
	
		/* Find the number of days in a given month. */
		_getDaysInMonth: function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},
	
		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth: function(year, month) {
			return new Date(year, month, 1).getDay();
		},
	
		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth: function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst),
				date = this._daylightSavingAdjust(new Date(curYear,
				curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
	
			if (offset < 0) {
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			}
			return this._isInRange(inst, date);
		},
	
		/* Is the given date in the accepted range? */
		_isInRange: function(inst, date) {
			var yearSplit, currentYear,
				minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				minYear = null,
				maxYear = null,
				years = this._get(inst, "yearRange");
				if (years){
					yearSplit = years.split(":");
					currentYear = new Date().getFullYear();
					minYear = parseInt(yearSplit[0], 10);
					maxYear = parseInt(yearSplit[1], 10);
					if ( yearSplit[0].match(/[+\-].*/) ) {
						minYear += currentYear;
					}
					if ( yearSplit[1].match(/[+\-].*/) ) {
						maxYear += currentYear;
					}
				}
	
			return ((!minDate || date.getTime() >= minDate.getTime()) &&
				(!maxDate || date.getTime() <= maxDate.getTime()) &&
				(!minYear || date.getFullYear() >= minYear) &&
				(!maxYear || date.getFullYear() <= maxYear));
		},
	
		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig: function(inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
				monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
		},
	
		/* Format the given date for display. */
		_formatDate: function(inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = (day ? (typeof day === "object" ? day :
				this._daylightSavingAdjust(new Date(year, month, day))) :
				this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
		}
	});
	
	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
	 */
	function datepicker_bindHover(dpDiv) {
		var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return dpDiv.delegate(selector, "mouseout", function() {
				$(this).removeClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") !== -1) {
					$(this).removeClass("ui-datepicker-prev-hover");
				}
				if (this.className.indexOf("ui-datepicker-next") !== -1) {
					$(this).removeClass("ui-datepicker-next-hover");
				}
			})
			.delegate( selector, "mouseover", datepicker_handleMouseover );
	}
	
	function datepicker_handleMouseover() {
		if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
			$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
			$(this).addClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).addClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).addClass("ui-datepicker-next-hover");
			}
		}
	}
	
	/* jQuery extend now ignores nulls! */
	function datepicker_extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) {
			if (props[name] == null) {
				target[name] = props[name];
			}
		}
		return target;
	}
	
	/* Invoke the datepicker functionality.
	   @param  options  string - a command, optionally followed by additional parameters or
						Object - settings for attaching new datepicker functionality
	   @return  jQuery object */
	$.fn.datepicker = function(options){
	
		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if ( !this.length ) {
			return this;
		}
	
		/* Initialise the date picker. */
		if (!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick);
			$.datepicker.initialized = true;
		}
	
		/* Append datepicker main container to body if not exist. */
		if ($("#"+$.datepicker._mainDivId).length === 0) {
			$("body").append($.datepicker.dpDiv);
		}
	
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
			return $.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this[0]].concat(otherArgs));
		}
		if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
			return $.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this[0]].concat(otherArgs));
		}
		return this.each(function() {
			typeof options === "string" ?
				$.datepicker["_" + options + "Datepicker"].
					apply($.datepicker, [this].concat(otherArgs)) :
				$.datepicker._attachDatepicker(this, options);
		});
	};
	
	$.datepicker = new Datepicker(); // singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.11.1";
	
	var datepicker = $.datepicker;
	
	
	/*!
	 * jQuery UI Draggable 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/draggable/
	 */
	
	
	$.widget("ui.draggable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: true,
			appendTo: "parent",
			axis: false,
			connectToSortable: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			grid: false,
			handle: false,
			helper: "original",
			iframeFix: false,
			opacity: false,
			refreshPositions: false,
			revert: false,
			revertDuration: 500,
			scope: "default",
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: false,
			snapMode: "both",
			snapTolerance: 20,
			stack: false,
			zIndex: false,
	
			// callbacks
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
	
			if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
				this.element[0].style.position = "relative";
			}
			if (this.options.addClasses){
				this.element.addClass("ui-draggable");
			}
			if (this.options.disabled){
				this.element.addClass("ui-draggable-disabled");
			}
			this._setHandleClassName();
	
			this._mouseInit();
		},
	
		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "handle" ) {
				this._removeHandleClassName();
				this._setHandleClassName();
			}
		},
	
		_destroy: function() {
			if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
				this.destroyOnClear = true;
				return;
			}
			this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
			this._removeHandleClassName();
			this._mouseDestroy();
		},
	
		_mouseCapture: function(event) {
	
			var document = this.document[ 0 ],
				o = this.options;
	
			// support: IE9
			// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
			try {
				// Support: IE9+
				// If the <body> is blurred, IE will switch windows, see #9520
				if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {
					// Blur any element that currently has focus, see #4261
					$( document.activeElement ).blur();
				}
			} catch ( error ) {}
	
			// among others, prevent a drag on a resizable-handle
			if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
				return false;
			}
	
			//Quit if we're not on a valid handle
			this.handle = this._getHandle(event);
			if (!this.handle) {
				return false;
			}
	
			$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
				$("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>")
				.css({
					width: this.offsetWidth + "px", height: this.offsetHeight + "px",
					position: "absolute", opacity: "0.001", zIndex: 1000
				})
				.css($(this).offset())
				.appendTo("body");
			});
	
			return true;
	
		},
	
		_mouseStart: function(event) {
	
			var o = this.options;
	
			//Create and append the visible helper
			this.helper = this._createHelper(event);
	
			this.helper.addClass("ui-draggable-dragging");
	
			//Cache the helper size
			this._cacheHelperProportions();
	
			//If ddmanager is used for droppables, set the global draggable
			if ($.ui.ddmanager) {
				$.ui.ddmanager.current = this;
			}
	
			/*
			 * - Position generation -
			 * This block generates everything position related - it's the core of draggables.
			 */
	
			//Cache the margins of the original element
			this._cacheMargins();
	
			//Store the helper's css position
			this.cssPosition = this.helper.css( "position" );
			this.scrollParent = this.helper.scrollParent( true );
			this.offsetParent = this.helper.offsetParent();
			this.offsetParentCssPosition = this.offsetParent.css( "position" );
	
			//The element's absolute position on the page minus margins
			this.offset = this.positionAbs = this.element.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
	
			//Reset scroll cache
			this.offset.scroll = false;
	
			$.extend(this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
			});
	
			//Generate the original position
			this.originalPosition = this.position = this._generatePosition( event, false );
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;
	
			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
	
			//Set a containment if given in the options
			this._setContainment();
	
			//Trigger event + callbacks
			if (this._trigger("start", event) === false) {
				this._clear();
				return false;
			}
	
			//Recache the helper size
			this._cacheHelperProportions();
	
			//Prepare the droppable offsets
			if ($.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
	
			this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
	
			//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStart(this, event);
			}
	
			return true;
		},
	
		_mouseDrag: function(event, noPropagation) {
			// reset any necessary cached properties (see #5009)
			if ( this.offsetParentCssPosition === "fixed" ) {
				this.offset.parent = this._getParentOffset();
			}
	
			//Compute the helpers position
			this.position = this._generatePosition( event, true );
			this.positionAbs = this._convertPositionTo("absolute");
	
			//Call plugins and callbacks and use the resulting position if something is returned
			if (!noPropagation) {
				var ui = this._uiHash();
				if (this._trigger("drag", event, ui) === false) {
					this._mouseUp({});
					return false;
				}
				this.position = ui.position;
			}
	
			this.helper[ 0 ].style.left = this.position.left + "px";
			this.helper[ 0 ].style.top = this.position.top + "px";
	
			if ($.ui.ddmanager) {
				$.ui.ddmanager.drag(this, event);
			}
	
			return false;
		},
	
		_mouseStop: function(event) {
	
			//If we are using droppables, inform the manager about the drop
			var that = this,
				dropped = false;
			if ($.ui.ddmanager && !this.options.dropBehaviour) {
				dropped = $.ui.ddmanager.drop(this, event);
			}
	
			//if a drop comes from outside (a sortable)
			if (this.dropped) {
				dropped = this.dropped;
				this.dropped = false;
			}
	
			if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
				$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					if (that._trigger("stop", event) !== false) {
						that._clear();
					}
				});
			} else {
				if (this._trigger("stop", event) !== false) {
					this._clear();
				}
			}
	
			return false;
		},
	
		_mouseUp: function(event) {
			//Remove frame helpers
			$("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this);
			});
	
			//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStop(this, event);
			}
	
			// The interaction is over; whether or not the click resulted in a drag, focus the element
			this.element.focus();
	
			return $.ui.mouse.prototype._mouseUp.call(this, event);
		},
	
		cancel: function() {
	
			if (this.helper.is(".ui-draggable-dragging")) {
				this._mouseUp({});
			} else {
				this._clear();
			}
	
			return this;
	
		},
	
		_getHandle: function(event) {
			return this.options.handle ?
				!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
				true;
		},
	
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ?
				this.element.find( this.options.handle ) : this.element;
			this.handleElement.addClass( "ui-draggable-handle" );
		},
	
		_removeHandleClassName: function() {
			this.handleElement.removeClass( "ui-draggable-handle" );
		},
	
		_createHelper: function(event) {
	
			var o = this.options,
				helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[ 0 ], [ event ])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
	
			if (!helper.parents("body").length) {
				helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
			}
	
			if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
				helper.css("position", "absolute");
			}
	
			return helper;
	
		},
	
		_adjustOffsetFromHelper: function(obj) {
			if (typeof obj === "string") {
				obj = obj.split(" ");
			}
			if ($.isArray(obj)) {
				obj = { left: +obj[0], top: +obj[1] || 0 };
			}
			if ("left" in obj) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ("right" in obj) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ("top" in obj) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ("bottom" in obj) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},
	
		_isRootNode: function( element ) {
			return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
		},
	
		_getParentOffset: function() {
	
			//Get the offsetParent and cache its position
			var po = this.offsetParent.offset(),
				document = this.document[ 0 ];
	
			// This is a special case where we need to modify a offset calculated on start, since the following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
			//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
			if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}
	
			if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
				po = { top: 0, left: 0 };
			}
	
			return {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
	
		},
	
		_getRelativeOffset: function() {
			if ( this.cssPosition !== "relative" ) {
				return { top: 0, left: 0 };
			}
	
			var p = this.element.position(),
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );
	
			return {
				top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
				left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
			};
	
		},
	
		_cacheMargins: function() {
			this.margins = {
				left: (parseInt(this.element.css("marginLeft"), 10) || 0),
				top: (parseInt(this.element.css("marginTop"), 10) || 0),
				right: (parseInt(this.element.css("marginRight"), 10) || 0),
				bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
			};
		},
	
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
	
		_setContainment: function() {
	
			var over, c, ce,
				o = this.options,
				document = this.document[ 0 ];
	
			this.relativeContainer = null;
	
			if ( !o.containment ) {
				this.containment = null;
				return;
			}
	
			if ( o.containment === "window" ) {
				this.containment = [
					$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
					$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
					$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
					$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
				];
				return;
			}
	
			if ( o.containment === "document") {
				this.containment = [
					0,
					0,
					$( document ).width() - this.helperProportions.width - this.margins.left,
					( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
				];
				return;
			}
	
			if ( o.containment.constructor === Array ) {
				this.containment = o.containment;
				return;
			}
	
			if ( o.containment === "parent" ) {
				o.containment = this.helper[ 0 ].parentNode;
			}
	
			c = $( o.containment );
			ce = c[ 0 ];
	
			if ( !ce ) {
				return;
			}
	
			over = c.css( "overflow" ) !== "hidden";
	
			this.containment = [
				( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
				( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
				( over ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) - ( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) - this.helperProportions.width - this.margins.left - this.margins.right,
				( over ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) - ( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) - this.helperProportions.height - this.margins.top  - this.margins.bottom
			];
			this.relativeContainer = c;
		},
	
		_convertPositionTo: function(d, pos) {
	
			if (!pos) {
				pos = this.position;
			}
	
			var mod = d === "absolute" ? 1 : -1,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );
	
			return {
				top: (
					pos.top	+																// The absolute mouse position
					this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
				),
				left: (
					pos.left +																// The absolute mouse position
					this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
				)
			};
	
		},
	
		_generatePosition: function( event, constrainPosition ) {
	
			var containment, co, top, left,
				o = this.options,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
				pageX = event.pageX,
				pageY = event.pageY;
	
			// Cache the scroll
			if ( !scrollIsRootNode || !this.offset.scroll ) {
				this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				};
			}
	
			/*
			 * - Position constraining -
			 * Constrain the position to a mix of grid, containment.
			 */
	
			// If we are not dragging yet, we won't check for options
			if ( constrainPosition ) {
				if ( this.containment ) {
					if ( this.relativeContainer ){
						co = this.relativeContainer.offset();
						containment = [
							this.containment[ 0 ] + co.left,
							this.containment[ 1 ] + co.top,
							this.containment[ 2 ] + co.left,
							this.containment[ 3 ] + co.top
						];
					} else {
						containment = this.containment;
					}
	
					if (event.pageX - this.offset.click.left < containment[0]) {
						pageX = containment[0] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top < containment[1]) {
						pageY = containment[1] + this.offset.click.top;
					}
					if (event.pageX - this.offset.click.left > containment[2]) {
						pageX = containment[2] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top > containment[3]) {
						pageY = containment[3] + this.offset.click.top;
					}
				}
	
				if (o.grid) {
					//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
					top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
					pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
	
					left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
					pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
				}
	
				if ( o.axis === "y" ) {
					pageX = this.originalPageX;
				}
	
				if ( o.axis === "x" ) {
					pageY = this.originalPageY;
				}
			}
	
			return {
				top: (
					pageY -																	// The absolute mouse position
					this.offset.click.top	-												// Click offset (relative to the element)
					this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
					( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
				),
				left: (
					pageX -																	// The absolute mouse position
					this.offset.click.left -												// Click offset (relative to the element)
					this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
					( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
				)
			};
	
		},
	
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging");
			if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
				this.helper.remove();
			}
			this.helper = null;
			this.cancelHelperRemoval = false;
			if ( this.destroyOnClear ) {
				this.destroy();
			}
		},
	
		// From now on bulk stuff - mainly helpers
	
		_trigger: function(type, event, ui) {
			ui = ui || this._uiHash();
			$.ui.plugin.call( this, type, [ event, ui, this ], true );
			//The absolute position has to be recalculated after plugins
			if (type === "drag") {
				this.positionAbs = this._convertPositionTo("absolute");
			}
			return $.Widget.prototype._trigger.call(this, type, event, ui);
		},
	
		plugins: {},
	
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			};
		}
	
	});
	
	$.ui.plugin.add("draggable", "connectToSortable", {
		start: function( event, ui, inst ) {
	
			var o = inst.options,
				uiSortable = $.extend({}, ui, { item: inst.element });
			inst.sortables = [];
			$(o.connectToSortable).each(function() {
				var sortable = $( this ).sortable( "instance" );
				if (sortable && !sortable.options.disabled) {
					inst.sortables.push({
						instance: sortable,
						shouldRevert: sortable.options.revert
					});
					sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
					sortable._trigger("activate", event, uiSortable);
				}
			});
	
		},
		stop: function( event, ui, inst ) {
	
			//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
			var uiSortable = $.extend( {}, ui, {
				item: inst.element
			});
	
			$.each(inst.sortables, function() {
				if (this.instance.isOver) {
	
					this.instance.isOver = 0;
	
					inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
					this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)
	
					//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: "valid/invalid"
					if (this.shouldRevert) {
						this.instance.options.revert = this.shouldRevert;
					}
	
					//Trigger the stop of the sortable
					this.instance._mouseStop(event);
	
					this.instance.options.helper = this.instance.options._helper;
	
					//If the helper has been the original item, restore properties in the sortable
					if (inst.options.helper === "original") {
						this.instance.currentItem.css({ top: "auto", left: "auto" });
					}
	
				} else {
					this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
					this.instance._trigger("deactivate", event, uiSortable);
				}
	
			});
	
		},
		drag: function( event, ui, inst ) {
	
			var that = this;
	
			$.each(inst.sortables, function() {
	
				var innermostIntersecting = false,
					thisSortable = this;
	
				//Copy over some variables to allow calling the sortable's native _intersectsWith
				this.instance.positionAbs = inst.positionAbs;
				this.instance.helperProportions = inst.helperProportions;
				this.instance.offset.click = inst.offset.click;
	
				if (this.instance._intersectsWith(this.instance.containerCache)) {
					innermostIntersecting = true;
					$.each(inst.sortables, function() {
						this.instance.positionAbs = inst.positionAbs;
						this.instance.helperProportions = inst.helperProportions;
						this.instance.offset.click = inst.offset.click;
						if (this !== thisSortable &&
							this.instance._intersectsWith(this.instance.containerCache) &&
							$.contains(thisSortable.instance.element[0], this.instance.element[0])
						) {
							innermostIntersecting = false;
						}
						return innermostIntersecting;
					});
				}
	
				if (innermostIntersecting) {
					//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
					if (!this.instance.isOver) {
	
						this.instance.isOver = 1;
						//Now we fake the start of dragging for the sortable instance,
						//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
						//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
						this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
						this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
						this.instance.options.helper = function() { return ui.helper[0]; };
	
						event.target = this.instance.currentItem[0];
						this.instance._mouseCapture(event, true);
						this.instance._mouseStart(event, true, true);
	
						//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
						this.instance.offset.click.top = inst.offset.click.top;
						this.instance.offset.click.left = inst.offset.click.left;
						this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
						this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
	
						inst._trigger("toSortable", event);
						inst.dropped = this.instance.element; //draggable revert needs that
						//hack so receive/update callbacks work (mostly)
						inst.currentItem = inst.element;
						this.instance.fromOutside = inst;
	
					}
	
					//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
					if (this.instance.currentItem) {
						this.instance._mouseDrag(event);
					}
	
				} else {
	
					//If it doesn't intersect with the sortable, and it intersected before,
					//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
					if (this.instance.isOver) {
	
						this.instance.isOver = 0;
						this.instance.cancelHelperRemoval = true;
	
						//Prevent reverting on this forced stop
						this.instance.options.revert = false;
	
						// The out event needs to be triggered independently
						this.instance._trigger("out", event, this.instance._uiHash(this.instance));
	
						this.instance._mouseStop(event, true);
						this.instance.options.helper = this.instance.options._helper;
	
						//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
						this.instance.currentItem.remove();
						if (this.instance.placeholder) {
							this.instance.placeholder.remove();
						}
	
						inst._trigger("fromSortable", event);
						inst.dropped = false; //draggable revert needs that
					}
	
				}
	
			});
	
		}
	});
	
	$.ui.plugin.add("draggable", "cursor", {
		start: function( event, ui, instance ) {
			var t = $( "body" ),
				o = instance.options;
	
			if (t.css("cursor")) {
				o._cursor = t.css("cursor");
			}
			t.css("cursor", o.cursor);
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if (o._cursor) {
				$("body").css("cursor", o._cursor);
			}
		}
	});
	
	$.ui.plugin.add("draggable", "opacity", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;
			if (t.css("opacity")) {
				o._opacity = t.css("opacity");
			}
			t.css("opacity", o.opacity);
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if (o._opacity) {
				$(ui.helper).css("opacity", o._opacity);
			}
		}
	});
	
	$.ui.plugin.add("draggable", "scroll", {
		start: function( event, ui, i ) {
			if ( !i.scrollParentNotHidden ) {
				i.scrollParentNotHidden = i.helper.scrollParent( false );
			}
	
			if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
				i.overflowOffset = i.scrollParentNotHidden.offset();
			}
		},
		drag: function( event, ui, i  ) {
	
			var o = i.options,
				scrolled = false,
				scrollParent = i.scrollParentNotHidden[ 0 ],
				document = i.document[ 0 ];
	
			if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
				if ( !o.axis || o.axis !== "x" ) {
					if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
					} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
					}
				}
	
				if ( !o.axis || o.axis !== "y" ) {
					if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
					} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
					}
				}
	
			} else {
	
				if (!o.axis || o.axis !== "x") {
					if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
					} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
					}
				}
	
				if (!o.axis || o.axis !== "y") {
					if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
					} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
					}
				}
	
			}
	
			if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(i, event);
			}
	
		}
	});
	
	$.ui.plugin.add("draggable", "snap", {
		start: function( event, ui, i ) {
	
			var o = i.options;
	
			i.snapElements = [];
	
			$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
				var $t = $(this),
					$o = $t.offset();
				if (this !== i.element[0]) {
					i.snapElements.push({
						item: this,
						width: $t.outerWidth(), height: $t.outerHeight(),
						top: $o.top, left: $o.left
					});
				}
			});
	
		},
		drag: function( event, ui, inst ) {
	
			var ts, bs, ls, rs, l, r, t, b, i, first,
				o = inst.options,
				d = o.snapTolerance,
				x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
				y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
	
			for (i = inst.snapElements.length - 1; i >= 0; i--){
	
				l = inst.snapElements[i].left;
				r = l + inst.snapElements[i].width;
				t = inst.snapElements[i].top;
				b = t + inst.snapElements[i].height;
	
				if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
					if (inst.snapElements[i].snapping) {
						(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
					}
					inst.snapElements[i].snapping = false;
					continue;
				}
	
				if (o.snapMode !== "inner") {
					ts = Math.abs(t - y2) <= d;
					bs = Math.abs(b - y1) <= d;
					ls = Math.abs(l - x2) <= d;
					rs = Math.abs(r - x1) <= d;
					if (ts) {
						ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
					}
					if (bs) {
						ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
					}
					if (ls) {
						ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
					}
					if (rs) {
						ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
					}
				}
	
				first = (ts || bs || ls || rs);
	
				if (o.snapMode !== "outer") {
					ts = Math.abs(t - y1) <= d;
					bs = Math.abs(b - y2) <= d;
					ls = Math.abs(l - x1) <= d;
					rs = Math.abs(r - x2) <= d;
					if (ts) {
						ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
					}
					if (bs) {
						ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
					}
					if (ls) {
						ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
					}
					if (rs) {
						ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
					}
				}
	
				if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
					(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = (ts || bs || ls || rs || first);
	
			}
	
		}
	});
	
	$.ui.plugin.add("draggable", "stack", {
		start: function( event, ui, instance ) {
			var min,
				o = instance.options,
				group = $.makeArray($(o.stack)).sort(function(a, b) {
					return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
				});
	
			if (!group.length) { return; }
	
			min = parseInt($(group[0]).css("zIndex"), 10) || 0;
			$(group).each(function(i) {
				$(this).css("zIndex", min + i);
			});
			this.css("zIndex", (min + group.length));
		}
	});
	
	$.ui.plugin.add("draggable", "zIndex", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;
	
			if (t.css("zIndex")) {
				o._zIndex = t.css("zIndex");
			}
			t.css("zIndex", o.zIndex);
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
	
			if (o._zIndex) {
				$(ui.helper).css("zIndex", o._zIndex);
			}
		}
	});
	
	var draggable = $.ui.draggable;
	
	
	/*!
	 * jQuery UI Resizable 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/resizable/
	 */
	
	
	$.widget("ui.resizable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: false,
			animate: false,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: false,
			autoHide: false,
			containment: false,
			ghost: false,
			grid: false,
			handles: "e,s,se",
			helper: false,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			// See #7960
			zIndex: 90,
	
			// callbacks
			resize: null,
			start: null,
			stop: null
		},
	
		_num: function( value ) {
			return parseInt( value, 10 ) || 0;
		},
	
		_isNumber: function( value ) {
			return !isNaN( parseInt( value, 10 ) );
		},
	
		_hasScroll: function( el, a ) {
	
			if ( $( el ).css( "overflow" ) === "hidden") {
				return false;
			}
	
			var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
				has = false;
	
			if ( el[ scroll ] > 0 ) {
				return true;
			}
	
			// TODO: determine which cases actually cause this to happen
			// if the element doesn't have the scroll set, see if it's possible to
			// set the scroll
			el[ scroll ] = 1;
			has = ( el[ scroll ] > 0 );
			el[ scroll ] = 0;
			return has;
		},
	
		_create: function() {
	
			var n, i, handle, axis, hname,
				that = this,
				o = this.options;
			this.element.addClass("ui-resizable");
	
			$.extend(this, {
				_aspectRatio: !!(o.aspectRatio),
				aspectRatio: o.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
			});
	
			// Wrap the element if it cannot hold child nodes
			if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
	
				this.element.wrap(
					$("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
						position: this.element.css("position"),
						width: this.element.outerWidth(),
						height: this.element.outerHeight(),
						top: this.element.css("top"),
						left: this.element.css("left")
					})
				);
	
				this.element = this.element.parent().data(
					"ui-resizable", this.element.resizable( "instance" )
				);
	
				this.elementIsWrapper = true;
	
				this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				});
				this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				});
				// support: Safari
				// Prevent Safari textarea resize
				this.originalResizeStyle = this.originalElement.css("resize");
				this.originalElement.css("resize", "none");
	
				this._proportionallyResizeElements.push( this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				}) );
	
				// support: IE9
				// avoid IE jump (hard set the margin)
				this.originalElement.css({ margin: this.originalElement.css("margin") });
	
				this._proportionallyResize();
			}
	
			this.handles = o.handles ||
				( !$(".ui-resizable-handle", this.element).length ?
					"e,s,se" : {
						n: ".ui-resizable-n",
						e: ".ui-resizable-e",
						s: ".ui-resizable-s",
						w: ".ui-resizable-w",
						se: ".ui-resizable-se",
						sw: ".ui-resizable-sw",
						ne: ".ui-resizable-ne",
						nw: ".ui-resizable-nw"
					} );
	
			if (this.handles.constructor === String) {
	
				if ( this.handles === "all") {
					this.handles = "n,e,s,w,se,sw,ne,nw";
				}
	
				n = this.handles.split(",");
				this.handles = {};
	
				for (i = 0; i < n.length; i++) {
	
					handle = $.trim(n[i]);
					hname = "ui-resizable-" + handle;
					axis = $("<div class='ui-resizable-handle " + hname + "'></div>");
	
					axis.css({ zIndex: o.zIndex });
	
					// TODO : What's going on here?
					if ("se" === handle) {
						axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
					}
	
					this.handles[handle] = ".ui-resizable-" + handle;
					this.element.append(axis);
				}
	
			}
	
			this._renderAxis = function(target) {
	
				var i, axis, padPos, padWrapper;
	
				target = target || this.element;
	
				for (i in this.handles) {
	
					if (this.handles[i].constructor === String) {
						this.handles[i] = this.element.children( this.handles[ i ] ).first().show();
					}
	
					if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
	
						axis = $(this.handles[i], this.element);
	
						padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
	
						padPos = [ "padding",
							/ne|nw|n/.test(i) ? "Top" :
							/se|sw|s/.test(i) ? "Bottom" :
							/^e$/.test(i) ? "Right" : "Left" ].join("");
	
						target.css(padPos, padWrapper);
	
						this._proportionallyResize();
	
					}
	
					// TODO: What's that good for? There's not anything to be executed left
					if (!$(this.handles[i]).length) {
						continue;
					}
				}
			};
	
			// TODO: make renderAxis a prototype function
			this._renderAxis(this.element);
	
			this._handles = $(".ui-resizable-handle", this.element)
				.disableSelection();
	
			this._handles.mouseover(function() {
				if (!that.resizing) {
					if (this.className) {
						axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
					}
					that.axis = axis && axis[1] ? axis[1] : "se";
				}
			});
	
			if (o.autoHide) {
				this._handles.hide();
				$(this.element)
					.addClass("ui-resizable-autohide")
					.mouseenter(function() {
						if (o.disabled) {
							return;
						}
						$(this).removeClass("ui-resizable-autohide");
						that._handles.show();
					})
					.mouseleave(function() {
						if (o.disabled) {
							return;
						}
						if (!that.resizing) {
							$(this).addClass("ui-resizable-autohide");
							that._handles.hide();
						}
					});
			}
	
			this._mouseInit();
	
		},
	
		_destroy: function() {
	
			this._mouseDestroy();
	
			var wrapper,
				_destroy = function(exp) {
					$(exp)
						.removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
						.removeData("resizable")
						.removeData("ui-resizable")
						.unbind(".resizable")
						.find(".ui-resizable-handle")
							.remove();
				};
	
			// TODO: Unwrap at same DOM position
			if (this.elementIsWrapper) {
				_destroy(this.element);
				wrapper = this.element;
				this.originalElement.css({
					position: wrapper.css("position"),
					width: wrapper.outerWidth(),
					height: wrapper.outerHeight(),
					top: wrapper.css("top"),
					left: wrapper.css("left")
				}).insertAfter( wrapper );
				wrapper.remove();
			}
	
			this.originalElement.css("resize", this.originalResizeStyle);
			_destroy(this.originalElement);
	
			return this;
		},
	
		_mouseCapture: function(event) {
			var i, handle,
				capture = false;
	
			for (i in this.handles) {
				handle = $(this.handles[i])[0];
				if (handle === event.target || $.contains(handle, event.target)) {
					capture = true;
				}
			}
	
			return !this.options.disabled && capture;
		},
	
		_mouseStart: function(event) {
	
			var curleft, curtop, cursor,
				o = this.options,
				el = this.element;
	
			this.resizing = true;
	
			this._renderProxy();
	
			curleft = this._num(this.helper.css("left"));
			curtop = this._num(this.helper.css("top"));
	
			if (o.containment) {
				curleft += $(o.containment).scrollLeft() || 0;
				curtop += $(o.containment).scrollTop() || 0;
			}
	
			this.offset = this.helper.offset();
			this.position = { left: curleft, top: curtop };
	
			this.size = this._helper ? {
					width: this.helper.width(),
					height: this.helper.height()
				} : {
					width: el.width(),
					height: el.height()
				};
	
			this.originalSize = this._helper ? {
					width: el.outerWidth(),
					height: el.outerHeight()
				} : {
					width: el.width(),
					height: el.height()
				};
	
			this.sizeDiff = {
				width: el.outerWidth() - el.width(),
				height: el.outerHeight() - el.height()
			};
	
			this.originalPosition = { left: curleft, top: curtop };
			this.originalMousePosition = { left: event.pageX, top: event.pageY };
	
			this.aspectRatio = (typeof o.aspectRatio === "number") ?
				o.aspectRatio :
				((this.originalSize.width / this.originalSize.height) || 1);
	
			cursor = $(".ui-resizable-" + this.axis).css("cursor");
			$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);
	
			el.addClass("ui-resizable-resizing");
			this._propagate("start", event);
			return true;
		},
	
		_mouseDrag: function(event) {
	
			var data, props,
				smp = this.originalMousePosition,
				a = this.axis,
				dx = (event.pageX - smp.left) || 0,
				dy = (event.pageY - smp.top) || 0,
				trigger = this._change[a];
	
			this._updatePrevProperties();
	
			if (!trigger) {
				return false;
			}
	
			data = trigger.apply(this, [ event, dx, dy ]);
	
			this._updateVirtualBoundaries(event.shiftKey);
			if (this._aspectRatio || event.shiftKey) {
				data = this._updateRatio(data, event);
			}
	
			data = this._respectSize(data, event);
	
			this._updateCache(data);
	
			this._propagate("resize", event);
	
			props = this._applyChanges();
	
			if ( !this._helper && this._proportionallyResizeElements.length ) {
				this._proportionallyResize();
			}
	
			if ( !$.isEmptyObject( props ) ) {
				this._updatePrevProperties();
				this._trigger( "resize", event, this.ui() );
				this._applyChanges();
			}
	
			return false;
		},
	
		_mouseStop: function(event) {
	
			this.resizing = false;
			var pr, ista, soffseth, soffsetw, s, left, top,
				o = this.options, that = this;
	
			if (this._helper) {
	
				pr = this._proportionallyResizeElements;
				ista = pr.length && (/textarea/i).test(pr[0].nodeName);
				soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
				soffsetw = ista ? 0 : that.sizeDiff.width;
	
				s = {
					width: (that.helper.width()  - soffsetw),
					height: (that.helper.height() - soffseth)
				};
				left = (parseInt(that.element.css("left"), 10) +
					(that.position.left - that.originalPosition.left)) || null;
				top = (parseInt(that.element.css("top"), 10) +
					(that.position.top - that.originalPosition.top)) || null;
	
				if (!o.animate) {
					this.element.css($.extend(s, { top: top, left: left }));
				}
	
				that.helper.height(that.size.height);
				that.helper.width(that.size.width);
	
				if (this._helper && !o.animate) {
					this._proportionallyResize();
				}
			}
	
			$("body").css("cursor", "auto");
	
			this.element.removeClass("ui-resizable-resizing");
	
			this._propagate("stop", event);
	
			if (this._helper) {
				this.helper.remove();
			}
	
			return false;
	
		},
	
		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			};
			this.prevSize = {
				width: this.size.width,
				height: this.size.height
			};
		},
	
		_applyChanges: function() {
			var props = {};
	
			if ( this.position.top !== this.prevPosition.top ) {
				props.top = this.position.top + "px";
			}
			if ( this.position.left !== this.prevPosition.left ) {
				props.left = this.position.left + "px";
			}
			if ( this.size.width !== this.prevSize.width ) {
				props.width = this.size.width + "px";
			}
			if ( this.size.height !== this.prevSize.height ) {
				props.height = this.size.height + "px";
			}
	
			this.helper.css( props );
	
			return props;
		},
	
		_updateVirtualBoundaries: function(forceAspectRatio) {
			var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
				o = this.options;
	
			b = {
				minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
				maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
				minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
				maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
			};
	
			if (this._aspectRatio || forceAspectRatio) {
				pMinWidth = b.minHeight * this.aspectRatio;
				pMinHeight = b.minWidth / this.aspectRatio;
				pMaxWidth = b.maxHeight * this.aspectRatio;
				pMaxHeight = b.maxWidth / this.aspectRatio;
	
				if (pMinWidth > b.minWidth) {
					b.minWidth = pMinWidth;
				}
				if (pMinHeight > b.minHeight) {
					b.minHeight = pMinHeight;
				}
				if (pMaxWidth < b.maxWidth) {
					b.maxWidth = pMaxWidth;
				}
				if (pMaxHeight < b.maxHeight) {
					b.maxHeight = pMaxHeight;
				}
			}
			this._vBoundaries = b;
		},
	
		_updateCache: function(data) {
			this.offset = this.helper.offset();
			if (this._isNumber(data.left)) {
				this.position.left = data.left;
			}
			if (this._isNumber(data.top)) {
				this.position.top = data.top;
			}
			if (this._isNumber(data.height)) {
				this.size.height = data.height;
			}
			if (this._isNumber(data.width)) {
				this.size.width = data.width;
			}
		},
	
		_updateRatio: function( data ) {
	
			var cpos = this.position,
				csize = this.size,
				a = this.axis;
	
			if (this._isNumber(data.height)) {
				data.width = (data.height * this.aspectRatio);
			} else if (this._isNumber(data.width)) {
				data.height = (data.width / this.aspectRatio);
			}
	
			if (a === "sw") {
				data.left = cpos.left + (csize.width - data.width);
				data.top = null;
			}
			if (a === "nw") {
				data.top = cpos.top + (csize.height - data.height);
				data.left = cpos.left + (csize.width - data.width);
			}
	
			return data;
		},
	
		_respectSize: function( data ) {
	
			var o = this._vBoundaries,
				a = this.axis,
				ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
				ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
				isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
				isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
				dw = this.originalPosition.left + this.originalSize.width,
				dh = this.position.top + this.size.height,
				cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
			if (isminw) {
				data.width = o.minWidth;
			}
			if (isminh) {
				data.height = o.minHeight;
			}
			if (ismaxw) {
				data.width = o.maxWidth;
			}
			if (ismaxh) {
				data.height = o.maxHeight;
			}
	
			if (isminw && cw) {
				data.left = dw - o.minWidth;
			}
			if (ismaxw && cw) {
				data.left = dw - o.maxWidth;
			}
			if (isminh && ch) {
				data.top = dh - o.minHeight;
			}
			if (ismaxh && ch) {
				data.top = dh - o.maxHeight;
			}
	
			// Fixing jump error on top/left - bug #2330
			if (!data.width && !data.height && !data.left && data.top) {
				data.top = null;
			} else if (!data.width && !data.height && !data.top && data.left) {
				data.left = null;
			}
	
			return data;
		},
	
		_getPaddingPlusBorderDimensions: function( element ) {
			var i = 0,
				widths = [],
				borders = [
					element.css( "borderTopWidth" ),
					element.css( "borderRightWidth" ),
					element.css( "borderBottomWidth" ),
					element.css( "borderLeftWidth" )
				],
				paddings = [
					element.css( "paddingTop" ),
					element.css( "paddingRight" ),
					element.css( "paddingBottom" ),
					element.css( "paddingLeft" )
				];
	
			for ( ; i < 4; i++ ) {
				widths[ i ] = ( parseInt( borders[ i ], 10 ) || 0 );
				widths[ i ] += ( parseInt( paddings[ i ], 10 ) || 0 );
			}
	
			return {
				height: widths[ 0 ] + widths[ 2 ],
				width: widths[ 1 ] + widths[ 3 ]
			};
		},
	
		_proportionallyResize: function() {
	
			if (!this._proportionallyResizeElements.length) {
				return;
			}
	
			var prel,
				i = 0,
				element = this.helper || this.element;
	
			for ( ; i < this._proportionallyResizeElements.length; i++) {
	
				prel = this._proportionallyResizeElements[i];
	
				// TODO: Seems like a bug to cache this.outerDimensions
				// considering that we are in a loop.
				if (!this.outerDimensions) {
					this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
				}
	
				prel.css({
					height: (element.height() - this.outerDimensions.height) || 0,
					width: (element.width() - this.outerDimensions.width) || 0
				});
	
			}
	
		},
	
		_renderProxy: function() {
	
			var el = this.element, o = this.options;
			this.elementOffset = el.offset();
	
			if (this._helper) {
	
				this.helper = this.helper || $("<div style='overflow:hidden;'></div>");
	
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() - 1,
					height: this.element.outerHeight() - 1,
					position: "absolute",
					left: this.elementOffset.left + "px",
					top: this.elementOffset.top + "px",
					zIndex: ++o.zIndex //TODO: Don't modify option
				});
	
				this.helper
					.appendTo("body")
					.disableSelection();
	
			} else {
				this.helper = this.element;
			}
	
		},
	
		_change: {
			e: function(event, dx) {
				return { width: this.originalSize.width + dx };
			},
			w: function(event, dx) {
				var cs = this.originalSize, sp = this.originalPosition;
				return { left: sp.left + dx, width: cs.width - dx };
			},
			n: function(event, dx, dy) {
				var cs = this.originalSize, sp = this.originalPosition;
				return { top: sp.top + dy, height: cs.height - dy };
			},
			s: function(event, dx, dy) {
				return { height: this.originalSize.height + dy };
			},
			se: function(event, dx, dy) {
				return $.extend(this._change.s.apply(this, arguments),
					this._change.e.apply(this, [ event, dx, dy ]));
			},
			sw: function(event, dx, dy) {
				return $.extend(this._change.s.apply(this, arguments),
					this._change.w.apply(this, [ event, dx, dy ]));
			},
			ne: function(event, dx, dy) {
				return $.extend(this._change.n.apply(this, arguments),
					this._change.e.apply(this, [ event, dx, dy ]));
			},
			nw: function(event, dx, dy) {
				return $.extend(this._change.n.apply(this, arguments),
					this._change.w.apply(this, [ event, dx, dy ]));
			}
		},
	
		_propagate: function(n, event) {
			$.ui.plugin.call(this, n, [ event, this.ui() ]);
			(n !== "resize" && this._trigger(n, event, this.ui()));
		},
	
		plugins: {},
	
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			};
		}
	
	});
	
	/*
	 * Resizable Extensions
	 */
	
	$.ui.plugin.add("resizable", "animate", {
	
		stop: function( event ) {
			var that = $(this).resizable( "instance" ),
				o = that.options,
				pr = that._proportionallyResizeElements,
				ista = pr.length && (/textarea/i).test(pr[0].nodeName),
				soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
				soffsetw = ista ? 0 : that.sizeDiff.width,
				style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },
				left = (parseInt(that.element.css("left"), 10) +
					(that.position.left - that.originalPosition.left)) || null,
				top = (parseInt(that.element.css("top"), 10) +
					(that.position.top - that.originalPosition.top)) || null;
	
			that.element.animate(
				$.extend(style, top && left ? { top: top, left: left } : {}), {
					duration: o.animateDuration,
					easing: o.animateEasing,
					step: function() {
	
						var data = {
							width: parseInt(that.element.css("width"), 10),
							height: parseInt(that.element.css("height"), 10),
							top: parseInt(that.element.css("top"), 10),
							left: parseInt(that.element.css("left"), 10)
						};
	
						if (pr && pr.length) {
							$(pr[0]).css({ width: data.width, height: data.height });
						}
	
						// propagating resize, and updating values for each animation step
						that._updateCache(data);
						that._propagate("resize", event);
	
					}
				}
			);
		}
	
	});
	
	$.ui.plugin.add( "resizable", "containment", {
	
		start: function() {
			var element, p, co, ch, cw, width, height,
				that = $( this ).resizable( "instance" ),
				o = that.options,
				el = that.element,
				oc = o.containment,
				ce = ( oc instanceof $ ) ? oc.get( 0 ) : ( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;
	
			if ( !ce ) {
				return;
			}
	
			that.containerElement = $( ce );
	
			if ( /document/.test( oc ) || oc === document ) {
				that.containerOffset = {
					left: 0,
					top: 0
				};
				that.containerPosition = {
					left: 0,
					top: 0
				};
	
				that.parentData = {
					element: $( document ),
					left: 0,
					top: 0,
					width: $( document ).width(),
					height: $( document ).height() || document.body.parentNode.scrollHeight
				};
			} else {
				element = $( ce );
				p = [];
				$([ "Top", "Right", "Left", "Bottom" ]).each(function( i, name ) {
					p[ i ] = that._num( element.css( "padding" + name ) );
				});
	
				that.containerOffset = element.offset();
				that.containerPosition = element.position();
				that.containerSize = {
					height: ( element.innerHeight() - p[ 3 ] ),
					width: ( element.innerWidth() - p[ 1 ] )
				};
	
				co = that.containerOffset;
				ch = that.containerSize.height;
				cw = that.containerSize.width;
				width = ( that._hasScroll ( ce, "left" ) ? ce.scrollWidth : cw );
				height = ( that._hasScroll ( ce ) ? ce.scrollHeight : ch ) ;
	
				that.parentData = {
					element: ce,
					left: co.left,
					top: co.top,
					width: width,
					height: height
				};
			}
		},
	
		resize: function( event ) {
			var woset, hoset, isParent, isOffsetRelative,
				that = $( this ).resizable( "instance" ),
				o = that.options,
				co = that.containerOffset,
				cp = that.position,
				pRatio = that._aspectRatio || event.shiftKey,
				cop = {
					top: 0,
					left: 0
				},
				ce = that.containerElement,
				continueResize = true;
	
			if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
				cop = co;
			}
	
			if ( cp.left < ( that._helper ? co.left : 0 ) ) {
				that.size.width = that.size.width +
					( that._helper ?
						( that.position.left - co.left ) :
						( that.position.left - cop.left ) );
	
				if ( pRatio ) {
					that.size.height = that.size.width / that.aspectRatio;
					continueResize = false;
				}
				that.position.left = o.helper ? co.left : 0;
			}
	
			if ( cp.top < ( that._helper ? co.top : 0 ) ) {
				that.size.height = that.size.height +
					( that._helper ?
						( that.position.top - co.top ) :
						that.position.top );
	
				if ( pRatio ) {
					that.size.width = that.size.height * that.aspectRatio;
					continueResize = false;
				}
				that.position.top = that._helper ? co.top : 0;
			}
	
			isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
			isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );
	
			if ( isParent && isOffsetRelative ) {
				that.offset.left = that.parentData.left + that.position.left;
				that.offset.top = that.parentData.top + that.position.top;
			} else {
				that.offset.left = that.element.offset().left;
				that.offset.top = that.element.offset().top;
			}
	
			woset = Math.abs( that.sizeDiff.width +
				(that._helper ?
					that.offset.left - cop.left :
					(that.offset.left - co.left)) );
	
			hoset = Math.abs( that.sizeDiff.height +
				(that._helper ?
					that.offset.top - cop.top :
					(that.offset.top - co.top)) );
	
			if ( woset + that.size.width >= that.parentData.width ) {
				that.size.width = that.parentData.width - woset;
				if ( pRatio ) {
					that.size.height = that.size.width / that.aspectRatio;
					continueResize = false;
				}
			}
	
			if ( hoset + that.size.height >= that.parentData.height ) {
				that.size.height = that.parentData.height - hoset;
				if ( pRatio ) {
					that.size.width = that.size.height * that.aspectRatio;
					continueResize = false;
				}
			}
	
			if ( !continueResize ){
				that.position.left = that.prevPosition.left;
				that.position.top = that.prevPosition.top;
				that.size.width = that.prevSize.width;
				that.size.height = that.prevSize.height;
			}
		},
	
		stop: function() {
			var that = $( this ).resizable( "instance" ),
				o = that.options,
				co = that.containerOffset,
				cop = that.containerPosition,
				ce = that.containerElement,
				helper = $( that.helper ),
				ho = helper.offset(),
				w = helper.outerWidth() - that.sizeDiff.width,
				h = helper.outerHeight() - that.sizeDiff.height;
	
			if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
				$( this ).css({
					left: ho.left - cop.left - co.left,
					width: w,
					height: h
				});
			}
	
			if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
				$( this ).css({
					left: ho.left - cop.left - co.left,
					width: w,
					height: h
				});
			}
		}
	});
	
	$.ui.plugin.add("resizable", "alsoResize", {
	
		start: function() {
			var that = $(this).resizable( "instance" ),
				o = that.options,
				_store = function(exp) {
					$(exp).each(function() {
						var el = $(this);
						el.data("ui-resizable-alsoresize", {
							width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
							left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
						});
					});
				};
	
			if (typeof(o.alsoResize) === "object" && !o.alsoResize.parentNode) {
				if (o.alsoResize.length) {
					o.alsoResize = o.alsoResize[0];
					_store(o.alsoResize);
				} else {
					$.each(o.alsoResize, function(exp) {
						_store(exp);
					});
				}
			} else {
				_store(o.alsoResize);
			}
		},
	
		resize: function(event, ui) {
			var that = $(this).resizable( "instance" ),
				o = that.options,
				os = that.originalSize,
				op = that.originalPosition,
				delta = {
					height: (that.size.height - os.height) || 0,
					width: (that.size.width - os.width) || 0,
					top: (that.position.top - op.top) || 0,
					left: (that.position.left - op.left) || 0
				},
	
				_alsoResize = function(exp, c) {
					$(exp).each(function() {
						var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {},
							css = c && c.length ?
								c :
								el.parents(ui.originalElement[0]).length ?
									[ "width", "height" ] :
									[ "width", "height", "top", "left" ];
	
						$.each(css, function(i, prop) {
							var sum = (start[prop] || 0) + (delta[prop] || 0);
							if (sum && sum >= 0) {
								style[prop] = sum || null;
							}
						});
	
						el.css(style);
					});
				};
	
			if (typeof(o.alsoResize) === "object" && !o.alsoResize.nodeType) {
				$.each(o.alsoResize, function(exp, c) {
					_alsoResize(exp, c);
				});
			} else {
				_alsoResize(o.alsoResize);
			}
		},
	
		stop: function() {
			$(this).removeData("resizable-alsoresize");
		}
	});
	
	$.ui.plugin.add("resizable", "ghost", {
	
		start: function() {
	
			var that = $(this).resizable( "instance" ), o = that.options, cs = that.size;
	
			that.ghost = that.originalElement.clone();
			that.ghost
				.css({
					opacity: 0.25,
					display: "block",
					position: "relative",
					height: cs.height,
					width: cs.width,
					margin: 0,
					left: 0,
					top: 0
				})
				.addClass("ui-resizable-ghost")
				.addClass(typeof o.ghost === "string" ? o.ghost : "");
	
			that.ghost.appendTo(that.helper);
	
		},
	
		resize: function() {
			var that = $(this).resizable( "instance" );
			if (that.ghost) {
				that.ghost.css({
					position: "relative",
					height: that.size.height,
					width: that.size.width
				});
			}
		},
	
		stop: function() {
			var that = $(this).resizable( "instance" );
			if (that.ghost && that.helper) {
				that.helper.get(0).removeChild(that.ghost.get(0));
			}
		}
	
	});
	
	$.ui.plugin.add("resizable", "grid", {
	
		resize: function() {
			var outerDimensions,
				that = $(this).resizable( "instance" ),
				o = that.options,
				cs = that.size,
				os = that.originalSize,
				op = that.originalPosition,
				a = that.axis,
				grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
				gridX = (grid[0] || 1),
				gridY = (grid[1] || 1),
				ox = Math.round((cs.width - os.width) / gridX) * gridX,
				oy = Math.round((cs.height - os.height) / gridY) * gridY,
				newWidth = os.width + ox,
				newHeight = os.height + oy,
				isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
				isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
				isMinWidth = o.minWidth && (o.minWidth > newWidth),
				isMinHeight = o.minHeight && (o.minHeight > newHeight);
	
			o.grid = grid;
	
			if (isMinWidth) {
				newWidth += gridX;
			}
			if (isMinHeight) {
				newHeight += gridY;
			}
			if (isMaxWidth) {
				newWidth -= gridX;
			}
			if (isMaxHeight) {
				newHeight -= gridY;
			}
	
			if (/^(se|s|e)$/.test(a)) {
				that.size.width = newWidth;
				that.size.height = newHeight;
			} else if (/^(ne)$/.test(a)) {
				that.size.width = newWidth;
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else if (/^(sw)$/.test(a)) {
				that.size.width = newWidth;
				that.size.height = newHeight;
				that.position.left = op.left - ox;
			} else {
				if ( newHeight - gridY <= 0 || newWidth - gridX <= 0) {
					outerDimensions = that._getPaddingPlusBorderDimensions( this );
				}
	
				if ( newHeight - gridY > 0 ) {
					that.size.height = newHeight;
					that.position.top = op.top - oy;
				} else {
					newHeight = gridY - outerDimensions.height;
					that.size.height = newHeight;
					that.position.top = op.top + os.height - newHeight;
				}
				if ( newWidth - gridX > 0 ) {
					that.size.width = newWidth;
					that.position.left = op.left - ox;
				} else {
					newWidth = gridY - outerDimensions.height;
					that.size.width = newWidth;
					that.position.left = op.left + os.width - newWidth;
				}
			}
		}
	
	});
	
	var resizable = $.ui.resizable;
	
	
	/*!
	 * jQuery UI Dialog 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/dialog/
	 */
	
	
	var dialog = $.widget( "ui.dialog", {
		version: "1.11.1",
		options: {
			appendTo: "body",
			autoOpen: true,
			buttons: [],
			closeOnEscape: true,
			closeText: "Close",
			dialogClass: "",
			draggable: true,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: false,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				// Ensure the titlebar is always visible
				using: function( pos ) {
					var topOffset = $( this ).css( pos ).offset().top;
					if ( topOffset < 0 ) {
						$( this ).css( "top", pos.top - topOffset );
					}
				}
			},
			resizable: true,
			show: null,
			title: null,
			width: 300,
	
			// callbacks
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
	
		sizeRelatedOptions: {
			buttons: true,
			height: true,
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true,
			width: true
		},
	
		resizableRelatedOptions: {
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true
		},
	
		_create: function() {
			this.originalCss = {
				display: this.element[ 0 ].style.display,
				width: this.element[ 0 ].style.width,
				minHeight: this.element[ 0 ].style.minHeight,
				maxHeight: this.element[ 0 ].style.maxHeight,
				height: this.element[ 0 ].style.height
			};
			this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index( this.element )
			};
			this.originalTitle = this.element.attr( "title" );
			this.options.title = this.options.title || this.originalTitle;
	
			this._createWrapper();
	
			this.element
				.show()
				.removeAttr( "title" )
				.addClass( "ui-dialog-content ui-widget-content" )
				.appendTo( this.uiDialog );
	
			this._createTitlebar();
			this._createButtonPane();
	
			if ( this.options.draggable && $.fn.draggable ) {
				this._makeDraggable();
			}
			if ( this.options.resizable && $.fn.resizable ) {
				this._makeResizable();
			}
	
			this._isOpen = false;
	
			this._trackFocus();
		},
	
		_init: function() {
			if ( this.options.autoOpen ) {
				this.open();
			}
		},
	
		_appendTo: function() {
			var element = this.options.appendTo;
			if ( element && (element.jquery || element.nodeType) ) {
				return $( element );
			}
			return this.document.find( element || "body" ).eq( 0 );
		},
	
		_destroy: function() {
			var next,
				originalPosition = this.originalPosition;
	
			this._destroyOverlay();
	
			this.element
				.removeUniqueId()
				.removeClass( "ui-dialog-content ui-widget-content" )
				.css( this.originalCss )
				// Without detaching first, the following becomes really slow
				.detach();
	
			this.uiDialog.stop( true, true ).remove();
	
			if ( this.originalTitle ) {
				this.element.attr( "title", this.originalTitle );
			}
	
			next = originalPosition.parent.children().eq( originalPosition.index );
			// Don't try to place the dialog next to itself (#8613)
			if ( next.length && next[ 0 ] !== this.element[ 0 ] ) {
				next.before( this.element );
			} else {
				originalPosition.parent.append( this.element );
			}
		},
	
		widget: function() {
			return this.uiDialog;
		},
	
		disable: $.noop,
		enable: $.noop,
	
		close: function( event ) {
			var activeElement,
				that = this;
	
			if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
				return;
			}
	
			this._isOpen = false;
			this._focusedElement = null;
			this._destroyOverlay();
			this._untrackInstance();
	
			if ( !this.opener.filter( ":focusable" ).focus().length ) {
	
				// support: IE9
				// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
				try {
					activeElement = this.document[ 0 ].activeElement;
	
					// Support: IE9, IE10
					// If the <body> is blurred, IE will switch windows, see #4520
					if ( activeElement && activeElement.nodeName.toLowerCase() !== "body" ) {
	
						// Hiding a focused element doesn't trigger blur in WebKit
						// so in case we have nothing to focus on, explicitly blur the active element
						// https://bugs.webkit.org/show_bug.cgi?id=47182
						$( activeElement ).blur();
					}
				} catch ( error ) {}
			}
	
			this._hide( this.uiDialog, this.options.hide, function() {
				that._trigger( "close", event );
			});
		},
	
		isOpen: function() {
			return this._isOpen;
		},
	
		moveToTop: function() {
			this._moveToTop();
		},
	
		_moveToTop: function( event, silent ) {
			var moved = false,
				zIndicies = this.uiDialog.siblings( ".ui-front:visible" ).map(function() {
					return +$( this ).css( "z-index" );
				}).get(),
				zIndexMax = Math.max.apply( null, zIndicies );
	
			if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
				this.uiDialog.css( "z-index", zIndexMax + 1 );
				moved = true;
			}
	
			if ( moved && !silent ) {
				this._trigger( "focus", event );
			}
			return moved;
		},
	
		open: function() {
			var that = this;
			if ( this._isOpen ) {
				if ( this._moveToTop() ) {
					this._focusTabbable();
				}
				return;
			}
	
			this._isOpen = true;
			this.opener = $( this.document[ 0 ].activeElement );
	
			this._size();
			this._position();
			this._createOverlay();
			this._moveToTop( null, true );
	
			// Ensure the overlay is moved to the top with the dialog, but only when
			// opening. The overlay shouldn't move after the dialog is open so that
			// modeless dialogs opened after the modal dialog stack properly.
			if ( this.overlay ) {
				this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
			}
	
			this._show( this.uiDialog, this.options.show, function() {
				that._focusTabbable();
				that._trigger( "focus" );
			});
	
			// Track the dialog immediately upon openening in case a focus event
			// somehow occurs outside of the dialog before an element inside the
			// dialog is focused (#10152)
			this._makeFocusTarget();
	
			this._trigger( "open" );
		},
	
		_focusTabbable: function() {
			// Set focus to the first match:
			// 1. An element that was focused previously
			// 2. First element inside the dialog matching [autofocus]
			// 3. Tabbable element inside the content element
			// 4. Tabbable element inside the buttonpane
			// 5. The close button
			// 6. The dialog itself
			var hasFocus = this._focusedElement;
			if ( !hasFocus ) {
				hasFocus = this.element.find( "[autofocus]" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.element.find( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialogTitlebarClose.filter( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialog;
			}
			hasFocus.eq( 0 ).focus();
		},
	
		_keepFocus: function( event ) {
			function checkFocus() {
				var activeElement = this.document[0].activeElement,
					isActive = this.uiDialog[0] === activeElement ||
						$.contains( this.uiDialog[0], activeElement );
				if ( !isActive ) {
					this._focusTabbable();
				}
			}
			event.preventDefault();
			checkFocus.call( this );
			// support: IE
			// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
			// so we check again later
			this._delay( checkFocus );
		},
	
		_createWrapper: function() {
			this.uiDialog = $("<div>")
				.addClass( "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
					this.options.dialogClass )
				.hide()
				.attr({
					// Setting tabIndex makes the div focusable
					tabIndex: -1,
					role: "dialog"
				})
				.appendTo( this._appendTo() );
	
			this._on( this.uiDialog, {
				keydown: function( event ) {
					if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
							event.keyCode === $.ui.keyCode.ESCAPE ) {
						event.preventDefault();
						this.close( event );
						return;
					}
	
					// prevent tabbing out of dialogs
					if ( event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented() ) {
						return;
					}
					var tabbables = this.uiDialog.find( ":tabbable" ),
						first = tabbables.filter( ":first" ),
						last = tabbables.filter( ":last" );
	
					if ( ( event.target === last[0] || event.target === this.uiDialog[0] ) && !event.shiftKey ) {
						this._delay(function() {
							first.focus();
						});
						event.preventDefault();
					} else if ( ( event.target === first[0] || event.target === this.uiDialog[0] ) && event.shiftKey ) {
						this._delay(function() {
							last.focus();
						});
						event.preventDefault();
					}
				},
				mousedown: function( event ) {
					if ( this._moveToTop( event ) ) {
						this._focusTabbable();
					}
				}
			});
	
			// We assume that any existing aria-describedby attribute means
			// that the dialog content is marked up properly
			// otherwise we brute force the content as the description
			if ( !this.element.find( "[aria-describedby]" ).length ) {
				this.uiDialog.attr({
					"aria-describedby": this.element.uniqueId().attr( "id" )
				});
			}
		},
	
		_createTitlebar: function() {
			var uiDialogTitle;
	
			this.uiDialogTitlebar = $( "<div>" )
				.addClass( "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" )
				.prependTo( this.uiDialog );
			this._on( this.uiDialogTitlebar, {
				mousedown: function( event ) {
					// Don't prevent click on close button (#8838)
					// Focusing a dialog that is partially scrolled out of view
					// causes the browser to scroll it into view, preventing the click event
					if ( !$( event.target ).closest( ".ui-dialog-titlebar-close" ) ) {
						// Dialog isn't getting focus when dragging (#8063)
						this.uiDialog.focus();
					}
				}
			});
	
			// support: IE
			// Use type="button" to prevent enter keypresses in textboxes from closing the
			// dialog in IE (#9312)
			this.uiDialogTitlebarClose = $( "<button type='button'></button>" )
				.button({
					label: this.options.closeText,
					icons: {
						primary: "ui-icon-closethick"
					},
					text: false
				})
				.addClass( "ui-dialog-titlebar-close" )
				.appendTo( this.uiDialogTitlebar );
			this._on( this.uiDialogTitlebarClose, {
				click: function( event ) {
					event.preventDefault();
					this.close( event );
				}
			});
	
			uiDialogTitle = $( "<span>" )
				.uniqueId()
				.addClass( "ui-dialog-title" )
				.prependTo( this.uiDialogTitlebar );
			this._title( uiDialogTitle );
	
			this.uiDialog.attr({
				"aria-labelledby": uiDialogTitle.attr( "id" )
			});
		},
	
		_title: function( title ) {
			if ( !this.options.title ) {
				title.html( "&#160;" );
			}
			title.text( this.options.title );
		},
	
		_createButtonPane: function() {
			this.uiDialogButtonPane = $( "<div>" )
				.addClass( "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" );
	
			this.uiButtonSet = $( "<div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( this.uiDialogButtonPane );
	
			this._createButtons();
		},
	
		_createButtons: function() {
			var that = this,
				buttons = this.options.buttons;
	
			// if we already have a button pane, remove it
			this.uiDialogButtonPane.remove();
			this.uiButtonSet.empty();
	
			if ( $.isEmptyObject( buttons ) || ($.isArray( buttons ) && !buttons.length) ) {
				this.uiDialog.removeClass( "ui-dialog-buttons" );
				return;
			}
	
			$.each( buttons, function( name, props ) {
				var click, buttonOptions;
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				// Default to a non-submitting button
				props = $.extend( { type: "button" }, props );
				// Change the context for the click callback to be the main element
				click = props.click;
				props.click = function() {
					click.apply( that.element[ 0 ], arguments );
				};
				buttonOptions = {
					icons: props.icons,
					text: props.showText
				};
				delete props.icons;
				delete props.showText;
				$( "<button></button>", props )
					.button( buttonOptions )
					.appendTo( that.uiButtonSet );
			});
			this.uiDialog.addClass( "ui-dialog-buttons" );
			this.uiDialogButtonPane.appendTo( this.uiDialog );
		},
	
		_makeDraggable: function() {
			var that = this,
				options = this.options;
	
			function filteredUi( ui ) {
				return {
					position: ui.position,
					offset: ui.offset
				};
			}
	
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function( event, ui ) {
					$( this ).addClass( "ui-dialog-dragging" );
					that._blockFrames();
					that._trigger( "dragStart", event, filteredUi( ui ) );
				},
				drag: function( event, ui ) {
					that._trigger( "drag", event, filteredUi( ui ) );
				},
				stop: function( event, ui ) {
					var left = ui.offset.left - that.document.scrollLeft(),
						top = ui.offset.top - that.document.scrollTop();
	
					options.position = {
						my: "left top",
						at: "left" + (left >= 0 ? "+" : "") + left + " " +
							"top" + (top >= 0 ? "+" : "") + top,
						of: that.window
					};
					$( this ).removeClass( "ui-dialog-dragging" );
					that._unblockFrames();
					that._trigger( "dragStop", event, filteredUi( ui ) );
				}
			});
		},
	
		_makeResizable: function() {
			var that = this,
				options = this.options,
				handles = options.resizable,
				// .ui-resizable has position: relative defined in the stylesheet
				// but dialogs have to use absolute or fixed positioning
				position = this.uiDialog.css("position"),
				resizeHandles = typeof handles === "string" ?
					handles	:
					"n,e,s,w,se,sw,ne,nw";
	
			function filteredUi( ui ) {
				return {
					originalPosition: ui.originalPosition,
					originalSize: ui.originalSize,
					position: ui.position,
					size: ui.size
				};
			}
	
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: options.maxWidth,
				maxHeight: options.maxHeight,
				minWidth: options.minWidth,
				minHeight: this._minHeight(),
				handles: resizeHandles,
				start: function( event, ui ) {
					$( this ).addClass( "ui-dialog-resizing" );
					that._blockFrames();
					that._trigger( "resizeStart", event, filteredUi( ui ) );
				},
				resize: function( event, ui ) {
					that._trigger( "resize", event, filteredUi( ui ) );
				},
				stop: function( event, ui ) {
					var offset = that.uiDialog.offset(),
						left = offset.left - that.document.scrollLeft(),
						top = offset.top - that.document.scrollTop();
	
					options.height = that.uiDialog.height();
					options.width = that.uiDialog.width();
					options.position = {
						my: "left top",
						at: "left" + (left >= 0 ? "+" : "") + left + " " +
							"top" + (top >= 0 ? "+" : "") + top,
						of: that.window
					};
					$( this ).removeClass( "ui-dialog-resizing" );
					that._unblockFrames();
					that._trigger( "resizeStop", event, filteredUi( ui ) );
				}
			})
			.css( "position", position );
		},
	
		_trackFocus: function() {
			this._on( this.widget(), {
				focusin: function( event ) {
					this._makeFocusTarget();
					this._focusedElement = $( event.target );
				}
			});
		},
	
		_makeFocusTarget: function() {
			this._untrackInstance();
			this._trackingInstances().unshift( this );
		},
	
		_untrackInstance: function() {
			var instances = this._trackingInstances(),
				exists = $.inArray( this, instances );
			if ( exists !== -1 ) {
				instances.splice( exists, 1 );
			}
		},
	
		_trackingInstances: function() {
			var instances = this.document.data( "ui-dialog-instances" );
			if ( !instances ) {
				instances = [];
				this.document.data( "ui-dialog-instances", instances );
			}
			return instances;
		},
	
		_minHeight: function() {
			var options = this.options;
	
			return options.height === "auto" ?
				options.minHeight :
				Math.min( options.minHeight, options.height );
		},
	
		_position: function() {
			// Need to show the dialog to get the actual offset in the position plugin
			var isVisible = this.uiDialog.is( ":visible" );
			if ( !isVisible ) {
				this.uiDialog.show();
			}
			this.uiDialog.position( this.options.position );
			if ( !isVisible ) {
				this.uiDialog.hide();
			}
		},
	
		_setOptions: function( options ) {
			var that = this,
				resize = false,
				resizableOptions = {};
	
			$.each( options, function( key, value ) {
				that._setOption( key, value );
	
				if ( key in that.sizeRelatedOptions ) {
					resize = true;
				}
				if ( key in that.resizableRelatedOptions ) {
					resizableOptions[ key ] = value;
				}
			});
	
			if ( resize ) {
				this._size();
				this._position();
			}
			if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
				this.uiDialog.resizable( "option", resizableOptions );
			}
		},
	
		_setOption: function( key, value ) {
			var isDraggable, isResizable,
				uiDialog = this.uiDialog;
	
			if ( key === "dialogClass" ) {
				uiDialog
					.removeClass( this.options.dialogClass )
					.addClass( value );
			}
	
			if ( key === "disabled" ) {
				return;
			}
	
			this._super( key, value );
	
			if ( key === "appendTo" ) {
				this.uiDialog.appendTo( this._appendTo() );
			}
	
			if ( key === "buttons" ) {
				this._createButtons();
			}
	
			if ( key === "closeText" ) {
				this.uiDialogTitlebarClose.button({
					// Ensure that we always pass a string
					label: "" + value
				});
			}
	
			if ( key === "draggable" ) {
				isDraggable = uiDialog.is( ":data(ui-draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}
	
				if ( !isDraggable && value ) {
					this._makeDraggable();
				}
			}
	
			if ( key === "position" ) {
				this._position();
			}
	
			if ( key === "resizable" ) {
				// currently resizable, becoming non-resizable
				isResizable = uiDialog.is( ":data(ui-resizable)" );
				if ( isResizable && !value ) {
					uiDialog.resizable( "destroy" );
				}
	
				// currently resizable, changing handles
				if ( isResizable && typeof value === "string" ) {
					uiDialog.resizable( "option", "handles", value );
				}
	
				// currently non-resizable, becoming resizable
				if ( !isResizable && value !== false ) {
					this._makeResizable();
				}
			}
	
			if ( key === "title" ) {
				this._title( this.uiDialogTitlebar.find( ".ui-dialog-title" ) );
			}
		},
	
		_size: function() {
			// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
			// divs will both have width and height set, so we need to reset them
			var nonContentHeight, minContentHeight, maxContentHeight,
				options = this.options;
	
			// Reset content sizing
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			});
	
			if ( options.minWidth > options.width ) {
				options.width = options.minWidth;
			}
	
			// reset wrapper sizing
			// determine the height of all the non-content elements
			nonContentHeight = this.uiDialog.css({
					height: "auto",
					width: options.width
				})
				.outerHeight();
			minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
			maxContentHeight = typeof options.maxHeight === "number" ?
				Math.max( 0, options.maxHeight - nonContentHeight ) :
				"none";
	
			if ( options.height === "auto" ) {
				this.element.css({
					minHeight: minContentHeight,
					maxHeight: maxContentHeight,
					height: "auto"
				});
			} else {
				this.element.height( Math.max( 0, options.height - nonContentHeight ) );
			}
	
			if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
				this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
			}
		},
	
		_blockFrames: function() {
			this.iframeBlocks = this.document.find( "iframe" ).map(function() {
				var iframe = $( this );
	
				return $( "<div>" )
					.css({
						position: "absolute",
						width: iframe.outerWidth(),
						height: iframe.outerHeight()
					})
					.appendTo( iframe.parent() )
					.offset( iframe.offset() )[0];
			});
		},
	
		_unblockFrames: function() {
			if ( this.iframeBlocks ) {
				this.iframeBlocks.remove();
				delete this.iframeBlocks;
			}
		},
	
		_allowInteraction: function( event ) {
			if ( $( event.target ).closest( ".ui-dialog" ).length ) {
				return true;
			}
	
			// TODO: Remove hack when datepicker implements
			// the .ui-front logic (#8989)
			return !!$( event.target ).closest( ".ui-datepicker" ).length;
		},
	
		_createOverlay: function() {
			if ( !this.options.modal ) {
				return;
			}
	
			// We use a delay in case the overlay is created from an
			// event that we're going to be cancelling (#2804)
			var isOpening = true;
			this._delay(function() {
				isOpening = false;
			});
	
			if ( !this.document.data( "ui-dialog-overlays" ) ) {
	
				// Prevent use of anchors and inputs
				// Using _on() for an event handler shared across many instances is
				// safe because the dialogs stack and must be closed in reverse order
				this._on( this.document, {
					focusin: function( event ) {
						if ( isOpening ) {
							return;
						}
	
						if ( !this._allowInteraction( event ) ) {
							event.preventDefault();
							this._trackingInstances()[ 0 ]._focusTabbable();
						}
					}
				});
			}
	
			this.overlay = $( "<div>" )
				.addClass( "ui-widget-overlay ui-front" )
				.appendTo( this._appendTo() );
			this._on( this.overlay, {
				mousedown: "_keepFocus"
			});
			this.document.data( "ui-dialog-overlays",
				(this.document.data( "ui-dialog-overlays" ) || 0) + 1 );
		},
	
		_destroyOverlay: function() {
			if ( !this.options.modal ) {
				return;
			}
	
			if ( this.overlay ) {
				var overlays = this.document.data( "ui-dialog-overlays" ) - 1;
	
				if ( !overlays ) {
					this.document
						.unbind( "focusin" )
						.removeData( "ui-dialog-overlays" );
				} else {
					this.document.data( "ui-dialog-overlays", overlays );
				}
	
				this.overlay.remove();
				this.overlay = null;
			}
		}
	});
	
	
	/*!
	 * jQuery UI Droppable 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/droppable/
	 */
	
	
	$.widget( "ui.droppable", {
		version: "1.11.1",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: false,
			addClasses: true,
			greedy: false,
			hoverClass: false,
			scope: "default",
			tolerance: "intersect",
	
			// callbacks
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
	
			var proportions,
				o = this.options,
				accept = o.accept;
	
			this.isover = false;
			this.isout = true;
	
			this.accept = $.isFunction( accept ) ? accept : function( d ) {
				return d.is( accept );
			};
	
			this.proportions = function( /* valueToWrite */ ) {
				if ( arguments.length ) {
					// Store the droppable's proportions
					proportions = arguments[ 0 ];
				} else {
					// Retrieve or derive the droppable's proportions
					return proportions ?
						proportions :
						proportions = {
							width: this.element[ 0 ].offsetWidth,
							height: this.element[ 0 ].offsetHeight
						};
				}
			};
	
			this._addToManager( o.scope );
	
			o.addClasses && this.element.addClass( "ui-droppable" );
	
		},
	
		_addToManager: function( scope ) {
			// Add the reference and positions to the manager
			$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
			$.ui.ddmanager.droppables[ scope ].push( this );
		},
	
		_splice: function( drop ) {
			var i = 0;
			for ( ; i < drop.length; i++ ) {
				if ( drop[ i ] === this ) {
					drop.splice( i, 1 );
				}
			}
		},
	
		_destroy: function() {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];
	
			this._splice( drop );
	
			this.element.removeClass( "ui-droppable ui-droppable-disabled" );
		},
	
		_setOption: function( key, value ) {
	
			if ( key === "accept" ) {
				this.accept = $.isFunction( value ) ? value : function( d ) {
					return d.is( value );
				};
			} else if ( key === "scope" ) {
				var drop = $.ui.ddmanager.droppables[ this.options.scope ];
	
				this._splice( drop );
				this._addToManager( value );
			}
	
			this._super( key, value );
		},
	
		_activate: function( event ) {
			var draggable = $.ui.ddmanager.current;
			if ( this.options.activeClass ) {
				this.element.addClass( this.options.activeClass );
			}
			if ( draggable ){
				this._trigger( "activate", event, this.ui( draggable ) );
			}
		},
	
		_deactivate: function( event ) {
			var draggable = $.ui.ddmanager.current;
			if ( this.options.activeClass ) {
				this.element.removeClass( this.options.activeClass );
			}
			if ( draggable ){
				this._trigger( "deactivate", event, this.ui( draggable ) );
			}
		},
	
		_over: function( event ) {
	
			var draggable = $.ui.ddmanager.current;
	
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}
	
			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				if ( this.options.hoverClass ) {
					this.element.addClass( this.options.hoverClass );
				}
				this._trigger( "over", event, this.ui( draggable ) );
			}
	
		},
	
		_out: function( event ) {
	
			var draggable = $.ui.ddmanager.current;
	
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}
	
			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				if ( this.options.hoverClass ) {
					this.element.removeClass( this.options.hoverClass );
				}
				this._trigger( "out", event, this.ui( draggable ) );
			}
	
		},
	
		_drop: function( event, custom ) {
	
			var draggable = custom || $.ui.ddmanager.current,
				childrenIntersection = false;
	
			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return false;
			}
	
			this.element.find( ":data(ui-droppable)" ).not( ".ui-draggable-dragging" ).each(function() {
				var inst = $( this ).droppable( "instance" );
				if (
					inst.options.greedy &&
					!inst.options.disabled &&
					inst.options.scope === draggable.options.scope &&
					inst.accept.call( inst.element[ 0 ], ( draggable.currentItem || draggable.element ) ) &&
					$.ui.intersect( draggable, $.extend( inst, { offset: inst.element.offset() } ), inst.options.tolerance, event )
				) { childrenIntersection = true; return false; }
			});
			if ( childrenIntersection ) {
				return false;
			}
	
			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				if ( this.options.activeClass ) {
					this.element.removeClass( this.options.activeClass );
				}
				if ( this.options.hoverClass ) {
					this.element.removeClass( this.options.hoverClass );
				}
				this._trigger( "drop", event, this.ui( draggable ) );
				return this.element;
			}
	
			return false;
	
		},
	
		ui: function( c ) {
			return {
				draggable: ( c.currentItem || c.element ),
				helper: c.helper,
				position: c.position,
				offset: c.positionAbs
			};
		}
	
	});
	
	$.ui.intersect = (function() {
		function isOverAxis( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		}
	
		return function( draggable, droppable, toleranceMode, event ) {
	
			if ( !droppable.offset ) {
				return false;
			}
	
			var x1 = ( draggable.positionAbs || draggable.position.absolute ).left,
				y1 = ( draggable.positionAbs || draggable.position.absolute ).top,
				x2 = x1 + draggable.helperProportions.width,
				y2 = y1 + draggable.helperProportions.height,
				l = droppable.offset.left,
				t = droppable.offset.top,
				r = l + droppable.proportions().width,
				b = t + droppable.proportions().height;
	
			switch ( toleranceMode ) {
			case "fit":
				return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
			case "intersect":
				return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
					x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
					t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
					y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
			case "pointer":
				return isOverAxis( event.pageY, t, droppable.proportions().height ) && isOverAxis( event.pageX, l, droppable.proportions().width );
			case "touch":
				return (
					( y1 >= t && y1 <= b ) || // Top edge touching
					( y2 >= t && y2 <= b ) || // Bottom edge touching
					( y1 < t && y2 > b ) // Surrounded vertically
				) && (
					( x1 >= l && x1 <= r ) || // Left edge touching
					( x2 >= l && x2 <= r ) || // Right edge touching
					( x1 < l && x2 > r ) // Surrounded horizontally
				);
			default:
				return false;
			}
		};
	})();
	
	/*
		This manager tracks offsets of draggables and droppables
	*/
	$.ui.ddmanager = {
		current: null,
		droppables: { "default": [] },
		prepareOffsets: function( t, event ) {
	
			var i, j,
				m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
				type = event ? event.type : null, // workaround for #2317
				list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();
	
			droppablesLoop: for ( i = 0; i < m.length; i++ ) {
	
				// No disabled and non-accepted
				if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
					continue;
				}
	
				// Filter out elements in the current dragged item
				for ( j = 0; j < list.length; j++ ) {
					if ( list[ j ] === m[ i ].element[ 0 ] ) {
						m[ i ].proportions().height = 0;
						continue droppablesLoop;
					}
				}
	
				m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
				if ( !m[ i ].visible ) {
					continue;
				}
	
				// Activate the droppable if used directly from draggables
				if ( type === "mousedown" ) {
					m[ i ]._activate.call( m[ i ], event );
				}
	
				m[ i ].offset = m[ i ].element.offset();
				m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth, height: m[ i ].element[ 0 ].offsetHeight });
	
			}
	
		},
		drop: function( draggable, event ) {
	
			var dropped = false;
			// Create a copy of the droppables in case the list changes during the drop (#9116)
			$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {
	
				if ( !this.options ) {
					return;
				}
				if ( !this.options.disabled && this.visible && $.ui.intersect( draggable, this, this.options.tolerance, event ) ) {
					dropped = this._drop.call( this, event ) || dropped;
				}
	
				if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
					this.isout = true;
					this.isover = false;
					this._deactivate.call( this, event );
				}
	
			});
			return dropped;
	
		},
		dragStart: function( draggable, event ) {
			// Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
			draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {
				if ( !draggable.options.refreshPositions ) {
					$.ui.ddmanager.prepareOffsets( draggable, event );
				}
			});
		},
		drag: function( draggable, event ) {
	
			// If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
			if ( draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
	
			// Run through all droppables and check their positions based on specific tolerance options
			$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {
	
				if ( this.options.disabled || this.greedyChild || !this.visible ) {
					return;
				}
	
				var parentInstance, scope, parent,
					intersects = $.ui.intersect( draggable, this, this.options.tolerance, event ),
					c = !intersects && this.isover ? "isout" : ( intersects && !this.isover ? "isover" : null );
				if ( !c ) {
					return;
				}
	
				if ( this.options.greedy ) {
					// find droppable parents with same scope
					scope = this.options.scope;
					parent = this.element.parents( ":data(ui-droppable)" ).filter(function() {
						return $( this ).droppable( "instance" ).options.scope === scope;
					});
	
					if ( parent.length ) {
						parentInstance = $( parent[ 0 ] ).droppable( "instance" );
						parentInstance.greedyChild = ( c === "isover" );
					}
				}
	
				// we just moved into a greedy child
				if ( parentInstance && c === "isover" ) {
					parentInstance.isover = false;
					parentInstance.isout = true;
					parentInstance._out.call( parentInstance, event );
				}
	
				this[ c ] = true;
				this[c === "isout" ? "isover" : "isout"] = false;
				this[c === "isover" ? "_over" : "_out"].call( this, event );
	
				// we just moved out of a greedy child
				if ( parentInstance && c === "isout" ) {
					parentInstance.isout = false;
					parentInstance.isover = true;
					parentInstance._over.call( parentInstance, event );
				}
			});
	
		},
		dragStop: function( draggable, event ) {
			draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );
			// Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		}
	};
	
	var droppable = $.ui.droppable;
	
	
	/*!
	 * jQuery UI Effects 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/effects-core/
	 */
	
	
	var dataSpace = "ui-effects-",
	
		// Create a local jQuery because jQuery Color relies on it and the
		// global may not exist with AMD and a custom build (#10199)
		jQuery = $;
	
	$.effects = {
		effect: {}
	};
	
	/*!
	 * jQuery Color Animations v2.1.2
	 * https://github.com/jquery/jquery-color
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * Date: Wed Jan 16 08:47:09 2013 -0600
	 */
	(function( jQuery, undefined ) {
	
		var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
	
		// plusequals test for += 100 -= 100
		rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
		// a set of RE's that can match strings and generate color tuples.
		stringParsers = [ {
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ],
						execResult[ 3 ],
						execResult[ 4 ]
					];
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ] * 2.55,
						execResult[ 2 ] * 2.55,
						execResult[ 3 ] * 2.55,
						execResult[ 4 ]
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ], 16 )
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
					];
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ] / 100,
						execResult[ 3 ] / 100,
						execResult[ 4 ]
					];
				}
			} ],
	
		// jQuery.Color( )
		color = jQuery.Color = function( color, green, blue, alpha ) {
			return new jQuery.Color.fn.parse( color, green, blue, alpha );
		},
		spaces = {
			rgba: {
				props: {
					red: {
						idx: 0,
						type: "byte"
					},
					green: {
						idx: 1,
						type: "byte"
					},
					blue: {
						idx: 2,
						type: "byte"
					}
				}
			},
	
			hsla: {
				props: {
					hue: {
						idx: 0,
						type: "degrees"
					},
					saturation: {
						idx: 1,
						type: "percent"
					},
					lightness: {
						idx: 2,
						type: "percent"
					}
				}
			}
		},
		propTypes = {
			"byte": {
				floor: true,
				max: 255
			},
			"percent": {
				max: 1
			},
			"degrees": {
				mod: 360,
				floor: true
			}
		},
		support = color.support = {},
	
		// element for support tests
		supportElem = jQuery( "<p>" )[ 0 ],
	
		// colors = jQuery.Color.names
		colors,
	
		// local aliases of functions called often
		each = jQuery.each;
	
	// determine rgba support immediately
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;
	
	// define cache name and alpha properties
	// for rgba and hsla spaces
	each( spaces, function( spaceName, space ) {
		space.cache = "_" + spaceName;
		space.props.alpha = {
			idx: 3,
			type: "percent",
			def: 1
		};
	});
	
	function clamp( value, prop, allowEmpty ) {
		var type = propTypes[ prop.type ] || {};
	
		if ( value == null ) {
			return (allowEmpty || !prop.def) ? null : prop.def;
		}
	
		// ~~ is an short way of doing floor for positive numbers
		value = type.floor ? ~~value : parseFloat( value );
	
		// IE will pass in empty strings as value for alpha,
		// which will hit this case
		if ( isNaN( value ) ) {
			return prop.def;
		}
	
		if ( type.mod ) {
			// we add mod before modding to make sure that negatives values
			// get converted properly: -10 -> 350
			return (value + type.mod) % type.mod;
		}
	
		// for now all property types without mod have min and max
		return 0 > value ? 0 : type.max < value ? type.max : value;
	}
	
	function stringParse( string ) {
		var inst = color(),
			rgba = inst._rgba = [];
	
		string = string.toLowerCase();
	
		each( stringParsers, function( i, parser ) {
			var parsed,
				match = parser.re.exec( string ),
				values = match && parser.parse( match ),
				spaceName = parser.space || "rgba";
	
			if ( values ) {
				parsed = inst[ spaceName ]( values );
	
				// if this was an rgba parse the assignment might happen twice
				// oh well....
				inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
				rgba = inst._rgba = parsed._rgba;
	
				// exit each( stringParsers ) here because we matched
				return false;
			}
		});
	
		// Found a stringParser that handled it
		if ( rgba.length ) {
	
			// if this came from a parsed string, force "transparent" when alpha is 0
			// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
			if ( rgba.join() === "0,0,0,0" ) {
				jQuery.extend( rgba, colors.transparent );
			}
			return inst;
		}
	
		// named colors
		return colors[ string ];
	}
	
	color.fn = jQuery.extend( color.prototype, {
		parse: function( red, green, blue, alpha ) {
			if ( red === undefined ) {
				this._rgba = [ null, null, null, null ];
				return this;
			}
			if ( red.jquery || red.nodeType ) {
				red = jQuery( red ).css( green );
				green = undefined;
			}
	
			var inst = this,
				type = jQuery.type( red ),
				rgba = this._rgba = [];
	
			// more than 1 argument specified - assume ( red, green, blue, alpha )
			if ( green !== undefined ) {
				red = [ red, green, blue, alpha ];
				type = "array";
			}
	
			if ( type === "string" ) {
				return this.parse( stringParse( red ) || colors._default );
			}
	
			if ( type === "array" ) {
				each( spaces.rgba.props, function( key, prop ) {
					rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
				});
				return this;
			}
	
			if ( type === "object" ) {
				if ( red instanceof color ) {
					each( spaces, function( spaceName, space ) {
						if ( red[ space.cache ] ) {
							inst[ space.cache ] = red[ space.cache ].slice();
						}
					});
				} else {
					each( spaces, function( spaceName, space ) {
						var cache = space.cache;
						each( space.props, function( key, prop ) {
	
							// if the cache doesn't exist, and we know how to convert
							if ( !inst[ cache ] && space.to ) {
	
								// if the value was null, we don't need to copy it
								// if the key was alpha, we don't need to copy it either
								if ( key === "alpha" || red[ key ] == null ) {
									return;
								}
								inst[ cache ] = space.to( inst._rgba );
							}
	
							// this is the only case where we allow nulls for ALL properties.
							// call clamp with alwaysAllowEmpty
							inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
						});
	
						// everything defined but alpha?
						if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
							// use the default of 1
							inst[ cache ][ 3 ] = 1;
							if ( space.from ) {
								inst._rgba = space.from( inst[ cache ] );
							}
						}
					});
				}
				return this;
			}
		},
		is: function( compare ) {
			var is = color( compare ),
				same = true,
				inst = this;
	
			each( spaces, function( _, space ) {
				var localCache,
					isCache = is[ space.cache ];
				if (isCache) {
					localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
					each( space.props, function( _, prop ) {
						if ( isCache[ prop.idx ] != null ) {
							same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
							return same;
						}
					});
				}
				return same;
			});
			return same;
		},
		_space: function() {
			var used = [],
				inst = this;
			each( spaces, function( spaceName, space ) {
				if ( inst[ space.cache ] ) {
					used.push( spaceName );
				}
			});
			return used.pop();
		},
		transition: function( other, distance ) {
			var end = color( other ),
				spaceName = end._space(),
				space = spaces[ spaceName ],
				startColor = this.alpha() === 0 ? color( "transparent" ) : this,
				start = startColor[ space.cache ] || space.to( startColor._rgba ),
				result = start.slice();
	
			end = end[ space.cache ];
			each( space.props, function( key, prop ) {
				var index = prop.idx,
					startValue = start[ index ],
					endValue = end[ index ],
					type = propTypes[ prop.type ] || {};
	
				// if null, don't override start value
				if ( endValue === null ) {
					return;
				}
				// if null - use end
				if ( startValue === null ) {
					result[ index ] = endValue;
				} else {
					if ( type.mod ) {
						if ( endValue - startValue > type.mod / 2 ) {
							startValue += type.mod;
						} else if ( startValue - endValue > type.mod / 2 ) {
							startValue -= type.mod;
						}
					}
					result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
				}
			});
			return this[ spaceName ]( result );
		},
		blend: function( opaque ) {
			// if we are already opaque - return ourself
			if ( this._rgba[ 3 ] === 1 ) {
				return this;
			}
	
			var rgb = this._rgba.slice(),
				a = rgb.pop(),
				blend = color( opaque )._rgba;
	
			return color( jQuery.map( rgb, function( v, i ) {
				return ( 1 - a ) * blend[ i ] + a * v;
			}));
		},
		toRgbaString: function() {
			var prefix = "rgba(",
				rgba = jQuery.map( this._rgba, function( v, i ) {
					return v == null ? ( i > 2 ? 1 : 0 ) : v;
				});
	
			if ( rgba[ 3 ] === 1 ) {
				rgba.pop();
				prefix = "rgb(";
			}
	
			return prefix + rgba.join() + ")";
		},
		toHslaString: function() {
			var prefix = "hsla(",
				hsla = jQuery.map( this.hsla(), function( v, i ) {
					if ( v == null ) {
						v = i > 2 ? 1 : 0;
					}
	
					// catch 1 and 2
					if ( i && i < 3 ) {
						v = Math.round( v * 100 ) + "%";
					}
					return v;
				});
	
			if ( hsla[ 3 ] === 1 ) {
				hsla.pop();
				prefix = "hsl(";
			}
			return prefix + hsla.join() + ")";
		},
		toHexString: function( includeAlpha ) {
			var rgba = this._rgba.slice(),
				alpha = rgba.pop();
	
			if ( includeAlpha ) {
				rgba.push( ~~( alpha * 255 ) );
			}
	
			return "#" + jQuery.map( rgba, function( v ) {
	
				// default to 0 when nulls exist
				v = ( v || 0 ).toString( 16 );
				return v.length === 1 ? "0" + v : v;
			}).join("");
		},
		toString: function() {
			return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
		}
	});
	color.fn.parse.prototype = color.fn;
	
	// hsla conversions adapted from:
	// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
	
	function hue2rgb( p, q, h ) {
		h = ( h + 1 ) % 1;
		if ( h * 6 < 1 ) {
			return p + ( q - p ) * h * 6;
		}
		if ( h * 2 < 1) {
			return q;
		}
		if ( h * 3 < 2 ) {
			return p + ( q - p ) * ( ( 2 / 3 ) - h ) * 6;
		}
		return p;
	}
	
	spaces.hsla.to = function( rgba ) {
		if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
			return [ null, null, null, rgba[ 3 ] ];
		}
		var r = rgba[ 0 ] / 255,
			g = rgba[ 1 ] / 255,
			b = rgba[ 2 ] / 255,
			a = rgba[ 3 ],
			max = Math.max( r, g, b ),
			min = Math.min( r, g, b ),
			diff = max - min,
			add = max + min,
			l = add * 0.5,
			h, s;
	
		if ( min === max ) {
			h = 0;
		} else if ( r === max ) {
			h = ( 60 * ( g - b ) / diff ) + 360;
		} else if ( g === max ) {
			h = ( 60 * ( b - r ) / diff ) + 120;
		} else {
			h = ( 60 * ( r - g ) / diff ) + 240;
		}
	
		// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
		// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
		if ( diff === 0 ) {
			s = 0;
		} else if ( l <= 0.5 ) {
			s = diff / add;
		} else {
			s = diff / ( 2 - add );
		}
		return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
	};
	
	spaces.hsla.from = function( hsla ) {
		if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
			return [ null, null, null, hsla[ 3 ] ];
		}
		var h = hsla[ 0 ] / 360,
			s = hsla[ 1 ],
			l = hsla[ 2 ],
			a = hsla[ 3 ],
			q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
			p = 2 * l - q;
	
		return [
			Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
			Math.round( hue2rgb( p, q, h ) * 255 ),
			Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
			a
		];
	};
	
	each( spaces, function( spaceName, space ) {
		var props = space.props,
			cache = space.cache,
			to = space.to,
			from = space.from;
	
		// makes rgba() and hsla()
		color.fn[ spaceName ] = function( value ) {
	
			// generate a cache for this space if it doesn't exist
			if ( to && !this[ cache ] ) {
				this[ cache ] = to( this._rgba );
			}
			if ( value === undefined ) {
				return this[ cache ].slice();
			}
	
			var ret,
				type = jQuery.type( value ),
				arr = ( type === "array" || type === "object" ) ? value : arguments,
				local = this[ cache ].slice();
	
			each( props, function( key, prop ) {
				var val = arr[ type === "object" ? key : prop.idx ];
				if ( val == null ) {
					val = local[ prop.idx ];
				}
				local[ prop.idx ] = clamp( val, prop );
			});
	
			if ( from ) {
				ret = color( from( local ) );
				ret[ cache ] = local;
				return ret;
			} else {
				return color( local );
			}
		};
	
		// makes red() green() blue() alpha() hue() saturation() lightness()
		each( props, function( key, prop ) {
			// alpha is included in more than one space
			if ( color.fn[ key ] ) {
				return;
			}
			color.fn[ key ] = function( value ) {
				var vtype = jQuery.type( value ),
					fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
					local = this[ fn ](),
					cur = local[ prop.idx ],
					match;
	
				if ( vtype === "undefined" ) {
					return cur;
				}
	
				if ( vtype === "function" ) {
					value = value.call( this, cur );
					vtype = jQuery.type( value );
				}
				if ( value == null && prop.empty ) {
					return this;
				}
				if ( vtype === "string" ) {
					match = rplusequals.exec( value );
					if ( match ) {
						value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
					}
				}
				local[ prop.idx ] = value;
				return this[ fn ]( local );
			};
		});
	});
	
	// add cssHook and .fx.step function for each named hook.
	// accept a space separated string of properties
	color.hook = function( hook ) {
		var hooks = hook.split( " " );
		each( hooks, function( i, hook ) {
			jQuery.cssHooks[ hook ] = {
				set: function( elem, value ) {
					var parsed, curElem,
						backgroundColor = "";
	
					if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
						value = color( parsed || value );
						if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
							curElem = hook === "backgroundColor" ? elem.parentNode : elem;
							while (
								(backgroundColor === "" || backgroundColor === "transparent") &&
								curElem && curElem.style
							) {
								try {
									backgroundColor = jQuery.css( curElem, "backgroundColor" );
									curElem = curElem.parentNode;
								} catch ( e ) {
								}
							}
	
							value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
								backgroundColor :
								"_default" );
						}
	
						value = value.toRgbaString();
					}
					try {
						elem.style[ hook ] = value;
					} catch( e ) {
						// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
					}
				}
			};
			jQuery.fx.step[ hook ] = function( fx ) {
				if ( !fx.colorInit ) {
					fx.start = color( fx.elem, hook );
					fx.end = color( fx.end );
					fx.colorInit = true;
				}
				jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
			};
		});
	
	};
	
	color.hook( stepHooks );
	
	jQuery.cssHooks.borderColor = {
		expand: function( value ) {
			var expanded = {};
	
			each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
				expanded[ "border" + part + "Color" ] = value;
			});
			return expanded;
		}
	};
	
	// Basic color names only.
	// Usage of any of the other color names requires adding yourself or including
	// jquery.color.svg-names.js.
	colors = jQuery.Color.names = {
		// 4.1. Basic color keywords
		aqua: "#00ffff",
		black: "#000000",
		blue: "#0000ff",
		fuchsia: "#ff00ff",
		gray: "#808080",
		green: "#008000",
		lime: "#00ff00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		purple: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
		teal: "#008080",
		white: "#ffffff",
		yellow: "#ffff00",
	
		// 4.2.3. "transparent" color keyword
		transparent: [ null, null, null, 0 ],
	
		_default: "#ffffff"
	};
	
	})( jQuery );
	
	/******************************************************************************/
	/****************************** CLASS ANIMATIONS ******************************/
	/******************************************************************************/
	(function() {
	
	var classAnimationActions = [ "add", "remove", "toggle" ],
		shorthandStyles = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
		};
	
	$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function( _, prop ) {
		$.fx.step[ prop ] = function( fx ) {
			if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {
				jQuery.style( fx.elem, prop, fx.end );
				fx.setAttr = true;
			}
		};
	});
	
	function getElementStyles( elem ) {
		var key, len,
			style = elem.ownerDocument.defaultView ?
				elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
				elem.currentStyle,
			styles = {};
	
		if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {
			len = style.length;
			while ( len-- ) {
				key = style[ len ];
				if ( typeof style[ key ] === "string" ) {
					styles[ $.camelCase( key ) ] = style[ key ];
				}
			}
		// support: Opera, IE <9
		} else {
			for ( key in style ) {
				if ( typeof style[ key ] === "string" ) {
					styles[ key ] = style[ key ];
				}
			}
		}
	
		return styles;
	}
	
	function styleDifference( oldStyle, newStyle ) {
		var diff = {},
			name, value;
	
		for ( name in newStyle ) {
			value = newStyle[ name ];
			if ( oldStyle[ name ] !== value ) {
				if ( !shorthandStyles[ name ] ) {
					if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {
						diff[ name ] = value;
					}
				}
			}
		}
	
		return diff;
	}
	
	// support: jQuery <1.8
	if ( !$.fn.addBack ) {
		$.fn.addBack = function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		};
	}
	
	$.effects.animateClass = function( value, duration, easing, callback ) {
		var o = $.speed( duration, easing, callback );
	
		return this.queue( function() {
			var animated = $( this ),
				baseClass = animated.attr( "class" ) || "",
				applyClassChange,
				allAnimations = o.children ? animated.find( "*" ).addBack() : animated;
	
			// map the animated objects to store the original styles.
			allAnimations = allAnimations.map(function() {
				var el = $( this );
				return {
					el: el,
					start: getElementStyles( this )
				};
			});
	
			// apply class change
			applyClassChange = function() {
				$.each( classAnimationActions, function(i, action) {
					if ( value[ action ] ) {
						animated[ action + "Class" ]( value[ action ] );
					}
				});
			};
			applyClassChange();
	
			// map all animated objects again - calculate new styles and diff
			allAnimations = allAnimations.map(function() {
				this.end = getElementStyles( this.el[ 0 ] );
				this.diff = styleDifference( this.start, this.end );
				return this;
			});
	
			// apply original class
			animated.attr( "class", baseClass );
	
			// map all animated objects again - this time collecting a promise
			allAnimations = allAnimations.map(function() {
				var styleInfo = this,
					dfd = $.Deferred(),
					opts = $.extend({}, o, {
						queue: false,
						complete: function() {
							dfd.resolve( styleInfo );
						}
					});
	
				this.el.animate( this.diff, opts );
				return dfd.promise();
			});
	
			// once all animations have completed:
			$.when.apply( $, allAnimations.get() ).done(function() {
	
				// set the final class
				applyClassChange();
	
				// for each animated element,
				// clear all css properties that were animated
				$.each( arguments, function() {
					var el = this.el;
					$.each( this.diff, function(key) {
						el.css( key, "" );
					});
				});
	
				// this is guarnteed to be there if you use jQuery.speed()
				// it also handles dequeuing the next anim...
				o.complete.call( animated[ 0 ] );
			});
		});
	};
	
	$.fn.extend({
		addClass: (function( orig ) {
			return function( classNames, speed, easing, callback ) {
				return speed ?
					$.effects.animateClass.call( this,
						{ add: classNames }, speed, easing, callback ) :
					orig.apply( this, arguments );
			};
		})( $.fn.addClass ),
	
		removeClass: (function( orig ) {
			return function( classNames, speed, easing, callback ) {
				return arguments.length > 1 ?
					$.effects.animateClass.call( this,
						{ remove: classNames }, speed, easing, callback ) :
					orig.apply( this, arguments );
			};
		})( $.fn.removeClass ),
	
		toggleClass: (function( orig ) {
			return function( classNames, force, speed, easing, callback ) {
				if ( typeof force === "boolean" || force === undefined ) {
					if ( !speed ) {
						// without speed parameter
						return orig.apply( this, arguments );
					} else {
						return $.effects.animateClass.call( this,
							(force ? { add: classNames } : { remove: classNames }),
							speed, easing, callback );
					}
				} else {
					// without force parameter
					return $.effects.animateClass.call( this,
						{ toggle: classNames }, force, speed, easing );
				}
			};
		})( $.fn.toggleClass ),
	
		switchClass: function( remove, add, speed, easing, callback) {
			return $.effects.animateClass.call( this, {
				add: add,
				remove: remove
			}, speed, easing, callback );
		}
	});
	
	})();
	
	/******************************************************************************/
	/*********************************** EFFECTS **********************************/
	/******************************************************************************/
	
	(function() {
	
	$.extend( $.effects, {
		version: "1.11.1",
	
		// Saves a set of properties in a data storage
		save: function( element, set ) {
			for ( var i = 0; i < set.length; i++ ) {
				if ( set[ i ] !== null ) {
					element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );
				}
			}
		},
	
		// Restores a set of previously saved properties from a data storage
		restore: function( element, set ) {
			var val, i;
			for ( i = 0; i < set.length; i++ ) {
				if ( set[ i ] !== null ) {
					val = element.data( dataSpace + set[ i ] );
					// support: jQuery 1.6.2
					// http://bugs.jquery.com/ticket/9917
					// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
					// We can't differentiate between "" and 0 here, so we just assume
					// empty string since it's likely to be a more common value...
					if ( val === undefined ) {
						val = "";
					}
					element.css( set[ i ], val );
				}
			}
		},
	
		setMode: function( el, mode ) {
			if (mode === "toggle") {
				mode = el.is( ":hidden" ) ? "show" : "hide";
			}
			return mode;
		},
	
		// Translates a [top,left] array into a baseline value
		// this should be a little more flexible in the future to handle a string & hash
		getBaseline: function( origin, original ) {
			var y, x;
			switch ( origin[ 0 ] ) {
				case "top": y = 0; break;
				case "middle": y = 0.5; break;
				case "bottom": y = 1; break;
				default: y = origin[ 0 ] / original.height;
			}
			switch ( origin[ 1 ] ) {
				case "left": x = 0; break;
				case "center": x = 0.5; break;
				case "right": x = 1; break;
				default: x = origin[ 1 ] / original.width;
			}
			return {
				x: x,
				y: y
			};
		},
	
		// Wraps the element around a wrapper that copies position properties
		createWrapper: function( element ) {
	
			// if the element is already wrapped, return it
			if ( element.parent().is( ".ui-effects-wrapper" )) {
				return element.parent();
			}
	
			// wrap the element
			var props = {
					width: element.outerWidth(true),
					height: element.outerHeight(true),
					"float": element.css( "float" )
				},
				wrapper = $( "<div></div>" )
					.addClass( "ui-effects-wrapper" )
					.css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
				// Store the size in case width/height are defined in % - Fixes #5245
				size = {
					width: element.width(),
					height: element.height()
				},
				active = document.activeElement;
	
			// support: Firefox
			// Firefox incorrectly exposes anonymous content
			// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
			try {
				active.id;
			} catch( e ) {
				active = document.body;
			}
	
			element.wrap( wrapper );
	
			// Fixes #7595 - Elements lose focus when wrapped.
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
				$( active ).focus();
			}
	
			wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element
	
			// transfer positioning properties to the wrapper
			if ( element.css( "position" ) === "static" ) {
				wrapper.css({ position: "relative" });
				element.css({ position: "relative" });
			} else {
				$.extend( props, {
					position: element.css( "position" ),
					zIndex: element.css( "z-index" )
				});
				$.each([ "top", "left", "bottom", "right" ], function(i, pos) {
					props[ pos ] = element.css( pos );
					if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {
						props[ pos ] = "auto";
					}
				});
				element.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				});
			}
			element.css(size);
	
			return wrapper.css( props ).show();
		},
	
		removeWrapper: function( element ) {
			var active = document.activeElement;
	
			if ( element.parent().is( ".ui-effects-wrapper" ) ) {
				element.parent().replaceWith( element );
	
				// Fixes #7595 - Elements lose focus when wrapped.
				if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
					$( active ).focus();
				}
			}
	
			return element;
		},
	
		setTransition: function( element, list, factor, value ) {
			value = value || {};
			$.each( list, function( i, x ) {
				var unit = element.cssUnit( x );
				if ( unit[ 0 ] > 0 ) {
					value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
				}
			});
			return value;
		}
	});
	
	// return an effect options object for the given parameters:
	function _normalizeArguments( effect, options, speed, callback ) {
	
		// allow passing all options as the first parameter
		if ( $.isPlainObject( effect ) ) {
			options = effect;
			effect = effect.effect;
		}
	
		// convert to an object
		effect = { effect: effect };
	
		// catch (effect, null, ...)
		if ( options == null ) {
			options = {};
		}
	
		// catch (effect, callback)
		if ( $.isFunction( options ) ) {
			callback = options;
			speed = null;
			options = {};
		}
	
		// catch (effect, speed, ?)
		if ( typeof options === "number" || $.fx.speeds[ options ] ) {
			callback = speed;
			speed = options;
			options = {};
		}
	
		// catch (effect, options, callback)
		if ( $.isFunction( speed ) ) {
			callback = speed;
			speed = null;
		}
	
		// add options to effect
		if ( options ) {
			$.extend( effect, options );
		}
	
		speed = speed || options.duration;
		effect.duration = $.fx.off ? 0 :
			typeof speed === "number" ? speed :
			speed in $.fx.speeds ? $.fx.speeds[ speed ] :
			$.fx.speeds._default;
	
		effect.complete = callback || options.complete;
	
		return effect;
	}
	
	function standardAnimationOption( option ) {
		// Valid standard speeds (nothing, number, named speed)
		if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {
			return true;
		}
	
		// Invalid strings - treat as "normal" speed
		if ( typeof option === "string" && !$.effects.effect[ option ] ) {
			return true;
		}
	
		// Complete callback
		if ( $.isFunction( option ) ) {
			return true;
		}
	
		// Options hash (but not naming an effect)
		if ( typeof option === "object" && !option.effect ) {
			return true;
		}
	
		// Didn't match any standard API
		return false;
	}
	
	$.fn.extend({
		effect: function( /* effect, options, speed, callback */ ) {
			var args = _normalizeArguments.apply( this, arguments ),
				mode = args.mode,
				queue = args.queue,
				effectMethod = $.effects.effect[ args.effect ];
	
			if ( $.fx.off || !effectMethod ) {
				// delegate to the original method (e.g., .show()) if possible
				if ( mode ) {
					return this[ mode ]( args.duration, args.complete );
				} else {
					return this.each( function() {
						if ( args.complete ) {
							args.complete.call( this );
						}
					});
				}
			}
	
			function run( next ) {
				var elem = $( this ),
					complete = args.complete,
					mode = args.mode;
	
				function done() {
					if ( $.isFunction( complete ) ) {
						complete.call( elem[0] );
					}
					if ( $.isFunction( next ) ) {
						next();
					}
				}
	
				// If the element already has the correct final state, delegate to
				// the core methods so the internal tracking of "olddisplay" works.
				if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {
					elem[ mode ]();
					done();
				} else {
					effectMethod.call( elem[0], args, done );
				}
			}
	
			return queue === false ? this.each( run ) : this.queue( queue || "fx", run );
		},
	
		show: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "show";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.show ),
	
		hide: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "hide";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.hide ),
	
		toggle: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "toggle";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.toggle ),
	
		// helper functions
		cssUnit: function(key) {
			var style = this.css( key ),
				val = [];
	
			$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
				if ( style.indexOf( unit ) > 0 ) {
					val = [ parseFloat( style ), unit ];
				}
			});
			return val;
		}
	});
	
	})();
	
	/******************************************************************************/
	/*********************************** EASING ***********************************/
	/******************************************************************************/
	
	(function() {
	
	// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
	
	var baseEasings = {};
	
	$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	});
	
	$.extend( baseEasings, {
		Sine: function( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
				-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function( p ) {
			var pow2,
				bounce = 4;
	
			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	});
	
	$.each( baseEasings, function( name, easeIn ) {
		$.easing[ "easeIn" + name ] = easeIn;
		$.easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		$.easing[ "easeInOut" + name ] = function( p ) {
			return p < 0.5 ?
				easeIn( p * 2 ) / 2 :
				1 - easeIn( p * -2 + 2 ) / 2;
		};
	});
	
	})();
	
	var effect = $.effects;
	
	
	/*!
	 * jQuery UI Effects Blind 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/blind-effect/
	 */
	
	
	var effectBlind = $.effects.effect.blind = function( o, done ) {
		// Create element
		var el = $( this ),
			rvertical = /up|down|vertical/,
			rpositivemotion = /up|left|vertical|horizontal/,
			props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
			mode = $.effects.setMode( el, o.mode || "hide" ),
			direction = o.direction || "up",
			vertical = rvertical.test( direction ),
			ref = vertical ? "height" : "width",
			ref2 = vertical ? "top" : "left",
			motion = rpositivemotion.test( direction ),
			animation = {},
			show = mode === "show",
			wrapper, distance, margin;
	
		// if already wrapped, the wrapper's properties are my property. #6245
		if ( el.parent().is( ".ui-effects-wrapper" ) ) {
			$.effects.save( el.parent(), props );
		} else {
			$.effects.save( el, props );
		}
		el.show();
		wrapper = $.effects.createWrapper( el ).css({
			overflow: "hidden"
		});
	
		distance = wrapper[ ref ]();
		margin = parseFloat( wrapper.css( ref2 ) ) || 0;
	
		animation[ ref ] = show ? distance : 0;
		if ( !motion ) {
			el
				.css( vertical ? "bottom" : "right", 0 )
				.css( vertical ? "top" : "left", "auto" )
				.css({ position: "absolute" });
	
			animation[ ref2 ] = show ? margin : distance + margin;
		}
	
		// start at 0 if we are showing
		if ( show ) {
			wrapper.css( ref, 0 );
			if ( !motion ) {
				wrapper.css( ref2, margin + distance );
			}
		}
	
		// Animate
		wrapper.animate( animation, {
			duration: o.duration,
			easing: o.easing,
			queue: false,
			complete: function() {
				if ( mode === "hide" ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			}
		});
	};
	
	
	/*!
	 * jQuery UI Effects Bounce 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/bounce-effect/
	 */
	
	
	var effectBounce = $.effects.effect.bounce = function( o, done ) {
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
	
			// defaults:
			mode = $.effects.setMode( el, o.mode || "effect" ),
			hide = mode === "hide",
			show = mode === "show",
			direction = o.direction || "up",
			distance = o.distance,
			times = o.times || 5,
	
			// number of internal animations
			anims = times * 2 + ( show || hide ? 1 : 0 ),
			speed = o.duration / anims,
			easing = o.easing,
	
			// utility:
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			motion = ( direction === "up" || direction === "left" ),
			i,
			upAnim,
			downAnim,
	
			// we will need to re-assemble the queue to stack our animations in place
			queue = el.queue(),
			queuelen = queue.length;
	
		// Avoid touching opacity to prevent clearType and PNG issues in IE
		if ( show || hide ) {
			props.push( "opacity" );
		}
	
		$.effects.save( el, props );
		el.show();
		$.effects.createWrapper( el ); // Create Wrapper
	
		// default distance for the BIGGEST bounce is the outer Distance / 3
		if ( !distance ) {
			distance = el[ ref === "top" ? "outerHeight" : "outerWidth" ]() / 3;
		}
	
		if ( show ) {
			downAnim = { opacity: 1 };
			downAnim[ ref ] = 0;
	
			// if we are showing, force opacity 0 and set the initial position
			// then do the "first" animation
			el.css( "opacity", 0 )
				.css( ref, motion ? -distance * 2 : distance * 2 )
				.animate( downAnim, speed, easing );
		}
	
		// start at the smallest distance if we are hiding
		if ( hide ) {
			distance = distance / Math.pow( 2, times - 1 );
		}
	
		downAnim = {};
		downAnim[ ref ] = 0;
		// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
		for ( i = 0; i < times; i++ ) {
			upAnim = {};
			upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;
	
			el.animate( upAnim, speed, easing )
				.animate( downAnim, speed, easing );
	
			distance = hide ? distance * 2 : distance / 2;
		}
	
		// Last Bounce when Hiding
		if ( hide ) {
			upAnim = { opacity: 0 };
			upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;
	
			el.animate( upAnim, speed, easing );
		}
	
		el.queue(function() {
			if ( hide ) {
				el.hide();
			}
			$.effects.restore( el, props );
			$.effects.removeWrapper( el );
			done();
		});
	
		// inject all the animations we just queued to be first in line (after "inprogress")
		if ( queuelen > 1) {
			queue.splice.apply( queue,
				[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
		}
		el.dequeue();
	
	};
	
	
	/*!
	 * jQuery UI Effects Clip 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/clip-effect/
	 */
	
	
	var effectClip = $.effects.effect.clip = function( o, done ) {
		// Create element
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
			mode = $.effects.setMode( el, o.mode || "hide" ),
			show = mode === "show",
			direction = o.direction || "vertical",
			vert = direction === "vertical",
			size = vert ? "height" : "width",
			position = vert ? "top" : "left",
			animation = {},
			wrapper, animate, distance;
	
		// Save & Show
		$.effects.save( el, props );
		el.show();
	
		// Create Wrapper
		wrapper = $.effects.createWrapper( el ).css({
			overflow: "hidden"
		});
		animate = ( el[0].tagName === "IMG" ) ? wrapper : el;
		distance = animate[ size ]();
	
		// Shift
		if ( show ) {
			animate.css( size, 0 );
			animate.css( position, distance / 2 );
		}
	
		// Create Animation Object:
		animation[ size ] = show ? distance : 0;
		animation[ position ] = show ? 0 : distance / 2;
	
		// Animate
		animate.animate( animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				if ( !show ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			}
		});
	
	};
	
	
	/*!
	 * jQuery UI Effects Drop 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/drop-effect/
	 */
	
	
	var effectDrop = $.effects.effect.drop = function( o, done ) {
	
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "opacity", "height", "width" ],
			mode = $.effects.setMode( el, o.mode || "hide" ),
			show = mode === "show",
			direction = o.direction || "left",
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			motion = ( direction === "up" || direction === "left" ) ? "pos" : "neg",
			animation = {
				opacity: show ? 1 : 0
			},
			distance;
	
		// Adjust
		$.effects.save( el, props );
		el.show();
		$.effects.createWrapper( el );
	
		distance = o.distance || el[ ref === "top" ? "outerHeight": "outerWidth" ]( true ) / 2;
	
		if ( show ) {
			el
				.css( "opacity", 0 )
				.css( ref, motion === "pos" ? -distance : distance );
		}
	
		// Animation
		animation[ ref ] = ( show ?
			( motion === "pos" ? "+=" : "-=" ) :
			( motion === "pos" ? "-=" : "+=" ) ) +
			distance;
	
		// Animate
		el.animate( animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				if ( mode === "hide" ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			}
		});
	};
	
	
	/*!
	 * jQuery UI Effects Explode 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/explode-effect/
	 */
	
	
	var effectExplode = $.effects.effect.explode = function( o, done ) {
	
		var rows = o.pieces ? Math.round( Math.sqrt( o.pieces ) ) : 3,
			cells = rows,
			el = $( this ),
			mode = $.effects.setMode( el, o.mode || "hide" ),
			show = mode === "show",
	
			// show and then visibility:hidden the element before calculating offset
			offset = el.show().css( "visibility", "hidden" ).offset(),
	
			// width and height of a piece
			width = Math.ceil( el.outerWidth() / cells ),
			height = Math.ceil( el.outerHeight() / rows ),
			pieces = [],
	
			// loop
			i, j, left, top, mx, my;
	
		// children animate complete:
		function childComplete() {
			pieces.push( this );
			if ( pieces.length === rows * cells ) {
				animComplete();
			}
		}
	
		// clone the element for each row and cell.
		for ( i = 0; i < rows ; i++ ) { // ===>
			top = offset.top + i * height;
			my = i - ( rows - 1 ) / 2 ;
	
			for ( j = 0; j < cells ; j++ ) { // |||
				left = offset.left + j * width;
				mx = j - ( cells - 1 ) / 2 ;
	
				// Create a clone of the now hidden main element that will be absolute positioned
				// within a wrapper div off the -left and -top equal to size of our pieces
				el
					.clone()
					.appendTo( "body" )
					.wrap( "<div></div>" )
					.css({
						position: "absolute",
						visibility: "visible",
						left: -j * width,
						top: -i * height
					})
	
				// select the wrapper - make it overflow: hidden and absolute positioned based on
				// where the original was located +left and +top equal to the size of pieces
					.parent()
					.addClass( "ui-effects-explode" )
					.css({
						position: "absolute",
						overflow: "hidden",
						width: width,
						height: height,
						left: left + ( show ? mx * width : 0 ),
						top: top + ( show ? my * height : 0 ),
						opacity: show ? 0 : 1
					}).animate({
						left: left + ( show ? 0 : mx * width ),
						top: top + ( show ? 0 : my * height ),
						opacity: show ? 1 : 0
					}, o.duration || 500, o.easing, childComplete );
			}
		}
	
		function animComplete() {
			el.css({
				visibility: "visible"
			});
			$( pieces ).remove();
			if ( !show ) {
				el.hide();
			}
			done();
		}
	};
	
	
	/*!
	 * jQuery UI Effects Fade 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/fade-effect/
	 */
	
	
	var effectFade = $.effects.effect.fade = function( o, done ) {
		var el = $( this ),
			mode = $.effects.setMode( el, o.mode || "toggle" );
	
		el.animate({
			opacity: mode
		}, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: done
		});
	};
	
	
	/*!
	 * jQuery UI Effects Fold 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/fold-effect/
	 */
	
	
	var effectFold = $.effects.effect.fold = function( o, done ) {
	
		// Create element
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
			mode = $.effects.setMode( el, o.mode || "hide" ),
			show = mode === "show",
			hide = mode === "hide",
			size = o.size || 15,
			percent = /([0-9]+)%/.exec( size ),
			horizFirst = !!o.horizFirst,
			widthFirst = show !== horizFirst,
			ref = widthFirst ? [ "width", "height" ] : [ "height", "width" ],
			duration = o.duration / 2,
			wrapper, distance,
			animation1 = {},
			animation2 = {};
	
		$.effects.save( el, props );
		el.show();
	
		// Create Wrapper
		wrapper = $.effects.createWrapper( el ).css({
			overflow: "hidden"
		});
		distance = widthFirst ?
			[ wrapper.width(), wrapper.height() ] :
			[ wrapper.height(), wrapper.width() ];
	
		if ( percent ) {
			size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
		}
		if ( show ) {
			wrapper.css( horizFirst ? {
				height: 0,
				width: size
			} : {
				height: size,
				width: 0
			});
		}
	
		// Animation
		animation1[ ref[ 0 ] ] = show ? distance[ 0 ] : size;
		animation2[ ref[ 1 ] ] = show ? distance[ 1 ] : 0;
	
		// Animate
		wrapper
			.animate( animation1, duration, o.easing )
			.animate( animation2, duration, o.easing, function() {
				if ( hide ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			});
	
	};
	
	
	/*!
	 * jQuery UI Effects Highlight 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/highlight-effect/
	 */
	
	
	var effectHighlight = $.effects.effect.highlight = function( o, done ) {
		var elem = $( this ),
			props = [ "backgroundImage", "backgroundColor", "opacity" ],
			mode = $.effects.setMode( elem, o.mode || "show" ),
			animation = {
				backgroundColor: elem.css( "backgroundColor" )
			};
	
		if (mode === "hide") {
			animation.opacity = 0;
		}
	
		$.effects.save( elem, props );
	
		elem
			.show()
			.css({
				backgroundImage: "none",
				backgroundColor: o.color || "#ffff99"
			})
			.animate( animation, {
				queue: false,
				duration: o.duration,
				easing: o.easing,
				complete: function() {
					if ( mode === "hide" ) {
						elem.hide();
					}
					$.effects.restore( elem, props );
					done();
				}
			});
	};
	
	
	/*!
	 * jQuery UI Effects Size 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/size-effect/
	 */
	
	
	var effectSize = $.effects.effect.size = function( o, done ) {
	
		// Create element
		var original, baseline, factor,
			el = $( this ),
			props0 = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ],
	
			// Always restore
			props1 = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ],
	
			// Copy for children
			props2 = [ "width", "height", "overflow" ],
			cProps = [ "fontSize" ],
			vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
			hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],
	
			// Set options
			mode = $.effects.setMode( el, o.mode || "effect" ),
			restore = o.restore || mode !== "effect",
			scale = o.scale || "both",
			origin = o.origin || [ "middle", "center" ],
			position = el.css( "position" ),
			props = restore ? props0 : props1,
			zero = {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			};
	
		if ( mode === "show" ) {
			el.show();
		}
		original = {
			height: el.height(),
			width: el.width(),
			outerHeight: el.outerHeight(),
			outerWidth: el.outerWidth()
		};
	
		if ( o.mode === "toggle" && mode === "show" ) {
			el.from = o.to || zero;
			el.to = o.from || original;
		} else {
			el.from = o.from || ( mode === "show" ? zero : original );
			el.to = o.to || ( mode === "hide" ? zero : original );
		}
	
		// Set scaling factor
		factor = {
			from: {
				y: el.from.height / original.height,
				x: el.from.width / original.width
			},
			to: {
				y: el.to.height / original.height,
				x: el.to.width / original.width
			}
		};
	
		// Scale the css box
		if ( scale === "box" || scale === "both" ) {
	
			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				props = props.concat( vProps );
				el.from = $.effects.setTransition( el, vProps, factor.from.y, el.from );
				el.to = $.effects.setTransition( el, vProps, factor.to.y, el.to );
			}
	
			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				props = props.concat( hProps );
				el.from = $.effects.setTransition( el, hProps, factor.from.x, el.from );
				el.to = $.effects.setTransition( el, hProps, factor.to.x, el.to );
			}
		}
	
		// Scale the content
		if ( scale === "content" || scale === "both" ) {
	
			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				props = props.concat( cProps ).concat( props2 );
				el.from = $.effects.setTransition( el, cProps, factor.from.y, el.from );
				el.to = $.effects.setTransition( el, cProps, factor.to.y, el.to );
			}
		}
	
		$.effects.save( el, props );
		el.show();
		$.effects.createWrapper( el );
		el.css( "overflow", "hidden" ).css( el.from );
	
		// Adjust
		if (origin) { // Calculate baseline shifts
			baseline = $.effects.getBaseline( origin, original );
			el.from.top = ( original.outerHeight - el.outerHeight() ) * baseline.y;
			el.from.left = ( original.outerWidth - el.outerWidth() ) * baseline.x;
			el.to.top = ( original.outerHeight - el.to.outerHeight ) * baseline.y;
			el.to.left = ( original.outerWidth - el.to.outerWidth ) * baseline.x;
		}
		el.css( el.from ); // set top & left
	
		// Animate
		if ( scale === "content" || scale === "both" ) { // Scale the children
	
			// Add margins/font-size
			vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps);
			hProps = hProps.concat([ "marginLeft", "marginRight" ]);
			props2 = props0.concat(vProps).concat(hProps);
	
			el.find( "*[width]" ).each( function() {
				var child = $( this ),
					c_original = {
						height: child.height(),
						width: child.width(),
						outerHeight: child.outerHeight(),
						outerWidth: child.outerWidth()
					};
				if (restore) {
					$.effects.save(child, props2);
				}
	
				child.from = {
					height: c_original.height * factor.from.y,
					width: c_original.width * factor.from.x,
					outerHeight: c_original.outerHeight * factor.from.y,
					outerWidth: c_original.outerWidth * factor.from.x
				};
				child.to = {
					height: c_original.height * factor.to.y,
					width: c_original.width * factor.to.x,
					outerHeight: c_original.height * factor.to.y,
					outerWidth: c_original.width * factor.to.x
				};
	
				// Vertical props scaling
				if ( factor.from.y !== factor.to.y ) {
					child.from = $.effects.setTransition( child, vProps, factor.from.y, child.from );
					child.to = $.effects.setTransition( child, vProps, factor.to.y, child.to );
				}
	
				// Horizontal props scaling
				if ( factor.from.x !== factor.to.x ) {
					child.from = $.effects.setTransition( child, hProps, factor.from.x, child.from );
					child.to = $.effects.setTransition( child, hProps, factor.to.x, child.to );
				}
	
				// Animate children
				child.css( child.from );
				child.animate( child.to, o.duration, o.easing, function() {
	
					// Restore children
					if ( restore ) {
						$.effects.restore( child, props2 );
					}
				});
			});
		}
	
		// Animate
		el.animate( el.to, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				if ( el.to.opacity === 0 ) {
					el.css( "opacity", el.from.opacity );
				}
				if ( mode === "hide" ) {
					el.hide();
				}
				$.effects.restore( el, props );
				if ( !restore ) {
	
					// we need to calculate our new positioning based on the scaling
					if ( position === "static" ) {
						el.css({
							position: "relative",
							top: el.to.top,
							left: el.to.left
						});
					} else {
						$.each([ "top", "left" ], function( idx, pos ) {
							el.css( pos, function( _, str ) {
								var val = parseInt( str, 10 ),
									toRef = idx ? el.to.left : el.to.top;
	
								// if original was "auto", recalculate the new value from wrapper
								if ( str === "auto" ) {
									return toRef + "px";
								}
	
								return val + toRef + "px";
							});
						});
					}
				}
	
				$.effects.removeWrapper( el );
				done();
			}
		});
	
	};
	
	
	/*!
	 * jQuery UI Effects Scale 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/scale-effect/
	 */
	
	
	var effectScale = $.effects.effect.scale = function( o, done ) {
	
		// Create element
		var el = $( this ),
			options = $.extend( true, {}, o ),
			mode = $.effects.setMode( el, o.mode || "effect" ),
			percent = parseInt( o.percent, 10 ) ||
				( parseInt( o.percent, 10 ) === 0 ? 0 : ( mode === "hide" ? 0 : 100 ) ),
			direction = o.direction || "both",
			origin = o.origin,
			original = {
				height: el.height(),
				width: el.width(),
				outerHeight: el.outerHeight(),
				outerWidth: el.outerWidth()
			},
			factor = {
				y: direction !== "horizontal" ? (percent / 100) : 1,
				x: direction !== "vertical" ? (percent / 100) : 1
			};
	
		// We are going to pass this effect to the size effect:
		options.effect = "size";
		options.queue = false;
		options.complete = done;
	
		// Set default origin and restore for show/hide
		if ( mode !== "effect" ) {
			options.origin = origin || [ "middle", "center" ];
			options.restore = true;
		}
	
		options.from = o.from || ( mode === "show" ? {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		} : original );
		options.to = {
			height: original.height * factor.y,
			width: original.width * factor.x,
			outerHeight: original.outerHeight * factor.y,
			outerWidth: original.outerWidth * factor.x
		};
	
		// Fade option to support puff
		if ( options.fade ) {
			if ( mode === "show" ) {
				options.from.opacity = 0;
				options.to.opacity = 1;
			}
			if ( mode === "hide" ) {
				options.from.opacity = 1;
				options.to.opacity = 0;
			}
		}
	
		// Animate
		el.effect( options );
	
	};
	
	
	/*!
	 * jQuery UI Effects Puff 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/puff-effect/
	 */
	
	
	var effectPuff = $.effects.effect.puff = function( o, done ) {
		var elem = $( this ),
			mode = $.effects.setMode( elem, o.mode || "hide" ),
			hide = mode === "hide",
			percent = parseInt( o.percent, 10 ) || 150,
			factor = percent / 100,
			original = {
				height: elem.height(),
				width: elem.width(),
				outerHeight: elem.outerHeight(),
				outerWidth: elem.outerWidth()
			};
	
		$.extend( o, {
			effect: "scale",
			queue: false,
			fade: true,
			mode: mode,
			complete: done,
			percent: hide ? percent : 100,
			from: hide ?
				original :
				{
					height: original.height * factor,
					width: original.width * factor,
					outerHeight: original.outerHeight * factor,
					outerWidth: original.outerWidth * factor
				}
		});
	
		elem.effect( o );
	};
	
	
	/*!
	 * jQuery UI Effects Pulsate 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/pulsate-effect/
	 */
	
	
	var effectPulsate = $.effects.effect.pulsate = function( o, done ) {
		var elem = $( this ),
			mode = $.effects.setMode( elem, o.mode || "show" ),
			show = mode === "show",
			hide = mode === "hide",
			showhide = ( show || mode === "hide" ),
	
			// showing or hiding leaves of the "last" animation
			anims = ( ( o.times || 5 ) * 2 ) + ( showhide ? 1 : 0 ),
			duration = o.duration / anims,
			animateTo = 0,
			queue = elem.queue(),
			queuelen = queue.length,
			i;
	
		if ( show || !elem.is(":visible")) {
			elem.css( "opacity", 0 ).show();
			animateTo = 1;
		}
	
		// anims - 1 opacity "toggles"
		for ( i = 1; i < anims; i++ ) {
			elem.animate({
				opacity: animateTo
			}, duration, o.easing );
			animateTo = 1 - animateTo;
		}
	
		elem.animate({
			opacity: animateTo
		}, duration, o.easing);
	
		elem.queue(function() {
			if ( hide ) {
				elem.hide();
			}
			done();
		});
	
		// We just queued up "anims" animations, we need to put them next in the queue
		if ( queuelen > 1 ) {
			queue.splice.apply( queue,
				[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
		}
		elem.dequeue();
	};
	
	
	/*!
	 * jQuery UI Effects Shake 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/shake-effect/
	 */
	
	
	var effectShake = $.effects.effect.shake = function( o, done ) {
	
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "height", "width" ],
			mode = $.effects.setMode( el, o.mode || "effect" ),
			direction = o.direction || "left",
			distance = o.distance || 20,
			times = o.times || 3,
			anims = times * 2 + 1,
			speed = Math.round( o.duration / anims ),
			ref = (direction === "up" || direction === "down") ? "top" : "left",
			positiveMotion = (direction === "up" || direction === "left"),
			animation = {},
			animation1 = {},
			animation2 = {},
			i,
	
			// we will need to re-assemble the queue to stack our animations in place
			queue = el.queue(),
			queuelen = queue.length;
	
		$.effects.save( el, props );
		el.show();
		$.effects.createWrapper( el );
	
		// Animation
		animation[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance;
		animation1[ ref ] = ( positiveMotion ? "+=" : "-=" ) + distance * 2;
		animation2[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance * 2;
	
		// Animate
		el.animate( animation, speed, o.easing );
	
		// Shakes
		for ( i = 1; i < times; i++ ) {
			el.animate( animation1, speed, o.easing ).animate( animation2, speed, o.easing );
		}
		el
			.animate( animation1, speed, o.easing )
			.animate( animation, speed / 2, o.easing )
			.queue(function() {
				if ( mode === "hide" ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			});
	
		// inject all the animations we just queued to be first in line (after "inprogress")
		if ( queuelen > 1) {
			queue.splice.apply( queue,
				[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );
		}
		el.dequeue();
	
	};
	
	
	/*!
	 * jQuery UI Effects Slide 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/slide-effect/
	 */
	
	
	var effectSlide = $.effects.effect.slide = function( o, done ) {
	
		// Create element
		var el = $( this ),
			props = [ "position", "top", "bottom", "left", "right", "width", "height" ],
			mode = $.effects.setMode( el, o.mode || "show" ),
			show = mode === "show",
			direction = o.direction || "left",
			ref = (direction === "up" || direction === "down") ? "top" : "left",
			positiveMotion = (direction === "up" || direction === "left"),
			distance,
			animation = {};
	
		// Adjust
		$.effects.save( el, props );
		el.show();
		distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true );
	
		$.effects.createWrapper( el ).css({
			overflow: "hidden"
		});
	
		if ( show ) {
			el.css( ref, positiveMotion ? (isNaN(distance) ? "-" + distance : -distance) : distance );
		}
	
		// Animation
		animation[ ref ] = ( show ?
			( positiveMotion ? "+=" : "-=") :
			( positiveMotion ? "-=" : "+=")) +
			distance;
	
		// Animate
		el.animate( animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				if ( mode === "hide" ) {
					el.hide();
				}
				$.effects.restore( el, props );
				$.effects.removeWrapper( el );
				done();
			}
		});
	};
	
	
	/*!
	 * jQuery UI Effects Transfer 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/transfer-effect/
	 */
	
	
	var effectTransfer = $.effects.effect.transfer = function( o, done ) {
		var elem = $( this ),
			target = $( o.to ),
			targetFixed = target.css( "position" ) === "fixed",
			body = $("body"),
			fixTop = targetFixed ? body.scrollTop() : 0,
			fixLeft = targetFixed ? body.scrollLeft() : 0,
			endPosition = target.offset(),
			animation = {
				top: endPosition.top - fixTop,
				left: endPosition.left - fixLeft,
				height: target.innerHeight(),
				width: target.innerWidth()
			},
			startPosition = elem.offset(),
			transfer = $( "<div class='ui-effects-transfer'></div>" )
				.appendTo( document.body )
				.addClass( o.className )
				.css({
					top: startPosition.top - fixTop,
					left: startPosition.left - fixLeft,
					height: elem.innerHeight(),
					width: elem.innerWidth(),
					position: targetFixed ? "fixed" : "absolute"
				})
				.animate( animation, o.duration, o.easing, function() {
					transfer.remove();
					done();
				});
	};
	
	
	/*!
	 * jQuery UI Progressbar 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/progressbar/
	 */
	
	
	var progressbar = $.widget( "ui.progressbar", {
		version: "1.11.1",
		options: {
			max: 100,
			value: 0,
	
			change: null,
			complete: null
		},
	
		min: 0,
	
		_create: function() {
			// Constrain initial value
			this.oldValue = this.options.value = this._constrainedValue();
	
			this.element
				.addClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
				.attr({
					// Only set static values, aria-valuenow and aria-valuemax are
					// set inside _refreshValue()
					role: "progressbar",
					"aria-valuemin": this.min
				});
	
			this.valueDiv = $( "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" )
				.appendTo( this.element );
	
			this._refreshValue();
		},
	
		_destroy: function() {
			this.element
				.removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
				.removeAttr( "role" )
				.removeAttr( "aria-valuemin" )
				.removeAttr( "aria-valuemax" )
				.removeAttr( "aria-valuenow" );
	
			this.valueDiv.remove();
		},
	
		value: function( newValue ) {
			if ( newValue === undefined ) {
				return this.options.value;
			}
	
			this.options.value = this._constrainedValue( newValue );
			this._refreshValue();
		},
	
		_constrainedValue: function( newValue ) {
			if ( newValue === undefined ) {
				newValue = this.options.value;
			}
	
			this.indeterminate = newValue === false;
	
			// sanitize value
			if ( typeof newValue !== "number" ) {
				newValue = 0;
			}
	
			return this.indeterminate ? false :
				Math.min( this.options.max, Math.max( this.min, newValue ) );
		},
	
		_setOptions: function( options ) {
			// Ensure "value" option is set after other values (like max)
			var value = options.value;
			delete options.value;
	
			this._super( options );
	
			this.options.value = this._constrainedValue( value );
			this._refreshValue();
		},
	
		_setOption: function( key, value ) {
			if ( key === "max" ) {
				// Don't allow a max less than min
				value = Math.max( this.min, value );
			}
			if ( key === "disabled" ) {
				this.element
					.toggleClass( "ui-state-disabled", !!value )
					.attr( "aria-disabled", value );
			}
			this._super( key, value );
		},
	
		_percentage: function() {
			return this.indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min );
		},
	
		_refreshValue: function() {
			var value = this.options.value,
				percentage = this._percentage();
	
			this.valueDiv
				.toggle( this.indeterminate || value > this.min )
				.toggleClass( "ui-corner-right", value === this.options.max )
				.width( percentage.toFixed(0) + "%" );
	
			this.element.toggleClass( "ui-progressbar-indeterminate", this.indeterminate );
	
			if ( this.indeterminate ) {
				this.element.removeAttr( "aria-valuenow" );
				if ( !this.overlayDiv ) {
					this.overlayDiv = $( "<div class='ui-progressbar-overlay'></div>" ).appendTo( this.valueDiv );
				}
			} else {
				this.element.attr({
					"aria-valuemax": this.options.max,
					"aria-valuenow": value
				});
				if ( this.overlayDiv ) {
					this.overlayDiv.remove();
					this.overlayDiv = null;
				}
			}
	
			if ( this.oldValue !== value ) {
				this.oldValue = value;
				this._trigger( "change" );
			}
			if ( value === this.options.max ) {
				this._trigger( "complete" );
			}
		}
	});
	
	
	/*!
	 * jQuery UI Selectable 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/selectable/
	 */
	
	
	var selectable = $.widget("ui.selectable", $.ui.mouse, {
		version: "1.11.1",
		options: {
			appendTo: "body",
			autoRefresh: true,
			distance: 0,
			filter: "*",
			tolerance: "touch",
	
			// callbacks
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var selectees,
				that = this;
	
			this.element.addClass("ui-selectable");
	
			this.dragged = false;
	
			// cache selectee children based on filter
			this.refresh = function() {
				selectees = $(that.options.filter, that.element[0]);
				selectees.addClass("ui-selectee");
				selectees.each(function() {
					var $this = $(this),
						pos = $this.offset();
					$.data(this, "selectable-item", {
						element: this,
						$element: $this,
						left: pos.left,
						top: pos.top,
						right: pos.left + $this.outerWidth(),
						bottom: pos.top + $this.outerHeight(),
						startselected: false,
						selected: $this.hasClass("ui-selected"),
						selecting: $this.hasClass("ui-selecting"),
						unselecting: $this.hasClass("ui-unselecting")
					});
				});
			};
			this.refresh();
	
			this.selectees = selectees.addClass("ui-selectee");
	
			this._mouseInit();
	
			this.helper = $("<div class='ui-selectable-helper'></div>");
		},
	
		_destroy: function() {
			this.selectees
				.removeClass("ui-selectee")
				.removeData("selectable-item");
			this.element
				.removeClass("ui-selectable ui-selectable-disabled");
			this._mouseDestroy();
		},
	
		_mouseStart: function(event) {
			var that = this,
				options = this.options;
	
			this.opos = [ event.pageX, event.pageY ];
	
			if (this.options.disabled) {
				return;
			}
	
			this.selectees = $(options.filter, this.element[0]);
	
			this._trigger("start", event);
	
			$(options.appendTo).append(this.helper);
			// position helper (lasso)
			this.helper.css({
				"left": event.pageX,
				"top": event.pageY,
				"width": 0,
				"height": 0
			});
	
			if (options.autoRefresh) {
				this.refresh();
			}
	
			this.selectees.filter(".ui-selected").each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.startselected = true;
				if (!event.metaKey && !event.ctrlKey) {
					selectee.$element.removeClass("ui-selected");
					selectee.selected = false;
					selectee.$element.addClass("ui-unselecting");
					selectee.unselecting = true;
					// selectable UNSELECTING callback
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
			});
	
			$(event.target).parents().addBack().each(function() {
				var doSelect,
					selectee = $.data(this, "selectable-item");
				if (selectee) {
					doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
					selectee.$element
						.removeClass(doSelect ? "ui-unselecting" : "ui-selected")
						.addClass(doSelect ? "ui-selecting" : "ui-unselecting");
					selectee.unselecting = !doSelect;
					selectee.selecting = doSelect;
					selectee.selected = doSelect;
					// selectable (UN)SELECTING callback
					if (doSelect) {
						that._trigger("selecting", event, {
							selecting: selectee.element
						});
					} else {
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
					return false;
				}
			});
	
		},
	
		_mouseDrag: function(event) {
	
			this.dragged = true;
	
			if (this.options.disabled) {
				return;
			}
	
			var tmp,
				that = this,
				options = this.options,
				x1 = this.opos[0],
				y1 = this.opos[1],
				x2 = event.pageX,
				y2 = event.pageY;
	
			if (x1 > x2) { tmp = x2; x2 = x1; x1 = tmp; }
			if (y1 > y2) { tmp = y2; y2 = y1; y1 = tmp; }
			this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });
	
			this.selectees.each(function() {
				var selectee = $.data(this, "selectable-item"),
					hit = false;
	
				//prevent helper from being selected if appendTo: selectable
				if (!selectee || selectee.element === that.element[0]) {
					return;
				}
	
				if (options.tolerance === "touch") {
					hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
				} else if (options.tolerance === "fit") {
					hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
				}
	
				if (hit) {
					// SELECT
					if (selectee.selected) {
						selectee.$element.removeClass("ui-selected");
						selectee.selected = false;
					}
					if (selectee.unselecting) {
						selectee.$element.removeClass("ui-unselecting");
						selectee.unselecting = false;
					}
					if (!selectee.selecting) {
						selectee.$element.addClass("ui-selecting");
						selectee.selecting = true;
						// selectable SELECTING callback
						that._trigger("selecting", event, {
							selecting: selectee.element
						});
					}
				} else {
					// UNSELECT
					if (selectee.selecting) {
						if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
							selectee.$element.removeClass("ui-selecting");
							selectee.selecting = false;
							selectee.$element.addClass("ui-selected");
							selectee.selected = true;
						} else {
							selectee.$element.removeClass("ui-selecting");
							selectee.selecting = false;
							if (selectee.startselected) {
								selectee.$element.addClass("ui-unselecting");
								selectee.unselecting = true;
							}
							// selectable UNSELECTING callback
							that._trigger("unselecting", event, {
								unselecting: selectee.element
							});
						}
					}
					if (selectee.selected) {
						if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
							selectee.$element.removeClass("ui-selected");
							selectee.selected = false;
	
							selectee.$element.addClass("ui-unselecting");
							selectee.unselecting = true;
							// selectable UNSELECTING callback
							that._trigger("unselecting", event, {
								unselecting: selectee.element
							});
						}
					}
				}
			});
	
			return false;
		},
	
		_mouseStop: function(event) {
			var that = this;
	
			this.dragged = false;
	
			$(".ui-unselecting", this.element[0]).each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.$element.removeClass("ui-unselecting");
				selectee.unselecting = false;
				selectee.startselected = false;
				that._trigger("unselected", event, {
					unselected: selectee.element
				});
			});
			$(".ui-selecting", this.element[0]).each(function() {
				var selectee = $.data(this, "selectable-item");
				selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
				selectee.selecting = false;
				selectee.selected = true;
				selectee.startselected = true;
				that._trigger("selected", event, {
					selected: selectee.element
				});
			});
			this._trigger("stop", event);
	
			this.helper.remove();
	
			return false;
		}
	
	});
	
	
	/*!
	 * jQuery UI Selectmenu 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/selectmenu
	 */
	
	
	var selectmenu = $.widget( "ui.selectmenu", {
		version: "1.11.1",
		defaultElement: "<select>",
		options: {
			appendTo: null,
			disabled: null,
			icons: {
				button: "ui-icon-triangle-1-s"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: null,
	
			// callbacks
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null
		},
	
		_create: function() {
			var selectmenuId = this.element.uniqueId().attr( "id" );
			this.ids = {
				element: selectmenuId,
				button: selectmenuId + "-button",
				menu: selectmenuId + "-menu"
			};
	
			this._drawButton();
			this._drawMenu();
	
			if ( this.options.disabled ) {
				this.disable();
			}
		},
	
		_drawButton: function() {
			var that = this,
				tabindex = this.element.attr( "tabindex" );
	
			// Associate existing label with the new button
			this.label = $( "label[for='" + this.ids.element + "']" ).attr( "for", this.ids.button );
			this._on( this.label, {
				click: function( event ) {
					this.button.focus();
					event.preventDefault();
				}
			});
	
			// Hide original select element
			this.element.hide();
	
			// Create button
			this.button = $( "<span>", {
				"class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
				tabindex: tabindex || this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true"
			})
				.insertAfter( this.element );
	
			$( "<span>", {
				"class": "ui-icon " + this.options.icons.button
			})
				.prependTo( this.button );
	
			this.buttonText = $( "<span>", {
				"class": "ui-selectmenu-text"
			})
				.appendTo( this.button );
	
			this._setText( this.buttonText, this.element.find( "option:selected" ).text() );
			this._resizeButton();
	
			this._on( this.button, this._buttonEvents );
			this.button.one( "focusin", function() {
	
				// Delay rendering the menu items until the button receives focus.
				// The menu may have already been rendered via a programmatic open.
				if ( !that.menuItems ) {
					that._refreshMenu();
				}
			});
			this._hoverable( this.button );
			this._focusable( this.button );
		},
	
		_drawMenu: function() {
			var that = this;
	
			// Create menu
			this.menu = $( "<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			});
	
			// Wrap menu
			this.menuWrap = $( "<div>", {
				"class": "ui-selectmenu-menu ui-front"
			})
				.append( this.menu )
				.appendTo( this._appendTo() );
	
			// Initialize menu widget
			this.menuInstance = this.menu
				.menu({
					role: "listbox",
					select: function( event, ui ) {
						event.preventDefault();
						that._select( ui.item.data( "ui-selectmenu-item" ), event );
					},
					focus: function( event, ui ) {
						var item = ui.item.data( "ui-selectmenu-item" );
	
						// Prevent inital focus from firing and check if its a newly focused item
						if ( that.focusIndex != null && item.index !== that.focusIndex ) {
							that._trigger( "focus", event, { item: item } );
							if ( !that.isOpen ) {
								that._select( item, event );
							}
						}
						that.focusIndex = item.index;
	
						that.button.attr( "aria-activedescendant",
							that.menuItems.eq( item.index ).attr( "id" ) );
					}
				})
				.menu( "instance" );
	
			// Adjust menu styles to dropdown
			this.menu
				.addClass( "ui-corner-bottom" )
				.removeClass( "ui-corner-all" );
	
			// Don't close the menu on mouseleave
			this.menuInstance._off( this.menu, "mouseleave" );
	
			// Cancel the menu's collapseAll on document click
			this.menuInstance._closeOnDocumentClick = function() {
				return false;
			};
	
			// Selects often contain empty items, but never contain dividers
			this.menuInstance._isDivider = function() {
				return false;
			};
		},
	
		refresh: function() {
			this._refreshMenu();
			this._setText( this.buttonText, this._getSelectedItem().text() );
			if ( !this.options.width ) {
				this._resizeButton();
			}
		},
	
		_refreshMenu: function() {
			this.menu.empty();
	
			var item,
				options = this.element.find( "option" );
	
			if ( !options.length ) {
				return;
			}
	
			this._parseOptions( options );
			this._renderMenu( this.menu, this.items );
	
			this.menuInstance.refresh();
			this.menuItems = this.menu.find( "li" ).not( ".ui-selectmenu-optgroup" );
	
			item = this._getSelectedItem();
	
			// Update the menu to have the correct item focused
			this.menuInstance.focus( null, item );
			this._setAria( item.data( "ui-selectmenu-item" ) );
	
			// Set disabled state
			this._setOption( "disabled", this.element.prop( "disabled" ) );
		},
	
		open: function( event ) {
			if ( this.options.disabled ) {
				return;
			}
	
			// If this is the first time the menu is being opened, render the items
			if ( !this.menuItems ) {
				this._refreshMenu();
			} else {
	
				// Menu clears focus on close, reset focus to selected item
				this.menu.find( ".ui-state-focus" ).removeClass( "ui-state-focus" );
				this.menuInstance.focus( null, this._getSelectedItem() );
			}
	
			this.isOpen = true;
			this._toggleAttr();
			this._resizeMenu();
			this._position();
	
			this._on( this.document, this._documentClick );
	
			this._trigger( "open", event );
		},
	
		_position: function() {
			this.menuWrap.position( $.extend( { of: this.button }, this.options.position ) );
		},
	
		close: function( event ) {
			if ( !this.isOpen ) {
				return;
			}
	
			this.isOpen = false;
			this._toggleAttr();
	
			this._off( this.document );
	
			this._trigger( "close", event );
		},
	
		widget: function() {
			return this.button;
		},
	
		menuWidget: function() {
			return this.menu;
		},
	
		_renderMenu: function( ul, items ) {
			var that = this,
				currentOptgroup = "";
	
			$.each( items, function( index, item ) {
				if ( item.optgroup !== currentOptgroup ) {
					$( "<li>", {
						"class": "ui-selectmenu-optgroup ui-menu-divider" +
							( item.element.parent( "optgroup" ).prop( "disabled" ) ?
								" ui-state-disabled" :
								"" ),
						text: item.optgroup
					})
						.appendTo( ul );
	
					currentOptgroup = item.optgroup;
				}
	
				that._renderItemData( ul, item );
			});
		},
	
		_renderItemData: function( ul, item ) {
			return this._renderItem( ul, item ).data( "ui-selectmenu-item", item );
		},
	
		_renderItem: function( ul, item ) {
			var li = $( "<li>" );
	
			if ( item.disabled ) {
				li.addClass( "ui-state-disabled" );
			}
			this._setText( li, item.label );
	
			return li.appendTo( ul );
		},
	
		_setText: function( element, value ) {
			if ( value ) {
				element.text( value );
			} else {
				element.html( "&#160;" );
			}
		},
	
		_move: function( direction, event ) {
			var item, next,
				filter = ".ui-menu-item";
	
			if ( this.isOpen ) {
				item = this.menuItems.eq( this.focusIndex );
			} else {
				item = this.menuItems.eq( this.element[ 0 ].selectedIndex );
				filter += ":not(.ui-state-disabled)";
			}
	
			if ( direction === "first" || direction === "last" ) {
				next = item[ direction === "first" ? "prevAll" : "nextAll" ]( filter ).eq( -1 );
			} else {
				next = item[ direction + "All" ]( filter ).eq( 0 );
			}
	
			if ( next.length ) {
				this.menuInstance.focus( event, next );
			}
		},
	
		_getSelectedItem: function() {
			return this.menuItems.eq( this.element[ 0 ].selectedIndex );
		},
	
		_toggle: function( event ) {
			this[ this.isOpen ? "close" : "open" ]( event );
		},
	
		_documentClick: {
			mousedown: function( event ) {
				if ( !this.isOpen ) {
					return;
				}
	
				if ( !$( event.target ).closest( ".ui-selectmenu-menu, #" + this.ids.button ).length ) {
					this.close( event );
				}
			}
		},
	
		_buttonEvents: {
	
			// Prevent text selection from being reset when interacting with the selectmenu (#10144)
			mousedown: function( event ) {
				event.preventDefault();
			},
	
			click: "_toggle",
	
			keydown: function( event ) {
				var preventDefault = true;
				switch ( event.keyCode ) {
					case $.ui.keyCode.TAB:
					case $.ui.keyCode.ESCAPE:
						this.close( event );
						preventDefault = false;
						break;
					case $.ui.keyCode.ENTER:
						if ( this.isOpen ) {
							this._selectFocusedItem( event );
						}
						break;
					case $.ui.keyCode.UP:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "prev", event );
						}
						break;
					case $.ui.keyCode.DOWN:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "next", event );
						}
						break;
					case $.ui.keyCode.SPACE:
						if ( this.isOpen ) {
							this._selectFocusedItem( event );
						} else {
							this._toggle( event );
						}
						break;
					case $.ui.keyCode.LEFT:
						this._move( "prev", event );
						break;
					case $.ui.keyCode.RIGHT:
						this._move( "next", event );
						break;
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.PAGE_UP:
						this._move( "first", event );
						break;
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_DOWN:
						this._move( "last", event );
						break;
					default:
						this.menu.trigger( event );
						preventDefault = false;
				}
	
				if ( preventDefault ) {
					event.preventDefault();
				}
			}
		},
	
		_selectFocusedItem: function( event ) {
			var item = this.menuItems.eq( this.focusIndex );
			if ( !item.hasClass( "ui-state-disabled" ) ) {
				this._select( item.data( "ui-selectmenu-item" ), event );
			}
		},
	
		_select: function( item, event ) {
			var oldIndex = this.element[ 0 ].selectedIndex;
	
			// Change native select element
			this.element[ 0 ].selectedIndex = item.index;
			this._setText( this.buttonText, item.label );
			this._setAria( item );
			this._trigger( "select", event, { item: item } );
	
			if ( item.index !== oldIndex ) {
				this._trigger( "change", event, { item: item } );
			}
	
			this.close( event );
		},
	
		_setAria: function( item ) {
			var id = this.menuItems.eq( item.index ).attr( "id" );
	
			this.button.attr({
				"aria-labelledby": id,
				"aria-activedescendant": id
			});
			this.menu.attr( "aria-activedescendant", id );
		},
	
		_setOption: function( key, value ) {
			if ( key === "icons" ) {
				this.button.find( "span.ui-icon" )
					.removeClass( this.options.icons.button )
					.addClass( value.button );
			}
	
			this._super( key, value );
	
			if ( key === "appendTo" ) {
				this.menuWrap.appendTo( this._appendTo() );
			}
	
			if ( key === "disabled" ) {
				this.menuInstance.option( "disabled", value );
				this.button
					.toggleClass( "ui-state-disabled", value )
					.attr( "aria-disabled", value );
	
				this.element.prop( "disabled", value );
				if ( value ) {
					this.button.attr( "tabindex", -1 );
					this.close();
				} else {
					this.button.attr( "tabindex", 0 );
				}
			}
	
			if ( key === "width" ) {
				this._resizeButton();
			}
		},
	
		_appendTo: function() {
			var element = this.options.appendTo;
	
			if ( element ) {
				element = element.jquery || element.nodeType ?
					$( element ) :
					this.document.find( element ).eq( 0 );
			}
	
			if ( !element || !element[ 0 ] ) {
				element = this.element.closest( ".ui-front" );
			}
	
			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}
	
			return element;
		},
	
		_toggleAttr: function() {
			this.button
				.toggleClass( "ui-corner-top", this.isOpen )
				.toggleClass( "ui-corner-all", !this.isOpen )
				.attr( "aria-expanded", this.isOpen );
			this.menuWrap.toggleClass( "ui-selectmenu-open", this.isOpen );
			this.menu.attr( "aria-hidden", !this.isOpen );
		},
	
		_resizeButton: function() {
			var width = this.options.width;
	
			if ( !width ) {
				width = this.element.show().outerWidth();
				this.element.hide();
			}
	
			this.button.outerWidth( width );
		},
	
		_resizeMenu: function() {
			this.menu.outerWidth( Math.max(
				this.button.outerWidth(),
	
				// support: IE10
				// IE10 wraps long text (possibly a rounding bug)
				// so we add 1px to avoid the wrapping
				this.menu.width( "" ).outerWidth() + 1
			) );
		},
	
		_getCreateOptions: function() {
			return { disabled: this.element.prop( "disabled" ) };
		},
	
		_parseOptions: function( options ) {
			var data = [];
			options.each(function( index, item ) {
				var option = $( item ),
					optgroup = option.parent( "optgroup" );
				data.push({
					element: option,
					index: index,
					value: option.attr( "value" ),
					label: option.text(),
					optgroup: optgroup.attr( "label" ) || "",
					disabled: optgroup.prop( "disabled" ) || option.prop( "disabled" )
				});
			});
			this.items = data;
		},
	
		_destroy: function() {
			this.menuWrap.remove();
			this.button.remove();
			this.element.show();
			this.element.removeUniqueId();
			this.label.attr( "for", this.ids.element );
		}
	});
	
	
	/*!
	 * jQuery UI Slider 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/slider/
	 */
	
	
	var slider = $.widget( "ui.slider", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "slide",
	
		options: {
			animate: false,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: false,
			step: 1,
			value: 0,
			values: null,
	
			// callbacks
			change: null,
			slide: null,
			start: null,
			stop: null
		},
	
		// number of pages in a slider
		// (how many times can you page up/down to go through the whole range)
		numPages: 5,
	
		_create: function() {
			this._keySliding = false;
			this._mouseSliding = false;
			this._animateOff = true;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
	
			this.element
				.addClass( "ui-slider" +
					" ui-slider-" + this.orientation +
					" ui-widget" +
					" ui-widget-content" +
					" ui-corner-all");
	
			this._refresh();
			this._setOption( "disabled", this.options.disabled );
	
			this._animateOff = false;
		},
	
		_refresh: function() {
			this._createRange();
			this._createHandles();
			this._setupEvents();
			this._refreshValue();
		},
	
		_createHandles: function() {
			var i, handleCount,
				options = this.options,
				existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),
				handle = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
				handles = [];
	
			handleCount = ( options.values && options.values.length ) || 1;
	
			if ( existingHandles.length > handleCount ) {
				existingHandles.slice( handleCount ).remove();
				existingHandles = existingHandles.slice( 0, handleCount );
			}
	
			for ( i = existingHandles.length; i < handleCount; i++ ) {
				handles.push( handle );
			}
	
			this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );
	
			this.handle = this.handles.eq( 0 );
	
			this.handles.each(function( i ) {
				$( this ).data( "ui-slider-handle-index", i );
			});
		},
	
		_createRange: function() {
			var options = this.options,
				classes = "";
	
			if ( options.range ) {
				if ( options.range === true ) {
					if ( !options.values ) {
						options.values = [ this._valueMin(), this._valueMin() ];
					} else if ( options.values.length && options.values.length !== 2 ) {
						options.values = [ options.values[0], options.values[0] ];
					} else if ( $.isArray( options.values ) ) {
						options.values = options.values.slice(0);
					}
				}
	
				if ( !this.range || !this.range.length ) {
					this.range = $( "<div></div>" )
						.appendTo( this.element );
	
					classes = "ui-slider-range" +
					// note: this isn't the most fittingly semantic framework class for this element,
					// but worked best visually with a variety of themes
					" ui-widget-header ui-corner-all";
				} else {
					this.range.removeClass( "ui-slider-range-min ui-slider-range-max" )
						// Handle range switching from true to min/max
						.css({
							"left": "",
							"bottom": ""
						});
				}
	
				this.range.addClass( classes +
					( ( options.range === "min" || options.range === "max" ) ? " ui-slider-range-" + options.range : "" ) );
			} else {
				if ( this.range ) {
					this.range.remove();
				}
				this.range = null;
			}
		},
	
		_setupEvents: function() {
			this._off( this.handles );
			this._on( this.handles, this._handleEvents );
			this._hoverable( this.handles );
			this._focusable( this.handles );
		},
	
		_destroy: function() {
			this.handles.remove();
			if ( this.range ) {
				this.range.remove();
			}
	
			this.element
				.removeClass( "ui-slider" +
					" ui-slider-horizontal" +
					" ui-slider-vertical" +
					" ui-widget" +
					" ui-widget-content" +
					" ui-corner-all" );
	
			this._mouseDestroy();
		},
	
		_mouseCapture: function( event ) {
			var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
				that = this,
				o = this.options;
	
			if ( o.disabled ) {
				return false;
			}
	
			this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			};
			this.elementOffset = this.element.offset();
	
			position = { x: event.pageX, y: event.pageY };
			normValue = this._normValueFromMouse( position );
			distance = this._valueMax() - this._valueMin() + 1;
			this.handles.each(function( i ) {
				var thisDistance = Math.abs( normValue - that.values(i) );
				if (( distance > thisDistance ) ||
					( distance === thisDistance &&
						(i === that._lastChangedValue || that.values(i) === o.min ))) {
					distance = thisDistance;
					closestHandle = $( this );
					index = i;
				}
			});
	
			allowed = this._start( event, index );
			if ( allowed === false ) {
				return false;
			}
			this._mouseSliding = true;
	
			this._handleIndex = index;
	
			closestHandle
				.addClass( "ui-state-active" )
				.focus();
	
			offset = closestHandle.offset();
			mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
			this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
				left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
				top: event.pageY - offset.top -
					( closestHandle.height() / 2 ) -
					( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
					( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
					( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
			};
	
			if ( !this.handles.hasClass( "ui-state-hover" ) ) {
				this._slide( event, index, normValue );
			}
			this._animateOff = true;
			return true;
		},
	
		_mouseStart: function() {
			return true;
		},
	
		_mouseDrag: function( event ) {
			var position = { x: event.pageX, y: event.pageY },
				normValue = this._normValueFromMouse( position );
	
			this._slide( event, this._handleIndex, normValue );
	
			return false;
		},
	
		_mouseStop: function( event ) {
			this.handles.removeClass( "ui-state-active" );
			this._mouseSliding = false;
	
			this._stop( event, this._handleIndex );
			this._change( event, this._handleIndex );
	
			this._handleIndex = null;
			this._clickOffset = null;
			this._animateOff = false;
	
			return false;
		},
	
		_detectOrientation: function() {
			this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
		},
	
		_normValueFromMouse: function( position ) {
			var pixelTotal,
				pixelMouse,
				percentMouse,
				valueTotal,
				valueMouse;
	
			if ( this.orientation === "horizontal" ) {
				pixelTotal = this.elementSize.width;
				pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );
			} else {
				pixelTotal = this.elementSize.height;
				pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );
			}
	
			percentMouse = ( pixelMouse / pixelTotal );
			if ( percentMouse > 1 ) {
				percentMouse = 1;
			}
			if ( percentMouse < 0 ) {
				percentMouse = 0;
			}
			if ( this.orientation === "vertical" ) {
				percentMouse = 1 - percentMouse;
			}
	
			valueTotal = this._valueMax() - this._valueMin();
			valueMouse = this._valueMin() + percentMouse * valueTotal;
	
			return this._trimAlignValue( valueMouse );
		},
	
		_start: function( event, index ) {
			var uiHash = {
				handle: this.handles[ index ],
				value: this.value()
			};
			if ( this.options.values && this.options.values.length ) {
				uiHash.value = this.values( index );
				uiHash.values = this.values();
			}
			return this._trigger( "start", event, uiHash );
		},
	
		_slide: function( event, index, newVal ) {
			var otherVal,
				newValues,
				allowed;
	
			if ( this.options.values && this.options.values.length ) {
				otherVal = this.values( index ? 0 : 1 );
	
				if ( ( this.options.values.length === 2 && this.options.range === true ) &&
						( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )
					) {
					newVal = otherVal;
				}
	
				if ( newVal !== this.values( index ) ) {
					newValues = this.values();
					newValues[ index ] = newVal;
					// A slide can be canceled by returning false from the slide callback
					allowed = this._trigger( "slide", event, {
						handle: this.handles[ index ],
						value: newVal,
						values: newValues
					} );
					otherVal = this.values( index ? 0 : 1 );
					if ( allowed !== false ) {
						this.values( index, newVal );
					}
				}
			} else {
				if ( newVal !== this.value() ) {
					// A slide can be canceled by returning false from the slide callback
					allowed = this._trigger( "slide", event, {
						handle: this.handles[ index ],
						value: newVal
					} );
					if ( allowed !== false ) {
						this.value( newVal );
					}
				}
			}
		},
	
		_stop: function( event, index ) {
			var uiHash = {
				handle: this.handles[ index ],
				value: this.value()
			};
			if ( this.options.values && this.options.values.length ) {
				uiHash.value = this.values( index );
				uiHash.values = this.values();
			}
	
			this._trigger( "stop", event, uiHash );
		},
	
		_change: function( event, index ) {
			if ( !this._keySliding && !this._mouseSliding ) {
				var uiHash = {
					handle: this.handles[ index ],
					value: this.value()
				};
				if ( this.options.values && this.options.values.length ) {
					uiHash.value = this.values( index );
					uiHash.values = this.values();
				}
	
				//store the last changed value index for reference when handles overlap
				this._lastChangedValue = index;
	
				this._trigger( "change", event, uiHash );
			}
		},
	
		value: function( newValue ) {
			if ( arguments.length ) {
				this.options.value = this._trimAlignValue( newValue );
				this._refreshValue();
				this._change( null, 0 );
				return;
			}
	
			return this._value();
		},
	
		values: function( index, newValue ) {
			var vals,
				newValues,
				i;
	
			if ( arguments.length > 1 ) {
				this.options.values[ index ] = this._trimAlignValue( newValue );
				this._refreshValue();
				this._change( null, index );
				return;
			}
	
			if ( arguments.length ) {
				if ( $.isArray( arguments[ 0 ] ) ) {
					vals = this.options.values;
					newValues = arguments[ 0 ];
					for ( i = 0; i < vals.length; i += 1 ) {
						vals[ i ] = this._trimAlignValue( newValues[ i ] );
						this._change( null, i );
					}
					this._refreshValue();
				} else {
					if ( this.options.values && this.options.values.length ) {
						return this._values( index );
					} else {
						return this.value();
					}
				}
			} else {
				return this._values();
			}
		},
	
		_setOption: function( key, value ) {
			var i,
				valsLength = 0;
	
			if ( key === "range" && this.options.range === true ) {
				if ( value === "min" ) {
					this.options.value = this._values( 0 );
					this.options.values = null;
				} else if ( value === "max" ) {
					this.options.value = this._values( this.options.values.length - 1 );
					this.options.values = null;
				}
			}
	
			if ( $.isArray( this.options.values ) ) {
				valsLength = this.options.values.length;
			}
	
			if ( key === "disabled" ) {
				this.element.toggleClass( "ui-state-disabled", !!value );
			}
	
			this._super( key, value );
	
			switch ( key ) {
				case "orientation":
					this._detectOrientation();
					this.element
						.removeClass( "ui-slider-horizontal ui-slider-vertical" )
						.addClass( "ui-slider-" + this.orientation );
					this._refreshValue();
	
					// Reset positioning from previous orientation
					this.handles.css( value === "horizontal" ? "bottom" : "left", "" );
					break;
				case "value":
					this._animateOff = true;
					this._refreshValue();
					this._change( null, 0 );
					this._animateOff = false;
					break;
				case "values":
					this._animateOff = true;
					this._refreshValue();
					for ( i = 0; i < valsLength; i += 1 ) {
						this._change( null, i );
					}
					this._animateOff = false;
					break;
				case "min":
				case "max":
					this._animateOff = true;
					this._refreshValue();
					this._animateOff = false;
					break;
				case "range":
					this._animateOff = true;
					this._refresh();
					this._animateOff = false;
					break;
			}
		},
	
		//internal value getter
		// _value() returns value trimmed by min and max, aligned by step
		_value: function() {
			var val = this.options.value;
			val = this._trimAlignValue( val );
	
			return val;
		},
	
		//internal values getter
		// _values() returns array of values trimmed by min and max, aligned by step
		// _values( index ) returns single value trimmed by min and max, aligned by step
		_values: function( index ) {
			var val,
				vals,
				i;
	
			if ( arguments.length ) {
				val = this.options.values[ index ];
				val = this._trimAlignValue( val );
	
				return val;
			} else if ( this.options.values && this.options.values.length ) {
				// .slice() creates a copy of the array
				// this copy gets trimmed by min and max and then returned
				vals = this.options.values.slice();
				for ( i = 0; i < vals.length; i+= 1) {
					vals[ i ] = this._trimAlignValue( vals[ i ] );
				}
	
				return vals;
			} else {
				return [];
			}
		},
	
		// returns the step-aligned value that val is closest to, between (inclusive) min and max
		_trimAlignValue: function( val ) {
			if ( val <= this._valueMin() ) {
				return this._valueMin();
			}
			if ( val >= this._valueMax() ) {
				return this._valueMax();
			}
			var step = ( this.options.step > 0 ) ? this.options.step : 1,
				valModStep = (val - this._valueMin()) % step,
				alignValue = val - valModStep;
	
			if ( Math.abs(valModStep) * 2 >= step ) {
				alignValue += ( valModStep > 0 ) ? step : ( -step );
			}
	
			// Since JavaScript has problems with large floats, round
			// the final value to 5 digits after the decimal point (see #4124)
			return parseFloat( alignValue.toFixed(5) );
		},
	
		_valueMin: function() {
			return this.options.min;
		},
	
		_valueMax: function() {
			return this.options.max;
		},
	
		_refreshValue: function() {
			var lastValPercent, valPercent, value, valueMin, valueMax,
				oRange = this.options.range,
				o = this.options,
				that = this,
				animate = ( !this._animateOff ) ? o.animate : false,
				_set = {};
	
			if ( this.options.values && this.options.values.length ) {
				this.handles.each(function( i ) {
					valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;
					_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
					$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
					if ( that.options.range === true ) {
						if ( that.orientation === "horizontal" ) {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
							}
						} else {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
							}
						}
					}
					lastValPercent = valPercent;
				});
			} else {
				value = this.value();
				valueMin = this._valueMin();
				valueMax = this._valueMax();
				valPercent = ( valueMax !== valueMin ) ?
						( value - valueMin ) / ( valueMax - valueMin ) * 100 :
						0;
				_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
	
				if ( oRange === "min" && this.orientation === "horizontal" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
				}
				if ( oRange === "max" && this.orientation === "horizontal" ) {
					this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
				}
				if ( oRange === "min" && this.orientation === "vertical" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
				}
				if ( oRange === "max" && this.orientation === "vertical" ) {
					this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
				}
			}
		},
	
		_handleEvents: {
			keydown: function( event ) {
				var allowed, curVal, newVal, step,
					index = $( event.target ).data( "ui-slider-handle-index" );
	
				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_UP:
					case $.ui.keyCode.PAGE_DOWN:
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						event.preventDefault();
						if ( !this._keySliding ) {
							this._keySliding = true;
							$( event.target ).addClass( "ui-state-active" );
							allowed = this._start( event, index );
							if ( allowed === false ) {
								return;
							}
						}
						break;
				}
	
				step = this.options.step;
				if ( this.options.values && this.options.values.length ) {
					curVal = newVal = this.values( index );
				} else {
					curVal = newVal = this.value();
				}
	
				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
						newVal = this._valueMin();
						break;
					case $.ui.keyCode.END:
						newVal = this._valueMax();
						break;
					case $.ui.keyCode.PAGE_UP:
						newVal = this._trimAlignValue(
							curVal + ( ( this._valueMax() - this._valueMin() ) / this.numPages )
						);
						break;
					case $.ui.keyCode.PAGE_DOWN:
						newVal = this._trimAlignValue(
							curVal - ( (this._valueMax() - this._valueMin()) / this.numPages ) );
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
						if ( curVal === this._valueMax() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal + step );
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						if ( curVal === this._valueMin() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal - step );
						break;
				}
	
				this._slide( event, index, newVal );
			},
			keyup: function( event ) {
				var index = $( event.target ).data( "ui-slider-handle-index" );
	
				if ( this._keySliding ) {
					this._keySliding = false;
					this._stop( event, index );
					this._change( event, index );
					$( event.target ).removeClass( "ui-state-active" );
				}
			}
		}
	});
	
	
	/*!
	 * jQuery UI Sortable 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/sortable/
	 */
	
	
	var sortable = $.widget("ui.sortable", $.ui.mouse, {
		version: "1.11.1",
		widgetEventPrefix: "sort",
		ready: false,
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000,
	
			// callbacks
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
	
		_isOverAxis: function( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		},
	
		_isFloating: function( item ) {
			return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
		},
	
		_create: function() {
	
			var o = this.options;
			this.containerCache = {};
			this.element.addClass("ui-sortable");
	
			//Get the items
			this.refresh();
	
			//Let's determine if the items are being displayed horizontally
			this.floating = this.items.length ? o.axis === "x" || this._isFloating(this.items[0].item) : false;
	
			//Let's determine the parent's offset
			this.offset = this.element.offset();
	
			//Initialize mouse events for interaction
			this._mouseInit();
	
			this._setHandleClassName();
	
			//We're ready to go
			this.ready = true;
	
		},
	
		_setOption: function( key, value ) {
			this._super( key, value );
	
			if ( key === "handle" ) {
				this._setHandleClassName();
			}
		},
	
		_setHandleClassName: function() {
			this.element.find( ".ui-sortable-handle" ).removeClass( "ui-sortable-handle" );
			$.each( this.items, function() {
				( this.instance.options.handle ?
					this.item.find( this.instance.options.handle ) : this.item )
					.addClass( "ui-sortable-handle" );
			});
		},
	
		_destroy: function() {
			this.element
				.removeClass( "ui-sortable ui-sortable-disabled" )
				.find( ".ui-sortable-handle" )
					.removeClass( "ui-sortable-handle" );
			this._mouseDestroy();
	
			for ( var i = this.items.length - 1; i >= 0; i-- ) {
				this.items[i].item.removeData(this.widgetName + "-item");
			}
	
			return this;
		},
	
		_mouseCapture: function(event, overrideHandle) {
			var currentItem = null,
				validHandle = false,
				that = this;
	
			if (this.reverting) {
				return false;
			}
	
			if(this.options.disabled || this.options.type === "static") {
				return false;
			}
	
			//We have to refresh the items data once first
			this._refreshItems(event);
	
			//Find out if the clicked node (or one of its parents) is a actual item in this.items
			$(event.target).parents().each(function() {
				if($.data(this, that.widgetName + "-item") === that) {
					currentItem = $(this);
					return false;
				}
			});
			if($.data(event.target, that.widgetName + "-item") === that) {
				currentItem = $(event.target);
			}
	
			if(!currentItem) {
				return false;
			}
			if(this.options.handle && !overrideHandle) {
				$(this.options.handle, currentItem).find("*").addBack().each(function() {
					if(this === event.target) {
						validHandle = true;
					}
				});
				if(!validHandle) {
					return false;
				}
			}
	
			this.currentItem = currentItem;
			this._removeCurrentsFromItems();
			return true;
	
		},
	
		_mouseStart: function(event, overrideHandle, noActivation) {
	
			var i, body,
				o = this.options;
	
			this.currentContainer = this;
	
			//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
			this.refreshPositions();
	
			//Create and append the visible helper
			this.helper = this._createHelper(event);
	
			//Cache the helper size
			this._cacheHelperProportions();
	
			/*
			 * - Position generation -
			 * This block generates everything position related - it's the core of draggables.
			 */
	
			//Cache the margins of the original element
			this._cacheMargins();
	
			//Get the next scrolling parent
			this.scrollParent = this.helper.scrollParent();
	
			//The element's absolute position on the page minus margins
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
	
			$.extend(this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
			});
	
			// Only after we got the offset, we can change the helper's position to absolute
			// TODO: Still need to figure out a way to make relative sorting possible
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");
	
			//Generate the original position
			this.originalPosition = this._generatePosition(event);
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;
	
			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
	
			//Cache the former DOM position
			this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };
	
			//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
			if(this.helper[0] !== this.currentItem[0]) {
				this.currentItem.hide();
			}
	
			//Create the placeholder
			this._createPlaceholder();
	
			//Set a containment if given in the options
			if(o.containment) {
				this._setContainment();
			}
	
			if( o.cursor && o.cursor !== "auto" ) { // cursor option
				body = this.document.find( "body" );
	
				// support: IE
				this.storedCursor = body.css( "cursor" );
				body.css( "cursor", o.cursor );
	
				this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
			}
	
			if(o.opacity) { // opacity option
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity");
				}
				this.helper.css("opacity", o.opacity);
			}
	
			if(o.zIndex) { // zIndex option
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex");
				}
				this.helper.css("zIndex", o.zIndex);
			}
	
			//Prepare scrolling
			if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
				this.overflowOffset = this.scrollParent.offset();
			}
	
			//Call callbacks
			this._trigger("start", event, this._uiHash());
	
			//Recache the helper size
			if(!this._preserveHelperProportions) {
				this._cacheHelperProportions();
			}
	
	
			//Post "activate" events to possible containers
			if( !noActivation ) {
				for ( i = this.containers.length - 1; i >= 0; i-- ) {
					this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
				}
			}
	
			//Prepare possible droppables
			if($.ui.ddmanager) {
				$.ui.ddmanager.current = this;
			}
	
			if ($.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
	
			this.dragging = true;
	
			this.helper.addClass("ui-sortable-helper");
			this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
			return true;
	
		},
	
		_mouseDrag: function(event) {
			var i, item, itemElement, intersection,
				o = this.options,
				scrolled = false;
	
			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");
	
			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}
	
			//Do scrolling
			if(this.options.scroll) {
				if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
	
					if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
					}
	
					if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
					}
	
				} else {
	
					if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
					} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
					}
	
					if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
					} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
					}
	
				}
	
				if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
					$.ui.ddmanager.prepareOffsets(this, event);
				}
			}
	
			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");
	
			//Set the helper position
			if(!this.options.axis || this.options.axis !== "y") {
				this.helper[0].style.left = this.position.left+"px";
			}
			if(!this.options.axis || this.options.axis !== "x") {
				this.helper[0].style.top = this.position.top+"px";
			}
	
			//Rearrange
			for (i = this.items.length - 1; i >= 0; i--) {
	
				//Cache variables and intersection, continue if no intersection
				item = this.items[i];
				itemElement = item.item[0];
				intersection = this._intersectsWithPointer(item);
				if (!intersection) {
					continue;
				}
	
				// Only put the placeholder inside the current Container, skip all
				// items from other containers. This works because when moving
				// an item from one container to another the
				// currentContainer is switched before the placeholder is moved.
				//
				// Without this, moving items in "sub-sortables" can cause
				// the placeholder to jitter between the outer and inner container.
				if (item.instance !== this.currentContainer) {
					continue;
				}
	
				// cannot intersect with itself
				// no useless actions that have been done before
				// no action if the item moved is the parent of the item checked
				if (itemElement !== this.currentItem[0] &&
					this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
					!$.contains(this.placeholder[0], itemElement) &&
					(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
				) {
	
					this.direction = intersection === 1 ? "down" : "up";
	
					if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
						this._rearrange(event, item);
					} else {
						break;
					}
	
					this._trigger("change", event, this._uiHash());
					break;
				}
			}
	
			//Post events to containers
			this._contactContainers(event);
	
			//Interconnect with droppables
			if($.ui.ddmanager) {
				$.ui.ddmanager.drag(this, event);
			}
	
			//Call callbacks
			this._trigger("sort", event, this._uiHash());
	
			this.lastPositionAbs = this.positionAbs;
			return false;
	
		},
	
		_mouseStop: function(event, noPropagation) {
	
			if(!event) {
				return;
			}
	
			//If we are using droppables, inform the manager about the drop
			if ($.ui.ddmanager && !this.options.dropBehaviour) {
				$.ui.ddmanager.drop(this, event);
			}
	
			if(this.options.revert) {
				var that = this,
					cur = this.placeholder.offset(),
					axis = this.options.axis,
					animation = {};
	
				if ( !axis || axis === "x" ) {
					animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
				}
				if ( !axis || axis === "y" ) {
					animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
				}
				this.reverting = true;
				$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
					that._clear(event);
				});
			} else {
				this._clear(event, noPropagation);
			}
	
			return false;
	
		},
	
		cancel: function() {
	
			if(this.dragging) {
	
				this._mouseUp({ target: null });
	
				if(this.options.helper === "original") {
					this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
				} else {
					this.currentItem.show();
				}
	
				//Post deactivating events to containers
				for (var i = this.containers.length - 1; i >= 0; i--){
					this.containers[i]._trigger("deactivate", null, this._uiHash(this));
					if(this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", null, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
	
			}
	
			if (this.placeholder) {
				//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
				if(this.placeholder[0].parentNode) {
					this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
				}
				if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
					this.helper.remove();
				}
	
				$.extend(this, {
					helper: null,
					dragging: false,
					reverting: false,
					_noFinalSort: null
				});
	
				if(this.domPosition.prev) {
					$(this.domPosition.prev).after(this.currentItem);
				} else {
					$(this.domPosition.parent).prepend(this.currentItem);
				}
			}
	
			return this;
	
		},
	
		serialize: function(o) {
	
			var items = this._getItemsAsjQuery(o && o.connected),
				str = [];
			o = o || {};
	
			$(items).each(function() {
				var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
				if (res) {
					str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
				}
			});
	
			if(!str.length && o.key) {
				str.push(o.key + "=");
			}
	
			return str.join("&");
	
		},
	
		toArray: function(o) {
	
			var items = this._getItemsAsjQuery(o && o.connected),
				ret = [];
	
			o = o || {};
	
			items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
			return ret;
	
		},
	
		/* Be careful with the following core functions */
		_intersectsWith: function(item) {
	
			var x1 = this.positionAbs.left,
				x2 = x1 + this.helperProportions.width,
				y1 = this.positionAbs.top,
				y2 = y1 + this.helperProportions.height,
				l = item.left,
				r = l + item.width,
				t = item.top,
				b = t + item.height,
				dyClick = this.offset.click.top,
				dxClick = this.offset.click.left,
				isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
				isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
				isOverElement = isOverElementHeight && isOverElementWidth;
	
			if ( this.options.tolerance === "pointer" ||
				this.options.forcePointerForContainers ||
				(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
			) {
				return isOverElement;
			} else {
	
				return (l < x1 + (this.helperProportions.width / 2) && // Right Half
					x2 - (this.helperProportions.width / 2) < r && // Left Half
					t < y1 + (this.helperProportions.height / 2) && // Bottom Half
					y2 - (this.helperProportions.height / 2) < b ); // Top Half
	
			}
		},
	
		_intersectsWithPointer: function(item) {
	
			var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
				isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
				isOverElement = isOverElementHeight && isOverElementWidth,
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
	
			if (!isOverElement) {
				return false;
			}
	
			return this.floating ?
				( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
				: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );
	
		},
	
		_intersectsWithSides: function(item) {
	
			var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
				isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
	
			if (this.floating && horizontalDirection) {
				return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
			} else {
				return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
			}
	
		},
	
		_getDragVerticalDirection: function() {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return delta !== 0 && (delta > 0 ? "down" : "up");
		},
	
		_getDragHorizontalDirection: function() {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return delta !== 0 && (delta > 0 ? "right" : "left");
		},
	
		refresh: function(event) {
			this._refreshItems(event);
			this._setHandleClassName();
			this.refreshPositions();
			return this;
		},
	
		_connectWith: function() {
			var options = this.options;
			return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
		},
	
		_getItemsAsjQuery: function(connected) {
	
			var i, j, cur, inst,
				items = [],
				queries = [],
				connectWith = this._connectWith();
	
			if(connectWith && connected) {
				for (i = connectWith.length - 1; i >= 0; i--){
					cur = $(connectWith[i]);
					for ( j = cur.length - 1; j >= 0; j--){
						inst = $.data(cur[j], this.widgetFullName);
						if(inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
						}
					}
				}
			}
	
			queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
	
			function addItems() {
				items.push( this );
			}
			for (i = queries.length - 1; i >= 0; i--){
				queries[i][0].each( addItems );
			}
	
			return $(items);
	
		},
	
		_removeCurrentsFromItems: function() {
	
			var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
	
			this.items = $.grep(this.items, function (item) {
				for (var j=0; j < list.length; j++) {
					if(list[j] === item.item[0]) {
						return false;
					}
				}
				return true;
			});
	
		},
	
		_refreshItems: function(event) {
	
			this.items = [];
			this.containers = [this];
	
			var i, j, cur, inst, targetData, _queries, item, queriesLength,
				items = this.items,
				queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
				connectWith = this._connectWith();
	
			if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
				for (i = connectWith.length - 1; i >= 0; i--){
					cur = $(connectWith[i]);
					for (j = cur.length - 1; j >= 0; j--){
						inst = $.data(cur[j], this.widgetFullName);
						if(inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
							this.containers.push(inst);
						}
					}
				}
			}
	
			for (i = queries.length - 1; i >= 0; i--) {
				targetData = queries[i][1];
				_queries = queries[i][0];
	
				for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
					item = $(_queries[j]);
	
					item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)
	
					items.push({
						item: item,
						instance: targetData,
						width: 0, height: 0,
						left: 0, top: 0
					});
				}
			}
	
		},
	
		refreshPositions: function(fast) {
	
			//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
			if(this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset();
			}
	
			var i, item, t, p;
	
			for (i = this.items.length - 1; i >= 0; i--){
				item = this.items[i];
	
				//We ignore calculating positions of all connected containers when we're not over them
				if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
					continue;
				}
	
				t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
	
				if (!fast) {
					item.width = t.outerWidth();
					item.height = t.outerHeight();
				}
	
				p = t.offset();
				item.left = p.left;
				item.top = p.top;
			}
	
			if(this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this);
			} else {
				for (i = this.containers.length - 1; i >= 0; i--){
					p = this.containers[i].element.offset();
					this.containers[i].containerCache.left = p.left;
					this.containers[i].containerCache.top = p.top;
					this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
					this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				}
			}
	
			return this;
		},
	
		_createPlaceholder: function(that) {
			that = that || this;
			var className,
				o = that.options;
	
			if(!o.placeholder || o.placeholder.constructor === String) {
				className = o.placeholder;
				o.placeholder = {
					element: function() {
	
						var nodeName = that.currentItem[0].nodeName.toLowerCase(),
							element = $( "<" + nodeName + ">", that.document[0] )
								.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
								.removeClass("ui-sortable-helper");
	
						if ( nodeName === "tr" ) {
							that.currentItem.children().each(function() {
								$( "<td>&#160;</td>", that.document[0] )
									.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
									.appendTo( element );
							});
						} else if ( nodeName === "img" ) {
							element.attr( "src", that.currentItem.attr( "src" ) );
						}
	
						if ( !className ) {
							element.css( "visibility", "hidden" );
						}
	
						return element;
					},
					update: function(container, p) {
	
						// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
						// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
						if(className && !o.forcePlaceholderSize) {
							return;
						}
	
						//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
						if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
						if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
					}
				};
			}
	
			//Create the placeholder
			that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));
	
			//Append it after the actual current item
			that.currentItem.after(that.placeholder);
	
			//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
			o.placeholder.update(that, that.placeholder);
	
		},
	
		_contactContainers: function(event) {
			var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis,
				innermostContainer = null,
				innermostIndex = null;
	
			// get innermost container that intersects with item
			for (i = this.containers.length - 1; i >= 0; i--) {
	
				// never consider a container that's located within the item itself
				if($.contains(this.currentItem[0], this.containers[i].element[0])) {
					continue;
				}
	
				if(this._intersectsWith(this.containers[i].containerCache)) {
	
					// if we've already found a container and it's more "inner" than this, then continue
					if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
						continue;
					}
	
					innermostContainer = this.containers[i];
					innermostIndex = i;
	
				} else {
					// container doesn't intersect. trigger "out" event if necessary
					if(this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", event, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
	
			}
	
			// if no intersecting containers found, return
			if(!innermostContainer) {
				return;
			}
	
			// move the item into the container if it's not there already
			if(this.containers.length === 1) {
				if (!this.containers[innermostIndex].containerCache.over) {
					this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
					this.containers[innermostIndex].containerCache.over = 1;
				}
			} else {
	
				//When entering a new container, we will find the item with the least distance and append our item near it
				dist = 10000;
				itemWithLeastDistance = null;
				floating = innermostContainer.floating || this._isFloating(this.currentItem);
				posProperty = floating ? "left" : "top";
				sizeProperty = floating ? "width" : "height";
				axis = floating ? "clientX" : "clientY";
	
				for (j = this.items.length - 1; j >= 0; j--) {
					if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
						continue;
					}
					if(this.items[j].item[0] === this.currentItem[0]) {
						continue;
					}
	
					cur = this.items[j].item.offset()[posProperty];
					nearBottom = false;
					if ( event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2 ) {
						nearBottom = true;
					}
	
					if ( Math.abs( event[ axis ] - cur ) < dist ) {
						dist = Math.abs( event[ axis ] - cur );
						itemWithLeastDistance = this.items[ j ];
						this.direction = nearBottom ? "up": "down";
					}
				}
	
				//Check if dropOnEmpty is enabled
				if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
					return;
				}
	
				if(this.currentContainer === this.containers[innermostIndex]) {
					return;
				}
	
				itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
				this._trigger("change", event, this._uiHash());
				this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
				this.currentContainer = this.containers[innermostIndex];
	
				//Update the placeholder
				this.options.placeholder.update(this.currentContainer, this.placeholder);
	
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
	
	
		},
	
		_createHelper: function(event) {
	
			var o = this.options,
				helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);
	
			//Add the helper to the DOM if that didn't happen already
			if(!helper.parents("body").length) {
				$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
			}
	
			if(helper[0] === this.currentItem[0]) {
				this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
			}
	
			if(!helper[0].style.width || o.forceHelperSize) {
				helper.width(this.currentItem.width());
			}
			if(!helper[0].style.height || o.forceHelperSize) {
				helper.height(this.currentItem.height());
			}
	
			return helper;
	
		},
	
		_adjustOffsetFromHelper: function(obj) {
			if (typeof obj === "string") {
				obj = obj.split(" ");
			}
			if ($.isArray(obj)) {
				obj = {left: +obj[0], top: +obj[1] || 0};
			}
			if ("left" in obj) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ("right" in obj) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ("top" in obj) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ("bottom" in obj) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},
	
		_getParentOffset: function() {
	
	
			//Get the offsetParent and cache its position
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();
	
			// This is a special case where we need to modify a offset calculated on start, since the following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
			//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
			if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}
	
			// This needs to be actually done for all browsers, since pageX/pageY includes this information
			// with an ugly IE fix
			if( this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
				po = { top: 0, left: 0 };
			}
	
			return {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
			};
	
		},
	
		_getRelativeOffset: function() {
	
			if(this.cssPosition === "relative") {
				var p = this.currentItem.position();
				return {
					top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
					left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
				};
			} else {
				return { top: 0, left: 0 };
			}
	
		},
	
		_cacheMargins: function() {
			this.margins = {
				left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
				top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
			};
		},
	
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
	
		_setContainment: function() {
	
			var ce, co, over,
				o = this.options;
			if(o.containment === "parent") {
				o.containment = this.helper[0].parentNode;
			}
			if(o.containment === "document" || o.containment === "window") {
				this.containment = [
					0 - this.offset.relative.left - this.offset.parent.left,
					0 - this.offset.relative.top - this.offset.parent.top,
					$(o.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left,
					($(o.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
				];
			}
	
			if(!(/^(document|window|parent)$/).test(o.containment)) {
				ce = $(o.containment)[0];
				co = $(o.containment).offset();
				over = ($(ce).css("overflow") !== "hidden");
	
				this.containment = [
					co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
					co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
					co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
					co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
				];
			}
	
		},
	
		_convertPositionTo: function(d, pos) {
	
			if(!pos) {
				pos = this.position;
			}
			var mod = d === "absolute" ? 1 : -1,
				scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
	
			return {
				top: (
					pos.top	+																// The absolute mouse position
					this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
				),
				left: (
					pos.left +																// The absolute mouse position
					this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
				)
			};
	
		},
	
		_generatePosition: function(event) {
	
			var top, left,
				o = this.options,
				pageX = event.pageX,
				pageY = event.pageY,
				scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
	
			// This is another very weird special case that only happens for relative elements:
			// 1. If the css position is relative
			// 2. and the scroll parent is the document or similar to the offset parent
			// we have to refresh the relative offset during the scroll so there are no jumps
			if(this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset();
			}
	
			/*
			 * - Position constraining -
			 * Constrain the position to a mix of grid, containment.
			 */
	
			if(this.originalPosition) { //If we are not dragging yet, we won't check for options
	
				if(this.containment) {
					if(event.pageX - this.offset.click.left < this.containment[0]) {
						pageX = this.containment[0] + this.offset.click.left;
					}
					if(event.pageY - this.offset.click.top < this.containment[1]) {
						pageY = this.containment[1] + this.offset.click.top;
					}
					if(event.pageX - this.offset.click.left > this.containment[2]) {
						pageX = this.containment[2] + this.offset.click.left;
					}
					if(event.pageY - this.offset.click.top > this.containment[3]) {
						pageY = this.containment[3] + this.offset.click.top;
					}
				}
	
				if(o.grid) {
					top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
					pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
	
					left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
					pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
				}
	
			}
	
			return {
				top: (
					pageY -																// The absolute mouse position
					this.offset.click.top -													// Click offset (relative to the element)
					this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
				),
				left: (
					pageX -																// The absolute mouse position
					this.offset.click.left -												// Click offset (relative to the element)
					this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
				)
			};
	
		},
	
		_rearrange: function(event, i, a, hardRefresh) {
	
			a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));
	
			//Various things done here to improve the performance:
			// 1. we create a setTimeout, that calls refreshPositions
			// 2. on the instance, we have a counter variable, that get's higher after every append
			// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
			// 4. this lets only the last addition to the timeout stack through
			this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;
	
			this._delay(function() {
				if(counter === this.counter) {
					this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
				}
			});
	
		},
	
		_clear: function(event, noPropagation) {
	
			this.reverting = false;
			// We delay all events that have to be triggered to after the point where the placeholder has been removed and
			// everything else normalized again
			var i,
				delayedTriggers = [];
	
			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
			if(!this._noFinalSort && this.currentItem.parent().length) {
				this.placeholder.before(this.currentItem);
			}
			this._noFinalSort = null;
	
			if(this.helper[0] === this.currentItem[0]) {
				for(i in this._storedCSS) {
					if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
						this._storedCSS[i] = "";
					}
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}
	
			if(this.fromOutside && !noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
			}
			if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
			}
	
			// Check if the items Container has Changed and trigger appropriate
			// events.
			if (this !== this.currentContainer) {
				if(!noPropagation) {
					delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
					delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
					delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
				}
			}
	
	
			//Post events to containers
			function delayEvent( type, instance, container ) {
				return function( event ) {
					container._trigger( type, event, instance._uiHash( instance ) );
				};
			}
			for (i = this.containers.length - 1; i >= 0; i--){
				if (!noPropagation) {
					delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
				}
				if(this.containers[i].containerCache.over) {
					delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
					this.containers[i].containerCache.over = 0;
				}
			}
	
			//Do what was originally in plugins
			if ( this.storedCursor ) {
				this.document.find( "body" ).css( "cursor", this.storedCursor );
				this.storedStylesheet.remove();
			}
			if(this._storedOpacity) {
				this.helper.css("opacity", this._storedOpacity);
			}
			if(this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
			}
	
			this.dragging = false;
			if(this.cancelHelperRemoval) {
				if(!noPropagation) {
					this._trigger("beforeStop", event, this._uiHash());
					for (i=0; i < delayedTriggers.length; i++) {
						delayedTriggers[i].call(this, event);
					} //Trigger all delayed events
					this._trigger("stop", event, this._uiHash());
				}
	
				this.fromOutside = false;
				return false;
			}
	
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
			}
	
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
	
			if(this.helper[0] !== this.currentItem[0]) {
				this.helper.remove();
			}
			this.helper = null;
	
			if(!noPropagation) {
				for (i=0; i < delayedTriggers.length; i++) {
					delayedTriggers[i].call(this, event);
				} //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}
	
			this.fromOutside = false;
			return true;
	
		},
	
		_trigger: function() {
			if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
				this.cancel();
			}
		},
	
		_uiHash: function(_inst) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $([]),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			};
		}
	
	});
	
	
	/*!
	 * jQuery UI Spinner 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/spinner/
	 */
	
	
	function spinner_modifier( fn ) {
		return function() {
			var previous = this.element.val();
			fn.apply( this, arguments );
			this._refresh();
			if ( previous !== this.element.val() ) {
				this._trigger( "change" );
			}
		};
	}
	
	var spinner = $.widget( "ui.spinner", {
		version: "1.11.1",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: true,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,
	
			change: null,
			spin: null,
			start: null,
			stop: null
		},
	
		_create: function() {
			// handle string values that need to be parsed
			this._setOption( "max", this.options.max );
			this._setOption( "min", this.options.min );
			this._setOption( "step", this.options.step );
	
			// Only format if there is a value, prevents the field from being marked
			// as invalid in Firefox, see #9573.
			if ( this.value() !== "" ) {
				// Format the value, but don't constrain.
				this._value( this.element.val(), true );
			}
	
			this._draw();
			this._on( this._events );
			this._refresh();
	
			// turning off autocomplete prevents the browser from remembering the
			// value when navigating through history, so we re-enable autocomplete
			// if the page is unloaded before the widget is destroyed. #7790
			this._on( this.window, {
				beforeunload: function() {
					this.element.removeAttr( "autocomplete" );
				}
			});
		},
	
		_getCreateOptions: function() {
			var options = {},
				element = this.element;
	
			$.each( [ "min", "max", "step" ], function( i, option ) {
				var value = element.attr( option );
				if ( value !== undefined && value.length ) {
					options[ option ] = value;
				}
			});
	
			return options;
		},
	
		_events: {
			keydown: function( event ) {
				if ( this._start( event ) && this._keydown( event ) ) {
					event.preventDefault();
				}
			},
			keyup: "_stop",
			focus: function() {
				this.previous = this.element.val();
			},
			blur: function( event ) {
				if ( this.cancelBlur ) {
					delete this.cancelBlur;
					return;
				}
	
				this._stop();
				this._refresh();
				if ( this.previous !== this.element.val() ) {
					this._trigger( "change", event );
				}
			},
			mousewheel: function( event, delta ) {
				if ( !delta ) {
					return;
				}
				if ( !this.spinning && !this._start( event ) ) {
					return false;
				}
	
				this._spin( (delta > 0 ? 1 : -1) * this.options.step, event );
				clearTimeout( this.mousewheelTimer );
				this.mousewheelTimer = this._delay(function() {
					if ( this.spinning ) {
						this._stop( event );
					}
				}, 100 );
				event.preventDefault();
			},
			"mousedown .ui-spinner-button": function( event ) {
				var previous;
	
				// We never want the buttons to have focus; whenever the user is
				// interacting with the spinner, the focus should be on the input.
				// If the input is focused then this.previous is properly set from
				// when the input first received focus. If the input is not focused
				// then we need to set this.previous based on the value before spinning.
				previous = this.element[0] === this.document[0].activeElement ?
					this.previous : this.element.val();
				function checkFocus() {
					var isActive = this.element[0] === this.document[0].activeElement;
					if ( !isActive ) {
						this.element.focus();
						this.previous = previous;
						// support: IE
						// IE sets focus asynchronously, so we need to check if focus
						// moved off of the input because the user clicked on the button.
						this._delay(function() {
							this.previous = previous;
						});
					}
				}
	
				// ensure focus is on (or stays on) the text field
				event.preventDefault();
				checkFocus.call( this );
	
				// support: IE
				// IE doesn't prevent moving focus even with event.preventDefault()
				// so we set a flag to know when we should ignore the blur event
				// and check (again) if focus moved off of the input.
				this.cancelBlur = true;
				this._delay(function() {
					delete this.cancelBlur;
					checkFocus.call( this );
				});
	
				if ( this._start( event ) === false ) {
					return;
				}
	
				this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function( event ) {
				// button will add ui-state-active if mouse was down while mouseleave and kept down
				if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {
					return;
				}
	
				if ( this._start( event ) === false ) {
					return false;
				}
				this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );
			},
			// TODO: do we really want to consider this a stop?
			// shouldn't we just stop the repeater and wait until mouseup before
			// we trigger the stop event?
			"mouseleave .ui-spinner-button": "_stop"
		},
	
		_draw: function() {
			var uiSpinner = this.uiSpinner = this.element
				.addClass( "ui-spinner-input" )
				.attr( "autocomplete", "off" )
				.wrap( this._uiSpinnerHtml() )
				.parent()
					// add buttons
					.append( this._buttonHtml() );
	
			this.element.attr( "role", "spinbutton" );
	
			// button bindings
			this.buttons = uiSpinner.find( ".ui-spinner-button" )
				.attr( "tabIndex", -1 )
				.button()
				.removeClass( "ui-corner-all" );
	
			// IE 6 doesn't understand height: 50% for the buttons
			// unless the wrapper has an explicit height
			if ( this.buttons.height() > Math.ceil( uiSpinner.height() * 0.5 ) &&
					uiSpinner.height() > 0 ) {
				uiSpinner.height( uiSpinner.height() );
			}
	
			// disable spinner if element was already disabled
			if ( this.options.disabled ) {
				this.disable();
			}
		},
	
		_keydown: function( event ) {
			var options = this.options,
				keyCode = $.ui.keyCode;
	
			switch ( event.keyCode ) {
			case keyCode.UP:
				this._repeat( null, 1, event );
				return true;
			case keyCode.DOWN:
				this._repeat( null, -1, event );
				return true;
			case keyCode.PAGE_UP:
				this._repeat( null, options.page, event );
				return true;
			case keyCode.PAGE_DOWN:
				this._repeat( null, -options.page, event );
				return true;
			}
	
			return false;
		},
	
		_uiSpinnerHtml: function() {
			return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
		},
	
		_buttonHtml: function() {
			return "" +
				"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
					"<span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" +
				"</a>" +
				"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
					"<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" +
				"</a>";
		},
	
		_start: function( event ) {
			if ( !this.spinning && this._trigger( "start", event ) === false ) {
				return false;
			}
	
			if ( !this.counter ) {
				this.counter = 1;
			}
			this.spinning = true;
			return true;
		},
	
		_repeat: function( i, steps, event ) {
			i = i || 500;
	
			clearTimeout( this.timer );
			this.timer = this._delay(function() {
				this._repeat( 40, steps, event );
			}, i );
	
			this._spin( steps * this.options.step, event );
		},
	
		_spin: function( step, event ) {
			var value = this.value() || 0;
	
			if ( !this.counter ) {
				this.counter = 1;
			}
	
			value = this._adjustValue( value + step * this._increment( this.counter ) );
	
			if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false) {
				this._value( value );
				this.counter++;
			}
		},
	
		_increment: function( i ) {
			var incremental = this.options.incremental;
	
			if ( incremental ) {
				return $.isFunction( incremental ) ?
					incremental( i ) :
					Math.floor( i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1 );
			}
	
			return 1;
		},
	
		_precision: function() {
			var precision = this._precisionOf( this.options.step );
			if ( this.options.min !== null ) {
				precision = Math.max( precision, this._precisionOf( this.options.min ) );
			}
			return precision;
		},
	
		_precisionOf: function( num ) {
			var str = num.toString(),
				decimal = str.indexOf( "." );
			return decimal === -1 ? 0 : str.length - decimal - 1;
		},
	
		_adjustValue: function( value ) {
			var base, aboveMin,
				options = this.options;
	
			// make sure we're at a valid step
			// - find out where we are relative to the base (min or 0)
			base = options.min !== null ? options.min : 0;
			aboveMin = value - base;
			// - round to the nearest step
			aboveMin = Math.round(aboveMin / options.step) * options.step;
			// - rounding is based on 0, so adjust back to our base
			value = base + aboveMin;
	
			// fix precision from bad JS floating point math
			value = parseFloat( value.toFixed( this._precision() ) );
	
			// clamp the value
			if ( options.max !== null && value > options.max) {
				return options.max;
			}
			if ( options.min !== null && value < options.min ) {
				return options.min;
			}
	
			return value;
		},
	
		_stop: function( event ) {
			if ( !this.spinning ) {
				return;
			}
	
			clearTimeout( this.timer );
			clearTimeout( this.mousewheelTimer );
			this.counter = 0;
			this.spinning = false;
			this._trigger( "stop", event );
		},
	
		_setOption: function( key, value ) {
			if ( key === "culture" || key === "numberFormat" ) {
				var prevValue = this._parse( this.element.val() );
				this.options[ key ] = value;
				this.element.val( this._format( prevValue ) );
				return;
			}
	
			if ( key === "max" || key === "min" || key === "step" ) {
				if ( typeof value === "string" ) {
					value = this._parse( value );
				}
			}
			if ( key === "icons" ) {
				this.buttons.first().find( ".ui-icon" )
					.removeClass( this.options.icons.up )
					.addClass( value.up );
				this.buttons.last().find( ".ui-icon" )
					.removeClass( this.options.icons.down )
					.addClass( value.down );
			}
	
			this._super( key, value );
	
			if ( key === "disabled" ) {
				this.widget().toggleClass( "ui-state-disabled", !!value );
				this.element.prop( "disabled", !!value );
				this.buttons.button( value ? "disable" : "enable" );
			}
		},
	
		_setOptions: spinner_modifier(function( options ) {
			this._super( options );
		}),
	
		_parse: function( val ) {
			if ( typeof val === "string" && val !== "" ) {
				val = window.Globalize && this.options.numberFormat ?
					Globalize.parseFloat( val, 10, this.options.culture ) : +val;
			}
			return val === "" || isNaN( val ) ? null : val;
		},
	
		_format: function( value ) {
			if ( value === "" ) {
				return "";
			}
			return window.Globalize && this.options.numberFormat ?
				Globalize.format( value, this.options.numberFormat, this.options.culture ) :
				value;
		},
	
		_refresh: function() {
			this.element.attr({
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,
				// TODO: what should we do with values that can't be parsed?
				"aria-valuenow": this._parse( this.element.val() )
			});
		},
	
		isValid: function() {
			var value = this.value();
	
			// null is invalid
			if ( value === null ) {
				return false;
			}
	
			// if value gets adjusted, it's invalid
			return value === this._adjustValue( value );
		},
	
		// update the value without triggering change
		_value: function( value, allowAny ) {
			var parsed;
			if ( value !== "" ) {
				parsed = this._parse( value );
				if ( parsed !== null ) {
					if ( !allowAny ) {
						parsed = this._adjustValue( parsed );
					}
					value = this._format( parsed );
				}
			}
			this.element.val( value );
			this._refresh();
		},
	
		_destroy: function() {
			this.element
				.removeClass( "ui-spinner-input" )
				.prop( "disabled", false )
				.removeAttr( "autocomplete" )
				.removeAttr( "role" )
				.removeAttr( "aria-valuemin" )
				.removeAttr( "aria-valuemax" )
				.removeAttr( "aria-valuenow" );
			this.uiSpinner.replaceWith( this.element );
		},
	
		stepUp: spinner_modifier(function( steps ) {
			this._stepUp( steps );
		}),
		_stepUp: function( steps ) {
			if ( this._start() ) {
				this._spin( (steps || 1) * this.options.step );
				this._stop();
			}
		},
	
		stepDown: spinner_modifier(function( steps ) {
			this._stepDown( steps );
		}),
		_stepDown: function( steps ) {
			if ( this._start() ) {
				this._spin( (steps || 1) * -this.options.step );
				this._stop();
			}
		},
	
		pageUp: spinner_modifier(function( pages ) {
			this._stepUp( (pages || 1) * this.options.page );
		}),
	
		pageDown: spinner_modifier(function( pages ) {
			this._stepDown( (pages || 1) * this.options.page );
		}),
	
		value: function( newVal ) {
			if ( !arguments.length ) {
				return this._parse( this.element.val() );
			}
			spinner_modifier( this._value ).call( this, newVal );
		},
	
		widget: function() {
			return this.uiSpinner;
		}
	});
	
	
	/*!
	 * jQuery UI Tabs 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/tabs/
	 */
	
	
	var tabs = $.widget( "ui.tabs", {
		version: "1.11.1",
		delay: 300,
		options: {
			active: null,
			collapsible: false,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
	
			// callbacks
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
	
		_isLocal: (function() {
			var rhash = /#.*$/;
	
			return function( anchor ) {
				var anchorUrl, locationUrl;
	
				// support: IE7
				// IE7 doesn't normalize the href property when set via script (#9317)
				anchor = anchor.cloneNode( false );
	
				anchorUrl = anchor.href.replace( rhash, "" );
				locationUrl = location.href.replace( rhash, "" );
	
				// decoding may throw an error if the URL isn't UTF-8 (#9518)
				try {
					anchorUrl = decodeURIComponent( anchorUrl );
				} catch ( error ) {}
				try {
					locationUrl = decodeURIComponent( locationUrl );
				} catch ( error ) {}
	
				return anchor.hash.length > 1 && anchorUrl === locationUrl;
			};
		})(),
	
		_create: function() {
			var that = this,
				options = this.options;
	
			this.running = false;
	
			this.element
				.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" )
				.toggleClass( "ui-tabs-collapsible", options.collapsible );
	
			this._processTabs();
			options.active = this._initialActive();
	
			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			if ( $.isArray( options.disabled ) ) {
				options.disabled = $.unique( options.disabled.concat(
					$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {
						return that.tabs.index( li );
					})
				) ).sort();
			}
	
			// check for length avoids error when initializing empty list
			if ( this.options.active !== false && this.anchors.length ) {
				this.active = this._findActive( options.active );
			} else {
				this.active = $();
			}
	
			this._refresh();
	
			if ( this.active.length ) {
				this.load( options.active );
			}
		},
	
		_initialActive: function() {
			var active = this.options.active,
				collapsible = this.options.collapsible,
				locationHash = location.hash.substring( 1 );
	
			if ( active === null ) {
				// check the fragment identifier in the URL
				if ( locationHash ) {
					this.tabs.each(function( i, tab ) {
						if ( $( tab ).attr( "aria-controls" ) === locationHash ) {
							active = i;
							return false;
						}
					});
				}
	
				// check for a tab marked active via a class
				if ( active === null ) {
					active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );
				}
	
				// no active tab, set to false
				if ( active === null || active === -1 ) {
					active = this.tabs.length ? 0 : false;
				}
			}
	
			// handle numbers: negative, out of range
			if ( active !== false ) {
				active = this.tabs.index( this.tabs.eq( active ) );
				if ( active === -1 ) {
					active = collapsible ? false : 0;
				}
			}
	
			// don't allow collapsible: false and active: false
			if ( !collapsible && active === false && this.anchors.length ) {
				active = 0;
			}
	
			return active;
		},
	
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: !this.active.length ? $() : this._getPanelForTab( this.active )
			};
		},
	
		_tabKeydown: function( event ) {
			var focusedTab = $( this.document[0].activeElement ).closest( "li" ),
				selectedIndex = this.tabs.index( focusedTab ),
				goingForward = true;
	
			if ( this._handlePageNav( event ) ) {
				return;
			}
	
			switch ( event.keyCode ) {
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
					selectedIndex++;
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.LEFT:
					goingForward = false;
					selectedIndex--;
					break;
				case $.ui.keyCode.END:
					selectedIndex = this.anchors.length - 1;
					break;
				case $.ui.keyCode.HOME:
					selectedIndex = 0;
					break;
				case $.ui.keyCode.SPACE:
					// Activate only, no collapsing
					event.preventDefault();
					clearTimeout( this.activating );
					this._activate( selectedIndex );
					return;
				case $.ui.keyCode.ENTER:
					// Toggle (cancel delayed activation, allow collapsing)
					event.preventDefault();
					clearTimeout( this.activating );
					// Determine if we should collapse or activate
					this._activate( selectedIndex === this.options.active ? false : selectedIndex );
					return;
				default:
					return;
			}
	
			// Focus the appropriate tab, based on which key was pressed
			event.preventDefault();
			clearTimeout( this.activating );
			selectedIndex = this._focusNextTab( selectedIndex, goingForward );
	
			// Navigating with control key will prevent automatic activation
			if ( !event.ctrlKey ) {
				// Update aria-selected immediately so that AT think the tab is already selected.
				// Otherwise AT may confuse the user by stating that they need to activate the tab,
				// but the tab will already be activated by the time the announcement finishes.
				focusedTab.attr( "aria-selected", "false" );
				this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );
	
				this.activating = this._delay(function() {
					this.option( "active", selectedIndex );
				}, this.delay );
			}
		},
	
		_panelKeydown: function( event ) {
			if ( this._handlePageNav( event ) ) {
				return;
			}
	
			// Ctrl+up moves focus to the current tab
			if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {
				event.preventDefault();
				this.active.focus();
			}
		},
	
		// Alt+page up/down moves focus to the previous/next tab (and activates)
		_handlePageNav: function( event ) {
			if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {
				this._activate( this._focusNextTab( this.options.active - 1, false ) );
				return true;
			}
			if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {
				this._activate( this._focusNextTab( this.options.active + 1, true ) );
				return true;
			}
		},
	
		_findNextTab: function( index, goingForward ) {
			var lastTabIndex = this.tabs.length - 1;
	
			function constrain() {
				if ( index > lastTabIndex ) {
					index = 0;
				}
				if ( index < 0 ) {
					index = lastTabIndex;
				}
				return index;
			}
	
			while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {
				index = goingForward ? index + 1 : index - 1;
			}
	
			return index;
		},
	
		_focusNextTab: function( index, goingForward ) {
			index = this._findNextTab( index, goingForward );
			this.tabs.eq( index ).focus();
			return index;
		},
	
		_setOption: function( key, value ) {
			if ( key === "active" ) {
				// _activate() will handle invalid values and update this.options
				this._activate( value );
				return;
			}
	
			if ( key === "disabled" ) {
				// don't use the widget factory's disabled handling
				this._setupDisabled( value );
				return;
			}
	
			this._super( key, value);
	
			if ( key === "collapsible" ) {
				this.element.toggleClass( "ui-tabs-collapsible", value );
				// Setting collapsible: false while collapsed; open first panel
				if ( !value && this.options.active === false ) {
					this._activate( 0 );
				}
			}
	
			if ( key === "event" ) {
				this._setupEvents( value );
			}
	
			if ( key === "heightStyle" ) {
				this._setupHeightStyle( value );
			}
		},
	
		_sanitizeSelector: function( hash ) {
			return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
		},
	
		refresh: function() {
			var options = this.options,
				lis = this.tablist.children( ":has(a[href])" );
	
			// get disabled tabs from class attribute from HTML
			// this will get converted to a boolean if needed in _refresh()
			options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {
				return lis.index( tab );
			});
	
			this._processTabs();
	
			// was collapsed or no tabs
			if ( options.active === false || !this.anchors.length ) {
				options.active = false;
				this.active = $();
			// was active, but active tab is gone
			} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {
				// all remaining tabs are disabled
				if ( this.tabs.length === options.disabled.length ) {
					options.active = false;
					this.active = $();
				// activate previous tab
				} else {
					this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );
				}
			// was active, active tab still exists
			} else {
				// make sure active index is correct
				options.active = this.tabs.index( this.active );
			}
	
			this._refresh();
		},
	
		_refresh: function() {
			this._setupDisabled( this.options.disabled );
			this._setupEvents( this.options.event );
			this._setupHeightStyle( this.options.heightStyle );
	
			this.tabs.not( this.active ).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			});
			this.panels.not( this._getPanelForTab( this.active ) )
				.hide()
				.attr({
					"aria-hidden": "true"
				});
	
			// Make sure one tab is in the tab order
			if ( !this.active.length ) {
				this.tabs.eq( 0 ).attr( "tabIndex", 0 );
			} else {
				this.active
					.addClass( "ui-tabs-active ui-state-active" )
					.attr({
						"aria-selected": "true",
						"aria-expanded": "true",
						tabIndex: 0
					});
				this._getPanelForTab( this.active )
					.show()
					.attr({
						"aria-hidden": "false"
					});
			}
		},
	
		_processTabs: function() {
			var that = this;
	
			this.tablist = this._getList()
				.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
				.attr( "role", "tablist" )
	
				// Prevent users from focusing disabled tabs via click
				.delegate( "> li", "mousedown" + this.eventNamespace, function( event ) {
					if ( $( this ).is( ".ui-state-disabled" ) ) {
						event.preventDefault();
					}
				})
	
				// support: IE <9
				// Preventing the default action in mousedown doesn't prevent IE
				// from focusing the element, so if the anchor gets focused, blur.
				// We don't have to worry about focusing the previously focused
				// element since clicking on a non-focusable element should focus
				// the body anyway.
				.delegate( ".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
					if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {
						this.blur();
					}
				});
	
			this.tabs = this.tablist.find( "> li:has(a[href])" )
				.addClass( "ui-state-default ui-corner-top" )
				.attr({
					role: "tab",
					tabIndex: -1
				});
	
			this.anchors = this.tabs.map(function() {
					return $( "a", this )[ 0 ];
				})
				.addClass( "ui-tabs-anchor" )
				.attr({
					role: "presentation",
					tabIndex: -1
				});
	
			this.panels = $();
	
			this.anchors.each(function( i, anchor ) {
				var selector, panel, panelId,
					anchorId = $( anchor ).uniqueId().attr( "id" ),
					tab = $( anchor ).closest( "li" ),
					originalAriaControls = tab.attr( "aria-controls" );
	
				// inline tab
				if ( that._isLocal( anchor ) ) {
					selector = anchor.hash;
					panelId = selector.substring( 1 );
					panel = that.element.find( that._sanitizeSelector( selector ) );
				// remote tab
				} else {
					// If the tab doesn't already have aria-controls,
					// generate an id by using a throw-away element
					panelId = tab.attr( "aria-controls" ) || $( {} ).uniqueId()[ 0 ].id;
					selector = "#" + panelId;
					panel = that.element.find( selector );
					if ( !panel.length ) {
						panel = that._createPanel( panelId );
						panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
					}
					panel.attr( "aria-live", "polite" );
				}
	
				if ( panel.length) {
					that.panels = that.panels.add( panel );
				}
				if ( originalAriaControls ) {
					tab.data( "ui-tabs-aria-controls", originalAriaControls );
				}
				tab.attr({
					"aria-controls": panelId,
					"aria-labelledby": anchorId
				});
				panel.attr( "aria-labelledby", anchorId );
			});
	
			this.panels
				.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
				.attr( "role", "tabpanel" );
		},
	
		// allow overriding how to find the list for rare usage scenarios (#7715)
		_getList: function() {
			return this.tablist || this.element.find( "ol,ul" ).eq( 0 );
		},
	
		_createPanel: function( id ) {
			return $( "<div>" )
				.attr( "id", id )
				.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
				.data( "ui-tabs-destroy", true );
		},
	
		_setupDisabled: function( disabled ) {
			if ( $.isArray( disabled ) ) {
				if ( !disabled.length ) {
					disabled = false;
				} else if ( disabled.length === this.anchors.length ) {
					disabled = true;
				}
			}
	
			// disable tabs
			for ( var i = 0, li; ( li = this.tabs[ i ] ); i++ ) {
				if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {
					$( li )
						.addClass( "ui-state-disabled" )
						.attr( "aria-disabled", "true" );
				} else {
					$( li )
						.removeClass( "ui-state-disabled" )
						.removeAttr( "aria-disabled" );
				}
			}
	
			this.options.disabled = disabled;
		},
	
		_setupEvents: function( event ) {
			var events = {};
			if ( event ) {
				$.each( event.split(" "), function( index, eventName ) {
					events[ eventName ] = "_eventHandler";
				});
			}
	
			this._off( this.anchors.add( this.tabs ).add( this.panels ) );
			// Always prevent the default action, even when disabled
			this._on( true, this.anchors, {
				click: function( event ) {
					event.preventDefault();
				}
			});
			this._on( this.anchors, events );
			this._on( this.tabs, { keydown: "_tabKeydown" } );
			this._on( this.panels, { keydown: "_panelKeydown" } );
	
			this._focusable( this.tabs );
			this._hoverable( this.tabs );
		},
	
		_setupHeightStyle: function( heightStyle ) {
			var maxHeight,
				parent = this.element.parent();
	
			if ( heightStyle === "fill" ) {
				maxHeight = parent.height();
				maxHeight -= this.element.outerHeight() - this.element.height();
	
				this.element.siblings( ":visible" ).each(function() {
					var elem = $( this ),
						position = elem.css( "position" );
	
					if ( position === "absolute" || position === "fixed" ) {
						return;
					}
					maxHeight -= elem.outerHeight( true );
				});
	
				this.element.children().not( this.panels ).each(function() {
					maxHeight -= $( this ).outerHeight( true );
				});
	
				this.panels.each(function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				})
				.css( "overflow", "auto" );
			} else if ( heightStyle === "auto" ) {
				maxHeight = 0;
				this.panels.each(function() {
					maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
				}).height( maxHeight );
			}
		},
	
		_eventHandler: function( event ) {
			var options = this.options,
				active = this.active,
				anchor = $( event.currentTarget ),
				tab = anchor.closest( "li" ),
				clickedIsActive = tab[ 0 ] === active[ 0 ],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : this._getPanelForTab( tab ),
				toHide = !active.length ? $() : this._getPanelForTab( active ),
				eventData = {
					oldTab: active,
					oldPanel: toHide,
					newTab: collapsing ? $() : tab,
					newPanel: toShow
				};
	
			event.preventDefault();
	
			if ( tab.hasClass( "ui-state-disabled" ) ||
					// tab is already loading
					tab.hasClass( "ui-tabs-loading" ) ||
					// can't switch durning an animation
					this.running ||
					// click on active header, but not collapsible
					( clickedIsActive && !options.collapsible ) ||
					// allow canceling activation
					( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
				return;
			}
	
			options.active = collapsing ? false : this.tabs.index( tab );
	
			this.active = clickedIsActive ? $() : tab;
			if ( this.xhr ) {
				this.xhr.abort();
			}
	
			if ( !toHide.length && !toShow.length ) {
				$.error( "jQuery UI Tabs: Mismatching fragment identifier." );
			}
	
			if ( toShow.length ) {
				this.load( this.tabs.index( tab ), event );
			}
			this._toggle( event, eventData );
		},
	
		// handles show/hide for selecting tabs
		_toggle: function( event, eventData ) {
			var that = this,
				toShow = eventData.newPanel,
				toHide = eventData.oldPanel;
	
			this.running = true;
	
			function complete() {
				that.running = false;
				that._trigger( "activate", event, eventData );
			}
	
			function show() {
				eventData.newTab.closest( "li" ).addClass( "ui-tabs-active ui-state-active" );
	
				if ( toShow.length && that.options.show ) {
					that._show( toShow, that.options.show, complete );
				} else {
					toShow.show();
					complete();
				}
			}
	
			// start out by hiding, then showing, then completing
			if ( toHide.length && this.options.hide ) {
				this._hide( toHide, this.options.hide, function() {
					eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
					show();
				});
			} else {
				eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
				toHide.hide();
				show();
			}
	
			toHide.attr( "aria-hidden", "true" );
			eventData.oldTab.attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			});
			// If we're switching tabs, remove the old tab from the tab order.
			// If we're opening from collapsed state, remove the previous tab from the tab order.
			// If we're collapsing, then keep the collapsing tab in the tab order.
			if ( toShow.length && toHide.length ) {
				eventData.oldTab.attr( "tabIndex", -1 );
			} else if ( toShow.length ) {
				this.tabs.filter(function() {
					return $( this ).attr( "tabIndex" ) === 0;
				})
				.attr( "tabIndex", -1 );
			}
	
			toShow.attr( "aria-hidden", "false" );
			eventData.newTab.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			});
		},
	
		_activate: function( index ) {
			var anchor,
				active = this._findActive( index );
	
			// trying to activate the already active panel
			if ( active[ 0 ] === this.active[ 0 ] ) {
				return;
			}
	
			// trying to collapse, simulate a click on the current active header
			if ( !active.length ) {
				active = this.active;
			}
	
			anchor = active.find( ".ui-tabs-anchor" )[ 0 ];
			this._eventHandler({
				target: anchor,
				currentTarget: anchor,
				preventDefault: $.noop
			});
		},
	
		_findActive: function( index ) {
			return index === false ? $() : this.tabs.eq( index );
		},
	
		_getIndex: function( index ) {
			// meta-function to give users option to provide a href string instead of a numerical index.
			if ( typeof index === "string" ) {
				index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );
			}
	
			return index;
		},
	
		_destroy: function() {
			if ( this.xhr ) {
				this.xhr.abort();
			}
	
			this.element.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" );
	
			this.tablist
				.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
				.removeAttr( "role" );
	
			this.anchors
				.removeClass( "ui-tabs-anchor" )
				.removeAttr( "role" )
				.removeAttr( "tabIndex" )
				.removeUniqueId();
	
			this.tablist.unbind( this.eventNamespace );
	
			this.tabs.add( this.panels ).each(function() {
				if ( $.data( this, "ui-tabs-destroy" ) ) {
					$( this ).remove();
				} else {
					$( this )
						.removeClass( "ui-state-default ui-state-active ui-state-disabled " +
							"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel" )
						.removeAttr( "tabIndex" )
						.removeAttr( "aria-live" )
						.removeAttr( "aria-busy" )
						.removeAttr( "aria-selected" )
						.removeAttr( "aria-labelledby" )
						.removeAttr( "aria-hidden" )
						.removeAttr( "aria-expanded" )
						.removeAttr( "role" );
				}
			});
	
			this.tabs.each(function() {
				var li = $( this ),
					prev = li.data( "ui-tabs-aria-controls" );
				if ( prev ) {
					li
						.attr( "aria-controls", prev )
						.removeData( "ui-tabs-aria-controls" );
				} else {
					li.removeAttr( "aria-controls" );
				}
			});
	
			this.panels.show();
	
			if ( this.options.heightStyle !== "content" ) {
				this.panels.css( "height", "" );
			}
		},
	
		enable: function( index ) {
			var disabled = this.options.disabled;
			if ( disabled === false ) {
				return;
			}
	
			if ( index === undefined ) {
				disabled = false;
			} else {
				index = this._getIndex( index );
				if ( $.isArray( disabled ) ) {
					disabled = $.map( disabled, function( num ) {
						return num !== index ? num : null;
					});
				} else {
					disabled = $.map( this.tabs, function( li, num ) {
						return num !== index ? num : null;
					});
				}
			}
			this._setupDisabled( disabled );
		},
	
		disable: function( index ) {
			var disabled = this.options.disabled;
			if ( disabled === true ) {
				return;
			}
	
			if ( index === undefined ) {
				disabled = true;
			} else {
				index = this._getIndex( index );
				if ( $.inArray( index, disabled ) !== -1 ) {
					return;
				}
				if ( $.isArray( disabled ) ) {
					disabled = $.merge( [ index ], disabled ).sort();
				} else {
					disabled = [ index ];
				}
			}
			this._setupDisabled( disabled );
		},
	
		load: function( index, event ) {
			index = this._getIndex( index );
			var that = this,
				tab = this.tabs.eq( index ),
				anchor = tab.find( ".ui-tabs-anchor" ),
				panel = this._getPanelForTab( tab ),
				eventData = {
					tab: tab,
					panel: panel
				};
	
			// not remote
			if ( this._isLocal( anchor[ 0 ] ) ) {
				return;
			}
	
			this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );
	
			// support: jQuery <1.8
			// jQuery <1.8 returns false if the request is canceled in beforeSend,
			// but as of 1.8, $.ajax() always returns a jqXHR object.
			if ( this.xhr && this.xhr.statusText !== "canceled" ) {
				tab.addClass( "ui-tabs-loading" );
				panel.attr( "aria-busy", "true" );
	
				this.xhr
					.success(function( response ) {
						// support: jQuery <1.8
						// http://bugs.jquery.com/ticket/11778
						setTimeout(function() {
							panel.html( response );
							that._trigger( "load", event, eventData );
						}, 1 );
					})
					.complete(function( jqXHR, status ) {
						// support: jQuery <1.8
						// http://bugs.jquery.com/ticket/11778
						setTimeout(function() {
							if ( status === "abort" ) {
								that.panels.stop( false, true );
							}
	
							tab.removeClass( "ui-tabs-loading" );
							panel.removeAttr( "aria-busy" );
	
							if ( jqXHR === that.xhr ) {
								delete that.xhr;
							}
						}, 1 );
					});
			}
		},
	
		_ajaxSettings: function( anchor, event, eventData ) {
			var that = this;
			return {
				url: anchor.attr( "href" ),
				beforeSend: function( jqXHR, settings ) {
					return that._trigger( "beforeLoad", event,
						$.extend( { jqXHR: jqXHR, ajaxSettings: settings }, eventData ) );
				}
			};
		},
	
		_getPanelForTab: function( tab ) {
			var id = $( tab ).attr( "aria-controls" );
			return this.element.find( this._sanitizeSelector( "#" + id ) );
		}
	});
	
	
	/*!
	 * jQuery UI Tooltip 1.11.1
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/tooltip/
	 */
	
	
	var tooltip = $.widget( "ui.tooltip", {
		version: "1.11.1",
		options: {
			content: function() {
				// support: IE<9, Opera in jQuery <1.7
				// .text() can't accept undefined, so coerce to a string
				var title = $( this ).attr( "title" ) || "";
				// Escape title, since we're going from an attribute to raw HTML
				return $( "<a>" ).text( title ).html();
			},
			hide: true,
			// Disabled elements have inconsistent behavior across browsers (#8661)
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: true,
			tooltipClass: null,
			track: false,
	
			// callbacks
			close: null,
			open: null
		},
	
		_addDescribedBy: function( elem, id ) {
			var describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ );
			describedby.push( id );
			elem
				.data( "ui-tooltip-id", id )
				.attr( "aria-describedby", $.trim( describedby.join( " " ) ) );
		},
	
		_removeDescribedBy: function( elem ) {
			var id = elem.data( "ui-tooltip-id" ),
				describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ ),
				index = $.inArray( id, describedby );
	
			if ( index !== -1 ) {
				describedby.splice( index, 1 );
			}
	
			elem.removeData( "ui-tooltip-id" );
			describedby = $.trim( describedby.join( " " ) );
			if ( describedby ) {
				elem.attr( "aria-describedby", describedby );
			} else {
				elem.removeAttr( "aria-describedby" );
			}
		},
	
		_create: function() {
			this._on({
				mouseover: "open",
				focusin: "open"
			});
	
			// IDs of generated tooltips, needed for destroy
			this.tooltips = {};
			// IDs of parent tooltips where we removed the title attribute
			this.parents = {};
	
			if ( this.options.disabled ) {
				this._disable();
			}
	
			// Append the aria-live region so tooltips announce correctly
			this.liveRegion = $( "<div>" )
				.attr({
					role: "log",
					"aria-live": "assertive",
					"aria-relevant": "additions"
				})
				.addClass( "ui-helper-hidden-accessible" )
				.appendTo( this.document[ 0 ].body );
		},
	
		_setOption: function( key, value ) {
			var that = this;
	
			if ( key === "disabled" ) {
				this[ value ? "_disable" : "_enable" ]();
				this.options[ key ] = value;
				// disable element style changes
				return;
			}
	
			this._super( key, value );
	
			if ( key === "content" ) {
				$.each( this.tooltips, function( id, element ) {
					that._updateContent( element );
				});
			}
		},
	
		_disable: function() {
			var that = this;
	
			// close open tooltips
			$.each( this.tooltips, function( id, element ) {
				var event = $.Event( "blur" );
				event.target = event.currentTarget = element[0];
				that.close( event, true );
			});
	
			// remove title attributes to prevent native tooltips
			this.element.find( this.options.items ).addBack().each(function() {
				var element = $( this );
				if ( element.is( "[title]" ) ) {
					element
						.data( "ui-tooltip-title", element.attr( "title" ) )
						.removeAttr( "title" );
				}
			});
		},
	
		_enable: function() {
			// restore title attributes
			this.element.find( this.options.items ).addBack().each(function() {
				var element = $( this );
				if ( element.data( "ui-tooltip-title" ) ) {
					element.attr( "title", element.data( "ui-tooltip-title" ) );
				}
			});
		},
	
		open: function( event ) {
			var that = this,
				target = $( event ? event.target : this.element )
					// we need closest here due to mouseover bubbling,
					// but always pointing at the same event target
					.closest( this.options.items );
	
			// No element to show a tooltip for or the tooltip is already open
			if ( !target.length || target.data( "ui-tooltip-id" ) ) {
				return;
			}
	
			if ( target.attr( "title" ) ) {
				target.data( "ui-tooltip-title", target.attr( "title" ) );
			}
	
			target.data( "ui-tooltip-open", true );
	
			// kill parent tooltips, custom or native, for hover
			if ( event && event.type === "mouseover" ) {
				target.parents().each(function() {
					var parent = $( this ),
						blurEvent;
					if ( parent.data( "ui-tooltip-open" ) ) {
						blurEvent = $.Event( "blur" );
						blurEvent.target = blurEvent.currentTarget = this;
						that.close( blurEvent, true );
					}
					if ( parent.attr( "title" ) ) {
						parent.uniqueId();
						that.parents[ this.id ] = {
							element: this,
							title: parent.attr( "title" )
						};
						parent.attr( "title", "" );
					}
				});
			}
	
			this._updateContent( target, event );
		},
	
		_updateContent: function( target, event ) {
			var content,
				contentOption = this.options.content,
				that = this,
				eventType = event ? event.type : null;
	
			if ( typeof contentOption === "string" ) {
				return this._open( event, target, contentOption );
			}
	
			content = contentOption.call( target[0], function( response ) {
				// ignore async response if tooltip was closed already
				if ( !target.data( "ui-tooltip-open" ) ) {
					return;
				}
				// IE may instantly serve a cached response for ajax requests
				// delay this call to _open so the other call to _open runs first
				that._delay(function() {
					// jQuery creates a special event for focusin when it doesn't
					// exist natively. To improve performance, the native event
					// object is reused and the type is changed. Therefore, we can't
					// rely on the type being correct after the event finished
					// bubbling, so we set it back to the previous value. (#8740)
					if ( event ) {
						event.type = eventType;
					}
					this._open( event, target, response );
				});
			});
			if ( content ) {
				this._open( event, target, content );
			}
		},
	
		_open: function( event, target, content ) {
			var tooltip, events, delayedShow, a11yContent,
				positionOption = $.extend( {}, this.options.position );
	
			if ( !content ) {
				return;
			}
	
			// Content can be updated multiple times. If the tooltip already
			// exists, then just update the content and bail.
			tooltip = this._find( target );
			if ( tooltip.length ) {
				tooltip.find( ".ui-tooltip-content" ).html( content );
				return;
			}
	
			// if we have a title, clear it to prevent the native tooltip
			// we have to check first to avoid defining a title if none exists
			// (we don't want to cause an element to start matching [title])
			//
			// We use removeAttr only for key events, to allow IE to export the correct
			// accessible attributes. For mouse events, set to empty string to avoid
			// native tooltip showing up (happens only when removing inside mouseover).
			if ( target.is( "[title]" ) ) {
				if ( event && event.type === "mouseover" ) {
					target.attr( "title", "" );
				} else {
					target.removeAttr( "title" );
				}
			}
	
			tooltip = this._tooltip( target );
			this._addDescribedBy( target, tooltip.attr( "id" ) );
			tooltip.find( ".ui-tooltip-content" ).html( content );
	
			// Support: Voiceover on OS X, JAWS on IE <= 9
			// JAWS announces deletions even when aria-relevant="additions"
			// Voiceover will sometimes re-read the entire log region's contents from the beginning
			this.liveRegion.children().hide();
			if ( content.clone ) {
				a11yContent = content.clone();
				a11yContent.removeAttr( "id" ).find( "[id]" ).removeAttr( "id" );
			} else {
				a11yContent = content;
			}
			$( "<div>" ).html( a11yContent ).appendTo( this.liveRegion );
	
			function position( event ) {
				positionOption.of = event;
				if ( tooltip.is( ":hidden" ) ) {
					return;
				}
				tooltip.position( positionOption );
			}
			if ( this.options.track && event && /^mouse/.test( event.type ) ) {
				this._on( this.document, {
					mousemove: position
				});
				// trigger once to override element-relative positioning
				position( event );
			} else {
				tooltip.position( $.extend({
					of: target
				}, this.options.position ) );
			}
	
			this.hiding = false;
			this.closing = false;
			tooltip.hide();
	
			this._show( tooltip, this.options.show );
			// Handle tracking tooltips that are shown with a delay (#8644). As soon
			// as the tooltip is visible, position the tooltip using the most recent
			// event.
			if ( this.options.show && this.options.show.delay ) {
				delayedShow = this.delayedShow = setInterval(function() {
					if ( tooltip.is( ":visible" ) ) {
						position( positionOption.of );
						clearInterval( delayedShow );
					}
				}, $.fx.interval );
			}
	
			this._trigger( "open", event, { tooltip: tooltip } );
	
			events = {
				keyup: function( event ) {
					if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
						var fakeEvent = $.Event(event);
						fakeEvent.currentTarget = target[0];
						this.close( fakeEvent, true );
					}
				}
			};
	
			// Only bind remove handler for delegated targets. Non-delegated
			// tooltips will handle this in destroy.
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				events.remove = function() {
					this._removeTooltip( tooltip );
				};
			}
	
			if ( !event || event.type === "mouseover" ) {
				events.mouseleave = "close";
			}
			if ( !event || event.type === "focusin" ) {
				events.focusout = "close";
			}
			this._on( true, target, events );
		},
	
		close: function( event ) {
			var that = this,
				target = $( event ? event.currentTarget : this.element ),
				tooltip = this._find( target );
	
			// disabling closes the tooltip, so we need to track when we're closing
			// to avoid an infinite loop in case the tooltip becomes disabled on close
			if ( this.closing ) {
				return;
			}
	
			// Clear the interval for delayed tracking tooltips
			clearInterval( this.delayedShow );
	
			// only set title if we had one before (see comment in _open())
			// If the title attribute has changed since open(), don't restore
			if ( target.data( "ui-tooltip-title" ) && !target.attr( "title" ) ) {
				target.attr( "title", target.data( "ui-tooltip-title" ) );
			}
	
			this._removeDescribedBy( target );
	
			this.hiding = true;
			tooltip.stop( true );
			this._hide( tooltip, this.options.hide, function() {
				that._removeTooltip( $( this ) );
				this.hiding = false;
				this.closing = false;
			});
	
			target.removeData( "ui-tooltip-open" );
			this._off( target, "mouseleave focusout keyup" );
	
			// Remove 'remove' binding only on delegated targets
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				this._off( target, "remove" );
			}
			this._off( this.document, "mousemove" );
	
			if ( event && event.type === "mouseleave" ) {
				$.each( this.parents, function( id, parent ) {
					$( parent.element ).attr( "title", parent.title );
					delete that.parents[ id ];
				});
			}
	
			this.closing = true;
			this._trigger( "close", event, { tooltip: tooltip } );
			if ( !this.hiding ) {
				this.closing = false;
			}
		},
	
		_tooltip: function( element ) {
			var tooltip = $( "<div>" )
					.attr( "role", "tooltip" )
					.addClass( "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
						( this.options.tooltipClass || "" ) ),
				id = tooltip.uniqueId().attr( "id" );
	
			$( "<div>" )
				.addClass( "ui-tooltip-content" )
				.appendTo( tooltip );
	
			tooltip.appendTo( this.document[0].body );
			this.tooltips[ id ] = element;
			return tooltip;
		},
	
		_find: function( target ) {
			var id = target.data( "ui-tooltip-id" );
			return id ? $( "#" + id ) : $();
		},
	
		_removeTooltip: function( tooltip ) {
			tooltip.remove();
			delete this.tooltips[ tooltip.attr( "id" ) ];
		},
	
		_destroy: function() {
			var that = this;
	
			// close open tooltips
			$.each( this.tooltips, function( id, element ) {
				// Delegate to close method to handle common cleanup
				var event = $.Event( "blur" );
				event.target = event.currentTarget = element[0];
				that.close( event, true );
	
				// Remove immediately; destroying an open tooltip doesn't use the
				// hide animation
				$( "#" + id ).remove();
	
				// Restore the title
				if ( element.data( "ui-tooltip-title" ) ) {
					// If the title attribute has changed since open(), don't restore
					if ( !element.attr( "title" ) ) {
						element.attr( "title", element.data( "ui-tooltip-title" ) );
					}
					element.removeData( "ui-tooltip-title" );
				}
			});
			this.liveRegion.remove();
		}
	});
	
	
	
	}));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v2.0.5
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';
	
	/*  */
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  }
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});
	
	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; };
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/*  */
	
	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],
	
	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],
	
	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,
	
	  /**
	   * Server rendering?
	   */
	  _isServer: "client" === 'server'
	};
	
	/*  */
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]';
	
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	
	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx); }
	      : cb;
	    callbacks.push(func);
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	  }
	})();
	
	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };
	
	    return Set;
	  }());
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var hasProxy;
	var proxyHandlers;
	var initProxy;
	
	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );
	
	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);
	
	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        );
	      }
	      return has || !isAllowed
	    }
	  };
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}
	
	/*  */
	
	
	var uid$2 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++;
	  this.subs = [];
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop();
	}
	
	/*  */
	
	
	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	
	  resetSchedulerState();
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}
	
	/*  */
	
	var uid$1 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};
	
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  this.deep = !!options.deep;
	  this.user = !!options.user;
	  this.lazy = !!options.lazy;
	  this.sync = !!options.sync;
	  this.expression = expOrFn.toString();
	  this.cb = cb;
	  this.id = ++uid$1; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          "development" !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          );
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}
	
	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return
	      }
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}
	
	/*  */
	
	function initState (vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	  initWatch(vm);
	}
	
	function initProps (vm) {
	  var props = vm.$options.props;
	  if (props) {
	    var propsData = vm.$options.propsData || {};
	    var keys = vm.$options._propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function ( i ) {
	      var key = keys[i];
	      /* istanbul ignore else */
	      {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      }
	    };
	
	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true;
	  }
	}
	
	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data);
	  data.__ob__ && data.__ob__.vmCount++;
	}
	
	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};
	
	function initComputed (vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	        computedSharedDefinition.set = noop;
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop;
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop;
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition);
	    }
	  }
	}
	
	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}
	
	function initMethods (vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	      {
	        methods[key] == null && warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	        hasOwn(Vue$2.prototype, key) && warn(
	          ("Avoid overriding Vue's internal method \"" + key + "\"."),
	          vm
	        );
	      }
	    }
	  }
	}
	
	function initWatch (vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	
	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}
	
	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = ns;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};
	
	var emptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}
	
	/*  */
	
	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}
	
	/*  */
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      capture = name.charAt(0) === '!';
	      event = capture ? name.slice(1) : name;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name;
	      remove$$1(event, oldOn[name].invoker);
	    }
	  }
	}
	
	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;
	
	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}
	
	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}
	
	/*  */
	
	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i];
	      var last = res[res.length - 1];
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, ((nestedIndex || '') + "_" + i)));
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c);
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c));
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          last.text += c.text;
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns);
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist" + nestedIndex + "_" + i + "__";
	          }
	          res.push(c);
	        }
	      }
	    }
	    return res
	  }
	}
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns;
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns);
	      }
	    }
	  }
	}
	
	/*  */
	
	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}
	
	/*  */
	
	var activeInstance = null;
	
	function initLifecycle (vm) {
	  var options = vm.$options;
	
	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }
	
	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;
	
	  vm.$children = [];
	  vm.$refs = {};
	
	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };
	
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    var prevVnode = vm._vnode;
	    vm._vnode = vnode;
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating);
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };
	
	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      vm._updateListeners(listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext);
	      vm.$forceUpdate();
	    }
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };
	
	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}
	
	/*  */
	
	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }
	
	  if (isObject(Ctor)) {
	    Ctor = Vue$2.extend(Ctor);
	  }
	
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }
	
	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }
	
	  data = data || {};
	
	  // extract props
	  var propsData = extractProps(data, Ctor);
	
	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;
	
	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  var vnode = Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  );
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance);
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  }
	}
	
	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}
	
	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}
	
	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}
	
	function resolveAsyncComponent (
	  factory,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;
	
	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = Vue$2.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };
	
	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };
	
	    var res = factory(resolve, reject);
	
	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }
	
	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}
	
	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}
	
	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __);
	    b(_, __);
	  }
	}
	
	/*  */
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data;
	    data = undefined;
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor;
	    var ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      var childNs = tag === 'foreignObject' ? 'xhtml' : ns;
	      return new VNode(
	        tag, data, normalizeChildren(children, childNs),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}
	
	/*  */
	
	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext);
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm);
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          console.error(e);
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = emptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	
	  // shorthands used in render functions
	  Vue.prototype._h = createElement;
	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = emptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;
	
	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };
	
	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };
	
	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }
	
	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }
	
	  // filter resolution helper
	  var identity = function (_) { return _; };
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };
	
	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };
	
	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  };
	
	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };
	
	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  };
	}
	
	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {};
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || [];
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  var on = bind$1(vm.$on, vm);
	  var off = bind$1(vm.$off, vm);
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off, vm);
	  };
	  if (listeners) {
	    vm._updateListeners(listeners);
	  }
	}
	
	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    return vm
	  };
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };
	
	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}
	
	/*  */
	
	var uid = 0;
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };
	}
	
	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}
	
	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}
	
	function Vue$2 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$2)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}
	
	initMixin(Vue$2);
	stateMixin(Vue$2);
	eventsMixin(Vue$2);
	lifecycleMixin(Vue$2);
	renderMixin(Vue$2);
	
	var warn = noop;
	var formatComponentName;
	
	{
	  var hasConsole = typeof console !== 'undefined';
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };
	
	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };
	
	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;
	
	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};
	
	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$2) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isBooleanType(prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}
	
	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}
	
	function isBooleanType (fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === 'Boolean'
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === 'Boolean') {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor
	    }
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub
	  };
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = Vue.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	};
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;
	
	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });
	
	  extend(Vue.options.components, builtInComponents);
	
	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}
	
	initGlobalAPI(Vue$2);
	
	Object.defineProperty(Vue$2.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	});
	
	Vue$2.version = '2.0.5';
	
	/*  */
	
	// attributes that should be using props for binding
	var mustUseProp = makeMap('value,selected,checked,muted');
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);
	
	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	);
	
	
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML',
	  xhtml: 'http://www.w3.org/1999/xhtm'
	};
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);
	
	var isPreTag = function (tag) { return tag === 'pre'; };
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}
	
	/*  */
	
	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild (node, child) {
	  node.removeChild(child);
	}
	
	function appendChild (node, child) {
	  node.appendChild(child);
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text;
	}
	
	function childNodes (node) {
	  return node.childNodes
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }
	
	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key])) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyNode = new VNode('', {}, []);
	
	var hooks$1 = ['create', 'update', 'remove', 'destroy'];
	
	function isUndef (s) {
	  return s == null
	}
	
	function isDef (s) {
	  return s != null
	}
	
	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }
	
	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }
	
	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i;
	    var data = vnode.data;
	    vnode.isRootInsert = !nested;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode); }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        return vnode.elm
	      }
	    }
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	      createChildren(vnode, children, insertedVnodeQueue);
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	    }
	    return vnode.elm
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true));
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }
	
	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }
	
	  var bailed = false;
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm);
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          if (childNodes.length !== children.length) {
	            childrenMatch = false;
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false;
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }
	
	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];
	
	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);
	
	        createElm(vnode, insertedVnodeQueue);
	
	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm;
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }
	
	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm));
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};
	
	function updateDirectives (
	  oldVnode,
	  vnode
	) {
	  if (!oldVnode.data.directives && !vnode.data.directives) {
	    return
	  }
	  var isCreate = oldVnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];
	
	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }
	
	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      dirsWithInsert.forEach(function (dir) {
	        callHook$1(dir, 'inserted', vnode, oldVnode);
	      });
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }
	
	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      dirsWithPostpatch.forEach(function (dir) {
	        callHook$1(dir, 'componentUpdated', vnode, oldVnode);
	      });
	    }, 'dir-postpatch');
	  }
	
	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode);
	      }
	    }
	  }
	}
	
	var emptyModifiers = Object.create(null);
	
	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}
	
	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}
	
	function callHook$1 (dir, hook, vnode, oldVnode) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode);
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	];
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }
	
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode);
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	};
	
	// skip type checking this file because we need to attach private properties
	// to elements
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture);
	  });
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler);
	  });
	  updateListeners(on, oldOn, add, remove, vnode.context);
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
	      vnode.children.length = 0;
	    }
	    cur = props[key];
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (elm.value !== strCur && !elm.composing) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};
	
	/*  */
	
	var cssVarRE = /^--/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};
	
	var prefixes = ['Webkit', 'Moz', 'ms'];
	
	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});
	
	function updateStyle (oldVnode, vnode) {
	  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
	    return
	  }
	  var cur, name;
	  var el = vnode.elm;
	  var oldStyle = oldVnode.data.style || {};
	  var style = vnode.data.style || {};
	
	  // handle string
	  if (typeof style === 'string') {
	    el.style.cssText = style;
	    return
	  }
	
	  var needClone = style.__ob__;
	
	  // handle array syntax
	  if (Array.isArray(style)) {
	    style = vnode.data.style = toObject(style);
	  }
	
	  // clone the style for future updates,
	  // in case the user mutates the style object in-place.
	  if (needClone) {
	    style = vnode.data.style = extend({}, style);
	  }
	
	  for (name in oldStyle) {
	    if (style[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	};
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}
	
	/*  */
	
	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';
	
	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}
	
	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}
	
	var transformRE = /\b(transform|all)(,|$)/;
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }
	
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode) {
	  var el = vnode.elm;
	
	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode;
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance;
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }
	
	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb);
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm;
	
	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });
	
	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});
	
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}
	
	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode);
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);
	
	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}
	
	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (
	      (vnode.tag === 'textarea' || el.type === 'text') &&
	      !binding.modifiers.lazy
	    ) {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart);
	        el.addEventListener('compositionend', onCompositionEnd);
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true;
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};
	
	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true;
	}
	
	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (value && transition && !isIE9) {
	      enter(vnode);
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display;
	    el.style.display = value ? originalDisplay : 'none';
	    el.__vOriginalDisplay = originalDisplay;
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode);
	        el.style.display = el.__vOriginalDisplay;
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  }
	};
	
	var platformDirectives = {
	  model: model,
	  show: show
	};
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	};
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }
	
	    var mode = this.mode;
	
	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }
	
	    var rawChild = children[0];
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }
	
	    if (oldChild && oldChild.data && oldChild.key !== key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);
	
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }
	
	    return rawChild
	  }
	};
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);
	
	delete props.mode;
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || (this.name + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);
	
	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};
	
	/*  */
	
	// install platform specific utils
	Vue$2.config.isUnknownElement = isUnknownElement;
	Vue$2.config.isReservedTag = isReservedTag;
	Vue$2.config.getTagNamespace = getTagNamespace;
	Vue$2.config.mustUseProp = mustUseProp;
	
	// install platform runtime directives & components
	extend(Vue$2.options.directives, platformDirectives);
	extend(Vue$2.options.components, platformComponents);
	
	// install platform patch function
	Vue$2.prototype.__patch__ = config._isServer ? noop : patch$1;
	
	// wrap mount
	Vue$2.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$2);
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);
	
	/*  */
	
	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}
	
	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;
	
	/*  */
	
	var decoder = document.createElement('div');
	
	function decode (html) {
	  decoder.innerHTML = html;
	  return decoder.textContent
	}
	
	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */
	
	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */
	
	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);
	
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;
	
	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});
	
	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
	var isSpecialTag = function (tag, isSFC, stack) {
	  if (isScriptOrStyle(tag)) {
	    return true
	  }
	  // top-level template that has a pre-processor
	  if (
	    isSFC &&
	    tag === 'template' &&
	    stack.length === 1 &&
	    stack[0].attrs.some(hasLang)
	  ) {
	    return true
	  }
	  return false
	};
	
	var reCache = {};
	
	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;
	
	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}
	
	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');
	
	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }
	
	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');
	
	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }
	
	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }
	
	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }
	
	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }
	
	      var text = void 0, rest$1 = void 0, next = void 0;
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }
	
	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }
	
	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }
	
	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }
	
	  // Clean up any remaining tags
	  parseEndTag();
	
	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }
	
	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }
	
	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;
	
	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }
	
	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;
	
	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }
	
	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }
	
	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }
	
	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }
	
	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }
	
	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }
	
	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}
	
	/*  */
	
	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;
	
	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) { inSingle = !inSingle; }
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) { inDouble = !inDouble; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }
	
	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }
	
	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }
	
	  return expression
	}
	
	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}
	
	/*  */
	
	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;
	
	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});
	
	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}
	
	/*  */
	
	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}
	
	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}
	
	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}
	
	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}
	
	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}
	
	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}
	
	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return dynamicValue
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}
	
	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}
	
	/*  */
	
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\(([^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;
	var specialNewlineRE = /\u2028|\u2029/g;
	
	var decodeHTMLCached = cached(decode);
	
	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;
	
	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
	
	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (options.isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }
	
	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs, options.isIE),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }
	
	      if ("client" !== 'server' && isForbiddenTag(element)) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        );
	      }
	
	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }
	
	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);
	
	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;
	
	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }
	
	      function checkRootConstraints (el) {
	        if ("development" !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }
	
	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow 2 root elements with v-if and v-else
	        if (root.if && element.else) {
	          checkRootConstraints(element);
	          root.elseBlock = element;
	        } else if ("development" !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            ("Component template should contain exactly one root element:\n\n" + template)
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.else) {
	          processElse(element, currentParent);
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },
	
	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },
	
	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else {
	          // #3895 special character
	          text = text.replace(specialNewlineRE, '');
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}
	
	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}
	
	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}
	
	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}
	
	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}
	
	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}
	
	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	  }
	  if (getAndRemoveAttr(el, 'v-else') != null) {
	    el.else = true;
	  }
	}
	
	function processElse (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    prev.elseBlock = el;
	  } else {
	    warn$1(
	      ("v-else used on element <" + (el.tag) + "> without corresponding v-if.")
	    );
	  }
	}
	
	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}
	
	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget;
	    }
	  }
	}
	
	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}
	
	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        if (modifiers && modifiers.prop) {
	          isProp = true;
	          name = camelize(name);
	          if (name === 'innerHtml') { name = 'innerHTML'; }
	        }
	        if (isProp || platformMustUseProp(name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}
	
	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}
	
	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}
	
	function makeAttrsMap (attrs, isIE) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}
	
	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}
	
	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}
	
	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;
	
	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}
	
	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}
	
	/*  */
	
	var isStaticKey;
	var isPlatformReservedTag;
	
	var genStaticKeysCached = cached(genStaticKeys$1);
	
	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || (function () { return false; });
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}
	
	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}
	
	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}
	
	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    if (node.static) {
	      node.staticRoot = true;
	      return
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	  }
	}
	
	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}
	
	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}
	
	/*  */
	
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};
	
	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;'
	};
	
	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}
	
	function genHandler (
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(genHandler).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}
	
	function genKeyFilter (keys) {
	  var code = keys.length === 1
	    ? normalizeKeyCode(keys[0])
	    : Array.prototype.concat.apply([], keys.map(normalizeKeyCode));
	  if (Array.isArray(code)) {
	    return ("if(" + (code.map(function (c) { return ("$event.keyCode!==" + c); }).join('&&')) + ")return;")
	  } else {
	    return ("if($event.keyCode!==" + code + ")return;")
	  }
	}
	
	function normalizeKeyCode (key) {
	  return (
	    parseInt(key, 10) || // number keyCode
	    keyCodes[key] || // built-in alias
	    ("_k(" + (JSON.stringify(key)) + ")") // custom alias
	  )
	}
	
	/*  */
	
	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + "," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}
	
	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};
	
	/*  */
	
	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;
	
	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  var code = ast ? genElement(ast) : '_h("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}
	
	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);
	
	      var children = el.inlineTemplate ? null : genChildren(el);
	      code = "_h('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}
	
	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}
	
	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}
	
	function genIf (el) {
	  var exp = el.if;
	  el.ifProcessed = true; // avoid recursion
	  return ("(" + exp + ")?" + (genElement(el)) + ":" + (genElse(el)))
	}
	
	function genElse (el) {
	  return el.elseBlock
	    ? genElement(el.elseBlock)
	    : '_e()'
	}
	
	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}
	
	function genData (el) {
	  var data = '{';
	
	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }
	
	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var ast = el.children[0];
	    if ("development" !== 'production' && (
	      el.children.length > 1 || ast.type !== 1
	    )) {
	      warn$2('Inline-template components must have exactly one child element.');
	    }
	    if (ast.type === 1) {
	      var inlineRenderFns = generate(ast, currentOptions);
	      data += "inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}
	
	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}
	
	function genChildren (el) {
	  if (el.children.length) {
	    return '[' + el.children.map(genNode).join(',') + ']'
	  }
	}
	
	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}
	
	function genText (text) {
	  return text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : JSON.stringify(text.text)
	}
	
	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  return ("_t(" + slotName + (children ? ("," + children) : '') + ")")
	}
	
	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el);
	  return ("_h(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}
	
	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (prop.value) + ",";
	  }
	  return res.slice(0, -1)
	}
	
	/*  */
	
	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}
	
	/*  */
	
	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}
	
	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}
	
	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}
	
	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}
	
	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}
	
	/*  */
	
	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}
	
	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}
	
	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};
	
	/*  */
	
	function transformNode$1 (el) {
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}
	
	function genData$2 (el) {
	  return el.styleBinding
	    ? ("style:(" + (el.styleBinding) + "),")
	    : ''
	}
	
	var style$1 = {
	  transformNode: transformNode$1,
	  genData: genData$2
	};
	
	var modules$1 = [
	  klass$1,
	  style$1
	];
	
	/*  */
	
	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;
	
	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */
	
	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;
	
	  if (val.indexOf('[') < 0) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }
	
	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }
	
	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}
	
	function next () {
	  return str.charCodeAt(++index$1)
	}
	
	function eof () {
	  return index$1 >= len
	}
	
	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}
	
	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}
	
	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}
	
	/*  */
	
	var warn$3;
	
	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}
	
	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}
	
	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}
	
	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }
	
	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';
	
	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;
	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }
	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	}
	
	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  {
	    el.children.some(checkOptionWarning);
	  }
	
	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');
	
	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}
	
	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}
	
	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}
	
	/*  */
	
	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	/*  */
	
	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};
	
	/*  */
	
	var cache = Object.create(null);
	
	var baseOptions = {
	  isIE: isIE,
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};
	
	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}
	
	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}
	
	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}
	
	/*  */
	
	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});
	
	var mount = Vue$2.prototype.$mount;
	Vue$2.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);
	
	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }
	
	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}
	
	Vue$2.compile = compileToFunctions;
	
	return Vue$2;
	
	})));


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map