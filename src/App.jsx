import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    <Routes>
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/auth/*" element={<Auth />} />
      
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ marginLeft: "-50px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "600px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              zIndex:100,
            },
          }}
        />
        </>
  );
}

export default App;