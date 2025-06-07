import { useEffect, useRef } from 'react';

const LiquidDistortionEffect = () => {
	const canvasRef = useRef(null);
	const mouseRef = useRef({ x: 0, y: 0 });
	const animationRef = useRef();
	const ripplesRef = useRef([]);

	useEffect(() => {
		console.log('🌊 LiquidDistortionEffect chargé !'); // Test de chargement
		
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		let lastMouseMove = 0;

		// Resize canvas to full screen
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			console.log('Canvas resized:', canvas.width, 'x', canvas.height);
		};

		// Mouse tracking avec création de ripples
		const handleMouseMove = (e) => {
			const now = Date.now();
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY
			};

			// Créer un nouveau ripple plus souvent
			if (now - lastMouseMove > 50) {
				console.log('💧 Nouveau ripple créé à:', e.clientX, e.clientY); // Test de création
				ripplesRef.current.push({
					x: e.clientX,
					y: e.clientY,
					radius: 0,
					maxRadius: Math.random() * 150 + 100,
					alpha: 0.8,
					speed: Math.random() * 3 + 2,
					frequency: Math.random() * 0.3 + 0.2
				});
				lastMouseMove = now;
			}
		};

		// Animation des ripples liquides
		const animate = () => {
			if (!ctx) return;

			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Dessiner un cercle de test au centre pour vérifier que le canvas fonctionne
			ctx.beginPath();
			ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(30, 107, 253, 0.3)';
			ctx.lineWidth = 2;
			ctx.stroke();

			// Update et draw ripples
			ripplesRef.current = ripplesRef.current.filter(ripple => {
				// Update ripple
				ripple.radius += ripple.speed;
				ripple.alpha *= 0.95;

				// Draw ripple avec effet liquide
				if (ripple.alpha > 0.02) {
					ctx.save();
					
					// Cercles plus visibles
					for (let i = 0; i < 5; i++) {
						const currentRadius = ripple.radius - i * 15;
						if (currentRadius > 0) {
							ctx.beginPath();
							
							// Couleur plus forte
							const alpha = ripple.alpha * (0.8 - i * 0.15);
							ctx.strokeStyle = `rgba(30, 107, 253, ${alpha})`;
							ctx.lineWidth = 3 - i * 0.3;
							
							// Effet ondulé simple mais visible
							const segments = 32;
							for (let j = 0; j <= segments; j++) {
								const angle = (j / segments) * Math.PI * 2;
								const wave = Math.sin(angle * 6 + ripple.radius * 0.1) * 8;
								const x = ripple.x + Math.cos(angle) * (currentRadius + wave);
								const y = ripple.y + Math.sin(angle) * (currentRadius + wave);
								
								if (j === 0) {
									ctx.moveTo(x, y);
								} else {
									ctx.lineTo(x, y);
								}
							}
							ctx.closePath();
							ctx.stroke();
						}
					}
					
					ctx.restore();
					return true;
				}
				return false;
			});

			// Limiter le nombre de ripples
			if (ripplesRef.current.length > 15) {
				ripplesRef.current = ripplesRef.current.slice(-15);
			}

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
				zIndex: 1,
				opacity: 1,
				background: 'transparent'
			}}
		/>
	);
};

export default LiquidDistortionEffect; 