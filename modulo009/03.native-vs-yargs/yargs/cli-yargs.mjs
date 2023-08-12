#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({
  name,
  age,
  power,
  id: Date.now(),
});

const { argv } = yargs(hideBin(process.argv))
  .command("createHero", "create a hero", (builder) => {
    return builder
      .options(
        "name",
        {
          alias: "n",
          demandOption: true,
          describe: "hero name",
          type: "string",
        },
        "age",
        {
          alias: "a",
          demandOption: true,
          describe: "hero age",
          type: "number",
        },
        "power",
        {
          alias: "p",
          demandOption: true,
          describe: "hero power",
          type: "string",
        }
      )
      .example(
        "createHero --name Flash --age 33 --power speed",
        "create a hero"
      );
  })
  .epilog("copyright 2023 - Wilerson A. Corporation");
console.log(hero(argv));
