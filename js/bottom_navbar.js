class WaveNavbar {
    constructor() {
        this.canvas = document.getElementById('wave-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.time = 0;
        this.waves = [
            { amplitude: 15, frequency: 0.02, speed: 0.03, offset: 0, color: '#e6c88e' },
            { amplitude: 12, frequency: 0.025, speed: 0.025, offset: Math.PI, color: '#d4b16a' },
            { amplitude: 10, frequency: 0.03, speed: 0.02, offset: Math.PI/2, color: '#c19c4f' }
        ];
        
        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    drawWave(wave, layerIndex) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);

        // Create smooth wave using quadratic curves
        for (let x = 0; x <= this.width; x += 5) {
            const y = this.height - 30 + 
                Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude +
                Math.sin(x * wave.frequency * 1.5 + this.time * wave.speed * 0.7) * (wave.amplitude * 0.5);
            
            if (x === 0) {
                this.ctx.lineTo(x, y);
            } else {
                // Use quadratic curves for smoothness
                const prevX = x - 5;
                const prevY = this.height - 30 + 
                    Math.sin(prevX * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude +
                    Math.sin(prevX * wave.frequency * 1.5 + this.time * wave.speed * 0.7) * (wave.amplitude * 0.5);
                
                this.ctx.quadraticCurveTo(prevX + 2.5, (prevY + y) / 2, x, y);
            }
        }

        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();

        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, wave.color + '80'); // Semi-transparent
        gradient.addColorStop(1, wave.color);

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Add subtle glow effect
        this.ctx.shadowColor = wave.color;
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetY = -2;
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;

        // Draw waves from back to front
        this.waves.forEach((wave, index) => {
            this.drawWave(wave, index);
        });

        this.time += 0.5;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
            }, 100);
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize);
    }
}

// Initialize the wave navbar
const waveNavbar = new WaveNavbar();

// Optional: Add interactive effects
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseInfluence = (mouseX / window.innerWidth - 0.5) * 0.1;
    
    // Slightly modify wave properties based on mouse position
    waveNavbar.waves.forEach((wave, index) => {
        wave.speed = 0.02 + mouseInfluence * (index + 1) * 0.01;
    });
});
