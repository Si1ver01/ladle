import { Command } from "commander";
import { beforeEach, describe, expect, test, vi } from "vitest";
import applyCLIConfig from "../lib/cli/apply-cli-config.js";
import addServeCommand from "../lib/cli/serve-command.js";
import defaultConfig from "../lib/shared/default-config.js";

const getServeOptions = (args: string[]) => {
  const action = vi.fn();
  const program = new Command();
  addServeCommand(program, action);
  program.parse(["node", "ladle", ...args]);
  return action.mock.calls[0][0];
};

describe("serve browser option", () => {
  beforeEach(() => {
    defaultConfig.open = true;
  });

  test.each(["serve", "dev"])(
    "%s --no-open disables browser opening",
    (command) => {
      expect(getServeOptions([command, "--no-open"]).open).toBe(false);
    },
  );

  test("browser opening remains enabled by default", () => {
    expect(getServeOptions(["serve"]).open).toBe(true);
  });

  test("applyCLIConfig preserves an explicit false value", async () => {
    const { config } = await applyCLIConfig({
      config: ".ladle-does-not-exist",
      open: false,
    });

    expect(config.open).toBe(false);
  });

  test("applyCLIConfig does not overwrite the default with undefined", async () => {
    const { config } = await applyCLIConfig({
      config: ".ladle-does-not-exist",
      open: undefined,
    });

    expect(config.open).toBe(true);
  });
});
