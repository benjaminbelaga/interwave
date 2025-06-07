# 🌊 Gestionnaire d'Effets Visuels - 5 Effets Disponibles

## Comment switcher entre les effets

Dans `EffectManager.js` ligne 23, changez :

```javascript
const [currentEffect] = useState(EFFECTS.effect5); // ← Changer ici
```

## ✨ Tous les effets disponibles

- `EFFECTS.none` - Aucun effet
- `EFFECTS.effect1` - **Vagues sinusoïdales** ✅
- `EFFECTS.effect2` - **Ondulations liquides** ✅  
- `EFFECTS.effect3` - **Particules connectées** ✅
- `EFFECTS.effect4` - **Ripples au clic** ✅
- `EFFECTS.effect5` - **Sphères flottantes** ✅ (actuel)

## 🎯 Description détaillée

### **Effet 1 : Vagues (WaveEffect)**
- **Type** : Animation continue
- **Interaction** : Position de souris → amplitude + fréquence
- **Visuel** : Vagues fluides qui traversent l'écran
- **Style** : Lignes ondulées superposées

### **Effet 2 : Liquid (LiquidEffect)**  
- **Type** : Animation au mouvement
- **Interaction** : Mouvement de souris → création de ripples
- **Visuel** : Cercles ondulés qui se propagent
- **Style** : Effet "gouttes dans l'eau"

### **Effet 3 : Particules (ParticleEffect)**
- **Type** : Système de particules + connexions dynamiques
- **Interaction** : Position de souris → attraction des particules
- **Visuel** : Points flottants connectés par des lignes fines
- **Style** : Réseau subtil avec connexions vers la souris

### **Effet 4 : Ripples (RippleEffect)**
- **Type** : Animation déclenchée par clic
- **Interaction** : Clic → création de ripples concentriques
- **Visuel** : Cercles fins qui se propagent depuis le point de clic
- **Style** : Anneaux minimalistes qui s'estompent progressivement

### **Effet 5 : Sphères Flottantes (FloatingSphereEffect)**
- **Type** : Sphères lumineuses animées avec 2 modes d'interaction
- **Mode Parallax** : Mouvement ondulant + décalage parallax subtil
- **Mode Dynamic** : Répulsion/attraction + retour élastique
- **Visuel** : Sphères semi-transparentes avec halos lumineux
- **Style** : Effets de profondeur et dégradés radiaux cyan/bleu

## 🔄 Guide de test rapide
1. **Effet 1** → `EFFECTS.effect1` → Vagues continues
2. **Effet 2** → `EFFECTS.effect2` → Ripples au mouvement  
3. **Effet 3** → `EFFECTS.effect3` → Particules connectées
4. **Effet 4** → `EFFECTS.effect4` → Ripples au clic
5. **Effet 5** → `EFFECTS.effect5` → Sphères flottantes
6. **Aucun** → `EFFECTS.none` → Site propre

Sauvegardez le fichier pour voir l'effet changer instantanément ! 🚀 