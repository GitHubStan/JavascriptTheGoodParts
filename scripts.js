'use strict';

describe('truthy falsy', function(){
  it('false should be falsy', function(){
    var imFalse = false;
    expect(imFalse).toBeFalsy();
    expect(false).toBeFalsy();
    expect(!false).toBeTruthy();
  });
  
  it('null should be falsy', function(){
    var imNull = null;
    expect(imNull).toBeFalsy();
    expect(!imNull).toBeTruthy();
    expect(null).toBeFalsy();
    expect(!null).toBeTruthy();
  });
  
  it('undefined should be falsy', function(){
    var imUndefined;
    expect(imUndefined).toBeFalsy();
    expect(!imUndefined).toBeTruthy();
    expect(undefined).toBeFalsy();
    expect(!undefined).toBeTruthy();
  });
  
  it('empty string should be falsy', function(){
    expect('').toBeFalsy();
    expect(!'').toBeTruthy();
  });
  
  it('number 0 should be falsy', function(){
    expect(0).toBeFalsy();
    expect(!0).toBeTruthy();
  });
  
  it('number NaN should be falsy', function(){
    var numberNaN = 0/0;
    expect(numberNaN).toBeFalsy();
    expect(!numberNaN).toBeTruthy();
    expect(NaN).toBeFalsy();
    expect(!NaN).toBeTruthy();
  });
  
  it('true should be truthy', function(){
    expect(true).toBeTruthy();
    expect(!true).toBeFalsy();
  });
  
  it('strings should be truthy', function(){
    expect('false').toBeTruthy();
    expect({a:1}).toBeTruthy();
    expect({a:1}).toBeTruthy();
  });
  
  it('objects should be truthy', function(){
    expect({a:1}).toBeTruthy();
    expect(!{a:1}).toBeFalsy();
  });
});

describe('&& and || operators', function(){
  it('&& produces value of first operand if first operand is falsy', function(){
    expect(null && 6).toBe(null);
    expect(6 && null).toBe(null);
    expect(5 && 6).toBe(6);
  });
  it('|| produces value of first operand if first operand is truthy', function(){
    expect(5 || 6).toBe(5);
    expect(null || 6).toBe(6);
    expect(6 || null).toBe(6);
  });
  
  it('|| on comparisons', function(){
    expect(2 == 2 || 4 == 4).toBe(true);
  });
});

describe('iterators', function(){
  it('for of vs for in', function(){
    let myArray = ['a', 'b', 'c'];
    
    let i;
    for(i of myArray){}
    expect(i).toBe('c');
    
    let j;
    for(j in myArray){}
    expect(j).toEqual('2');
  });
});

describe('objects', function(){
  it('object literals', function(){
    var myModel = 'Oddy';
    var car = { make: 'Honda', model: myModel, 7: 'Seattle'};
    expect(car.make).toEqual('Honda');
    expect(car.model).toEqual('Oddy');
    expect(car[7]).toEqual('Seattle');
  });
  
  it('template literals', function(){
    var name = 'Bob', amount = 5;
    var message = `Hello ${name}, can you spare ${amount} cents?`;
    expect(message).toEqual('Hello Bob, can you spare 5 cents?');
  });
  
  it('empty string property', function(){
    var myObject = {'': 'empty string'};
    expect(myObject['']).toEqual('empty string');
  });
  
  it('is passed by reference', function(){
    var a = {}, b = {};
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
    
    var b = a;
    expect(a).toBe(b);
  });
  
  it('truthy falsy', function(){
    var A = 0, B = '', C = '0';
    expect(A == B).toBe(true);
    expect(B == A).toBe(true);
    expect(A == C).toBe(true);
    expect(C == A).toBe(true);
    expect(B == C).toBe(false);
    expect(C == B).toBe(false);    
  });
  
  describe('prototype', function(){

    it('create', function(){
      var stooge = {name: 'Phil'};
      var another_stooge = Object.create(stooge);
      expect(another_stooge.name).toEqual('Phil');
      another_stooge.name = 'James';
      expect(another_stooge.name).toEqual('James');
      expect(stooge.name).toEqual('Phil');
      
      another_stooge.age = 26;
      expect(another_stooge.age).toEqual(26);
      expect(stooge.age).toEqual(undefined);
      
      stooge.height = 120;
      expect(another_stooge.height).toEqual(120);
    });
    
    it('delete', function(){
      var stooge = {name: 'Phineas'};
      var another_stooge = Object.create(stooge);
      another_stooge.name = 'Ferb';
      expect(another_stooge.name).toBe('Ferb');
      
      delete another_stooge.name;
      expect(another_stooge.name).toBe('Phineas');
    });
  });
  
  describe('reflection', function(){
    var flight = {
      number:1,
      status:'all good',
      arival:{onGround:false}
    }
    
    var propertyNames = ['number', 'status', 'arival'];
    
    it('typeOf properties', function(){
      expect(typeof flight.number).toBe('number');
      expect(typeof flight.status).toBe('string');
      expect(typeof flight.arival).toBe('object');
      expect(typeof flight.manifest).toBe('undefined');
    });
    
    it('typeOf on the prototype chain', function(){
      expect(typeof flight.toString).toBe('function');
      expect(typeof flight.constructor).toBe('function');
    });
    
    it('hasOwnProperty', function(){
      expect(flight.hasOwnProperty('number')).toBe(true);
      expect(flight.hasOwnProperty('bagel')).toBe(false);
      expect(flight.hasOwnProperty(toString)).toBe(false);
    });
    
    it('enumeration over properties', function(){
      var propertyName;
      for (propertyName in flight){
        if(typeof flight[propertyName] !== 'function'){
          expect(propertyNames.indexOf(propertyName)).toBeGreaterThan(-1);
        }
      }
    });
  });
  
  describe('Functions', function(){
    var myFunction = function(a, b){
      return {a, b, c:arguments};
    };
    
    it('too many arguments', function(){
      var result = myFunction('x', 'y', 'z');
      expect(result.a).toBe('x');
      expect(result.b).toBe('y');
      expect(result.c[0]).toBe('x');
      expect(result.c[1]).toBe('y');
      expect(result.c[2]).toBe('z');
      expect(result.c[3]).toBe(undefined);
    });
    
    it('too few arguments', function(){
      var result = myFunction('x');
      expect(result.a).toBe('x');
      expect(result.b).toBe(undefined);
      expect(result.c[0]).toBe('x');
      expect(result.c[1]).toBe(undefined);
    });
  });
  
  describe('Scope', function(){
    
    it('how scope works', function(){
      var foo = function(){
        var a = 3, b = 5;
        
        var bar = function(){
          var b = 7, c = 11;
  
          expect(a).toBe(3);
          expect(b).toBe(7);
          expect(c).toBe(11);
          
          a += b + c;
          
          expect(a).toBe(21);
          expect(b).toBe(7);
          expect(c).toBe(11);
        };
        
        expect(a).toBe(3);
        expect(b).toBe(5);

        bar();
      };
      
      foo();
    });
  })
  
  describe('Array', function(){
    var a, b, c;
    
    beforeEach(function(){
      a = ['a', 'b', 'c'];
      b = ['d', 'e', 'f'];
      c = ['g'];
    });

    it('concat', function(){
      var d = a.concat(b, c);
      expect(d).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
    });
    
    it('join', function(){
      var d = a.join('');
      expect(d).toEqual('abc');
      d = a.join(':');
      expect(d).toEqual('a:b:c');
    });
    
    it('push', function(){
      var d = a.push('z');
      expect(a).toEqual(['a', 'b', 'c', 'z']);
      expect(d).toBe(4);
    });
    
    it('pop', function(){
      var d = a.pop();
      expect(d).toBe('c');
      expect(a).toEqual(['a', 'b']);
    });
    
    it('reverse', function(){
      var d = a.reverse();
      expect(d).toEqual(['c', 'b', 'a']);
      expect(a).toEqual(['c', 'b', 'a']);
    });
    
    it('shift', function(){
      var d = a.shift();
      expect(d).toBe('a');
      expect(a).toEqual(['b', 'c']);
    });
    
    it('shift like', function(){
      a.reverse().pop();
      a.reverse();
      expect(a).toEqual(['b', 'c']);
    });
    
    describe('slice', function(){

      it('basic slicing', function(){
        var a = ['a', 'b', 'c'];
        var b = a.slice(0, 1);
        expect(b).toEqual(['a']);
        var c = a.slice(1);
        expect(c).toEqual(['b', 'c']);
        var d = a.slice(1, 2);
        expect(d).toEqual(['b']);
        var e = a.slice(0, -1);
        expect(e).toEqual(['a', 'b']);
        
      });

      it('creates a shallow copy', function(){
        var g = {'name': 'Bill'};
        var f = ['1', g];
        var h = f.slice(0);
        expect(f[1]).toBe(g);
      });
        
    });
    
    describe('sort', function(){
        it('sorts numbers as strings', function(){
          var a = [4, 8, 15, 16, 23, 42];
          a.sort();
          expect(a).toEqual([15, 16, 23, 4, 42, 8]);
        });
    });
    
  });
  
  describe('Numbers', function(){
    it('isNaN tests NaN', function(){
      expect(isNaN(NaN)).toBeTruthy();
      expect(Number.isNaN(NaN)).toBeTruthy();
      expect(isNaN(1)).toBeFalsy();
      expect(isNaN(1.1)).toBeFalsy();
      expect(isNaN("1.1")).toBeFalsy();
      expect(isNaN("Pickles")).toBeTruthy();
    });
  });
});
