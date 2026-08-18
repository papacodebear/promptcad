// node build-agent-skills-index.js
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';

const SITE_URL = 'https://promptcad.papacodebear.workers.dev';

const skillContent = readFileSync('./underware/SKILL.md');
const digest = 'sha256:' + createHash('sha256').update(skillContent).digest('hex');

const index = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: 'underware-stl-generator',
      type: 'skill-md',
      description: 'Generate 3D-printable STL files for the Underware 2.0 cable management and organization system from a natural-language description of the part.',
      url: `${SITE_URL}/SKILL.md`,
      digest,
    },
  ],
};

mkdirSync('./underware/.well-known/agent-skills', { recursive: true });
writeFileSync('./underware/.well-known/agent-skills/index.json', JSON.stringify(index, null, 2) + '\n');
console.log('Wrote agent-skills index.json, digest', digest);
