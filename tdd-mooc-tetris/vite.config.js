/** @type {import("vite").UserConfig} */
export default {
  test: {
    setupFiles: ["test/testing.ts"],
    passWithNoTests: true,
    forceRerunTriggers: ["**"],
    globals: true
  },
};
