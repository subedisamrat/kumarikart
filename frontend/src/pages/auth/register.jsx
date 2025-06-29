import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice/index";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Success",
          description: "User registration successful✅", //data?.payload?.message ||
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Error",
          description:
            "User with this email exists, please use another email❌",
        });
      }
    });
  };

  return (
    <main className="flex items-center justify-center h-fit bg-gradient-to-br from-blue-50 to-purple-50 p-4 ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            KumariKart{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={registerFormControl}
            buttonText="Register"
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
          <CardDescription className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthRegister;
