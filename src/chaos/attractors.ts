// Chaos Theory Attractors

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface AttractorParams {
  lorenz: {
    sigma: number;
    rho: number;
    beta: number;
  };
  rossler: {
    a: number;
    b: number;
    c: number;
  };
  dt: number;
}

export const defaultParams: AttractorParams = {
  lorenz: {
    sigma: 10,
    rho: 28,
    beta: 8 / 3,
  },
  rossler: {
    a: 0.2,
    b: 0.2,
    c: 5.7,
  },
  dt: 0.01,
};

/**
 * Lorenz Attractor
 * dx/dt = σ(y - x)
 * dy/dt = x(ρ - z) - y
 * dz/dt = xy - βz
 */
export function lorenzAttractor(
  point: Point3D,
  params: AttractorParams['lorenz'],
  dt: number
): Point3D {
  const { sigma, rho, beta } = params;
  const { x, y, z } = point;

  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;

  return {
    x: x + dx * dt,
    y: y + dy * dt,
    z: z + dz * dt,
  };
}

/**
 * Rössler Attractor
 * dx/dt = -y - z
 * dy/dt = x + ay
 * dz/dt = b + z(x - c)
 */
export function rosslerAttractor(
  point: Point3D,
  params: AttractorParams['rossler'],
  dt: number
): Point3D {
  const { a, b, c } = params;
  const { x, y, z } = point;

  const dx = -y - z;
  const dy = x + a * y;
  const dz = b + z * (x - c);

  return {
    x: x + dx * dt,
    y: y + dy * dt,
    z: z + dz * dt,
  };
}

/**
 * Generate a trail of points for an attractor
 */
export function generateAttractorTrail(
  type: 'lorenz' | 'rossler',
  params: AttractorParams,
  initialPoint: Point3D,
  numPoints: number
): Point3D[] {
  const points: Point3D[] = [initialPoint];
  let currentPoint = { ...initialPoint };

  for (let i = 0; i < numPoints; i++) {
    if (type === 'lorenz') {
      currentPoint = lorenzAttractor(currentPoint, params.lorenz, params.dt);
    } else {
      currentPoint = rosslerAttractor(currentPoint, params.rossler, params.dt);
    }
    points.push({ ...currentPoint });
  }

  return points;
}
