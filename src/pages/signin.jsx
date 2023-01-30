import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { server } from "../api/server";
import { AuthContext } from "../utils/authContext";
import { history } from "../utils/history";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authContext = useContext(AuthContext);

  async function signin(email, password) {
    try {
      // FAKE LOGIN
      const { data } = await server.get(
        `https://my-json-server.typicode.com/MpMeetPatel/json-server/profile`,
        { email, password }
      );
      const user = data[Math.floor(Math.random()*3)].data;
      if (user?.token) {
        localStorage.setItem("token", user?.token);
        authContext?.authenticate(user?.token, user.name);
        history?.push("/");
        Swal.fire("Yeaah !!!!", "Signin successful !", "success");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        Swal.fire("Oops...", error?.response?.data?.error, "error");
        console.log("error", error);
      }
    }
  }

  function submitData(data) {
    signin(data?.email, data?.password);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center h-full w-full">LOGO</div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitData)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please provide email",
                  },
                  minLength: {
                    value: 4,
                    message: "Enter email having atleast 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Enter email upto atleast 50 characters",
                  },
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please provide password",
                  },
                  minLength: {
                    value: 4,
                    message: "Enter password having atleast 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Enter password upto atleast 20 characters",
                  },
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm">
                <NavLink to="/signup">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create account
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
