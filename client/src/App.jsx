import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import Header from './components/Header/Header.jsx'
import Home from './components/Home/Home.jsx'
import PokemonDetail from './components/PokemonDetail/PokemonDetail.jsx'
import Footer from './components/Footer/Footer.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import UsersPokemon from './components/UsersPokemon/UsersPokemon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-page'>
      <Provider store={store}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/pokemon' element={<Home />} />
              <Route path='/pokemon/:id' element={<PokemonDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/userspokemon' element={<UsersPokemon />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </Provider>
    </div>
  )
}

export default App