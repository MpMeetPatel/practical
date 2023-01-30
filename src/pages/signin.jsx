import { ErrorMessage } from "@hookform/error-message";
import { Button, Input } from "antd";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { server } from "../api/server";
import { AuthContext } from "../utils/authContext";
import { history } from "../utils/history";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    control,
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
      const user = data[Math.floor(Math.random() * 3)].data;
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
          <Input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <Controller
                control={control}
                name="email"
                render={({ onChange, value }) => (
                  <Input
                    id="email"
                    type="email"
                    onChange={onChange}
                    value={value}
                    placeholder="Email address"
                  />
                )}
              ></Controller>

              <div className="text-red-500 text-xs">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Controller
                control={control}
                name="password"
                render={({ onChange, value }) => (
                  <Input
                    control={control}
                    id="password"
                    type="password"
                    onChange={onChange}
                    value={value}
                    placeholder="Password"
                  />
                )}
              ></Controller>

              <div className="text-red-500 text-xs">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>
          </div>

          <div>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>

            {/* <div className="flex justify-between items-center mt-2">
              <div className="text-sm">
                <NavLink to="/signup">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create account
                  </a>
                </NavLink>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </main>
  );
}
