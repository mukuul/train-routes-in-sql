import fs from "fs";
import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./public/dist/")) {
  fs.mkdirSync("./public/dist/");
}

//build the application
esbuild
  .build({
    entryPoints: ["./frontend/index.js"],
    outdir: "./public/dist",
    format: "esm",
    minify: false, //so the resulting code is easier to understand
    bundle: true,
    splitting: false,
    watch: true,
    plugins: [sveltePlugin()],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
