import { createSignal } from 'solid-js';
import ChaosVisualizer from './components/ChaosVisualizer';
import ControlPanel from './components/ControlPanel';
import { defaultParams, type AttractorParams } from './chaos/attractors';
import './App.css';

function App() {
  const [attractorType, setAttractorType] = createSignal<'lorenz' | 'rossler'>(
    'lorenz'
  );
  const [params, setParams] = createSignal<AttractorParams>(defaultParams);
  const [numPoints, setNumPoints] = createSignal(10000);
  const [showAxes, setShowAxes] = createSignal(true);
  const [trailColor, setTrailColor] = createSignal('#00ffff');

  return (
    <div class="app">
      <ControlPanel
        attractorType={attractorType()}
        params={params()}
        numPoints={numPoints()}
        showAxes={showAxes()}
        trailColor={trailColor()}
        onAttractorTypeChange={setAttractorType}
        onParamsChange={setParams}
        onNumPointsChange={setNumPoints}
        onShowAxesChange={setShowAxes}
        onTrailColorChange={setTrailColor}
      />
      <div class="visualizer-container">
        <ChaosVisualizer
          attractorType={attractorType()}
          params={params()}
          numPoints={numPoints()}
          showAxes={showAxes()}
          trailColor={trailColor()}
        />
      </div>
    </div>
  );
}

export default App;
