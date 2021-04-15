import { cyan } from "colorette";

import { downloadBoilerplate } from "./utils/download";
import { installDependencies } from "./utils/install";

const inquirer = require("inquirer");

interface Answers {
  name: string;
}

export const initBlog = async (): Promise<void> => {
  const answers: Answers = await prompt();

  await downloadBoilerplate(answers.name, "1/2");

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
