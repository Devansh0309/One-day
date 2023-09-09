import '@/styles/globals.scss'
import Context from "../../context"

export default function App({ Component, pageProps }) {
  return <Context>
    <Component {...pageProps} />
  </Context>
}
