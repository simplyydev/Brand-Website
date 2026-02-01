
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Pause, Play, RotateCcw, ArrowLeftRight } from 'lucide-react';
import './CardScanner.css';

// --- Helper Functions ---
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr: any[]) => arr[randInt(0, arr.length - 1)];

// --- CardStreamController Class ---
class CardStreamController {
  container: HTMLElement;
  cardLine: HTMLElement;
  speedIndicator: HTMLElement;
  position: number = 0;
  velocity: number = 120;
  direction: number = -1;
  isAnimating: boolean = true;
  isDragging: boolean = false;
  lastTime: number = 0;
  lastMouseX: number = 0;
  mouseVelocity: number = 0;
  friction: number = 0.95;
  minVelocity: number = 30;
  containerWidth: number = 0;
  cardLineWidth: number = 0;
  animationFrameId: number | null = null;

  constructor(container: HTMLElement, cardLine: HTMLElement, speedIndicator: HTMLElement) {
    this.container = container;
    this.cardLine = cardLine;
    this.speedIndicator = speedIndicator;
  }

  init() {
    this.populateCardLine();
    this.calculateDimensions();
    this.updateCardPosition();
    this.animate();
    this.startPeriodicUpdates();
  }

  calculateDimensions() {
    this.containerWidth = this.container.offsetWidth;
    const cardWidth = 400; // Fixed in CSS
    const cardGap = 60;    // Fixed in CSS
    const cardCount = this.cardLine.children.length;
    this.cardLineWidth = (cardWidth + cardGap) * cardCount;
  }

  handleDragStart(clientX: number) {
    this.isDragging = true;
    this.isAnimating = false;
    this.lastMouseX = clientX;
    this.mouseVelocity = 0;
    
    // Get current transform
    const transform = window.getComputedStyle(this.cardLine).transform;
    if (transform !== "none") {
      const matrix = new DOMMatrix(transform);
      this.position = matrix.m41;
    }
    this.cardLine.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }

  handleDragMove(clientX: number) {
    if (!this.isDragging) return;
    const deltaX = clientX - this.lastMouseX;
    this.position += deltaX;
    this.mouseVelocity = deltaX * 60;
    this.lastMouseX = clientX;
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
  }

  handleDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.cardLine.classList.remove("dragging");
    if (Math.abs(this.mouseVelocity) > this.minVelocity) {
      this.velocity = Math.abs(this.mouseVelocity);
      this.direction = this.mouseVelocity > 0 ? 1 : -1;
    } else {
      this.velocity = 120;
    }
    this.isAnimating = true;
    this.updateSpeedIndicator();
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (this.isAnimating && !this.isDragging) {
      if (this.velocity > this.minVelocity) {
        this.velocity *= this.friction;
      } else {
        this.velocity = Math.max(this.minVelocity, this.velocity);
      }
      this.position += this.velocity * this.direction * deltaTime;
      this.updateCardPosition();
      this.updateSpeedIndicator();
    }
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  updateCardPosition() {
    // Infinite Scroll Logic
    if (this.position < -this.cardLineWidth) {
      this.position = this.containerWidth;
    } else if (this.position > this.containerWidth) {
      this.position = -this.cardLineWidth;
    }
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
  }

  updateSpeedIndicator() {
    if (this.speedIndicator) {
        this.speedIndicator.textContent = Math.round(this.velocity).toString();
    }
  }

  toggleAnimation() {
    this.isAnimating = !this.isAnimating;
    return this.isAnimating;
  }

  resetPosition() {
    this.position = this.containerWidth;
    this.velocity = 120;
    this.direction = -1;
    this.isAnimating = true;
    this.isDragging = false;
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.cardLine.classList.remove("dragging");
    this.updateSpeedIndicator();
  }

  changeDirection() {
    this.direction *= -1;
    this.updateSpeedIndicator();
  }

  generateCode(width: number, height: number) {
    const header = [
      "// compiled preview • scanner demo",
      "/* generated for visual effect */",
      "const SCAN_WIDTH = 8;",
      "const FADE_ZONE = 35;",
      "const MAX_PARTICLES = 2500;",
    ];
    const helpers = [
      "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
      "function lerp(a, b, t) { return a + (b - a) * t; }",
      "const now = () => performance.now();",
    ];
    
    // Build dummy code library
    const library = [...header, ...helpers];
    for(let i=0; i<30; i++) library.push(`const v${i} = Math.random() * ${i};`);

    let flow = library.join(" ");
    flow = flow.replace(/\s+/g, " ").trim();
    const totalChars = width * height;
    while (flow.length < totalChars + width) {
      const extra = pick(library).replace(/\s+/g, " ").trim();
      flow += " " + extra;
    }

    let out = "";
    let offset = 0;
    for (let row = 0; row < height; row++) {
      let line = flow.slice(offset, offset + width);
      if (line.length < width) line = line + " ".repeat(width - line.length);
      out += line + (row < height - 1 ? "\n" : "");
      offset += width;
    }
    return out;
  }

  calculateCodeDimensions(cardWidth: number, cardHeight: number) {
    const fontSize = 11;
    const lineHeight = 13;
    const charWidth = 6;
    const width = Math.floor(cardWidth / charWidth);
    const height = Math.floor(cardHeight / lineHeight);
    return { width, height, fontSize, lineHeight };
  }

  createCardWrapper(index: number) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";

    const normalCard = document.createElement("div");
    normalCard.className = "card card-normal";

    const cardImages = [
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
    ];

    const cardImage = document.createElement("img");
    cardImage.className = "card-image";
    cardImage.src = cardImages[index % cardImages.length];
    cardImage.alt = "Credit Card";
    normalCard.appendChild(cardImage);

    const asciiCard = document.createElement("div");
    asciiCard.className = "card card-ascii";

    const asciiContent = document.createElement("div");
    asciiContent.className = "ascii-content";
    const { width, height, fontSize, lineHeight } = this.calculateCodeDimensions(400, 250);
    asciiContent.style.fontSize = fontSize + "px";
    asciiContent.style.lineHeight = lineHeight + "px";
    asciiContent.textContent = this.generateCode(width, height);

    asciiCard.appendChild(asciiContent);
    wrapper.appendChild(normalCard);
    wrapper.appendChild(asciiCard);
    return wrapper;
  }

  updateCardClipping() {
    // Logic needs to know where the scanner is relative to the viewport/container.
    // The component centers the scanner in the container.
    const rect = this.container.getBoundingClientRect();
    const scannerX = rect.left + rect.width / 2;
    const scannerWidth = 8;
    const scannerLeft = scannerX - scannerWidth / 2;
    const scannerRight = scannerX + scannerWidth / 2;
    let anyScanningActive = false;

    // We need to query wrappers inside our container
    const wrappers = this.cardLine.querySelectorAll(".card-wrapper") as NodeListOf<HTMLElement>;
    
    wrappers.forEach((wrapper) => {
      const cardRect = wrapper.getBoundingClientRect();
      const cardLeft = cardRect.left;
      const cardRight = cardRect.right;
      const cardWidth = cardRect.width;

      const normalCard = wrapper.querySelector(".card-normal") as HTMLElement;
      const asciiCard = wrapper.querySelector(".card-ascii") as HTMLElement;

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true;
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);
        
        // Scan Effect div
        if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
            wrapper.setAttribute("data-scanned", "true");
            const scanEffect = document.createElement("div");
            scanEffect.className = "scan-effect";
            wrapper.appendChild(scanEffect);
            setTimeout(() => {
                scanEffect.remove();
            }, 600);
        }

      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
        wrapper.removeAttribute("data-scanned");
      }
    });

    // Dispatch custom event or callback? 
    // For now we will update the scanner bar visual state via a class on the scanner element?
    // We can dispatch an event to the react component.
    const event = new CustomEvent('scanner-state', { detail: { active: anyScanningActive } });
    this.container.dispatchEvent(event);
  }

  updateAsciiContent() {
    const contents = this.cardLine.querySelectorAll(".ascii-content");
    contents.forEach((content) => {
      if (Math.random() < 0.15) {
        const { width, height } = this.calculateCodeDimensions(400, 250);
        content.textContent = this.generateCode(width, height);
      }
    });
  }

  populateCardLine() {
    this.cardLine.innerHTML = "";
    const cardsCount = 20; // Reduced from 30 for performance
    for (let i = 0; i < cardsCount; i++) {
      const cardWrapper = this.createCardWrapper(i);
      this.cardLine.appendChild(cardWrapper);
    }
  }

  startPeriodicUpdates() {
    // ASCII Update
    setInterval(() => this.updateAsciiContent(), 200);
    // Clipping Update Frame
    const loop = () => {
        this.updateCardClipping();
        requestAnimationFrame(loop);
    };
    loop();
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }
}

// --- Particle Components (System & Scanner) ---
// Simplified slightly for React context

class ParticleSystem {
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points | null = null;
    particleCount: number = 400;
    canvas: HTMLCanvasElement;
    velocities: Float32Array = new Float32Array(0);
  
    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
      this.canvas = canvas;
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-width / 2, width / 2, 125, -125, 1, 1000);
      this.camera.position.z = 100;
      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      this.renderer.setSize(width, height); // Fixed height 250 in CSS
      this.renderer.setClearColor(0x000000, 0);
      this.createParticles(width);
      this.animate();
    }
  
    createParticles(width: number) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(this.particleCount * 3);
      const colors = new Float32Array(this.particleCount * 3);
      const sizes = new Float32Array(this.particleCount);
      const velocities = new Float32Array(this.particleCount);
      const alphas = new Float32Array(this.particleCount);
  
      // Create texture
      const canvas = document.createElement("canvas");
      canvas.width = 100; canvas.height = 100;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(50, 50, 0, 50, 50, 50);
      grad.addColorStop(0.025, "#fff");
      grad.addColorStop(1, "transparent"); // Simple white/transparent glow
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(50, 50, 50, 0, Math.PI * 2); ctx.fill();
      const texture = new THREE.CanvasTexture(canvas);
  
      for (let i = 0; i < this.particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * width * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
        positions[i * 3 + 2] = 0;
        
        // Purple tint
        colors[i * 3] = 0.5; // R
        colors[i * 3 + 1] = 0.3; // G
        colors[i * 3 + 2] = 1.0; // B
        
        sizes[i] = (Math.random() * 140 + 60) / 8;
        velocities[i] = Math.random() * 60 + 30;
        alphas[i] = Math.random();
      }
  
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
      this.velocities = velocities;
  
      const material = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: texture }, size: { value: 15.0 } },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          varying vec3 vColor;
          uniform float size;
          void main() {
            vAlpha = alpha;
            vColor = color;
            gl_PointSize = size;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });
  
      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    }
  
    animate = () => {
      requestAnimationFrame(this.animate);
      if (this.particles && this.particles.geometry.attributes.position) {
        const positions = this.particles.geometry.attributes.position.array as Float32Array;
        const alphas = this.particles.geometry.attributes.alpha.array as Float32Array; 
        const time = Date.now() * 0.001;
  
        for (let i = 0; i < this.particleCount; i++) {
          positions[i * 3] += this.velocities[i] * 0.016;
          // Loop
          // We need width from somewhere, using internal 'width' storage or just check bound
           // (Approximated bound check)
           if (positions[i * 3] > 2000) positions[i * 3] = -2000;
  
          positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
          alphas[i] = Math.max(0, Math.min(1, alphas[i] + (Math.random() > 0.5 ? 0.05 : -0.05)));
        }
        this.particles.geometry.attributes.position.needsUpdate = true;
        this.particles.geometry.attributes.alpha.needsUpdate = true;
      }
      this.renderer.render(this.scene, this.camera);
    }

    resize(width: number) {
        this.renderer.setSize(width, 250);
        this.camera.left = -width / 2;
        this.camera.right = width / 2;
        this.camera.updateProjectionMatrix();
    }
  }


// --- Main Component ---

const CardScanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerDivRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  
  // Controllers
  const controllerRef = useRef<CardStreamController | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cardLineRef.current || !speedRef.current) return;

    // Initialize Controller
    const controller = new CardStreamController(
      containerRef.current,
      cardLineRef.current,
      speedRef.current
    );
    controller.init();
    controllerRef.current = controller;

    // Initialize Particle System (Background)
    if (particleCanvasRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        particleSystemRef.current = new ParticleSystem(particleCanvasRef.current, offsetWidth, 250);
    }

    // Event Listeners for Drag (on Container/Document)
    const handleDown = (e: MouseEvent | TouchEvent) => {
        // Only trigger if on cardline
        if (e.target instanceof Node && cardLineRef.current?.contains(e.target as Node)) {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            controller.handleDragStart(clientX);
        }
    };
    const handleMove = (e: MouseEvent | TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        controller.handleDragMove(clientX);
    };
    const handleUp = () => controller.handleDragEnd();

    // Listeners must be attached to document for move/up to work globally
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    
    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width } = entry.contentRect;
            controller.calculateDimensions();
            if (particleSystemRef.current) particleSystemRef.current.resize(width);
        }
    });
    resizeObserver.observe(containerRef.current);

    // Scanner State Listener
    const onScannerState = (e: Event) => {
        const active = (e as CustomEvent).detail.active;
        if (scannerDivRef.current) {
            if (active) scannerDivRef.current.classList.add('active');
            else scannerDivRef.current.classList.remove('active');
        }
    };
    containerRef.current.addEventListener('scanner-state', onScannerState);

    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      containerRef.current?.removeEventListener('scanner-state', onScannerState);
      resizeObserver.disconnect();
      controller.destroy();
    };
  }, []);

  const toggle = () => {
    if (controllerRef.current) {
      const playing = controllerRef.current.toggleAnimation();
      setIsPlaying(playing);
    }
  };

  const reset = () => controllerRef.current?.resetPosition();
  const changeDir = () => controllerRef.current?.changeDirection();

  return (
    <div className="card-scanner-wrapper" ref={containerRef}>
      {/* Controls */}
      <div className="controls">
        <button className="control-btn flex items-center gap-2" onClick={toggle}>
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="control-btn flex items-center gap-2" onClick={reset}>
          <RotateCcw size={12} /> Reset
        </button>
        <button className="control-btn flex items-center gap-2" onClick={changeDir}>
          <ArrowLeftRight size={12} /> Direction
        </button>
      </div>

      <div className="speed-indicator">
        Speed: <span ref={speedRef}>120</span> px/s
      </div>

      {/* Canvases */}
      <canvas id="particleCanvas" ref={particleCanvasRef}></canvas>
      <canvas id="scannerCanvas" ref={scannerCanvasRef}></canvas> 
      
      {/* Scanner Visual */}
      <div className="scanner" ref={scannerDivRef}></div>

      {/* Content Stream */}
      <div className="card-stream">
        <div className="card-line" ref={cardLineRef}></div>
      </div>

      <div className="inspiration-credit">
        Inspired by <a href="https://evervault.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">@evervault.com</a>
      </div>
    </div>
  );
};

export default CardScanner;
