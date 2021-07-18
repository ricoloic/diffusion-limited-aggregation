let canvas, halfW, halfH;
const walkerCounts = 50;
const maxTreeSize = 1000;
let tree = [], walkers = [];
let baseR = 2;
let itteration = 300;

const type = 'circle';

const sides = [
    0, // top
    1, // left
    2, // bottom
    3, // right
];

const typeOptions = {
    center: {
        start: function () {
            tree[0] = new Walker(halfW, halfH, baseR);
            tree[0].addColor(200, 50, 100);
        },
        newWalker: function () {
            walkers.push(createWalkerOnEdge(random(sides), baseR));
        }
    },
    circle: {
        start: function () {
            let i = 0;
            for (let a = 0; a < 360; a++) {
                if (a % baseR / 3 == 0) {
                    const x = ((halfH - 50) * cos(a)) + halfW;
                    const y = ((halfH - 50) * sin(a)) + halfH;
                    tree[i] = new Walker(x, y, baseR);
                    tree[i].addColor(200, 50, 100);
                    i++;
                }
            }
        },
        newWalker: function () {
            walkers.push(new Walker(halfW, halfH, baseR));
        }
    }
};

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    const mainNodeDOM = canvas.parent();
    canvas.parent("canvas-container");
    mainNodeDOM.remove();
    angleMode(DEGREES);
    halfW = width / 2;
    halfH = height / 2;

    typeOptions[type].start();
    for (let i = 0; i < walkerCounts; i++)
        typeOptions[type].newWalker();
}

function mousePressed() {
    save(canvas, 'coral-tree.png');
}

function draw() {
    background(26);
    noStroke();
    fill(220);

    for (let w of tree) {
        fill(w.color.r, w.color.g, w.color.b);
        circle(w.x, w.y, w.twoRadius);
    }

    if (tree.length > maxTreeSize) {
        noLoop();
        return;
    }

    for (let i = 0; i < walkers.length; i++) {
        const newRadius = mapRadius(walkers[i].radius, tree.length);
        walkers[i].changeRadius(newRadius);
        fill(235);
        circle(walkers[i].x, walkers[i].y, baseR * 2);
        for (let j = 0; j < itteration; j++) {
            walkers[i].walk();
            if (walkers[i].watchStep(tree)) {
                walkers[i].addColor(mapColor('red', tree.length), 50, mapColor('blue', tree.length));
                tree.push(walkers[i]);
                walkers.splice(i, 1);
                typeOptions[type].newWalker();
                break;
            }
        }
    }
}

function mapRadius(r, val) {
    const thirdOfMaxTreeSize = floor(maxTreeSize / 3);
    const newRadius = r;
    // val > maxTreeSize - thirdOfMaxTreeSize ?
    //     map(val, maxTreeSize, thirdOfMaxTreeSize, 4, r)
    //     : r;
    return newRadius;
}

function mapColor(c, val) {
    if (c == 'red')
        return floor(map(val, 1, maxTreeSize, 200, 255));
    if (c == 'blue')
        return floor(map(val, 1, maxTreeSize, 100, 230));
}
