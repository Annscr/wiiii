let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;
      
      let dx = e.clientX - this.prevMouseX;
      let dy = e.clientY - this.prevMouseY;

      this.currentPaperX += dx;
      this.currentPaperY += dy;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
