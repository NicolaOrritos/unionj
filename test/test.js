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
    
    var doc1 = JSON.stringify(obj1);
    var doc2 = JSON.stringify(obj2);
    
    
    it('must unify plain Javascript objects', function()
    {
        var result = unionj.add(obj1, obj2);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify obeying to the "second-over-first" rule', function()
    {
        var result = unionj.add(obj2, obj1);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1a');
    });
    
    it('must unify stringified JSON objects', function()
    {
        var result = unionj.add(doc1, doc2);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify stringified JSON objects AND plain Javascript objects', function()
    {
        var result = unionj.add(doc1, obj2);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1b');
        
        
        result = unionj.add(obj1, doc2);
        
        assert(result);
        assert(result.k1);
        assert(result.k1 === 'v1b');
    });
    
    it('must unify Javascript objects with different depths', function()
    {
        var result = unionj.add(obj1, obj3);
        
        assert(result);
        assert(result.k1);
        assert(result.k1.k1ChildKey);
        assert(result.k1.k1ChildKey === 'k1ChildValue');
    });
    
    it('must add fields not existing in the first object', function()
    {
        var result = unionj.add(obj3, obj4);
        
        assert(result);
        assert(result.k1);
        assert(result.k1.k1ChildKey);
        assert(result.k1.k1ChildKey === 'k1ChildValue');
        assert(result.k2);
        assert(result.k2 === 12345);
    });
});
