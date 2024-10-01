import TextFieldGiveme from "../../components/TextField";
import ButtonGiveme from "../../components/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React from "react";

export default function Login({
  registerRedirect,
  loginFunc,
}: {
  registerRedirect: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  loginFunc: (email: string, password: string) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    loginFunc(email, password);
  };

  return (
    <section className="w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5">
      <div className="bg-[#4747FF] w-20 h-20 rounded-xl flex items-center justify-center text-white font-medium">
        Logo
      </div>
      <div className="flex flex-col justify-start gap-3 mb-12">
        <h1 className="sm:text-6xl text-5xl font-black text-neutral-900">
          Login
        </h1>
        <div className="flex gap-1">
          <p className="text-base text-neutral-400">Don't have an account?</p>
          <p
            className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline"
            onClick={registerRedirect}
          >
            Register
          </p>
        </div>
      </div>
      <div className="w-full gap-12 flex flex-col">
        <TextFieldGiveme
          placeholder="Enter your email..."
          title="Email"
          icon={<EmailOutlinedIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextFieldGiveme
          placeholder="Enter your password..."
          title="Password"
          icon={<PersonOutlineOutlinedIcon />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full h-full flex items-center">
        <div className="w-full">
          <ButtonGiveme buttonText="Login" onClick={handleLogin} />
        </div>
      </div>
    </section>
  );
}
