import { parse } from "csv-parse/sync";

// * parsePeopleCsv is also reading the file, which is outside of the scope defined by the function name
// TODO: Remove the read operation and pass the csv file as its parameter DONE
export function parsePeopleCsv(csvData) {
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
