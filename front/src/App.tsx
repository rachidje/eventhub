import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './modules/base/ui/Layout'
import { CreateEventPage } from './modules/create-event/ui/pages/CreateEventPage'
import { LoginForm } from './modules/login-user/ui/pages/LoginForm'
import { RegisterForm } from './modules/register-user/ui/pages/RegisterForm'
import PrivateRoute from './modules/base/router/PrivateRoute'
import RoleRoute from './modules/base/router/RoleRoute'
import EventsPage from './modules/displayEvents/ui/EventsPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<EventsPage />} />
          <Route path='register' element={<RegisterForm />} />
          <Route path='login' element={<LoginForm />} />

          {/* Routes protegees */}

          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowed={["organizer"]} />}>
              <Route path="/create-event" element={<CreateEventPage />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
