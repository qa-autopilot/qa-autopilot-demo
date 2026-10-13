/**
 * Which Toolshop build the suite runs against.
 * Set TARGET in the environment (default: baseline).
 *
 * Toolshop is a public practice app by Roy de Kleijn:
 * https://github.com/roydekleijn/practice-software-testing
 */
export type TargetName =
  | 'baseline'   // Sprint 5, the clean build
  | 'with-bugs'  // Sprint 5 with deliberate defects ("bad deploy")
  | 'v4'         // Sprint 4, for the "planned release" story
  | 'v3'
  | 'local';     // docker compose copy on your own machine

export interface Target {
  name: TargetName;
  webUrl: string;
  apiUrl: string;
}

const TARGETS: Record<TargetName, Target> = {
  baseline: {
    name: 'baseline',
    webUrl: 'https://practicesoftwaretesting.com',
    apiUrl: 'https://api.practicesoftwaretesting.com',
  },
  'with-bugs': {
    name: 'with-bugs',
    webUrl: 'https://with-bugs.practicesoftwaretesting.com',
    apiUrl: 'https://api-with-bugs.practicesoftwaretesting.com',
  },
  v4: {
    name: 'v4',
    webUrl: 'https://v4.practicesoftwaretesting.com',
    apiUrl: 'https://api-v4.practicesoftwaretesting.com',
  },
  v3: {
    name: 'v3',
    webUrl: 'https://v3.practicesoftwaretesting.com',
    apiUrl: 'https://api-v3.practicesoftwaretesting.com',
  },
  local: {
    name: 'local',
    webUrl: process.env.LOCAL_WEB_URL ?? 'http://localhost:4200',
    apiUrl: process.env.LOCAL_API_URL ?? 'http://localhost:8091',
  },
};

export function currentTarget(): Target {
  const name = (process.env.TARGET ?? 'baseline') as TargetName;
  const target = TARGETS[name];
  if (!target) {
    throw new Error(
      `Unknown TARGET "${name}". Use one of: ${Object.keys(TARGETS).join(', ')}`,
    );
  }
  return target;
}
