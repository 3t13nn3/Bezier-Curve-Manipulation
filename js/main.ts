interface Point {
    x: number;
    y: number;
}

var color1 = "#F7EDE2"
var color2 = "#F6BD60"
var color3 = "#84A59D"
var color4 = "#F28482"
var color5 = "#D5DAB3"
var color6 = "#424874"

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
        this.view.ctx.strokeStyle = color6;
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[0].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[0].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.lineTo(this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.stroke();
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.lineTo(this.controlPoints[2].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[2].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.stroke();
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[2].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[2].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.lineTo(this.controlPoints[0].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[0].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.stroke();

        this.view.ctx.strokeStyle = color2;
        this.view.ctx.lineWidth = 3;
        this.view.ctx.beginPath();
        this.view.ctx.moveTo(this.controlPoints[0].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[0].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.bezierCurveTo(this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y), this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y), this.controlPoints[2].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[2].y * (this.view.canvas.height / this.view.initSize.y));
        this.view.ctx.stroke();

        this.view.ctx.fillStyle = color3;
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();

        this.view.ctx.fillStyle = color4;
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[0].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[0].y * (this.view.canvas.height / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();

        this.view.ctx.fillStyle = color4;
        this.view.ctx.beginPath();
        this.view.ctx.arc(this.controlPoints[2].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[2].y * (this.view.canvas.height / this.view.initSize.y), 7, 0, 2 * Math.PI);  // Point de contrôle n°1
        this.view.ctx.fill();

        this.view.ctx.font = '1.5vw arial bold';
        this.view.ctx.fillText(Math.round(findAngle(this.controlPoints[2], this.controlPoints[0], this.controlPoints[1]) * 100) / 100 + '°', (this.controlPoints[0].x + 15)* (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[0].y + 15)* (this.view.canvas.height / this.view.initSize.y));
        
        this.view.ctx.font = '1.5vw arial bold';
        this.view.ctx.fillText(Math.round(findAngle(this.controlPoints[1], this.controlPoints[2], this.controlPoints[0]) * 100) / 100 + '°', (this.controlPoints[2].x + 15)* (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[2].y + 15)* (this.view.canvas.height / this.view.initSize.y));
        
        this.view.ctx.fillStyle = color3;
        this.view.ctx.font = '1.5vw arial bold';
        this.view.ctx.fillText(Math.round(findAngle(this.controlPoints[0], this.controlPoints[1], this.controlPoints[2]) * 100) / 100 + '°', (this.controlPoints[1].x + 15)* (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[1].y + 15)* (this.view.canvas.height / this.view.initSize.y));



        //CIRCLE
        // this.view.ctx.beginPath();
        // this.view.ctx.arc(50, 50, 50, 0, 2 * Math.PI, false);
        // this.view.ctx.stroke();
        this.view.ctx.fillStyle = color2;
        this.view.ctx.textAlign = "center";
        this.view.ctx.font = '2vw arial bold';
        this.view.ctx.fillText("Bezier Manipulation", window.innerWidth/2 * (this.view.canvas.width / this.view.initSize.x), 75 * (this.view.canvas.height / this.view.initSize.y));

        // this.view.ctx.lineWidth = 1;
        // this.view.ctx.strokeStyle = "#12AF74";
        // this.view.ctx.beginPath();
        // this.view.ctx.moveTo(this.controlPoints[1].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[1].y * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.lineTo((this.controlPoints[0].x + this.controlPoints[2].x)/2 * (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[0].y + this.controlPoints[2].y)/2 * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.stroke();
        // this.view.ctx.lineWidth = 1;
        // this.view.ctx.strokeStyle = "#12AF74";
        // this.view.ctx.beginPath();
        // this.view.ctx.moveTo(this.controlPoints[2].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[2].y * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.lineTo((this.controlPoints[1].x + this.controlPoints[0].x)/2 * (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[1].y + this.controlPoints[0].y)/2 * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.stroke();
        // this.view.ctx.lineWidth = 1;
        // this.view.ctx.strokeStyle = "#12AF74";
        // this.view.ctx.beginPath();
        // this.view.ctx.moveTo(this.controlPoints[0].x * (this.view.canvas.width / this.view.initSize.x), this.controlPoints[0].y * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.lineTo((this.controlPoints[1].x + this.controlPoints[2].x)/2 * (this.view.canvas.width / this.view.initSize.x), (this.controlPoints[1].y + this.controlPoints[2].y)/2 * (this.view.canvas.height / this.view.initSize.y));
        // this.view.ctx.stroke();

        //this.getCurvature();
    }

    addListeners() {

        for(let i = 0; i < this.controlPoints.length; ++i){
            this.mouseDownHandler[i] = (event: any) => {
                
                let currentX = (event.clientX - (window.innerWidth/2 - this.view.canvas.width/2));
                let currentY = (event.clientY - (window.innerHeight/2 - this.view.canvas.height/2));

                if (currentX < this.controlPoints[i].x * (this.view.canvas.width / this.view.initSize.x) + 10 && currentX > this.controlPoints[i].x * (this.view.canvas.width / this.view.initSize.x) - 10
                        && currentY < this.controlPoints[i].y * (this.view.canvas.height / this.view.initSize.y) + 10 && currentY > this.controlPoints[i].y * (this.view.canvas.height / this.view.initSize.y) - 10
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

                    this.controlPoints[i].x = this.dragEnd[i].x / (this.view.canvas.width / this.view.initSize.x);
                    this.controlPoints[i].y = this.dragEnd[i].y / (this.view.canvas.height / this.view.initSize.y);             
                        
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

    getCurvature() {
        let res = 1;

        let a = 3 * (this.controlPoints[1].x - this.controlPoints[0].x)
        let b = 3 * (this.controlPoints[1].x - this.controlPoints[1].x)
        let c = 3 * (this.controlPoints[2].x - this.controlPoints[1].x)

        let aa = 3 * (this.controlPoints[1].y - this.controlPoints[0].y)
        let bb = 3 * (this.controlPoints[1].y - this.controlPoints[1].y)
        let cc = 3 * (this.controlPoints[2].y - this.controlPoints[1].y)

        let u = 2 * (b - a)
        let v = 2 * (c - b)

        let uu = 2 * (bb - aa)
        let vv = 2 * (cc - bb)

        for(let t = 0; t <= 1; t+=0.001){
            let xx = (a * ((1-t) * (1-t))) + (2 * (b) * (1-t) * t) + ((c) * (t * t))
            let yyy = uu * (1 - t) + vv * t
            let xxx = u * (1 - t) + v * t
            let yy = (aa * ((1-t) * (1-t))) + (2 * (bb) * (1-t) * t) + ((cc) * (t * t))
            res = xx * yyy - xxx * yy
            console.log(t, res)
        }
        // console.log(xx)
        // console.log(xxx)
        // console.log(yy)
        // console.log(yyy)

        
        
        
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

        this.initSize = { x: this.canvas.width, y: this.canvas.height };

        /* fit to the entire window */
        document.body.style.margin = "0";
        document.body.style.backgroundColor = color5;
        this.canvas.style.position = "absolute";
        this.curves = [];
        this.curves.push(new BezierCurve(this, { x: 100, y: 200 }, { x: 200, y: 300 }, { x: 300, y: 300 }));
        //this.curves.push(new BezierCurve(this, { x: 100, y: 500 }, { x: 600, y: 800 }, { x: 850, y: 700 }));
    }

    onResize() {
        this.resize();
        this.draw();
    }

    resize() {

        if((window.innerWidth / window.innerHeight) > (16/9)){
            this.canvas.height = window.innerHeight;
            this.canvas.width = this.canvas.height * (16/9);
            this.canvas.style.marginLeft = (window.innerWidth/2 - this.canvas.width/2).toString() + "px";
            this.canvas.style.marginTop = "0px";
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = this.canvas.width * (9/16);
            this.canvas.style.marginTop = (window.innerHeight/2 - this.canvas.height/2).toString() + "px";
            this.canvas.style.marginLeft = "0px";
        }
        
    }

    draw() {
        this.ctx.fillStyle = color1;
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
    return Math.acos((a + b - c) / Math.sqrt(4 * a * b)) * (180/Math.PI);
}


let mainView: View = new View();
mainView.loop();
mainView.addListeners();
mainView.removeListener();
