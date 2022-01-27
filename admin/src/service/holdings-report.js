const { multiply, pipe, map, reduce, chain } = require("ramda")
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
  map(
    ([label, value]) => ({
      label,
      value,
    }),
    csvLabelMap,
  )

const getCompanyMap = (companies) =>
  reduce(
    (map, company) => ({
      ...map,
      [company.id]: company.name,
    }),
    {},
    companies,
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
  return chain(
    (investment) =>
      map(
        (holding) => buildLineData(investment, holding, companiesMap),
        investment.holdings,
      ),
    investments,
  )
}

const convertToCsv = (report) => parse(report, { fields: buildCsvLabelMap() })

const generate = pipe(buildReportData, convertToCsv)

module.exports = {
  generate,
  getCompanyMap,
  buildLineData,
  buildReportData,
  convertToCsv,
}
