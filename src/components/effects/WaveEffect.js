import { useEffect, useRef } from 'react';

const WaveEffect = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef();
    const waveConfigRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        // Générateur de seed pour cohérence pendant la session
        const sessionSeed = Math.random() * 1000;
        const seededRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        // Configuration aléatoire TRÈS variée pour unicité
        const generateWaveConfig = () => {
            const layerCount = Math.floor(seededRandom(sessionSeed) * 3) + 3; // 3-5 couches
            const layers = [];

            // Paramètres globaux uniques pour cette session
            const globalDirection = seededRandom(sessionSeed + 1000) > 0.5 ? 1 : -1; // Direction générale
            const globalTempo = 0.16 + seededRandom(sessionSeed + 2000) * 0.07; // Tempo général (0.16 à 0.23)
            const globalStyle = Math.floor(seededRandom(sessionSeed + 3000) * 4); // Style 0-3

            console.log(`🌊 Style unique: ${globalStyle}, Tempo: ${globalTempo.toFixed(2)}, Direction: ${globalDirection > 0 ? 'droite' : 'gauche'}`);

            for (let i = 0; i < layerCount; i++) {
                // Chaque couche a ses propres caractéristiques uniques
                const layerDirection = seededRandom(sessionSeed + i * 17) > 0.3 ? globalDirection : -globalDirection;
                const hasBreaks = seededRandom(sessionSeed + i * 19) > 0.7; // 30% chance d'avoir des pauses
                const isPulsing = seededRandom(sessionSeed + i * 21) > 0.8; // 20% chance de pulser
                const isReverse = seededRandom(sessionSeed + i * 23) > 0.85; // 15% chance d'aller à l'envers

                // --- Prévention des formes indésirables ---
                // Fréquence de base
                let baseFrequency = 0.005 + seededRandom(sessionSeed + i * 31) * 0.008; // 0.005 à 0.013
                // S'assurer que les fréquences des couches ne sont pas des multiples simples
                if (i > 0) {
                    const prevFreq = layers[i - 1].frequency;
                    const ratio = baseFrequency / prevFreq;
                    if (ratio > 1.8 && ratio < 2.2) { // Éviter le ratio ~2x
                        baseFrequency *= 1.4;
                    }
                }
                
                const layer = {
                    // Amplitude contrôlée pour éviter une vague dominante
                    baseAmplitude: seededRandom(sessionSeed + i * 29) * 25 + 15, // Max réduit
                    
                    frequency: baseFrequency,

                    // --- Vitesse bridée ---
                    // Vitesse max réduite et ralentie par le tempo global
                    speed: (seededRandom(sessionSeed + i * 39) * 0.003 + 0.0015) * globalTempo * layerDirection,
                    
                    // Phase initiale unique
                    phase: seededRandom(sessionSeed + i * 41) * Math.PI * 4,
                    
                    // Position Y variée
                    baseY: 0.25 + (i * 0.18) + seededRandom(sessionSeed + i * 43) * 0.15,
                    
                    // Type d'onde avec plus de variété
                    waveType: Math.floor(seededRandom(sessionSeed + i * 45) * 4), // 0-3 maintenant
                    
                    // Couleur dans une palette unique (sans rose)
                    hue: globalStyle === 0 ? 
                        180 + seededRandom(sessionSeed + i * 47) * 35 : // Cyan-bleu (180-215)
                        globalStyle === 1 ?
                        200 + seededRandom(sessionSeed + i * 49) * 25 : // Bleu pur (200-225)
                        globalStyle === 2 ?
                        160 + seededRandom(sessionSeed + i * 51) * 40 : // Cyan-vert-bleu (160-200)
                        170 + seededRandom(sessionSeed + i * 53) * 40,   // Cyan-bleu mixte (170-210)
                    
                    // Opacité variable
                    opacity: (0.7 - i * 0.1) * (0.7 + seededRandom(sessionSeed + i * 55) * 0.4),
                    
                    // Propriétés uniques
                    direction: layerDirection,
                    hasBreaks: hasBreaks,
                    breakFrequency: hasBreaks ? seededRandom(sessionSeed + i * 57) * 0.02 + 0.01 : 0,
                    isPulsing: isPulsing,
                    pulseSpeed: isPulsing ? seededRandom(sessionSeed + i * 59) * 0.02 + 0.01 : 0, // Pulse plus lent
                    isReverse: isReverse,
                    
                    // Complexité réduite pour éviter les pics
                    complexity: seededRandom(sessionSeed + i * 61) * 0.7,
                    distortion: seededRandom(sessionSeed + i * 63) * 0.35
                };
                layers.push(layer);
            }

            return { 
                layers, 
                globalStyle, 
                globalTempo, 
                globalDirection,
                sessionSeed // Pour debug
            };
        };

        // Initialize configuration
        if (!waveConfigRef.current) {
            waveConfigRef.current = generateWaveConfig();
            console.log('🌊 Configuration unique générée:', waveConfigRef.current);
        }

        // Resize canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Mouse tracking
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        // Calcul de vague complexe et unique
        const calculateWaveY = (x, layerConfig, time, mouseInfluenceH = 1, mouseInfluenceV = 1) => {
            let y = 0;
            
            // Effet de pause aléatoire
            let timeMultiplier = 1;
            if (layerConfig.hasBreaks) {
                timeMultiplier = Math.abs(Math.sin(time * layerConfig.breakFrequency)) > 0.3 ? 1 : 0.2;
            }
            
            // Effet de pulse
            if (layerConfig.isPulsing) {
                timeMultiplier *= 0.7 + 0.3 * Math.sin(time * layerConfig.pulseSpeed);
            }
            
            const effectiveTime = time * timeMultiplier;
            const effectiveX = layerConfig.isReverse ? -x : x;

            // Types d'ondes étendus
            if (layerConfig.waveType === 0) {
                // Sinusoïdale pure
                y = Math.sin(effectiveX * layerConfig.frequency + effectiveTime * layerConfig.speed + layerConfig.phase);
            } else if (layerConfig.waveType === 1) {
                // Cosinusoïdale pure
                y = Math.cos(effectiveX * layerConfig.frequency + effectiveTime * layerConfig.speed + layerConfig.phase);
            } else if (layerConfig.waveType === 2) {
                // Onde complexe mixte
                y = (Math.sin(effectiveX * layerConfig.frequency + effectiveTime * layerConfig.speed + layerConfig.phase) + 
                     Math.cos(effectiveX * layerConfig.frequency * 1.3 + effectiveTime * layerConfig.speed * 0.8 + layerConfig.phase)) * 0.5;
            } else {
                // Onde distordue (nouveau)
                const base = Math.sin(effectiveX * layerConfig.frequency + effectiveTime * layerConfig.speed + layerConfig.phase);
                y = base + Math.sin(base * 3 + effectiveTime * 0.1) * layerConfig.distortion;
            }

            // Ajouter de la complexité basée sur le paramètre
            if (layerConfig.complexity > 0.5) {
                y += Math.sin(effectiveX * layerConfig.frequency * 2.1 + effectiveTime * layerConfig.speed * 1.3) * 0.3 * layerConfig.complexity;
            }

            return y * layerConfig.baseAmplitude * mouseInfluenceH * mouseInfluenceV;
        };

        // Main animation loop
        const animate = () => {
            if (!ctx || !waveConfigRef.current) return;

            // Clear canvas proprement
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Mouse influence calculation
            const mouseX = mouseRef.current.x / canvas.width;
            const mouseY = mouseRef.current.y / canvas.height;
            const centerX = canvas.width / 2;
            const mouseDistance = Math.abs(mouseRef.current.x - centerX) / centerX;

            // Draw wave layers avec leurs propriétés uniques
            waveConfigRef.current.layers.forEach((layer, index) => {
                ctx.save();
                
                // Couleur qui change avec la position verticale de la souris
                const saturation = 70 + mouseDistance * 30 + layer.complexity * 15;
                const lightness = 50 + mouseY * 20 + (layer.isPulsing ? Math.sin(time * layer.pulseSpeed) * 8 : 0);
                let alpha = layer.opacity * (0.8 + mouseY * 0.3);
                
                // Effet de clignotement pour les couches avec pauses
                if (layer.hasBreaks && Math.sin(time * layer.breakFrequency) < -0.5) {
                    alpha *= 0.4;
                }
                
                ctx.strokeStyle = `hsla(${layer.hue}, ${saturation}%, ${lightness}%, ${alpha})`;
                ctx.lineWidth = 1.8 - index * 0.2;
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';

                // Mouse influence horizontal (amplitude)
                const horizontalInfluence = 1 + mouseDistance * 0.7 * (1 - index * 0.1);
                
                // Mouse influence vertical (fréquence et décalage Y)
                const verticalInfluence = 1 + (1 - mouseY) * 0.9;
                const verticalOffset = (mouseY - 0.5) * 80 * layer.direction;

                // Boost de fréquence horizontal
                const frequencyBoost = 1 + mouseX * 0.5 * (1 - index * 0.15);

                // Create wave path
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x += 1.5) { // Smaller steps for smoother lines
                    const baseY = canvas.height * layer.baseY + verticalOffset;
                    const waveY = calculateWaveY(x, {
                        ...layer,
                        frequency: layer.frequency * frequencyBoost
                    }, time, horizontalInfluence, verticalInfluence);
                    
                    const finalY = baseY + waveY;

                    if (x === 0) {
                        ctx.moveTo(x, finalY);
                    } else {
                        ctx.lineTo(x, finalY);
                    }
                }
                ctx.stroke();
                ctx.restore();
            });

            // Ralentir l'animation globale pour une sensation plus douce
            time += 0.5; // Réduit de 0.7 à 0.5

            animationRef.current = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
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