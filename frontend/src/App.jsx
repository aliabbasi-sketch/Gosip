import { Navigate, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth().catch((error) => {
      console.log("User check returned Error:", error);
    });
  }, [checkAuth]); 

  console.log("USer is authenticated as : ", authUser);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (

    // With this:
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Background.png')" }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>
      <div>
        <Toaster />
      </div>

    </div>

  )
}
export default App;
