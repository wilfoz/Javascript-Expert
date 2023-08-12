import StringUtil from "@wilfoz/string-util";
const availableFormats = {
  "dd-mm-yyyy": "$<day>-$<month>-$<year>",
  "yyyy-mm-dd": "$<year>-$<month>-$<day>",
  "dd/mm/yyyy": "$<day>/$<month>/$<year>",
};

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

const stringToDateExps = {
  "dd-mm-yyyy": ddmmyy,
  "yyyy-mm-dd": yymmdd,
  "dd/mm/yyyy": ddmmyy,
};

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(availableFormats).includes(format)) {
      return {
        error: `the format ${format} is not available yet :( `,
      };
    }

    const exp = availableFormats[format];
    const [result] = date.toISOString().match(yymmdd);
    console.log("result: ", result);
    return result.replace(yymmdd, exp);
  }

  static formatString(dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: "your text is empty" };
    }
    if (!Object.keys(availableFormats).includes(currentFormat)) {
      return {
        error: `the format ${currentFormat} is not available yet :( `,
      };
    }

    if (!Object.keys(availableFormats).includes(expectedFormat)) {
      return {
        error: `the format ${expectedFormat} is not available yet :( `,
      };
    }

    const toDateExp = stringToDateExps[currentFormat];
    const dateStrInISO = StringUtil.removeEmptySpaces(dateStr).replace(
      toDateExp,
      "$<day>-$<month>-$<year>"
    );
    const finalDate = new Date(dateStrInISO);
    return this.formatDate(finalDate, expectedFormat);
  }
}
