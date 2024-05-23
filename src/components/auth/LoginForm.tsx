import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { FormEvent, useState } from "react";
import { UserLogin } from "@/entity/userLogin";
import useAuth from "@/hooks/useAuth";



export default function LoginForm() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible)
  const {login} = useAuth();

  const onSubmit =  async(event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userLogin : UserLogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };
    login.mutate(userLogin);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 w-80 ">
      <Input name="email" label="Email" variant="bordered" type="email" />
      <Input
      name="password"
      label="Password"
      variant="bordered"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
      <Button color="danger"  type="submit">Login</Button>
    </form>
  );
}