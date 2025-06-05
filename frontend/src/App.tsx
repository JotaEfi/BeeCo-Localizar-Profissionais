import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { RegisterProfessional } from '@/pages/RegisterProfessional'
import { RegisterClient } from '@/pages/RegisterClient'
import { RegisterOptionUser } from '@/pages/RegisterOptionUser'
import { Home } from '@/pages/Home'
import { DashboardProfissional } from './pages/DashboardProfissional'
import { SearchProfessional } from './pages/SearchProfessional'
import { Chat } from './pages/Chat'
import { Profile } from './pages/Profile'
import { Favorites } from './pages/Favorites'
import { ContractingArea } from './pages/ContractingArea'
import { ProfileProfessional } from './pages/ProfileProfessional'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { UserProvider } from '@/contexts/UserContext'


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard-profissional' element={
            <ProtectedRoute allowedUserTypes={['prestador']}>
              <DashboardProfissional />
            </ProtectedRoute>
           } />
          <Route path='/contracting' element={
            <ProtectedRoute allowedUserTypes={['contratante']}>
              <ContractingArea />
            </ProtectedRoute>
          } />
          <Route path='/search' element={
            <ProtectedRoute allowedUserTypes={['contratante']}>
              <SearchProfessional />
            </ProtectedRoute>
          } />
          <Route path='/chat' element={
            <ProtectedRoute allowedUserTypes={['contratante', 'prestador']}>
              <Chat />
            </ProtectedRoute>
           } />
          <Route path='/profile' element={
            <ProtectedRoute allowedUserTypes={['contratante', 'prestador']}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/favorites' element={
            <ProtectedRoute allowedUserTypes={['contratante']}>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path='/professional/:id' element={
            <ProtectedRoute allowedUserTypes={['contratante']}>
              <ProfileProfessional/>
            </ProtectedRoute>
          } />
          <Route path='/select/register' element={<RegisterOptionUser />} />
          <Route path='/professional/register' element={<RegisterProfessional />} />
          <Route path='/register' element={<RegisterClient />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
