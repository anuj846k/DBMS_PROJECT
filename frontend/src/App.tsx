import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));
const Recipe = lazy(() => import("./pages/RecipePage"));

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            {/* 404 fallback */}
            <Route path="*" element={<div className="text-center text-red-600 text-lg">404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
