#!/usr/bin/env node
/**
 * scripts/check-syntax.js — Wrapper zero-dependency para `node --check`.
 *
 * Roda `node --check` em todos os arquivos js/*.js e reporta falhas de
 * sintaxe. Exit 1 se houver qualquer arquivo com sintaxe inválida, 0 se ok.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const JS_DIR = path.join(ROOT, 'js');

function main() {
  if (!fs.existsSync(JS_DIR)) {
    console.error(`❌ Diretório não encontrado: ${JS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(JS_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => path.join(JS_DIR, f))
    .sort();

  if (files.length === 0) {
    console.log('ℹ️ Nenhum arquivo .js encontrado em js/.');
    process.exit(0);
  }

  let failures = 0;
  for (const file of files) {
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
      console.log(`✅ ${path.relative(ROOT, file)}`);
    } catch (err) {
      failures++;
      console.error(`❌ ${path.relative(ROOT, file)} → sintaxe inválida`);
      const stderr = err.stderr ? err.stderr.toString() : '';
      if (stderr) {
        stderr
          .split('\n')
          .filter((l) => l.trim().length > 0)
          .forEach((l) => console.error(`   ${l}`));
      }
    }
  }

  console.log(`\n🔍 Sintaxe verificada em ${files.length} arquivo(s) | Falhas: ${failures}`);
  process.exit(failures > 0 ? 1 : 0);
}

main();
