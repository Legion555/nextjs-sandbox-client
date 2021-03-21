import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
//redux
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from '../store'

let persistor = persistStore(store);



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Layout>
    </Provider>
  )
}

export default MyApp