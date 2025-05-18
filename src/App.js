import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import MenuPage from "./Page/MenuPage.js";
import QuizPage from "./Page/QuizPage.js";
import QuizCompletionScreen from "./Components/App/quizcomplete.js";
import { ScoreProvider } from "./contexts/ScoreContext.js";
import QuizResult from "./Components/App/quiz_result.js";
import { OrderProvider } from "./contexts/OrderContext.js";
import MenuCheck from "./Components/App/MenuCheck.js";
import OrderCompletionScreen from "./Components/App/orderComplete.js";
import PreventRefresh from "./PreventRefresh.js";
import OrderCkeckMan from "./Components/App/Web/OrderCkeckMan.js";
import GirsRoomStory from "./Components/App/Web/GirsRoomStory.js";
import VoteScreen from "./Components/App/Web/VotePage.js";
import LastPage from "./Components/App/Web/LastPage.js";
import QRPage from "./Components/App/Web/QRPage.js";
import { MenuProvider } from "./contexts/MenuContext.js";
import OrderFinishedPage from "./Components/App/Web/OrderFinishedPage.js";

function App() {
  return (
    <Router>
      <PreventRefresh />
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <ScoreProvider>
            <OrderProvider>
              <ScrollToTop />
              <Routes>
                {/* 기본 화면 설정 */}
                <Route path="/qr" element={<QRPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/menuCheck" element={<MenuCheck />} />
                <Route
                  path="/order-submit"
                  element={<OrderCompletionScreen />}
                />
                <Route path="/counter" element={<OrderCkeckMan />} />
                <Route path="/kitchen" element={<GirsRoomStory />} />
                <Route path="/LastPage" element={<LastPage />} />
                <Route path="/order" element={<MenuPage />} />
                <Route path="/order-finished" element={<OrderFinishedPage />} />
              </Routes>
            </OrderProvider>
          </ScoreProvider>
        </MenuProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
