Bun.build({
  entrypoints: ["./src/index.ts", "./src/operators/index.ts"],
  outdir: "./dist",
  splitting: true,
});
