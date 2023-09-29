import styles from '../styles/App.module.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Modal from './components/Modal'

import { BooksProvider } from './components/context/BooksProvider'
import { ModalProvider } from './components/context/ModalProvider'
import { AppProps } from './components/types'

const App: React.FC<AppProps> = ({ theme }) => {
    return (
        <div
            className={
                theme?.type === 'dark'
                    ? `${styles.AppContainer} ${styles.dark}`
                    : styles.AppContainer
            }
        >
            <section className={styles.App}>
                <ModalProvider>
                    <Header theme={theme} />
                    <BooksProvider>
                        <SearchBar />
                        <Table />
                        <Nav />
                        <Modal />
                    </BooksProvider>
                    <Footer />
                </ModalProvider>
            </section>
        </div>
    )
}

export default App
