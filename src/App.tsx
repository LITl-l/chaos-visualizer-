import { Component, createSignal } from 'solid-js';
import ChaosVisualizer from './components/ChaosVisualizer';
import './App.css';

const App: Component = () => {
  const [sigma, setSigma] = createSignal(10);
  const [rho, setRho] = createSignal(28);
  const [beta, setBeta] = createSignal(8/3);
  const [speed, setSpeed] = createSignal(0.01);
  const [particleCount, setParticleCount] = createSignal(1);
  const [showTrail, setShowTrail] = createSignal(true);

  return (
    <div class="app">
      <header class="header">
        <h1>Chaos Theory Visualizer</h1>
        <p>Lorenz Attractor - A Beautiful Example of Deterministic Chaos</p>
      </header>

      <div class="container">
        <div class="controls">
          <h2>Parameters</h2>

          <div class="control-group">
            <label>
              σ (Sigma): {sigma().toFixed(2)}
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={sigma()}
                onInput={(e) => setSigma(parseFloat(e.currentTarget.value))}
              />
            </label>
          </div>

          <div class="control-group">
            <label>
              ρ (Rho): {rho().toFixed(2)}
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={rho()}
                onInput={(e) => setRho(parseFloat(e.currentTarget.value))}
              />
            </label>
          </div>

          <div class="control-group">
            <label>
              β (Beta): {beta().toFixed(3)}
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={beta()}
                onInput={(e) => setBeta(parseFloat(e.currentTarget.value))}
              />
            </label>
          </div>

          <div class="control-group">
            <label>
              Speed: {speed().toFixed(3)}
              <input
                type="range"
                min="0.001"
                max="0.05"
                step="0.001"
                value={speed()}
                onInput={(e) => setSpeed(parseFloat(e.currentTarget.value))}
              />
            </label>
          </div>

          <div class="control-group">
            <label>
              Particles: {particleCount()}
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={particleCount()}
                onInput={(e) => setParticleCount(parseInt(e.currentTarget.value))}
              />
            </label>
          </div>

          <div class="control-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                checked={showTrail()}
                onChange={(e) => setShowTrail(e.currentTarget.checked)}
              />
              Show Trail
            </label>
          </div>

          <div class="info">
            <h3>About the Lorenz Attractor</h3>
            <p>
              The Lorenz attractor is a set of chaotic solutions to the Lorenz system,
              a system of ordinary differential equations first studied by Edward Lorenz
              in 1963. It demonstrates how small changes in initial conditions can lead
              to vastly different outcomes - the "butterfly effect".
            </p>
            <p class="equations">
              dx/dt = σ(y - x)<br/>
              dy/dt = x(ρ - z) - y<br/>
              dz/dt = xy - βz
            </p>
          </div>
        </div>

        <div class="visualizer">
          <ChaosVisualizer
            sigma={sigma()}
            rho={rho()}
            beta={beta()}
            speed={speed()}
            particleCount={particleCount()}
            showTrail={showTrail()}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
