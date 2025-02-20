import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((data) => {
        //console.log(data);
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message || "Login successful",
            variant: "success",
          });
        } else {
          toast({
            title: data?.payload?.message || "Login failed",
            description: "Please login with valid credentials",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast({
          title: "Login failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      });
  };
  return (
    <main className="flex items-center justify-center h-fit bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-lg ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            KumariKart{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={loginFormControl}
            buttonText="Log in"
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
          <CardDescription className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register Here
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthLogin;
