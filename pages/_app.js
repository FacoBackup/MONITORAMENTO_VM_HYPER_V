import '../styles/globals.css'
import {useEffect, useState} from "react";
import {Button, Fabric, Navigation, NavigationGroup} from "@f-ui/core";
import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";
import "@fontsource/roboto"

function MyApp({Component, pageProps}) {
    const router = useRouter()
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        setTheme(localStorage.getItem('theme'))
    }, [])
    return (
        <Fabric theme={theme}  className={styles.container}>
            <Navigation>
                <NavigationGroup justify={'start'}>
                    <img className={styles.logo} src={theme + '.png'} alt={'logo'}/>

                    <Button styles={{marginLeft: '8px', padding: '4px', width: 'unset'}} variant={"minimal"} highlight={true} className={styles.button} onClick={() => router.push('/')}>
                        Início
                    </Button>
                </NavigationGroup>

                <NavigationGroup justify={'end'}>

                    <Button className={styles.button} onClick={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
                    }}>
                        <span className={'material-icons-round'}>{theme + '_mode'}</span>
                    </Button>

                </NavigationGroup>
            </Navigation>
            <div className={styles.content}>
                <Component {...pageProps}/>
            </div>
        </Fabric>
    )
}

export default MyApp
