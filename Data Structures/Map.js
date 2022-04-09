
//Creating map class with node to contain key value pair
class Node {

    /**
     * 
     * @param {string} key the key 
     * @param {any data type or object} value the value
     */
    constructor(key, value=0) {
        this.data=[key, value];
    }

    /**
     * 
     * @returns key 
     */
    first() {
        return this.data[0];
    }

    /**
     * 
     * @returns value
     */
    second() {
        return this.data[1];
    }

    /**
     * 
     * @param {int} value, adds the inserted value (if any), one by default 
     */
    setSecond(value) {
        if (value == 0) {
            value = 1
        }
        this.data[1] = this.data[1] + value;
        console.log("Updated: " + this.data[0] + " with " + this.second());
    }
}

class Map  {
    constructor() {
        this.allData = []
        this.maxCap = 15;
        this.currSize = 0;
        this.loadFactor = 0.50;
    }

    
    /**
     * 
     * @param {string} key, the key of the map
     * @returns index to be inserted
     */
    Hashing(key) {
        let sum = 0, mul = 1;

        //Loops through string
        for (let i = 0; i < key.length; i++) {
            mul = (i % 4) ? 1 : mul* 256;

            //Adds the ASCII code of each letter
            sum += key.charCodeAt(i) * ( mul);
        }
        let index = sum * mul;
        return(index % this.maxCap);
    }



    /**
     * Accepts key/value pair to be inserted
     * Place the data at a index given by hash function
     * if collision occurs, do quadratic probing and loop back
     * update current size
     * check load factor > max, rehash if that's the case
     * throws errors if inserting same key
     * @param {String} key key
     * @param {integer} value value 
     */
    insert(key, value=0) {
        let dataPoint = new Node(key, value);
        let index = this.Hashing(key);
        //Check if there's collision
        if (typeof this.allData[index] === 'undefined') {
            this.allData[index] = new Node(key, value);
            this.currSize++;
        } else {
            let placed = false;
            if (this.allData[index].first() == key) {
                this.allData[index].setSecond(value);
                placed = true;

            } else {

                //While not placed, keep probing, we starting with zero
                //To check if values are the same
                let counter = 0;
                while (placed == false) {
                    index += counter * counter;

                    //Wrapping around the array
                    index = index % this.maxCap; 

                    //Founding an empty spot
                    if (typeof this.allData[index] === 'undefined') {
                        this.allData[index] = new Node(key, value);
                        placed = true;
                        this.currSize++;
                    } else {

                        //If the same value encountered, add to second
                        if (this.allData[index].first() == key) {
                            this.allData[index].setSecond();
                            placed = true;
                        }
                        counter++;
                    }
                }
            }
        }

        //this.printData();

        if (this.currSize/this.maxCap >= this.loadFactor) {
            this.rehashing();
        }
    }

    /**
     * Rehashes the array if reaches max load
     */
    rehashing() {
        const oldData = this.allData;
        this.allData = [];
        this.currSize = 0;

        //Increase maxCap by 2 fold
        this.maxCap *= 2;
        let counters = 0;

        //Rehash the array elements, put them into new array
        for (let i = 0; i < oldData.length; i++) {
            if (typeof oldData[i] !== 'undefined') {
                let index = this.Hashing(oldData[i].first());
                this.insert(oldData[i].first(), oldData[i].second());
            }
        }
    }

    /**
     * Prints out data for debugging
     */
    printData() {
        console.log("");
        for (let i = 0; i < this.allData.length; i++) {
            if (typeof this.allData[i] !== 'undefined'){
                console.log(this.allData[i].first() + this.allData[i].second() + " at " + i);
            }
        }
        console.log(this.currSize);
        console.log(this.currSize/this.maxCap + "\n");
    }

    /**
     * 
     * @param {*} key 
     * @returns 
     */
    search(key) {
        let index = this.Hashing(key);
        if (this.allData[index].first() != key) {
            for (let x = index; x < this.allData.length; x++) {
                if (this.allData[x].first() == key) {
                    return this.allData[index].second();
                }
            }
        } else {
            return this.allData[index].second();
        }

        return null;
    }

    swap(arr, xp, yp) {
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }

    sort(arr) {
        var i, j;
        for (i = 0; i < arr.length - 1; i++) {
            for (j = 0; j < arr.length -i-1; j++) {
                if (arr[j].second() < arr[j+1].second()) {
                    this.swap(arr,j,j+1);   
                }
            }
        }
    }
    /**
     * 
     * @param {However many entries} num 
     * @returns topList of however specified length, undefined if num > total entries
     */
    getsTop(num) {
        let topList = [];

        if (num > this.currSize) {
            return undefined;
        }

        for (let x = 0; x < this.allData.length; x++) {
            //If the list is not full, just add and sort
            if (topList.length < num) {
                if (typeof this.allData[x] !== 'undefined') {
                    topList.push(this.allData[x]);
                    this.sort(topList);
                }
            //Otherwise find min and compare
            } else {

                //Switch with back of topList if the current element has greater priority, then start sorting
                if (typeof this.allData[x] !== 'undefined') {
                    if (this.allData[x].second() > topList[topList.length-1].second()) {
                        topList[topList.length-1] = this.allData[x];
                    }
                }

                this.sort(topList);
            }

        }

        return topList;
    }

    /**
     * 
     * @returns current elements in map
     */
    getCurrSize() {
        return this.currSize;
    }
}

let map1 = new Map();
map1.insert("baby");
map1.insert("bacy", 20);
map1.insert("beby", 40); 
map1.insert("babie");
map1.insert("bavi");
map1.insert("bay");
map1.insert("bcy");
map1.insert("beb");
map1.insert("bbi");
map1.insert("bbi");
map1.insert("bba", 10)
map1.insert("bi", 11);
map1.insert("bay");
map1.insert("bcy");
map1.insert("beb", 5);

let arr = map1.getsTop(map1.getCurrSize());

for (let x = 0; x < arr.length; x++) {
    console.log(arr[x].first() + " " + arr[x].second());
}

module.exports = Map;
