// import React from "react";

// const NotFound = () => {
//   return <div>Page doesn't exist 😢</div>;
// };

// export default NotFound;

import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you have an icon for home

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <Card className="w-full max-w-md">
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
            onClick={() => (window.location.href = "/")}
            className="flex items-center space-x-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go Back Home</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
