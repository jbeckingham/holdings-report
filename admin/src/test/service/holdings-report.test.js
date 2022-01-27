const {
  generate,
  buildLineData,
  buildReportData,
  convertToCsv,
} = require("../../service/holdings-report.js")
const investments = require("./data/investments")
const companies = require("./data/companies")
const companyMap = {
  1: {
    id: "1",
    name: "The Big Investment Company",
    address: "14 Square Place",
    postcode: "SW18UU",
    frn: "234165",
  },
  2: {
    id: "2",
    name: "The Small Investment Company",
    address: "12 Circle Square",
    postcode: "SW18UD",
    frn: "773388",
  },
  3: {
    id: "3",
    name: "Capital Investments",
    address: "1 Capital Road",
    postcode: "SW18UT",
    frn: "078592",
  },
}
const invalidCompanyMap = {
  7: {
    id: "1",
    name: "The Big Investment Company",
    address: "14 Square Place",
    postcode: "SW18UU",
    frn: "234165",
  },
}
const reportEntryNoHolding = {
  userId: "1",
  firstName: "Billy",
  lastName: "Bob",
  date: "2020-01-01",
  holding: "",
  value: 1400,
}
const reportData = [
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
const csv = `"User","First Name","Last Name","Date","Holding","Value"
"1","Billy","Bob","2020-01-01","The Small Investment Company",1400
"2","Sheila","Aussie","2020-01-01","The Big Investment Company",10000
"2","Sheila","Aussie","2020-01-01","The Small Investment Company",10000`

describe("buildLineData", () => {
  test("Builds line data", () => {
    const result = buildLineData(
      investments[0],
      investments[0]["holdings"][0],
      companyMap,
    )
    expect(result).toEqual(reportData[0])
  })

  test("Builds line data with invalid company id", () => {
    const result = buildLineData(
      investments[0],
      investments[0]["holdings"][0],
      invalidCompanyMap,
    )
    expect(result).toEqual(reportEntryNoHolding)
  })
})

describe("buildReportData", () => {
  test("Builds report data", () => {
    const result = buildReportData(investments, companies)
    expect(result).toEqual(reportData)
  })
})

describe("convertToCsv", () => {
  test("Converts report to csv", () => {
    const result = convertToCsv(reportData)
    expect(result).toEqual(csv)
  })
})

describe("generate", () => {
  test("Generates csv report", () => {
    const result = generate(investments, companies)
    expect(result).toEqual(csv)
  })
})
