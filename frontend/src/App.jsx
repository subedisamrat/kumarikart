import { Routes, Route, useNavigate } from "react-router-dom";
import CheckAuth from "./components/common/checkauth";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import Shoppinglayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingList from "./pages/shopping-view/productListing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import NotFound from "./pages/Error/index";
import UnAuthPage from "./pages/Error/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[600px] h-[550px] rounded-md" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Error Page */}

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />

        {/* AuthLayout Page*/}

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/*  */}

        {/* Admin Login Path */}
        {/* <Route
          path="/admin/login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AuthLogin />} />
        </Route> */}

        {/* Admin Page*/}

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* Shopping Page */}

        <Route
          path="/shop"
          element={
            <CheckAuth inLayout isAuthenticated={isAuthenticated} user={user}>
              <Shoppinglayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
