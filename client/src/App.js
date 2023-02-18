import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Landing,Register,Error, ProtectedRoute} from './pages/index'
import {Client,Loan,AllClients,Profile,SharedLayout,Stats,AddClient} from "./pages/dashboard/index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>
        }>
          <Route index element={<Stats/>}/>
          <Route path='all-clients' element={<AllClients/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='add-client' element={<AddClient/>}/>
          <Route path='loan-application' element={<Loan/>}/>
          <Route path='client' element={<Client/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/landing' element={<Landing/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}
