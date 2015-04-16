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
});
