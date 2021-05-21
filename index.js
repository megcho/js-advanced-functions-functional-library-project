const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    // calls alert with each element passed
    // calls alert properly on object values
    // returns the original collection
    each: function(collection, callback) {

        let dog = (collection instanceof Array) ? collection.split() : Object.values(collection);

        // if (collection instanceof Array) {
        //    collection.split();
        // } else {
        //    Object.values(collection);
        // }

        for (let i=0; i < dog.length; i++) {
            callback(dog[i]);
        }

        return collection;
    },

    // successfully returns a correctly populated array
    // does not modify the original array
    // successfully returns a correctly populated array from modified object values
    // does not modify the original object
    map: function(collection, callback) {

        if (!(collection instanceof Array)) {
            collection = Object.values(collection)
        }

        const newArr = []

        for (let i = 0; i < collection.length; i++){
            newArr.push(callback(collection[i]))
        }

        return newArr;
    },

    // returns the correct reduced value when passed an accumulator
    // returns the correct reduced value when not passed an accumulator
    // does not modify the original array
    reduce: function(c=[], callback = () => {}, accumulator) {
        let collection = c.slice(0)

		if (!accumulator) {
			accumulator = collection[0]
			collection = collection.slice(1)
		}

		for (let i=0; i < collection.length; i++) {
			accumulator = callback(accumulator, collection[i], collection)
		}

        return accumulator;
    },

    // returns the value if found
    // does not traverse the whole array if the value is found early
    // returns undefined if the value is not present
    find: function(collection, callback) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let i=0; i < collection.length; i++)
        if (callback(collection[i])) return collection[i]

      return undefined
    },

    // filters for values that the callback evaluates as true
    filter: function(collection, callback) {
        if (!(collection instanceof Array)) {
            collection = Object.values(collection)
        }

        const newArr = []

        for (let i=0; i < collection.length; i++)
            if (callback(collection[i])) newArr.push(collection[i])

        return newArr
    },

    // returns the size of the collection when an array is passed
    // returns the size of the collection (amount of keys) when an object is passed
    size: function(collection) {
        return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    // returns the first element of the collection
    // returns the first n elements of the collection when the second optional argument (n) is provided
    first: function(collection, stop=false) {
        return (stop) ? collection.slice(0, stop) : collection[0]
    },

    last: function(collection, start=false) {
        return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
    },

    compact: function(collection) {
        const object = new Set([false, null, 0, "", undefined, NaN])

        return collection.filter(e => !object.has(e))
    },

    sortBy: function(collection, callback) {
        const newArray = [...collection];

        return newArray.sort(function(a, b) {
            return callback(a) - callback(b)
        })
    },

    unpack: function(receiver, array) {
        for (let value of array) {
            receiver.push(value);
        }
    },

    flatten: function(collection, shallow, newArray=[]) {
        if (!Array.isArray(collection)) return newArray.push(collection)

        if (shallow) {
            for (let val of collection)
                Array.isArray(val) ? this.unpack(newArray, val) : newArray.push(val)
        } else {
            for (let val of collection) {
                this.flatten(val, false, newArray)
            }
        }

        return newArray
    },

    uniqSorted: function(collection, iteratee) {
        const sorted = [collection[0]]

        for (let idx = 1; idx < collection.length; idx++) {
            if (sorted[idx-1] !== collection[idx])
            sorted.push(collection[idx])
        }

        return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
        if (sorted) {
            return fi.uniqSorted(collection, iteratee)
        } else if (!iteratee) {
            return Array.from(new Set(collection))
        } else {
            const modifiedVals = new Set()
            const uniqVals = new Set()

            for (let val of collection) {
                const moddedVal = iteratee(val)
                if (!modifiedVals.has(moddedVal)) {
                    modifiedVals.add(moddedVal)
                    uniqVals.add(val)
                }
            }

            return Array.from(uniqVals)
        }
    },

    keys: function(obj) {
        // Using for loop
        const keys = []

        for (let key in obj){
            keys.push(key)
        }

        return keys
    },

    values: function(obj) {
        // Using for loop
        const values = []

        for (let key in obj){
            values.push(obj[key])
        }

        return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(object) {
        const functionNames = []

        for (let key in object) {
            if (typeof object[key] === "function"){
                functionNames.push(key)
            }
        }

        return functionNames.sort()
    },


  }
})()

fi.libraryMethod()