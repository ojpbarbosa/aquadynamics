import { PORT, setUpApp } from './configuration'

const app = setUpApp()

const port = PORT || 3030

app.listen(port, () => {
  console.log(`RESTful API started running on port ${port}!`)
})
