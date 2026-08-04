#!/usr/bin/env node
'use strict';
const fs = require('fs');
const file = process.argv[2];
if (!file) {
  console.error('Usage: dup-scan <file>');
  process.exit(1);
}
const map = new Map();
for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
  const t = line.trim();
  if (!t) continue;
  map.set(t, (map.get(t) || 0) + 1);
}
let n = 0;
for (const [k, c] of map) {
  if (c > 1) {
    console.log(c + 'x', k.slice(0, 120));
    n++;
  }
}
console.log('duplicate groups:', n);
