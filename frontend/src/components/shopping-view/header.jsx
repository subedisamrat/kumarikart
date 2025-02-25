import { HousePlus, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-4">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          className="text-sm font-medium"
          key={menuItem.id}
          to={menuItem.path}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  //console.log("cart items", cartItems);
  return (
    <div className="flex lg:items-center lg:flex-row fex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-gradient-to-r from-indigo-500 to-purple-600 w-12 h-12 rounded-full cursor-pointer shadow-lg transition-all hover:scale-105">
            <AvatarFallback className="bg-black text-white font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center">
              {user?.userName
                ? `${user.userName[0].toUpperCase()}${user.userName
                    .slice(-1)
                    .toUpperCase()}`
                : ""}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className="w-56 bg-white shadow-xl rounded-lg border border-gray-200 p-2"
        >
          <DropdownMenuLabel className="text-gray-700 font-semibold">
            Logged in as{" "}
            <span className="font-bold text-slate-900">
              {" "}
              {user?.userName.toUpperCase()}{" "}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200 my-1" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition"
          >
            <UserCog className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200 my-1" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingViewHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // console.log(user, "user");

  return (
    <header className="sticky top-0 w-full border-b bg-background z-40">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          <HousePlus className="h-6 w-6" />
          <span className="font-bold">KumariKart</span>
        </Link>
        {/* for small devices */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        {/* for larger devices */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingViewHeader;
