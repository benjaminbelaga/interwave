import { useEffect, useRef } from 'react';

// A class to represent a single, unique wave-like line
class DriftingLine {
    constructor(canvas, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // --- Randomize properties for variety ---
        
        // Position & Movement
        this.y = y;
        this.phase = Math.random() * Math.PI * 2;
        // Each line has its own horizontal speed and direction
        this.horizontalSpeed = (Math.random() - 0.5) * 0.018; // Augmenté de 0.012 à 0.018 (+50% de variation)
        
        // Direction variation - some waves can go opposite directions
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.secondaryDirection = Math.random() > 0.5 ? 1 : -1;
        
        // Vitesse individuelle plus variée pour créer des mouvements différenciés
        this.speedMultiplier = 0.7 + Math.random() * 0.8; // Entre 0.7x et 1.5x la vitesse de base
        
        // Shape - more curves throughout
        const amplitudeVariation = Math.random();
        if (amplitudeVariation < 0.2) {
            // 20% chance of pronounced waves
            this.amplitude = Math.random() * 40 + 30; // 30-70px amplitude (increased)
        } else {
            // 80% chance of medium waves with more curve
            this.amplitude = Math.random() * 25 + 12; // 12-37px amplitude (increased)
        }
        
        // Frequency for more natural wave patterns
        this.frequency = Math.random() * 0.005 + 0.0025; // Slightly increased for more curves
        
        // Line thickness variation - plus épais et plus visible
        this.lineWidth = Math.random() * 1.2 + 0.8; // Augmenté de (0.8 + 0.3) à (1.2 + 0.8) = 0.8-2.0px
        
        // Color - picked from a predefined palette with increased opacity for visibility
        const oceanBlues = [
            'rgba(70, 130, 180, 0.7)',   // Steel Blue - augmenté pour plus de visibilité
            'rgba(100, 149, 237, 0.7)',  // Cornflower Blue
            'rgba(0, 191, 255, 0.7)',    // Deep Sky Blue
            'rgba(173, 216, 230, 0.6)',  // Light Blue
            'rgba(95, 158, 160, 0.7)',   // Cadet Blue
            'rgba(135, 206, 250, 0.6)',  // Light Sky Blue
            'rgba(64, 224, 208, 0.7)',   // Turquoise
        ];
        this.color = oceanBlues[Math.floor(Math.random() * oceanBlues.length)];
        
        // Organic variation parameters
        this.noiseOffset = Math.random() * 1000;
        this.irregularityFactor = Math.random() * 0.4 + 0.15; // Increased irregularity
        
        // Secondary wave for complexity with different direction
        this.secondaryAmplitude = this.amplitude * (0.15 + Math.random() * 0.3); // Increased secondary
        this.secondaryFrequency = this.frequency * (1.3 + Math.random() * 1.2);
        this.secondaryPhaseOffset = Math.random() * Math.PI * 2;
    }

    // Enhanced noise function for more organic variation
    noise(x) {
        return Math.sin(x * 0.008 + this.noiseOffset) * 0.4 + 
               Math.sin(x * 0.015 + this.noiseOffset * 1.7) * 0.25 +
               Math.cos(x * 0.005 + this.noiseOffset * 0.8) * 0.15;
    }

    draw(time, mouse) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();

        // --- Mouse Interaction ---
        const mouseAmplitudeEffect = 1 + (mouse.y - 0.5) * 0.7; // Slightly increased
        const mouseFrequencyEffect = 1 + (mouse.x - 0.5) * -0.4;

        // The phase is updated over time with directional variation
        const currentPhase = this.phase + time * this.horizontalSpeed * this.direction * this.speedMultiplier;
        const secondaryPhase = this.secondaryPhaseOffset + time * this.horizontalSpeed * this.secondaryDirection * 0.8 * this.speedMultiplier;

        for (let x = -10; x <= this.canvas.width / window.devicePixelRatio + 10; x += 4) {
            
            // Primary wave with organic variation and directional flow
            const baseWave = Math.sin(x * this.frequency * mouseFrequencyEffect + currentPhase);
            
            // Add organic irregularity with more variation
            const organicVariation = this.noise(x + time * 0.12) * this.irregularityFactor;
            
            // Primary wave with organic touch and directional flow
            const primaryWave = (baseWave + organicVariation) * this.amplitude * mouseAmplitudeEffect * this.direction;
            
            // Secondary wave with opposite or different direction
            const secondaryBase = Math.sin(x * this.secondaryFrequency * mouseFrequencyEffect + secondaryPhase);
            const secondaryWave = secondaryBase * this.secondaryAmplitude * mouseAmplitudeEffect * this.secondaryDirection;
            
            // Additional subtle tertiary wave for more natural complexity
            const tertiaryWave = Math.cos(x * this.frequency * 0.7 * mouseFrequencyEffect + currentPhase * 1.6) * 
                               this.amplitude * 0.1 * mouseAmplitudeEffect;
            
            // Combine waves with different directions
            const combinedWave = primaryWave + secondaryWave + tertiaryWave;
            
            const finalY = this.y + combinedWave;
            
            if (x === -10) {
                this.ctx.moveTo(x, finalY);
            } else {
                this.ctx.lineTo(x, finalY);
            }
        }
        
        this.ctx.stroke();
    }
}


const WaveEffect = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 }); // Normalized coords
    const animationRef = useRef();
    const linesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // --- Configuration ---
        const LINE_COUNT = 28; // Reduced by 30% from 40
        let time = 0;

        // --- Initialization & Resizing ---
        const init = () => {
            // HiDPI setup for crisp lines
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            // Create a new set of random lines
            linesRef.current = [];
            for (let i = 0; i < LINE_COUNT; i++) {
                const y = (canvas.height / window.devicePixelRatio / (LINE_COUNT - 1)) * i;
                linesRef.current.push(new DriftingLine(canvas, y));
            }
        };

        // --- Mouse Tracking ---
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        
        // --- Animation Loop ---
        const animate = () => {
            if (!ctx) return;

            // Clear canvas avec une méthode plus robuste pour éviter les traces
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
            
            // Alternative plus robuste: remplir avec une couleur transparente
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
            
            // Réinitialiser les propriétés de dessin
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            
            // Draw all lines
            linesRef.current.forEach(line => line.draw(time, mouseRef.current));

            time += 0.6; // Augmenté de 0.5 à 0.6 (+20% plus rapide)
            animationRef.current = requestAnimationFrame(animate);
        };

        // --- Start ---
        init();
        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
};

export default WaveEffect; 