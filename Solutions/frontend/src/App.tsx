import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@atoms/ErrorBoundary";
import { AuthProvider } from "@context/authContext";
import { UserProvider } from "@context/userContext";
import { ActivitiesProvider } from "@context/activitiesContext";
import MainLayout from "@pages/MainLayout";
import { PrivateRoute, RedirectAuthenticated } from "@routes/ProtectedRoutes";
import EditProfilePage from "./components/pages/EditProfilePage";
import ListTypePage from "./components/pages/CategoryTypePage";
import CategoryTypePage from "./components/pages/CategoryTypePage";
import ImageLoading from "@assets/images/loading.gif";
import FooterComponent from "./components/organisms/FooterComponent";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const HomePage = lazy(() => import("@pages/HomePage"));
const TermsOfUsePage = lazy(() => import("@pages/TermsOfUsePage"));
const PrivacyPolicyPage = lazy(() => import("@pages/PrivacyPolicyPage"));
const ProfilePage = lazy(() => import("@pages/ProfilePage"));

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ActivitiesProvider>
          <ErrorBoundary
            fallback={
              <p>
                Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
              </p>
            }
          >
            <Suspense fallback={<section className="flex items-center justify-center h-screen w-full flex-col"> 
              <img src={ImageLoading} alt="" />
              Carregando...
              </section>}>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <RedirectAuthenticated>
                      <LoginPage />
                    </RedirectAuthenticated>
                  }
                />
                <Route
                  path="/termos-de-uso"
                  element={
                    <MainLayout>
                      <TermsOfUsePage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/politica-de-privacidade"
                  element={
                    <MainLayout>
                      <PrivacyPolicyPage />
                    </MainLayout>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/atividades"
                  element={
                    <PrivateRoute>
                      <MainLayout>
                        <HomePage />
                      </MainLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    <PrivateRoute>
                      <MainLayout>
                        <ProfilePage />
                      </MainLayout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/editar-perfil"
                  element={
                    <PrivateRoute>
                      <MainLayout>
                        <EditProfilePage />
                      </MainLayout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/categoria-de-atividade"
                  element={
                    <PrivateRoute>
                      <MainLayout>
                        <ListTypePage />
                      </MainLayout>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/categorias/:category"
                  element={
                    <PrivateRoute>
                      <MainLayout>
                        <CategoryTypePage />
                      </MainLayout>
                    </PrivateRoute>
                  }
                />

                {/* Fallback Route */}
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <Navigate to="/atividades" />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ActivitiesProvider>
      </UserProvider>
      <FooterComponent />
    </AuthProvider>
  );
}

export default App;
