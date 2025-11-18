# 🚀 3D Space Shooter

An exciting 3D space shooter game built with Three.js! Navigate your spaceship through space, destroy enemies, and rack up points!

## 🎮 Features

- **3D Graphics**: Built with Three.js for smooth 3D rendering
- **Intuitive Controls**: Use arrow keys or WASD to move, SPACE to shoot
- **Dynamic Gameplay**: Enemies spawn continuously with increasing challenge
- **Score System**: Track your points and lives
- **Responsive Design**: Works on desktop and mobile devices
- **Starfield Background**: Beautiful animated space background

## 🕹️ How to Play

**Controls:**
- **W / ↑**: Move up
- **S / ↓**: Move down  
- **A / ←**: Move left
- **D / →**: Move right
- **SPACE**: Shoot bullets

**Objective:**
- Destroy red enemy ships before they reach you
- Avoid collisions with enemies (you have 3 lives)
- Score points by shooting down enemies
- Survive as long as possible and get the highest score!

## 🛠️ Technologies Used

- **HTML5**: Game structure
- **CSS3**: Styling and UI design
- **JavaScript**: Game logic and mechanics
- **Three.js**: 3D graphics rendering library

## 🚀 Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Click "START GAME" and enjoy!

**OR**

Enable GitHub Pages in repository settings to play online!

## 📁 File Structure

```
3d-space-shooter/
├── index.html      # Main HTML file
├── style.css       # Game styling
├── game.js         # Game logic and Three.js code
└── README.md       # This file
```

## 🎯 Game Mechanics

- **Player Ship**: Green cone-shaped spacecraft
- **Enemies**: Red octahedron ships that move toward you
- **Bullets**: Yellow spheres that destroy enemies on contact
- **Lives**: You start with 3 lives, lose one per enemy collision
- **Score**: Earn 10 points for each enemy destroyed

## 🔧 Customization

You can modify game parameters in `game.js`:

```javascript
const config = {
    playerSpeed: 0.15,        // Player movement speed
    bulletSpeed: 0.5,         // Bullet speed
    enemySpeed: 0.08,         // Enemy movement speed
    enemySpawnRate: 60,       // Frames between enemy spawns
    maxEnemies: 10            // Maximum enemies on screen
};
```

## 🌟 Future Enhancements

- Power-ups and special weapons
- Different enemy types
- Boss battles
- Sound effects and background music
- Leaderboard system
- Mobile touch controls
- Difficulty levels

## 📱 Browser Compatibility

Works best on modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - Feel free to use and modify!

## 🎮 Play Now!

Enable GitHub Pages to play the game online or simply open `index.html` locally.

Have fun and happy shooting! 🚀✨
