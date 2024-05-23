import { FormEvent, useState } from "react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { UserRegister } from "@/entity/userRegister";
import useAuth from "@/hooks/useAuth";

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const {register} = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleregister = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userRegister : UserRegister = {
      email : formData.get("email") as string,
      name : formData.get("name") as string,
      password : formData.get("password") as string,
      role : 1
    };
    register.mutate(userRegister);
  }

  return (
    <form onSubmit={handleregister} className="grid gap-4 w-80 ">
      <Input label="Username" name="name" variant="bordered" type="text" />
      <Input label="Email" name="email" variant="bordered" type="email" />
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
      <Button color="danger"  type="submit">Register</Button>
    </form>
  );
}