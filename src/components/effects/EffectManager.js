import { useState } from 'react';
import WaveEffect from './WaveEffect';
import LiquidEffect from './LiquidEffect';
import ParticleEffect from './ParticleEffect';
import RippleEffect from './RippleEffect';
import FloatingSphereEffect from './FloatingSphereEffect';

// Liste des effets disponibles
const EFFECTS = {
	none: 'none',
	effect1: 'effect1',
	effect2: 'effect2',
	effect3: 'effect3',
	effect4: 'effect4',
	effect5: 'effect5'
};

const EffectManager = () => {
	// Changer cette ligne pour switcher d'effet :
	// EFFECTS.effect1 = Vagues sinusoïdales continues
	// EFFECTS.effect2 = Ondulations liquides au mouvement  
	// EFFECTS.effect3 = Particules géométriques connectées
	// EFFECTS.effect4 = Ripples minimalistes au clic
	// EFFECTS.effect5 = Sphères flottantes interactives
	// EFFECTS.none = Aucun effet
	const [currentEffect] = useState(EFFECTS.effect1); // ← Retour aux vagues

	const renderEffect = () => {
		switch (currentEffect) {
			case EFFECTS.effect1:
				return <WaveEffect />;
			case EFFECTS.effect2:
				return <LiquidEffect />;
			case EFFECTS.effect3:
				return <ParticleEffect />;
			case EFFECTS.effect4:
				return <RippleEffect />;
			case EFFECTS.effect5:
				return <FloatingSphereEffect />;
			case EFFECTS.none:
			default:
				return null;
		}
	};

	return renderEffect();
};

export default EffectManager; 