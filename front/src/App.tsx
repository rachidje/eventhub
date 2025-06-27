import { AppWrapper } from './modules/base/ui/AppWrapper'
import { Layout } from './modules/base/ui/Layout'
import { CreateEventPage } from './modules/create-event/ui/pages/CreateEventPage'

function App() {

  return (
    <AppWrapper>
      <Layout>
        <CreateEventPage />
      </Layout>
    </AppWrapper>
  )
}

export default App
