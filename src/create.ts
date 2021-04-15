import { bold, cyan } from "colorette";
import { Spinner } from "cli-spinner";

import { rimraf } from "./utils/utils";
import { downloadBlogBoilerplate } from "./utils/download";
import { unZipBuffer } from "./utils/unzip";
import { installDependencies } from "./utils/install";

const inquirer = require("inquirer");

interface Answers {
  name: string;
}

export const initBlog = async (): Promise<void> => {
  const answers: Answers = await prompt();

  await downloadBoilerplate(answers);

  await installDependencies(answers.name, "2/2");

  info(answers);
};

const info = (answers: Answers) => {
  console.log(
    "\nThe template has been cloned in the newly created folder " +
      cyan(answers.name) +
      "\n"
  );

  console.log("Dive deeper with the " + cyan("README.md") + "\n");
};

const prompt = (): Promise<Answers> => {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Project name (will be use to create a new folder)?",
      validate: (input: string) => {
        if (input && input.length > 0) return true;
        return "Please provide a template name";
      },
    },
  ];

  return inquirer.prompt(questions);
};

const downloadBoilerplate = async (answers: Answers) => {
  const loading = new Spinner(bold("[1/2] Creating project..."));
  loading.setSpinnerString(18);
  loading.start();

  // 1. Remove dir
  rimraf(answers.name);

  // 2. Download starter
  const buffer = await downloadBlogBoilerplate();
  await unZipBuffer(buffer, answers.name);

  loading.stop(true);
};
