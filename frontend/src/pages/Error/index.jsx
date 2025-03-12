import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { HomeIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Determine the correct home path
  const homePath = isAuthenticated
    ? user?.role === "admin"
      ? "/admin/dashboard"
      : "/shop/home"
    : "/";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-gray-900">
            404
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img
            src="https://illustrations.popsy.co/amber/crashed-error.svg"
            alt="Error Illustration"
            className="w-48 h-48"
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="primary"
            onClick={() => navigate(homePath, { replace: true })}
            className="flex items-center px-4 py-2 space-x-2 bg-black hover:bg-gray-700 text-white rounded-lg transition-all"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Go Back Home</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
