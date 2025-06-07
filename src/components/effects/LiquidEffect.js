import { useEffect, useRef } from 'react';

const LiquidEffect = () => {
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

		// Create ripple on mouse move
		const handleMouseMove = (e) => {
			// Ajouter un nouveau ripple
			ripplesRef.current.push({
				x: e.clientX,
				y: e.clientY,
				radius: 0,
				alpha: 0.6,
				time: 0
			});

			// Limiter à 10 ripples max
			if (ripplesRef.current.length > 10) {
				ripplesRef.current.shift();
			}
		};

		// Animation loop
		const animate = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw ripples
			ripplesRef.current = ripplesRef.current.filter(ripple => {
				ripple.radius += 2;
				ripple.alpha *= 0.985;
				ripple.time += 0.1;

				if (ripple.alpha > 0.01) {
					// Draw liquid ripple
					ctx.save();
					ctx.globalAlpha = ripple.alpha;
					ctx.strokeStyle = '#1E6BFD';
					ctx.lineWidth = 2;

					// Cercle ondulé
					ctx.beginPath();
					const segments = 64;
					for (let i = 0; i <= segments; i++) {
						const angle = (i / segments) * Math.PI * 2;
						const wave = Math.sin(angle * 4 + ripple.time) * 5;
						const x = ripple.x + Math.cos(angle) * (ripple.radius + wave);
						const y = ripple.y + Math.sin(angle) * (ripple.radius + wave);
						
						if (i === 0) {
							ctx.moveTo(x, y);
						} else {
							ctx.lineTo(x, y);
						}
					}
					ctx.closePath();
					ctx.stroke();
					ctx.restore();

					return true; // Keep ripple
				}
				return false; // Remove ripple
			});

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

export default LiquidEffect; 