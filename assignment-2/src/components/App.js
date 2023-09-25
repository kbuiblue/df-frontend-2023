import styles from "../styles/App.module.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Table from "./Table";
import Nav from "./Nav";
import Footer from "./Footer";
import { BooksProvider } from "./BooksProvider";
import { ModalProvider } from "./ModalProvider";
import Modal from "./Modal";
import { ThemeProvider } from "./ThemeProvider";

function App() {
    return (
        <div className={styles.App}>
            <ThemeProvider>
                <ModalProvider>
                    <Header />
                    <BooksProvider>
                        <SearchBar />
                        <Table />
                        <Nav />
                        <Modal />
                    </BooksProvider>
                    <Footer />
                </ModalProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
