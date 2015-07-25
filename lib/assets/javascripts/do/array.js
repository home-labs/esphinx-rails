doQuery = function(query){
    var collection = [],
        query = document.querySelectorAll(query);
    if(query.length > 0) {
        query.map(function(e) {
            collection.push(e);
        });
    }
    return collection;
}


isArray = function(obj){
    if(obj.constructor == Array)
        return true;
    return false;
}


// retorna a quantidade de um item
Array.prototype.occurrences = function(comparison) {
    var
        _arr = this.sort();
        count = 0;
    ;

    // talvez fosse interessante não usar o map para otimizar, testando até determinado item se diferente do próximo
    _arr.map(function(item) {
        if(item === comparison) { count++; }
    });
    return count;
}

Array.prototype.css = function(attr, value) {
    var collection = this;
    if(attr.constructor === Object) {
        var attrs = attr;
        collection.map(function(e) {
            for(i in attrs){
                if( attrs.hasOwnProperty(i) ){
                    e.style[i] = attr[i];
                }
            }
        });
    } else {
        collection.map(function(e) {
            e.style[attr] = value;
        });
    }
    return this;
}

Array.prototype.item = function(index) {
    var _a = this;
    if(_a.hasOwnProperty(index)) {
        return this[index];
    }
    return null;
}

Array.prototype.detroy = function(items) {
    var
        _a = this,
        i = 0,
        index = -1
    ;

    if(arguments.length > 1) {
        for(i in arguments) {
            while(true) {
                index = _a.indexOf(arguments[i]);
                if(index > -1) {
                    _a.splice(index, 1);
                } else {
                    break;
                }
            }
        }
    }

    return _a;
}

Array.prototype.without = function(items) {

}

var removeItem = function(array, item) {
    var _new = [];

    array.map(function (v){
        if (! v === item ){
            _new.push(v);
        }
    });

    return _new;
}

// refatorar para ficar como o destroy
Array.prototype.compressed = function() {
    var
        _a = this,
        _new = []
    ;

    _a.map(function(v) {
        if( !(v === null || v === undefined) ) {
            _new.push(v);
        }
    });

    return _new;
}

HTMLElement.prototype.next = function() {
    return this.nextElementSibling;
}

Array.prototype.prev = function(selector) {
    var collection = [];

    this.map(function(e) {
        if(e.previousElementSibling){
            collection.push(e.previousElementSibling);
        }
    });
    return collection;
}

//
HTMLElement.prototype.is = function(selector) {
    var obj = this;

    if(selector.charAt(0) === ':'){
        switch(selector) {
            case ':hidden':
                if(obj.style.display === 'none') {
                    return true;
                }
                break;
        }
    } else {
        if(document.querySelector(selector)) {
            return true;
        }
    }

    return false;
}

Array.prototype.parents = function(nodeName){
    var _parents = [],
        collection = this,
        parent = null;

    collection.map(function(e) {
        parent = e.parentNode;
        if(nodeName) {
            if(parent.nodeName.toLowerCase() === nodeName) {
                _parents.push(parent);
            } else {
                while(true) {
                    parent = parent.parentNode;
                    if(parent){
                        if(parent.nodeName.toLowerCase() === nodeName) {
                            _parents.push(parent);
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
        } else {
            if(parent){
                _parents.push(parent);
            }
        }
    });
    return _parents;
}