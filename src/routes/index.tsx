import { createSignal } from "solid-js";
import ChaosVisualizer from "~/components/ChaosVisualizer";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  const [sigma, setSigma] = createSignal(10);
  const [rho, setRho] = createSignal(28);
  const [beta, setBeta] = createSignal(8 / 3);
  const [speed, setSpeed] = createSignal(0.01);
  const [particleCount, setParticleCount] = createSignal(1);
  const [showTrail, setShowTrail] = createSignal(true);

  return (
    <div class="w-full h-screen flex flex-col bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header class="p-6 bg-black/50 backdrop-blur-lg border-b border-blue-500/30 shadow-2xl z-10">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent tracking-wide mb-2">
          Chaos Theory Visualizer
        </h1>
        <p class="text-white/60 text-sm">
          Lorenz Attractor - A Beautiful Example of Deterministic Chaos
        </p>
      </header>

      {/* Main Content */}
      <div class="flex flex-1 overflow-hidden">
        {/* Controls Sidebar */}
        <div class="w-80 p-8 bg-black/40 backdrop-blur-lg border-r border-blue-500/30 overflow-y-auto flex flex-col gap-6">
          <div>
            <h2 class="text-xl font-bold text-cyan-400 uppercase tracking-wider mb-6">
              Parameters
            </h2>

            {/* Sigma Control */}
            <div class="mb-6">
              <Label class="text-white/90 mb-2 block">
                σ (Sigma): {sigma().toFixed(2)}
              </Label>
              <Slider
                min={0}
                max={20}
                step={0.1}
                value={sigma()}
                onValueChange={setSigma}
              />
            </div>

            {/* Rho Control */}
            <div class="mb-6">
              <Label class="text-white/90 mb-2 block">
                ρ (Rho): {rho().toFixed(2)}
              </Label>
              <Slider
                min={0}
                max={50}
                step={0.5}
                value={rho()}
                onValueChange={setRho}
              />
            </div>

            {/* Beta Control */}
            <div class="mb-6">
              <Label class="text-white/90 mb-2 block">
                β (Beta): {beta().toFixed(3)}
              </Label>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={beta()}
                onValueChange={setBeta}
              />
            </div>

            {/* Speed Control */}
            <div class="mb-6">
              <Label class="text-white/90 mb-2 block">
                Speed: {speed().toFixed(3)}
              </Label>
              <Slider
                min={0.001}
                max={0.05}
                step={0.001}
                value={speed()}
                onValueChange={setSpeed}
              />
            </div>

            {/* Particle Count Control */}
            <div class="mb-6">
              <Label class="text-white/90 mb-2 block">
                Particles: {particleCount()}
              </Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={particleCount()}
                onValueChange={(val) => setParticleCount(Math.round(val))}
              />
            </div>

            {/* Show Trail Checkbox */}
            <div class="mb-6">
              <Label class="flex items-center gap-3 cursor-pointer text-white/90">
                <Checkbox
                  checked={showTrail()}
                  onChange={(e: Event) =>
                    setShowTrail((e.target as HTMLInputElement).checked)
                  }
                />
                Show Trail
              </Label>
            </div>
          </div>

          {/* Info Card */}
          <Card class="bg-black/30 border-blue-500/30">
            <CardHeader>
              <CardTitle class="text-lg text-fuchsia-400">
                About the Lorenz Attractor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-white/70 text-sm leading-relaxed mb-4">
                The Lorenz attractor is a set of chaotic solutions to the Lorenz
                system, a system of ordinary differential equations first studied
                by Edward Lorenz in 1963. It demonstrates how small changes in
                initial conditions can lead to vastly different outcomes - the
                "butterfly effect".
              </p>
              <div class="bg-black/40 p-4 rounded border-l-4 border-cyan-400">
                <code class="text-cyan-400 text-xs font-mono block leading-relaxed">
                  dx/dt = σ(y - x)<br />
                  dy/dt = x(ρ - z) - y<br />
                  dz/dt = xy - βz
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualizer */}
        <div class="flex-1 relative overflow-hidden">
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
}
