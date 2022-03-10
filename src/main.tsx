import React from 'react'
import ReactDOM from 'react-dom'
import { history, IHistoryRouter } from './router/history'
import "@/utils/rem";
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <IHistoryRouter history={history}>
      <App />
    </IHistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
