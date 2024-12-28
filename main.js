class Resistor {
  /**
  * @typedef {{ x: number, y: number }} Dimentions
  * @param {CanvasRenderingContext2D} ctx 
  * @param {Dimentions} dimentions 
  */constructor(ctx, dimentions) {
    this.ctx = ctx;
    this.dim = dimentions;
    this.w = 50;
    this.h = 20;
  }

  draw() {
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.dim.x, this.dim.y, this.w, this.h);

      this.ctx.beginPath();
      this.ctx.moveTo(this.dim.x, this.dim.y + this.h / 2)
      this.ctx.lineTo(this.dim.x - this.w/4, this.dim.y + this.h / 2)
      this.ctx.moveTo(this.dim.x + this.w, this.dim.y + this.h / 2)
      this.ctx.lineTo(this.dim.x + this.w + this.w/4, this.dim.y + this.h / 2)
      this.ctx.stroke();
  }

  /**
  * @param {number} mouseX 
  * @param {number} mouseY 
  */isMouseOver(mouseX, mouseY) {
    return mouseX >= this.dim.x
        && mouseX <= this.dim.x + this.w
        && mouseY >= this.dim.y
        && mouseY <= this.dim.y + this.h;
  }
}

/**@type {(a: Dimentions, b: Dimentions) => Dimentions} */
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

main()
function main() {
  const canvas = /**@type {HTMLCanvasElement}*/(document.getElementById("main"));
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Couldn't get canvas context");
    return;
  }

  let /**@type {Resistor[]}*/objects = [];
  objects.push(new Resistor(ctx, { x: 100, y: 100 }));
  objects.push(new Resistor(ctx, { x: 200, y: 100 }));

  const drawFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(resistor => resistor.draw());
  }

  let /**@type {Resistor | undefined}*/holdedObject;
  canvas.addEventListener("mousedown", e => {
    if (e.button != 0) return;

    holdedObject = objects
      .find(resistor => resistor.isMouseOver(e.offsetX, e.offsetY));
  })
  canvas.addEventListener("mouseup", e => {
    if (e.button != 0) return;

    holdedObject = undefined;
  })
  canvas.addEventListener("mousemove", e => {
    if (!holdedObject) return;

    holdedObject.dim = add(holdedObject.dim, {x: e.movementX, y: e.movementY});
    drawFrame();
  });

  drawFrame();
}
