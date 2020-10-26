import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';
import heroes from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

function Logon() {
  const [id, setId] = useState('')

  const history = useHistory()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await api.post('/sessions', { id })

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (err) {
      alert('Falha ao entrar, tente novamente.')
    }



  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Heroes Logo" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes" />
    </div>
  )
}

export default Logon;