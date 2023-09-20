import styles from "../styles/App.module.css"
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import Table from "./Table";
import Nav from "./Nav";
import Footer from "./Footer";

function App() {
  return (
    <div className={styles.App}>
      <Profile />
      <SearchBar />
      <Table />
      <Nav />
      <Footer />
    </div>
  );
}

export default App;
