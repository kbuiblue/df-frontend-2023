import styles from "../styles/App.module.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Table from "./Table";
import Nav from "./Nav";
import Footer from "./Footer";
import { BooksProvider } from "./BooksProvider";

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <BooksProvider>
                <SearchBar />
                <Table />
                <Nav />
            </BooksProvider>
            <Footer />
        </div>
    );
}

export default App;
