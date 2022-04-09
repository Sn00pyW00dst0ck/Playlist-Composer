// Tree Node Class
class Node {
    // Node private members
    balanceFactor;

    constructor(id, count = 1, left = null, right = null){
        this.id = id;
        this.count = count;
        this.left = left;
        this.right = right;
    }

    // Visits each node to calculate height of passed in node
    getHeight(root){
        var leftHeight;
        var rightHeight;
        if(!root){
            return 0;
        }
        else{
            leftHeight = this.getHeight(root.left);
            rightHeight = this.getHeight(root.right);
        }
        return 1 + Math.max(leftHeight, rightHeight)
    }

    // Calculates balance factor of node [left - right] and returns it
    getBalanceFactor(root){
        if(!root){
            return 0;
        }
        if(!root.left && !root.right){
            return this.getHeight(root.left);
        }
        else if(root.left && !root.right){
            return this.getHeight(root.right);
        }
        else if(!root.left && root.right){
            return -(this.getHeight(root.right));
        }
        else{
            return (this.getHeight(root.left) - this.getHeight(root.right));
        }
    }

    // Increments count by 1 
    updateCount(){
        this.count++;
    }

}

// AVL Tree class
class AVLTree{
    // AVLTree constructor
    constructor(){
        this.root = null;
        this.size = 0;
        this.arr = [];
    }

    // Used on RR formation or called in RL-LR rotations 
    leftRotate(root){
        var pivot = root.right;
        var leftChild = root;
        leftChild.right = pivot.left;
        pivot.left = leftChild;
        return pivot;
    }
    // Used on LL formation or called in RL-LR rotations
    rightRotate(root){
        var pivot = root.left;
        var rightChild = root;
        rightChild.left = pivot.right;
        pivot.right = rightChild;
        return pivot;
    }
    // Calls both left and right rotation
    leftRightRotate(root){
        root.left = this.leftRotate(root.left);
        return this.rightRotate(root);
    }
    // Calls both right and left rotation
    rightLeftRotate(root){
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
    }

    // General insert function
    insert(key){
        // Checks if key is already in tree and increments count if found
        var isFound = this.search(this.root, key, isFound); 
        // Inserts new node if key not found
        if(!isFound){
            this.root = this.recursiveInsert(this.root, key);
            this.size++;
        }
    }

    // Recursively inserts new node and balances tree after
    recursiveInsert(root, key){

        if(!root){
            root = new Node(key);
            return root;
        } 

        if(key < root.id){
            root.left = this.recursiveInsert(root.left, key);
        }
        else if (key > root.id){
            root.right = this.recursiveInsert(root.right, key);
        }

        // Balance tree recursively, starting from inserted leaf node

        var bf = root.getBalanceFactor(root);
        
        if(bf == 2 && root.getBalanceFactor(root.left) == 1){
            root = this.rightRotate(root);
        }
        else if(bf == -2 && root.getBalanceFactor(root.right) == -1){
            root = this.leftRotate(root);
        }
        else if(bf == 2 && root.getBalanceFactor(root.left) == -1){
            root = this.leftRightRotate(root);
        }
        else if(bf == -2 && root.getBalanceFactor(root.right) == 1){
            root = this.rightLeftRotate(root);
        }

        return root;
        
    }

    // Searches Tree for given key [string]
    search(root, key, isFound){
        if(root)
        {
            if(root.id == key){
                root.updateCount();
                return true;
            }
            else if(key < root.id){
                return this.search(root.left, key, isFound);
            }
            else{
                return this.search(root.right, key, isFound);
            }
        }
        else return false;

    }

    populateList(root){
        if (!root) { return; }
        if (root.left)  { this.populateList(root.left); }
        let tempObj = {};
        tempObj.song = root.id;
        tempObj.count = root.count;
        this.arr.push(tempObj);
        if (root.right)  { this.populateList(root.right); }
    }

    // Populates private member array with alphabetical array containing song name and count
    generateList(){
        this.populateList(this.root);
        // Sorts array based on count O(n log n)
        this.arr.sort(function(count1, count2){
            if(count1.count > count2.count) return -1;
            if(count1.count < count2.count) return 1;
        });
        return this.arr;
    }
}

// Define AVL Tree
const tree = new AVLTree

// REPLACE WITH REAL DATA
// ----------------------
// Populate AVL Tree with Songs
for(let x = 0; x < 5; x++){
    tree.insert("Africa")
}
for(let x = 0; x < 4; x++){
    tree.insert("Never Gonna Give You Up")
}
tree.insert("What You Won\'t Do for Love")
tree.insert("Spain")
tree.insert("Birdland")
tree.insert("That\'s Life")
tree.insert("Gold Rush")
tree.insert("Destiny")
tree.insert("Autumn Leaves")
tree.insert("Aftermath")
tree.insert("What You Won\'t Do for Love")
tree.insert("What You Won\'t Do for Love")
tree.insert("Ahead by a Century")
tree.insert("Graduation")
tree.insert("Good Morning")
tree.insert("Graduation")
tree.insert("Good Morning")
tree.insert("After Hours")

// Generates Array of Objects from AVL Tree to Sort
var arr = tree.generateList();

console.log(arr);

module.exports = AVLTree;
