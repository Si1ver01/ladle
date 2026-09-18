import serve from "./serve.js";

/**
 * @param {import("commander").Command} program
 * @param {typeof serve} action
 */
const addServeCommand = (program, action = serve) => {
  program
    .command("serve")
    .alias("dev")
    .description("start developing")
    .option("-h, --host [string]", "host to serve the application")
    .option("-p, --port [number]", "port to serve the application", (value) =>
      parseInt(value, 10),
    )
    .option("--stories [string]", "glob to find stories")
    .option("--theme [string]", "theme light, dark or auto")
    .option(
      "--config [string]",
      "folder where config is located, default .ladle",
    )
    .option("--viteConfig [string]", "file with Vite configuration")
    .option("--base [string]", "base URL path for build output")
    .option("--mode [string]", "Vite mode")
    .option("--noWatch", "Disable file system watching")
    .option("--no-open", "disable opening the browser")
    .action(action);
};

export default addServeCommand;
