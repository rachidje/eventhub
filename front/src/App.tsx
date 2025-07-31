import { AppWrapper } from './modules/base/ui/AppWrapper'
import { Layout } from './modules/base/ui/Layout'
import { CreateEventPage } from './modules/create-event/ui/pages/CreateEventPage'
import { RegisterForm } from './modules/register-user/ui/pages/RegisterForm'

function App() {

  return (
    <AppWrapper>
      <Layout>
        {/* <CreateEventPage /> */}
        <RegisterForm />
      </Layout>
    </AppWrapper>
  )
}

export default App
