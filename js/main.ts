interface Point {
    x: number;
    y: number;
}

class BezierCurve {
    view: View;
    drag: Boolean[];
    dragStart: any[];
    dragEnd: any[];
    controlPoints: Point[];
    mouseDownHandler: EventListener[] | any;
    mouseUpHandler: EventListener[] | any;
    mouseMoveHandler: EventListener[] | any;


    constructor(view: View, p1: Point, p2: Point, p3: Point) {
        this.view = view;
        this.drag = [false, false, false];
        this.dragStart = [false, false, false];
        this.dragEnd = [false, false, false];
        this.controlPoints = [p1, p2, p3];

        this.mouseDownHandler = [{}, {}, {}]
        this.mouseUpHandler = [{}, {}, {}]
        this.mouseMoveHandler = [{}, {}, {}]
    }

    draw() {
        this.view.ctx.lineWidth = 1;
        this.view.ctx.strokeStyle = '#F2A232';
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[0].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[0].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.lineTo(this.controlPoints[1].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[1].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.stroke();
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[1].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[1].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.lineTo(this.controlPoints[2].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[2].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.stroke();

        this.view.ctx.strokeStyle = 'black';
        this.view.ctx.lineWidth = 3;
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[0].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[0].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.bezierCurveTo(this.controlPoints[1].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[1].y * (window.innerHeight / this.view.initSize.y), this.controlPoints[1].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[1].y * (window.innerHeight / this.view.initSize.y), this.controlPoints[2].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[2].y * (window.innerHeight / this.view.initSize.y));
        this.view.ctx.stroke();

        this.view.ctx.fillStyle = '#F26232';
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[1].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[1].y * (window.innerHeight / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();

        this.view.ctx.fillStyle = 'blue';
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[0].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[0].y * (window.innerHeight / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();

        this.view.ctx.fillStyle = 'blue';
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[2].x * (window.innerWidth / this.view.initSize.x), this.controlPoints[2].y * (window.innerHeight / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();
    }

    addListeners() {

        for(let i = 0; i < this.controlPoints.length; ++i){
            this.mouseDownHandler[i] = (event: any) => {
                if (event.clientX < this.controlPoints[i].x * (window.innerWidth / this.view.initSize.x) + 10 && event.clientX > this.controlPoints[i].x * (window.innerWidth / this.view.initSize.x) - 10
                        && event.clientY < this.controlPoints[i].y * (window.innerHeight / this.view.initSize.y) + 10 && event.clientY > this.controlPoints[i].y * (window.innerHeight / this.view.initSize.y) - 10
                ) {
                    this.dragStart[i] = {
                        x: event.pageX - this.view.canvas.offsetLeft,
                        y: event.pageY - this.view.canvas.offsetTop
                    }

                    this.drag[i] = true;
                }
            };
            this.view.canvas.addEventListener('mousedown', this.mouseDownHandler[i]);

            this.mouseUpHandler[i] = () => {    
                this.drag[i] = false;
            };
            this.view.canvas.addEventListener('mouseup', this.mouseUpHandler[i]);

            this.mouseMoveHandler[i] = (event: any) => {
                if (this.drag[i]) {
                    
                    this.dragEnd[i] = {
                        x: event.pageX - this.view.canvas.offsetLeft,
                        y: event.pageY - this.view.canvas.offsetTop
                    }

                    this.controlPoints[i].x = this.dragEnd[i].x / (window.innerWidth / this.view.initSize.x);
                    this.controlPoints[i].y = this.dragEnd[i].y / (window.innerHeight / this.view.initSize.y);             
                        
                    this.dragStart[i] = this.dragEnd;
                    this.view.resize();
                    this.view.draw();
                }

            };
            this.view.canvas.addEventListener('mousemove', this.mouseMoveHandler[i]);

        }
    }

    removeListener() {
        ////REMOVE LISTENERS
    }
}

class Model {

}

class View {
    canvas: HTMLCanvasElement;
    ctx: any;
    resizeHandle: EventListener | undefined;
    initSize: Point;
    curves: BezierCurve[];

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext("2d");
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.initSize = { x: window.innerWidth, y: window.innerHeight };

        /* fit to the entire window */
        document.body.style.margin = "0";
        this.canvas.style.position = "absolute";
        this.curves = [];
        this.curves.push(new BezierCurve(this, { x: 100, y: 200 }, { x: 300, y: 500 }, { x: 300, y: 1000 }));
        this.curves.push(new BezierCurve(this, { x: 100, y: 500 }, { x: 600, y: 800 }, { x: 850, y: 700 }));
    }

    onResize() {
        this.resize();
        this.draw();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw() {
        this.ctx.fillStyle = "#4363D3";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.curves.forEach(e => {
            e.draw();
        });
    }

    loop() {
        this.resize();
        this.draw();
    }

    addListeners() {
        this.resizeHandle = () => this.onResize();
        window.addEventListener("resize", this.resizeHandle);

        this.curves.forEach(e => {
            e.addListeners();
        });

    }

    removeListener() {
        this.resizeHandle = () => this.onResize();
        window.removeEventListener("resize", this.resizeHandle);
    }

}

class Controller { }


let findAngle = (p0: Point, p1: Point, p2: Point): number => {
    var a = Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2),
        b = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2),
        c = Math.pow(p2.x - p0.x, 2) + Math.pow(p2.y - p0.y, 2);
    return Math.acos((a + b - c) / Math.sqrt(4 * a * b));
}


let mainView: View = new View();
mainView.loop();
mainView.addListeners();
mainView.removeListener();
