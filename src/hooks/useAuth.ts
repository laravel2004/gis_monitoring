import { UserLogin } from "@/entity/userLogin";
import { UserRegister } from "@/entity/userRegister";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useAuth() {

  const navigator = useRouter();
  const query = useQueryClient();

  const register = useMutation({
    mutationFn : async (userRegister : UserRegister) => {
      return await axios.post("/api/auth/register", userRegister);
    },
    mutationKey : ["user"],
    onSuccess: (data) => {
      toast.success("Register Success", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      localStorage.setItem("token", data.data.message);
      query.invalidateQueries({queryKey : ["user"]})
      return navigator.push("/dashboard");
    },
    onError: (error : AxiosError | any) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    },
  })

  const login = useMutation({
    mutationFn : async (userLogin : UserLogin) => {
      return await axios.post("/api/auth/login", userLogin);
    },
    mutationKey : ["user"],
    onSuccess: (data) => {
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      localStorage.setItem("token", data.data.message);
      query.invalidateQueries({queryKey : ["user"]})
      return navigator.push("/dashboard");
    },
    onError: (error : AxiosError | any) => {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    query.invalidateQueries({queryKey : ["user"]})
    return navigator.push("/");
  }

  const me = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      query.setQueryData(["user"], response.data);
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });


  return { 
    register,
    login,
    logout,
    me
  }

}