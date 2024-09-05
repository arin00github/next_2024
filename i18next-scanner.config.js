const typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: [
    "./src/components/**/*.{js,jsx,ts,tsx,html}",
    "./src/components/**/**/*.{js,jsx,ts,tsx,html}",
    //"./src/components/**/*.{js,jsx,ts,tsx,html}",
    "!**/*.d.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  output: "./public",
  options: {
    sort: true,
    lngs: ["en", "ko"],
    ns: ["common"],
    defaultLng: "en",
    defaultNs: "common",
    defaultValue: "N/A",
    resource: {
      loadPath: "locales/{{lng}}/{{ns}}.json",
      savePath: "locales/{{lng}}/{{ns}}.json",
      lineEnding: "\n",
    },
  },
  transform: typescriptTransform(
    {
      extensions: [".ts", ".tsx"],
      tsOptions: {
        target: "es2017",
      },
    },
    (outputText, file, enc, done) => {
      parser.parseTransFormString(outputText);
      parser.parseFuncFromString(outputText);
      done();
    }
  ),
};
