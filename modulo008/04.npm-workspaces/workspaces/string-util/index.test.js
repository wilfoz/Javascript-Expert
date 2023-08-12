import { deepStrictEqual } from "assert";
import StringUtil from "./index.js";

{
  const expected = true;
  const data = "";
  const result = StringUtil.isEmpty(data);
  deepStrictEqual(result, expected);
}

{
  const expected = false;
  const data = "not empty";
  const result = StringUtil.isEmpty(data);
  deepStrictEqual(result, expected);
}

{
  const expected = "word";
  const data = "w o r d";
  const result = StringUtil.removeEmptySpaces(data);
  deepStrictEqual(result, expected);
}
