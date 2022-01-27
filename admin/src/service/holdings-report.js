const { multiply, pipe } = require("ramda")
const { parse } = require("json2csv")

const csvLabelMap = [
  ["User", "userId"],
  ["First Name", "firstName"],
  ["Last Name", "lastName"],
  ["Date", "date"],
  ["Holding", "holding"],
  ["Value", "value"],
]

const buildCsvLabelMap = () =>
  csvLabelMap.map(([label, value]) => ({
    label,
    value,
  }))

const getCompanyMap = (companies) =>
  companies.reduce(
    (map, company) => ({
      ...map,
      [company.id]: company.name,
    }),
    {},
  )

const buildLineData = (
  { userId, firstName, lastName, date, investmentTotal },
  { id, investmentPercentage },
  companiesMap,
) => ({
  userId,
  firstName,
  lastName,
  date,
  holding: companiesMap[id],
  value: multiply(investmentPercentage, investmentTotal),
})

const buildReportData = (investments, companies) => {
  const companiesMap = getCompanyMap(companies)
  return investments.flatMap((investment) =>
    investment.holdings.map((holding) =>
      buildLineData(investment, holding, companiesMap),
    ),
  )
}

const convertToCsv = (report) => {
  return parse(report, { fields: buildCsvLabelMap() })
}

const generate = pipe(buildReportData, convertToCsv)

module.exports = {
  generate,
  getCompanyMap,
  buildLineData,
  buildReportData,
  convertToCsv,
}
