import { useEffect, useRef } from 'react';

const ParticleEffect = () => {
	const canvasRef = useRef(null);
	const mouseRef = useRef({ x: 0, y: 0 });
	const animationRef = useRef();
	const particlesRef = useRef([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// Resize canvas to full screen
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			initParticles();
		};

		// Mouse tracking
		const handleMouseMove = (e) => {
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY
			};
		};

		// Initialize particles
		const initParticles = () => {
			const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Densité adaptative
			particlesRef.current = [];

			for (let i = 0; i < particleCount; i++) {
				particlesRef.current.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.5,
					vy: (Math.random() - 0.5) * 0.5,
					size: Math.random() * 2 + 1,
					opacity: Math.random() * 0.5 + 0.2
				});
			}
		};

		// Animation loop
		const animate = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const mouseX = mouseRef.current.x;
			const mouseY = mouseRef.current.y;

			// Update and draw particles
			particlesRef.current.forEach((particle, i) => {
				// Mouvement naturel
				particle.x += particle.vx;
				particle.y += particle.vy;

				// Rebond sur les bords
				if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
				if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

				// Attraction subtile vers la souris
				const dx = mouseX - particle.x;
				const dy = mouseY - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < 150) {
					const force = (150 - distance) / 150 * 0.01;
					particle.vx += (dx / distance) * force;
					particle.vy += (dy / distance) * force;
				}

				// Limiter la vitesse
				const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
				if (speed > 2) {
					particle.vx = (particle.vx / speed) * 2;
					particle.vy = (particle.vy / speed) * 2;
				}

				// Dessiner la particule
				ctx.save();
				ctx.globalAlpha = particle.opacity;
				ctx.fillStyle = '#1E6BFD';
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();

				// Dessiner les connexions avec les particules proches
				for (let j = i + 1; j < particlesRef.current.length; j++) {
					const other = particlesRef.current[j];
					const dx = particle.x - other.x;
					const dy = particle.y - other.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Connexion si les particules sont proches
					if (distance < 120) {
						const opacity = (120 - distance) / 120 * 0.3;
						ctx.save();
						ctx.globalAlpha = opacity;
						ctx.strokeStyle = '#1E6BFD';
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(particle.x, particle.y);
						ctx.lineTo(other.x, other.y);
						ctx.stroke();
						ctx.restore();
					}
				}

				// Connexion spéciale avec la souris
				const mouseDistance = Math.sqrt((mouseX - particle.x) ** 2 + (mouseY - particle.y) ** 2);
				if (mouseDistance < 100) {
					const opacity = (100 - mouseDistance) / 100 * 0.4;
					ctx.save();
					ctx.globalAlpha = opacity;
					ctx.strokeStyle = '#1E6BFD';
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(particle.x, particle.y);
					ctx.lineTo(mouseX, mouseY);
					ctx.stroke();
					ctx.restore();
				}
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

export default ParticleEffect; 