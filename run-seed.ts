#!/usr/bin/env node
import { seedChapter1 } from './server/seed-chapter1.js';

async function main() {
  try {
    console.log("Starting seed...");
    await seedChapter1();
    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

main();