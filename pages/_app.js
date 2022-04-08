import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import "@fontsource/roboto"
import Wrapper from "../ext/wrapper/Wrapper";
import page from '../public/page.json'

function MyApp({Component, pageProps}) {
    console.log({host: page.authHost})
    return (
        <Wrapper
            host={ page.authHost}
            pages={[{label: 'Início', path: '/', requireAuth: true}]}
        >
            <div className={styles.contentWrapper}>
                <Component {...pageProps}/>
            </div>

        </Wrapper>
    )
}

export default MyApp
