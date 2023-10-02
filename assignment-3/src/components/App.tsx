import styles from './styles/App.module.css'
import Header from './Header'
import SearchBar from './SearchBar'
import Table from './Table'
import Nav from './Nav'
import Footer from './Footer'
import Modal from './Modal'

import { BooksProvider } from './context/BooksProvider'
import { ModalProvider } from './context/ModalProvider'
import { AppProps } from './types'

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