import { createSignal, Show } from 'solid-js';
import type { AttractorParams } from '../chaos/attractors';

interface ControlPanelProps {
  attractorType: 'lorenz' | 'rossler';
  params: AttractorParams;
  numPoints: number;
  showAxes: boolean;
  trailColor: string;
  onAttractorTypeChange: (type: 'lorenz' | 'rossler') => void;
  onParamsChange: (params: AttractorParams) => void;
  onNumPointsChange: (num: number) => void;
  onShowAxesChange: (show: boolean) => void;
  onTrailColorChange: (color: string) => void;
}

export default function ControlPanel(props: ControlPanelProps) {
  const [isPanelOpen, setIsPanelOpen] = createSignal(true);

  const updateLorenzParam = (
    param: keyof AttractorParams['lorenz'],
    value: number
  ) => {
    const newParams = { ...props.params };
    newParams.lorenz[param] = value;
    props.onParamsChange(newParams);
  };

  const updateRosslerParam = (
    param: keyof AttractorParams['rossler'],
    value: number
  ) => {
    const newParams = { ...props.params };
    newParams.rossler[param] = value;
    props.onParamsChange(newParams);
  };

  const updateDt = (value: number) => {
    const newParams = { ...props.params };
    newParams.dt = value;
    props.onParamsChange(newParams);
  };

  return (
    <div class="control-panel" classList={{ collapsed: !isPanelOpen() }}>
      <button
        class="toggle-button"
        onClick={() => setIsPanelOpen(!isPanelOpen())}
        aria-label="Toggle control panel"
      >
        {isPanelOpen() ? '◀' : '▶'}
      </button>

      <Show when={isPanelOpen()}>
        <div class="panel-content">
          <h2>Chaos Theory Visualizer</h2>

          <div class="control-group">
            <label>Attractor Type</label>
            <select
              value={props.attractorType}
              onChange={(e) =>
                props.onAttractorTypeChange(
                  e.currentTarget.value as 'lorenz' | 'rossler'
                )
              }
            >
              <option value="lorenz">Lorenz</option>
              <option value="rossler">Rössler</option>
            </select>
          </div>

          <Show when={props.attractorType === 'lorenz'}>
            <div class="parameters-section">
              <h3>Lorenz Parameters</h3>

              <div class="control-group">
                <label>
                  σ (sigma): <span>{props.params.lorenz.sigma.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={props.params.lorenz.sigma}
                  onInput={(e) =>
                    updateLorenzParam('sigma', parseFloat(e.currentTarget.value))
                  }
                />
              </div>

              <div class="control-group">
                <label>
                  ρ (rho): <span>{props.params.lorenz.rho.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={props.params.lorenz.rho}
                  onInput={(e) =>
                    updateLorenzParam('rho', parseFloat(e.currentTarget.value))
                  }
                />
              </div>

              <div class="control-group">
                <label>
                  β (beta): <span>{props.params.lorenz.beta.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={props.params.lorenz.beta}
                  onInput={(e) =>
                    updateLorenzParam('beta', parseFloat(e.currentTarget.value))
                  }
                />
              </div>
            </div>
          </Show>

          <Show when={props.attractorType === 'rossler'}>
            <div class="parameters-section">
              <h3>Rössler Parameters</h3>

              <div class="control-group">
                <label>
                  a: <span>{props.params.rossler.a.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={props.params.rossler.a}
                  onInput={(e) =>
                    updateRosslerParam('a', parseFloat(e.currentTarget.value))
                  }
                />
              </div>

              <div class="control-group">
                <label>
                  b: <span>{props.params.rossler.b.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={props.params.rossler.b}
                  onInput={(e) =>
                    updateRosslerParam('b', parseFloat(e.currentTarget.value))
                  }
                />
              </div>

              <div class="control-group">
                <label>
                  c: <span>{props.params.rossler.c.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={props.params.rossler.c}
                  onInput={(e) =>
                    updateRosslerParam('c', parseFloat(e.currentTarget.value))
                  }
                />
              </div>
            </div>
          </Show>

          <div class="control-group">
            <label>
              Time Step (dt): <span>{props.params.dt.toFixed(3)}</span>
            </label>
            <input
              type="range"
              min="0.001"
              max="0.05"
              step="0.001"
              value={props.params.dt}
              onInput={(e) => updateDt(parseFloat(e.currentTarget.value))}
            />
          </div>

          <div class="control-group">
            <label>
              Points: <span>{props.numPoints}</span>
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={props.numPoints}
              onInput={(e) =>
                props.onNumPointsChange(parseInt(e.currentTarget.value))
              }
            />
          </div>

          <div class="control-group">
            <label>Trail Color</label>
            <input
              type="color"
              value={props.trailColor}
              onInput={(e) => props.onTrailColorChange(e.currentTarget.value)}
            />
          </div>

          <div class="control-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={props.showAxes}
                onChange={(e) => props.onShowAxesChange(e.currentTarget.checked)}
              />
              Show Axes
            </label>
          </div>

          <div class="info-section">
            <h3>About</h3>
            <p>
              <strong>Lorenz Attractor:</strong> A set of chaotic solutions
              discovered by Edward Lorenz while studying atmospheric convection.
              Famous for the "butterfly effect."
            </p>
            <p>
              <strong>Rössler Attractor:</strong> A simpler chaotic system
              discovered by Otto Rössler, exhibiting spiral chaos.
            </p>
          </div>
        </div>
      </Show>
    </div>
  );
}
