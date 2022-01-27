const {
  generate,
  getCompanyMap,
  buildLineData,
  buildReportData,
  convertToCsv,
} = require("../../service/holdings-report.js")
const investments = require("./data/investments")
const companies = require("./data/companies")
const companyMap = {
  1: "The Big Investment Company",
  2: "The Small Investment Company",
  3: "Capital Investments",
}
const csv = `"User","First Name","Last Name","Date","Holding","Value"
"1","Billy","Bob","2020-01-01","The Small Investment Company",1400
"2","Sheila","Aussie","2020-01-01","The Big Investment Company",10000
"2","Sheila","Aussie","2020-01-01","The Small Investment Company",10000`

describe("getCompanyMap", () => {
  test("Builds company map", () => {
    const result = getCompanyMap(companies)

    expect(result).toEqual(companyMap)
  })
})

describe("buildLineData", () => {
  test("Builds line data", () => {
    const result = buildLineData(
      investments[0],
      investments[0]["holdings"][0],
      companyMap,
    )
    const expectedResult = {
      userId: "1",
      firstName: "Billy",
      lastName: "Bob",
      date: "2020-01-01",
      holding: "The Small Investment Company",
      value: 1400,
    }
    expect(result).toEqual(expectedResult)
  })
})

describe("buildReportData", () => {
  test("Builds report data", () => {
    const result = buildReportData(investments, companies)
    const expectedResult = [
      {
        userId: "1",
        firstName: "Billy",
        lastName: "Bob",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 1400,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Big Investment Company",
        value: 10000,
      },
      {
        userId: "2",
        firstName: "Sheila",
        lastName: "Aussie",
        date: "2020-01-01",
        holding: "The Small Investment Company",
        value: 10000,
      },
    ]
    expect(result).toEqual(expectedResult)
  })
})
