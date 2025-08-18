import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './modules/base/ui/Layout'
import { CreateEventPage } from './modules/create-event/ui/pages/CreateEventPage'
import { LoginForm } from './modules/login-user/ui/pages/LoginForm'
import { RegisterForm } from './modules/register-user/ui/pages/RegisterForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='register' element={<RegisterForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='create-event' element={<CreateEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
