import "./App.css";
import MainPage from "@/component/main/MainPage";
import Header from "@/component/common/Header";
import Footer from "@/component/common/Footer";

function App() {
  return (
    <>
      {/* wrapper 사용해야 함 */}
      <Header />
      <MainPage />
      <Footer />
    </>
  );
}

export default App;
