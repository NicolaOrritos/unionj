'use strict';

/* var LOG_ENABLED = true;


function log()
{
    if (LOG_ENABLED)
    {
        console.log.apply(undefined, arguments);
    }
} */

function isString(str)
{
    return (typeof str === 'string' || str instanceof String);
}

function isNull(obj)
{
    var result = true;
    
    if (obj !== undefined && obj !== null)
    {
        result = false;
    }
    
    return result;
}

// Returns true if 'val' is either an array or an object
function isComposite(val)
{
    var result = false;
    
    if (val)
    {
        result = (val.constructor === Array || typeof val === 'object');
    }
    
    return result;
}

function unify(a, b, conf)
{
    var result;
    
    if (!isComposite(a) || !isComposite(b))
    {
        result = b;
    }
    else
    {
        result = {};
        
        for (var aKey in a)
        {
            if (a.hasOwnProperty(aKey))
            {
                if (isNull(b[aKey]))
                {
                    // Leave room for a little customization:
                    if (conf && conf.canNullify === true)
                    {
                        result[aKey] = null;
                    }
                    else
                    {
                        // Nothing to do: leave a's property immutated
                    }
                }
                else
                {
                    result[aKey] = unify(a[aKey], b[aKey]);
                }
            }
        }

        for (var bKey in b)
        {
            if (b.hasOwnProperty(bKey))
            {
                if (isNull(a[bKey]))
                {
                    // Simply add to 'a':
                    result[bKey] = b[bKey];
                }
                else
                {
                    // Skip: already taken care by the loop above
                }
            }
        }
    }
    
    return result;
}


module.exports = 
{
    add: function(json1, json2)
    {
        var result;
        
        if (json1 && json2)
        {
            if (isString(json1))
            {
                json1 = JSON.parse(json1);
            }
            
            if (isString(json2))
            {
                json2 = JSON.parse(json2);
            }
            
            result = unify(json1, json2);
        }
        
        return result;
    }
};
