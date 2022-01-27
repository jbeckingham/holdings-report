const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios")
const holdingsReport = require("./service/holdings-report")

const app = express()

app.use(bodyParser.json({ limit: "10mb" }))

app.get("/investments/:id", (req, res) => {
  const { id } = req.params
  axios
    .get(`${config.investmentsServiceUrl}/investments/${id}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((e) => {
      console.error(e)
      res.sendStatus(500)
    })
})

app.get("/holdingsReport", async (req, res) => {
  try {
    const [investments, companies] = await Promise.all([
      axios
        .get(`${config.investmentsServiceUrl}/investments`)
        .then((response) => response.data),
      axios
        .get(`${config.financialCompaniesServiceUrl}/companies`)
        .then((response) => response.data),
    ])
    const report = holdingsReport.generate(investments, companies)
    // todo: export report
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
  res.sendStatus(200)
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
