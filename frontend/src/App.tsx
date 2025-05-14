import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipePage from './pages/RecipePage';
import AIRecipeGenerator from './pages/AIRecipeGenerator';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/create" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/ai" element={<AIRecipeGenerator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* 404 fallback */}
            <Route path="*" element={<div className="text-center text-red-600 text-lg">404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
