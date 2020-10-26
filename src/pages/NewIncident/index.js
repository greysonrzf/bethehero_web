import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';
import logo from '../../assets/logo.svg'

function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleCreateIncident(event) {
    event.preventDefault()

    try {
      await api.post('incidents', {
        title,
        description,
        value,
      }, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Erro ao criar incidente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section className="form">
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
        Voltar para home
      </Link>
        </section>
        <form onSubmit={handleCreateIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident;