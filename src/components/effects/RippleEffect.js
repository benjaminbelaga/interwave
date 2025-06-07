import { useEffect, useRef } from 'react';

const RippleEffect = () => {
	const canvasRef = useRef(null);
	const ripplesRef = useRef([]);
	const animationRef = useRef();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// Resize canvas to full screen
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		// Create ripple on click
		const handleClick = (e) => {
			ripplesRef.current.push({
				x: e.clientX,
				y: e.clientY,
				radius: 0,
				maxRadius: Math.random() * 100 + 150, // Taille variable
				alpha: 0.8,
				speed: Math.random() * 1.5 + 1.5, // Vitesse variable
				rings: Math.floor(Math.random() * 3) + 2 // 2-4 anneaux
			});

			// Limiter à 8 ripples max pour les performances
			if (ripplesRef.current.length > 8) {
				ripplesRef.current.shift();
			}
		};

		// Animation loop
		const animate = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw ripples
			ripplesRef.current = ripplesRef.current.filter(ripple => {
				ripple.radius += ripple.speed;
				ripple.alpha *= 0.98; // Fade progressif

				if (ripple.alpha > 0.01 && ripple.radius < ripple.maxRadius) {
					// Dessiner plusieurs anneaux concentriques
					for (let ring = 0; ring < ripple.rings; ring++) {
						const ringRadius = ripple.radius - (ring * 15);
						
						if (ringRadius > 0) {
							ctx.save();
							
							// Opacité qui diminue avec la distance et le temps
							const ringAlpha = ripple.alpha * (1 - ring * 0.3) * (1 - ripple.radius / ripple.maxRadius);
							ctx.globalAlpha = Math.max(0, ringAlpha);
							
							// Couleur bleu électrique très subtile
							ctx.strokeStyle = '#1E6BFD';
							ctx.lineWidth = Math.max(0.5, 2 - ring * 0.3);
							
							// Dessiner le cercle
							ctx.beginPath();
							ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
							ctx.stroke();
							
							ctx.restore();
						}
					}

					return true; // Garder le ripple
				}
				return false; // Supprimer le ripple
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		// Initialize
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		document.addEventListener('click', handleClick); // Écouter sur le document
		animate();

		// Cleanup
		return () => {
			window.removeEventListener('resize', resizeCanvas);
			document.removeEventListener('click', handleClick); // Nettoyer le document
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
				pointerEvents: 'none', // N'interfère pas avec les interactions
				zIndex: 1
			}}
		/>
	);
};

export default RippleEffect; 