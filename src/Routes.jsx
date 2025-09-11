import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductCatalogPage from './pages/product-catalog-advanced-tcg-discovery';
import UserAccountDashboard from './pages/user-account-dashboard-collector-command-center';
import ShoppingCartCheckout from './pages/shopping-cart-checkout-secure-collection-investment';
import ProductDetailPage from './pages/product-detail-individual-card-experience';
import AdminDashboard from './pages/admin-dashboard-operations-command-center';
import Homepage from './pages/homepage-premium-pok-mon-tcg-marketplace';
import SealedProductsPage from './pages/sealed-products-catalog';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Homepage as the landing page */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product-catalog-advanced-tcg-discovery" element={<ProductCatalogPage />} />
        <Route path="/user-account-dashboard-collector-command-center" element={<UserAccountDashboard />} />
        <Route path="/shopping-cart-checkout-secure-collection-investment" element={<ShoppingCartCheckout />} />
        <Route path="/product-detail-individual-card-experience" element={<ProductDetailPage />} />
        <Route path="/admin-dashboard-operations-command-center" element={<AdminDashboard />} />
        <Route path="/homepage-premium-pok-mon-tcg-marketplace" element={<Homepage />} />
        <Route path="/sealed-products-catalog" element={<SealedProductsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
