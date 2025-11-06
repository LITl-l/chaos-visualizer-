# Chaos Theory Visualizer

An interactive 3D visualization of chaos theory attractors built with Solid.js and Three.js.

## Features

- **Lorenz Attractor**: Visualize the famous butterfly effect with adjustable parameters (σ, ρ, β)
- **Rössler Attractor**: Explore spiral chaos with customizable parameters (a, b, c)
- **Real-time Parameter Adjustment**: Modify attractor parameters and see changes instantly
- **Interactive 3D View**: Rotate, zoom, and pan using mouse controls
- **Customizable Visualization**: Adjust trail color, number of points, and time steps
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Solid.js**: Reactive UI framework
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool

## Installation

```bash
npm install
```

## Usage

### Development Mode

Run the app in development mode with hot module replacement:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Production Build

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How to Use

1. **Select an Attractor**: Choose between Lorenz and Rössler attractors from the control panel
2. **Adjust Parameters**: Use the sliders to modify the mathematical parameters
3. **Customize Visualization**:
   - Change the number of points for detail level
   - Adjust the time step (dt) for simulation accuracy
   - Pick a custom color for the trail
   - Toggle axes visibility
4. **Interact with 3D View**:
   - Left-click and drag to rotate
   - Right-click and drag to pan
   - Scroll to zoom

## Mathematical Background

### Lorenz Attractor

The Lorenz system is a set of ordinary differential equations:

```
dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
```

Default parameters: σ = 10, ρ = 28, β = 8/3

### Rössler Attractor

The Rössler system is defined by:

```
dx/dt = -y - z
dy/dt = x + ay
dz/dt = b + z(x - c)
```

Default parameters: a = 0.2, b = 0.2, c = 5.7

## Project Structure

```
src/
├── chaos/
│   └── attractors.ts       # Chaos theory algorithms
├── components/
│   ├── ChaosVisualizer.tsx # Three.js 3D visualization
│   └── ControlPanel.tsx    # UI controls
├── App.tsx                 # Main application
├── App.css                 # Application styles
└── index.css               # Global styles
```

## Learn More

- [Solid.js Documentation](https://solidjs.com)
- [Three.js Documentation](https://threejs.org)
- [Chaos Theory on Wikipedia](https://en.wikipedia.org/wiki/Chaos_theory)

## Deployment

Learn more about deploying your application with the [Vite deployment guide](https://vite.dev/guide/static-deploy.html)
