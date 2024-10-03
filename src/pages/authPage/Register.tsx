import TextFieldGiveme from "../../components/TextField";
import ButtonGiveme from "../../components/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import React from "react";

export default function Register({
  loginRedirect,
  registerFunc,
}: {
  loginRedirect: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  registerFunc: ({
    email,
    password,
    name,
    confirmpassword,
  }: {
    email: string;
    password: string;
    name: string;
    confirmpassword: string;
  }) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmpassword, setConfirmpassword] = React.useState("");

  const handleRegister = () => {
    registerFunc({ name, email, password, confirmpassword });
  };

  return (
    <section className="w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5">
      <div className="h-full flex items-start w-full">
        <div className="bg-[#4747FF] w-20 h-20 rounded-xl items-center flex justify-center text-white font-medium">
          Logo
        </div>
      </div>
      <div className="flex flex-col justify-start gap-3 h-full w-full">
        <h1 className="sm:text-6xl  text-5xl font-black text-neutral-900">
          Register
        </h1>
        <div className="flex gap-1">
          <p className="text-base text-neutral-40 0">Already registered?</p>
          <p
            className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline"
            onClick={loginRedirect}
          >
            Sign in now
          </p>
        </div>
      </div>
      <div className="w-full gap-7 flex flex-col h-full">
        <TextFieldGiveme
          placeholder="Enter your user..."
          title="User"
          icon={<PersonOutlineOutlinedIcon />}
          onChange={(e) => setName(e.target.value)}
        />
        <TextFieldGiveme
          placeholder="Enter your email..."
          title="Email"
          icon={<EmailOutlinedIcon />}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextFieldGiveme
          placeholder="Enter your password..."
          title="Password"
          icon={<VpnKeyRoundedIcon />}
          onChange={(e) => {
            setPassword(e.target.value);
            setConfirmpassword(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-full flex items-end">
        <div className="w-full">
          <ButtonGiveme buttonText="Register" onClick={handleRegister} />
        </div>
      </div>
    </section>
  );
}
