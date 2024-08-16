import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";

import toast from "react-hot-toast";
import { login } from "./apiLogin";
import Cookies from "js-cookie";
import { LoginSchema } from "./LoginSchema";



export function SignIn() {
  const navigate = useNavigate();

  const handlelogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await login(values);
      Cookies.set("token", response.token, { expires: 1 });
      toast.success("Login successful!");
      navigate("/", { replace: true });  
    } catch (error) {
      setSubmitting(false);
      if (error.message.includes("Invalid email or password")) {
        setFieldError("email", "Invalid email or password");
        setFieldError("password", "Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <section className="m-10  flex gap-4 ">
      <div className="w-full lg:w-3/5 mt-24">
      <div className="text-center">
  <Typography variant="h2" className="font-bold mb-4">
    Sign In
  </Typography>
  <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
    Please enter your email and password to access your account.
  </Typography>
</div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handlelogin}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 mb-2 h-[19rem] mx-auto w-120 max-w-screen-lg lg:w-[38rem] bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="mb-4 pt-9">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-500" />
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-500" />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-gray-200 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-2/5 h-[40rem]  hidden lg:block z-1">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl z-10" />
      </div>
    </section>
  );
}

export default SignIn;