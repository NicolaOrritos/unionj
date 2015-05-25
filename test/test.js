'use strict';

var assert = require('assert');
var unionj = require('../unionj.js');


describe('unionj node module', function()
{
    var obj1 = {
        'k1': 'v1a'
    };
    
    var obj2 = {
        'k1': 'v1b'
    };
    
    var obj3 = {
        'k1': {
            'k1ChildKey': 'k1ChildValue'
        }
    };
    
    var obj4 = {
        'k2': 12345
    };
    
    var obj5 = {
        'k3': 12345
    };
    
    var obj6 = {
        arr: [
            {o1: 1},
            {o2: 2}
        ]
    };
    
    var obj7 = {
        arr: [
            {o1: 1},
            {o2: 2},
            {o3: 3}
        ]
    };
    
    var obj8 = {
        arr: {
            '0': {o1: 1},
            '1': {o2: 2},
            '2': {o3: 4}
        }
    };
    
    var doc1 = JSON.stringify(obj1);
    var doc2 = JSON.stringify(obj2);
    
    
    it('must unify plain Javascript objects', function()
    {
        var result = unionj.add(obj1, obj2);
        
        assert(result);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify obeying to the "second-over-first" rule', function()
    {
        var result = unionj.add(obj2, obj1);
        
        assert(result);
        assert(result.k1 === 'v1a');
    });
    
    it('must unify stringified JSON objects', function()
    {
        var result = unionj.add(doc1, doc2);
        
        assert(result);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify stringified JSON objects AND plain Javascript objects', function()
    {
        var result = unionj.add(doc1, obj2);
        
        assert(result);
        assert(result.k1 === 'v1b');
        
        
        result = unionj.add(obj1, doc2);
        
        assert(result);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify Javascript objects with different depths', function()
    {
        var result = unionj.add(obj1, obj3);
        
        assert(result);
        assert(result.k1);
        assert(result.k1.k1ChildKey === 'k1ChildValue');
        
        
        result = unionj.add(obj3, obj1);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1a');
    });
    
    it('must add fields not existing in the first object', function()
    {
        var result = unionj.add(obj3, obj4);
        
        assert(result);
        assert(result.k1);
        assert(result.k1.k1ChildKey === 'k1ChildValue');
        assert(result.k2 === 12345);
    });
    
    it('must add more than two objects', function()
    {
        var result = unionj.add(obj3, obj4, obj5);
        
        assert(result);
        assert(result.k1);
        assert(result.k1.k1ChildKey === 'k1ChildValue');
        assert(result.k2 === 12345);
        assert(result.k3 === 12345);
        
        
        result = unionj.add(obj5, obj4, obj3, obj2);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1b');
        assert(result.k2 === 12345);
        assert(result.k3 === 12345);
    });
    
    it('must return one object when only that object is provided', function()
    {
        var result = unionj.add(obj4);
        
        assert(result);
        assert(result.k1 === undefined);
        assert(result.k2 === 12345);
    });
    
    it('must merge arrays containing objects', function()
    {
        var result = unionj.add(obj6, obj7);
        
        assert(result);
        assert(result.arr);
        assert(Array.isArray(result.arr));
        assert(result.arr[0].o1 === 1);
        assert(result.arr[1].o2 === 2);
        assert(result.arr[2].o3 === 3);
        
        
        // Override case
        result = unionj.add(obj7, obj8);
        
        assert(result);
        assert(result.arr);
        assert( ! Array.isArray(result.arr));
        assert(result.arr['0'].o1 === 1);
        assert(result.arr['1'].o2 === 2);
        assert(result.arr['2'].o3 === 4);
    });
});
