#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:henryfromvietnam@gmail.com");
                    console.log("\nDone, see you soon at inbox.");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://tanducmai.com/resume/TanDucMai_Resume.pdf').pipe(fs.createWriteStream('./TanDucMai_Resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'TanDucMai_Resume.pdf')
                        console.log(`\nResume downloaded at ${downloadPath}`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: `Head to my ${chalk.redBright.bold("website")}?`,
                value: () => {
                    open('https://tanducmai.com/');
                    console.log("\nDone, happy browsing!");
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Cheers!");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Tan Duc (Henry) Mai"),
    handle: chalk.white("@tanducmai"),
    work: `${chalk.white("Cyber Security Student at")} ${chalk
        .hex("#2b82b2")
        .bold("University of South Australia")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("henrymai372"),
    github: chalk.gray("https://github.com/") + chalk.green("tanducmai"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("tanducmai"),
    web: chalk.cyan("https://tanducmai.com/"),
    npx: chalk.red("npx") + " " + chalk.white("tanducmai"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);

prompt(questions).then(answer => answer.action());
