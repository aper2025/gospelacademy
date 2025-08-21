import { seedCompleteCourse } from "./server/seed-complete-course";

async function main() {
  try {
    console.log("Starting complete course seed...");
    const result = await seedCompleteCourse();
    console.log("Seed completed successfully!");
    console.log(`Created course: ${result.course.title}`);
    console.log(`Created ${result.units.length} units`);
    console.log(`Created ${result.lessonCount} lessons`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

main();