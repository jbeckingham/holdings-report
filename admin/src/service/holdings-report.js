const { multiply, pipe, map, chain, indexBy, prop } = require("ramda")
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

const buildLineData = (
  { userId, firstName, lastName, date, investmentTotal },
  { id, investmentPercentage },
  companiesMap,
) => ({
  userId,
  firstName,
  lastName,
  date,
  holding: companiesMap[id]?.name ?? "",
  value: multiply(investmentPercentage, investmentTotal),
})

const buildReportData = (investments, companies) => {
  const companiesMap = indexBy(prop("id"), companies)
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
  buildLineData,
  buildReportData,
  convertToCsv,
}
