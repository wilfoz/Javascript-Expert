import { deepStrictEqual } from "assert";
import DateUtil from "./index.js";

{
  const format = "dd-M-y";
  const expected = { error: `the format ${format} is not available yet :( ` };
  const date = new Date(1990, 2, 1);
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "01-12-1990";
  const format = "dd-mm-yyyy";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "01/12/1990";
  const format = "dd/mm/yyyy";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = "1990-12-01";
  const format = "yyyy-mm-dd";
  const date = new Date("1990-12-01");
  const result = DateUtil.formatDate(date, format);
  deepStrictEqual(result, expected);
}

{
  const expected = { error: "your text is empty" };
  const date = "";
  const result = DateUtil.formatString(date);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1990-april-01",
    format: "yyy-M-dd",
  };

  const expected = {
    error: `the format ${date.format} is not available yet :( `,
  };
  const result = DateUtil.formatString(date.value, date.format);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "dd/M/yyyy";

  const expected = {
    error: `the format ${expectedFormat} is not available yet :( `,
  };
  const result = DateUtil.formatString(date.value, date.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "dd-mm-yyyy";

  const expected = "01-01-1990";
  const result = DateUtil.formatString(date.value, date.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1 9 9 0/01/01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "dd/mm/yyyy";

  const expected = "01/01/1990";
  const result = DateUtil.formatString(date.value, date.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1 9 9 0/01/01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "yyyy-mm-dd";

  const expected = "1990-01-01";
  const result = DateUtil.formatString(date.value, date.format, expectedFormat);
  deepStrictEqual(result, expected);
}

{
  const date = {
    value: "1 9 9 0/0 1/01",
    format: "dd/mm/yyyy",
  };
  const expectedFormat = "yyyy-mm-dd";

  const expected = "1990-01-01";
  const result = DateUtil.formatString(date.value, date.format, expectedFormat);
  deepStrictEqual(result, expected);
}
