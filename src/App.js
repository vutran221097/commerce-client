import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import HomePage from "./pages/HomePage/HomePage.jsx";
import ShopPage from "./pages/ShopPage/ShopPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage'

// components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LiveChat from "./components/LiveChat/LiveChat";

function App() {
  return (
    <div className="App">
      {/* toast notification */}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/detail/:id" element={<DetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/history/:userId"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order-detail/:id"
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* live chat */}
      <LiveChat />
    </div>
  );
}

export default App;
