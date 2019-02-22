// 1) Object.create 

Object.myCreate = function(prototype, descriptions) {
  function F() {};
  F.prototype = prototype;
  var x = new F();

  if (typeof (descriptions) === 'object') {
    for (prop in descriptions) {
      if (descriptions.hasOwnProperty((prop))) {
        x[prop] = prototype[prop].value;
      }
    }
  }
  
  return x;
}

// 2) Object.keys 

Object.keys = function(obj) {
  if (obj !== Object(obj))
      throw new TypeError('Object.keys called on a non-object');
  var k = [], p;
  for (p in obj) 
    if (Object.prototype.hasOwnProperty.call(obj, p)) 
      k.push(p);
  return k;
};

// 3) Array.pop

Array.prototype.pop = function () {
  var myArray = this;
  if ( myArray.length === 0 ) return undefined;
  var length = myArray.length;
  return myArray.splice(length-1,1)[0];
}

// 4) Array.push

Array.prototype.push = function() {
  for (var i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i];
  }
  return this.length;
};

// 5) Array.shift

Array.prototype.shift = function () {
  var myArray = this;
  if ( myArray.length === 0 ) return undefined; 
  return myArray.splice(0,1)[0];
}

// 6) Array.unshift

Array.prototype.unshift = function(){
  Array.prototype.splice.call( arguments, 0, 0, 0, 0 );
  Array.prototype.splice.apply( this, arguments );
  return( this.length );
};

// 7) Array.map

Array.prototype.map = function(fn) {
  var rv = [];
  for(var i=0, l=this.length; i<l; i++)
    rv.push(fn(this[i]));
  return rv;
};

// 8) Array.forEach

Array.prototype.forEach = function forEach (callback, thisArg) {
  var array = this;
  thisArg = thisArg || this;
  for (var i = 0, l = array.length; i !== l; ++i) {
    callback.call(thisArg, array[i], i, array);
  }
};

// 9) Array.filter

Array.prototype.filter = function(fn) {
  var rv = [];
  
  for(var i=0, l=this.length; i<l; i++)
    if (fn(this[i])) rv.push(this[i]);

  return rv;
};

// 10) Array.reverse

Array.prototype.reverse = function(input) {
  var ret = new Array;
  for(var i = input.length-1; i >= 0; i--) {
      ret.push(input[i]);
  }
  return ret;
};

// 11) Array.join

Array.prototype.join = function(separator) {
  var sep = separator === undefined ? ',' : separator;
  var result = "";
  for (var i = 0; i < this.length; i++) {
    result += this[i] + sep;
  }
  return result;
};

// 12) Array.reduce

Array.prototype.reduce = function(callback) {
  var arr = this,
      arrLen = arr.length,
      k = 0,
      accumulator = initVal === undefined ? undefined : initVal;

  for(;k < arrLen;k++) {
      if (accumulator !== undefined && k in arr) {
          accumulator = callbackfn.call(undefined, accumulator, arr[k], k, arr);
      } else {
          accumulator = arr[k];
      }
  }
  return accumulator;
};

// 13) Array.sort



// 14) Function.bind

Function.prototype.bind = function (context) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};

// 15) Function.call

Function.prototype.call = function(someOtherThis) {
  someOtherThis.fnName = this;
  someOtherThis.fnName();
}

// 16) Function.apply

Function.prototype.apply = function(someOtherThis) {
  someOtherThis.fnName = this;
  someOtherThis.fnName();
}

// 17) Object.freeze

Object.freeze = function( obj ) {
  var props = Object.getOwnPropertyNames( obj );

  for ( var i = 0; i < props.length; i++ ) {
    var desc = Object.getOwnPropertyDescriptor( obj, props[i] );

    if ( "value" in desc ) {
      desc.writable = false;
    }

     desc.configurable = false;
     Object.defineProperty( obj, props[i], desc );
  }

  return Object.preventExtensions( obj );
};

// 18) Array.some

Array.prototype.some = function (
    a, // expression to test each element of the array against
    b, // optionally change the 'this' context for the given callback
    c, // placeholder iterator variable
    d // placeholder variable (stores context of original array)
    ) {
      for (c = 0, d = this; c < d.length; c++) // iterate over all of the array elements
        if (a.call(b, d[c], c, d)) // call the given expression, passing in context, value, index, and original array
          return !0; // if any expression evaluates true, immediately return since 'some' is true
      return !1 // otherwise return false since all callbacks evaluated to false
}

// 19) Array.every

Array.prototype.every = function (
    a, // expression to test each element of the array against
    b, // optionally change the 'this' context in the given expression
    c, // placeholder iterator variable
    d // placeholder variable (stores context of original array)
    ) { 
      for (c = 0, d = this; c < d.length; c++) // iterate over all of the array elements
        if (!a.call(b, d[c], c, d)) // call the given expression, passing in context, value, index, and original array
          return !1; // if any expression evaluates false, immediately return since 'every' is false
      return !0 // otherwise return true since all expressions evaluated to true
}

// 20) Promise.all

Promise.prototype.all = function(promises) {
  return new Promise(function(resolve,reject) {
    var count = promises.length
    var result = []
    var checkDone = function() { if (--count === 0) resolve(result) }
    promises.forEach(function(p, i) {
      p.then(function(x) { result[i] = x }, reject).then(checkDone)
    })
  })
}

// 21) copyObject

function copy_object(a) {
    var result = {};
    var buff = [];
    var l;
    if (a.constructor === Object) { 
        buff = Object.keys(a);
        l = buff.length;
        if (l > 0) {
            buff.forEach(function (v) {
                result[v] = a[v];
            });
        }
    }
    return result;
}
