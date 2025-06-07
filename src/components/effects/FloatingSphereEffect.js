import { useEffect, useRef } from 'react';

const FloatingSphereEffect = () => {
	const canvasRef = useRef(null);
	const animationRef = useRef();
	const spheresRef = useRef([]);
	const mouseRef = useRef({ x: null, y: null });
	const interactionModeRef = useRef('parallax'); // 'parallax' ou 'dynamic'

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// Configuration du mode d'interaction: alternatif aléatoire
		const sessionSeed = Math.random();
		interactionModeRef.current = sessionSeed > 0.5 ? 'parallax' : 'dynamic';
		console.log(`🔮 Mode sphères: ${interactionModeRef.current}`);

		// Classe pour les sphères flottantes
		class Sphere {
			constructor(x, y, radius, color, depth = 1) {
				this.baseX = x;      // position de base
				this.baseY = y;
				this.x = x;
				this.y = y;
				this.radius = radius;
				this.color = color;
				this.depth = depth;  // profondeur pour effet parallax
				
				// Paramètres pour le mouvement ondulant
				this.phaseX = Math.random() * 2 * Math.PI;
				this.phaseY = Math.random() * 2 * Math.PI;
				this.speedX = (0.3 + Math.random() * 0.4) * 0.008;  // vitesses angulaires variées
				this.speedY = (0.3 + Math.random() * 0.4) * 0.008;
				this.ampX = 30 + Math.random() * 80;     // amplitude oscillation X
				this.ampY = 30 + Math.random() * 80;     // amplitude oscillation Y
				
				// Paramètres pour mouvement physique (mode dynamic)
				this.vx = (Math.random() * 2 - 1) * 0.3;
				this.vy = (Math.random() * 2 - 1) * 0.3;
				this.friction = 0.96;
				this.returnForce = 0.02; // force de retour vers position de base
				
				// Propriétés visuelles avancées
				this.pulsePhase = Math.random() * Math.PI * 2;
				this.pulseSpeed = 0.02 + Math.random() * 0.03;
				this.maxOpacity = 0.3 + Math.random() * 0.4;
				this.glowIntensity = 0.5 + Math.random() * 0.5;
				
				// Paramètres uniques de rotation et distorsion
				this.rotationSpeed = (Math.random() * 2 - 1) * 0.01;
				this.scaleVariation = 0.8 + Math.random() * 0.4;
				this.distortionPhase = Math.random() * Math.PI * 2;
			}

			update(mouseX, mouseY, canvasWidth, canvasHeight, time) {
				if (interactionModeRef.current === 'parallax') {
					// Mouvement ondulant fluide
					this.phaseX += this.speedX;
					this.phaseY += this.speedY;
					
					// Oscillation sinusoïdale complexe
					const oscillationX = Math.sin(this.phaseX) * this.ampX + 
										Math.sin(this.phaseX * 1.7 + time * 0.001) * (this.ampX * 0.3);
					const oscillationY = Math.sin(this.phaseY) * this.ampY + 
										Math.cos(this.phaseY * 1.3 + time * 0.0015) * (this.ampY * 0.3);
					
					this.x = this.baseX + oscillationX;
					this.y = this.baseY + oscillationY;
					
				} else if (interactionModeRef.current === 'dynamic') {
					// Mouvement physique avec friction
					this.vx *= this.friction;
					this.vy *= this.friction;
					
					// Force de retour vers position de base
					const returnX = (this.baseX - this.x) * this.returnForce;
					const returnY = (this.baseY - this.y) * this.returnForce;
					this.vx += returnX;
					this.vy += returnY;
					
					// Interaction avec la souris
					if (mouseX !== null && mouseY !== null) {
						const dx = this.x - mouseX;
						const dy = this.y - mouseY;
						const dist = Math.hypot(dx, dy);
						const influenceRadius = 120 + this.radius;
						
						if (dist < influenceRadius && dist > 0) {
							const ux = dx / dist;
							const uy = dy / dist;
							// Mode répulsion par défaut
							let forceStrength = 3 * (1 - dist / influenceRadius);
							
							// 30% de chance d'avoir une attraction au lieu d'une répulsion
							if (this.glowIntensity > 0.8) {
								forceStrength *= -0.7; // attraction plus douce
							}
							
							this.vx += ux * forceStrength;
							this.vy += uy * forceStrength;
						}
					}
					
					// Mise à jour position
					this.x += this.vx;
					this.y += this.vy;
					
					// Gestion des bords avec rebond élastique
					const margin = this.radius * 2;
					if (this.x < -margin) { 
						this.x = -margin; 
						this.vx *= -0.6; 
					}
					if (this.x > canvasWidth + margin) { 
						this.x = canvasWidth + margin; 
						this.vx *= -0.6; 
					}
					if (this.y < -margin) { 
						this.y = -margin; 
						this.vy *= -0.6; 
					}
					if (this.y > canvasHeight + margin) { 
						this.y = canvasHeight + margin; 
						this.vy *= -0.6; 
					}
				}
				
				// Mise à jour des effets visuels
				this.pulsePhase += this.pulseSpeed;
				this.distortionPhase += this.rotationSpeed;
			}

			draw(ctx, parallaxOffsetX = 0, parallaxOffsetY = 0, time) {
				ctx.save();
				
				// Calcul de la position avec parallax
				const drawX = this.x + (parallaxOffsetX * this.depth);
				const drawY = this.y + (parallaxOffsetY * this.depth);
				
				// Effet de pulse et variation d'opacité
				const pulseMultiplier = 0.7 + 0.3 * Math.sin(this.pulsePhase);
				const currentRadius = this.radius * this.scaleVariation * pulseMultiplier;
				const currentOpacity = this.maxOpacity * pulseMultiplier;
				
				// Création du dégradé radial pour effet de halo
				const gradient = ctx.createRadialGradient(
					drawX, drawY, 0,
					drawX, drawY, currentRadius * 1.5
				);
				
				// Couleur de base (extraite du string rgba)
				const colorMatch = this.color.match(/rgba?\(([^)]+)\)/);
				if (colorMatch) {
					const colorValues = colorMatch[1].split(',').map(v => parseFloat(v.trim()));
					const [r, g, b] = colorValues;
					
					// Centre lumineux
					gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.9})`);
					gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.6})`);
					gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
					gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
				}
				
				// Dessin de la sphère principale
				ctx.beginPath();
				ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
				ctx.fillStyle = gradient;
				ctx.fill();
				
				// Halo extérieur pour plus d'effet lumineux
				if (this.glowIntensity > 0.6) {
					const outerGlow = ctx.createRadialGradient(
						drawX, drawY, currentRadius * 0.8,
						drawX, drawY, currentRadius * 2.2
					);
					
					if (colorMatch) {
						const colorValues = colorMatch[1].split(',').map(v => parseFloat(v.trim()));
						const [r, g, b] = colorValues;
						outerGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.1})`);
						outerGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
					}
					
					ctx.beginPath();
					ctx.arc(drawX, drawY, currentRadius * 2, 0, Math.PI * 2);
					ctx.fillStyle = outerGlow;
					ctx.fill();
				}
				
				ctx.restore();
			}
		}

		// Resize canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			
			// Réinitialiser les sphères si nécessaire
			if (spheresRef.current.length === 0) {
				initializeSpheres();
			}
		};

		// Initialisation des sphères
		const initializeSpheres = () => {
			spheresRef.current = [];
			const sphereCount = 40 + Math.floor(Math.random() * 20); // 40-60 petites sphères
			
			// Palette de couleurs cyan/bleu (sans rose)
			const colors = [
				'rgba(100, 200, 255, 0.5)',  // cyan clair
				'rgba(120, 180, 255, 0.5)',  // bleu clair
				'rgba(80, 220, 240, 0.5)',   // turquoise
				'rgba(140, 160, 255, 0.5)',  // bleu-violet
				'rgba(60, 240, 220, 0.5)',   // cyan intense
				'rgba(160, 140, 255, 0.5)',  // bleu-violet clair
			];
			
			for (let i = 0; i < sphereCount; i++) {
				// Rayon plus petit pour effet "petits points"
				const radius = 10 + Math.random() * 20;
				
				// Position étendue au-delà des bords
				const startX = Math.random() * (canvas.width + 2 * radius) - radius;
				const startY = Math.random() * (canvas.height + 2 * radius) - radius;
				
				// Couleur aléatoire
				const color = colors[Math.floor(Math.random() * colors.length)];
				
				// Profondeur pour parallax (0.3 à 1)
				const depth = 0.5 + Math.random() * 0.5;
				
				spheresRef.current.push(new Sphere(startX, startY, radius, color, depth));
			}
			
			console.log(`🔮 ${sphereCount} sphères initialisées`);
		};

		// Gestion de la souris
		const handleMouseMove = (e) => {
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY
			};
		};

		const handleMouseLeave = () => {
			mouseRef.current = { x: null, y: null };
		};

		// Animation principale
		let startTime = Date.now();
		const animate = () => {
			if (!ctx) return;
			
			const currentTime = Date.now();
			const time = currentTime - startTime;
			
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			// Calcul du parallax
			let parallaxX = 0, parallaxY = 0;
			if (interactionModeRef.current === 'parallax' && 
				mouseRef.current.x !== null && mouseRef.current.y !== null) {
				const percentX = (mouseRef.current.x / canvas.width) - 0.5;
				const percentY = (mouseRef.current.y / canvas.height) - 0.5;
				const maxParallax = 25;
				parallaxX = -percentX * maxParallax;
				parallaxY = -percentY * maxParallax;
			}
			
			// Mise à jour et rendu des sphères
			// Tri par profondeur pour rendu correct
			const sortedSpheres = [...spheresRef.current].sort((a, b) => a.depth - b.depth);
			
			sortedSpheres.forEach(sphere => {
				sphere.update(
					mouseRef.current.x, 
					mouseRef.current.y, 
					canvas.width, 
					canvas.height,
					time
				);
				sphere.draw(ctx, parallaxX, parallaxY, time);
			});
			
			animationRef.current = requestAnimationFrame(animate);
		};

		// Setup
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);
		animate();

		// Cleanup
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
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
				zIndex: 1,
				pointerEvents: 'none'
			}}
		/>
	);
};

export default FloatingSphereEffect; 