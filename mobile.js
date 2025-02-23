let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) return;

      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ++;
      this.prevTouchX = e.touches[0].clientX;
      this.prevTouchY = e.touches[0].clientY;
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper || e.touches.length > 1) return;
      
      let dx = e.touches[0].clientX - this.prevTouchX;
      let dy = e.touches[0].clientY - this.prevTouchY;

      this.currentPaperX += dx;
      this.currentPaperY += dy;
      this.prevTouchX = e.touches[0].clientX;
      this.prevTouchY = e.touches[0].clientY;

      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    this.paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
