const { multiply } = require("ramda")

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

const convertToCsv = (report) => {}

const generate = (investments, companies) => {
  const reportData = buildReportData(investments, companies)
  return convertToCsv(reportData)
}

module.exports = {
  generate,
  getCompanyMap,
  buildLineData,
  buildReportData,
  convertToCsv,
}
