import TextFieldGiveme from "./components/TextField";
import ButtonGiveme from "./components/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React from "react";

export default function Register({
  loginRedirect,
}: {
  loginRedirect: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}) {
  return (
    <section className="w-[50%] relative h-full grid grid-rows-4 items-start justify-between p-12">
      <div className="h-full flex items-center w-full">
        <div className="bg-[#4747FF] w-20 h-20 rounded-xl flex items-center justify-center text-white font-medium">
          Logo
        </div>
      </div>
      <div className="flex flex-col justify-start gap-3 h-full w-full">
        <h1 className="text-6xl font-black text-neutral-900">Registrar</h1>
        <div className="flex gap-1">
          <p className="text-base text-neutral-40 0">Já é registrado?</p>
          <p
            className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline"
            onClick={loginRedirect}
          >
            Entrar agora
          </p>
        </div>
      </div>
      <div className="w-full gap-12 flex flex-col h-full">
        <TextFieldGiveme
          placeholder="Insira seu usuário..."
          title="Usuário"
          icon={<PersonOutlineOutlinedIcon />}
        />
        <TextFieldGiveme
          placeholder="Insira seu email..."
          title="Email"
          icon={<EmailOutlinedIcon />}
        />
      </div>
      <div className="w-full h-full flex items-center">
        <div className="w-full">
          <ButtonGiveme buttonText="Registrar" />
        </div>
      </div>
    </section>
  );
}
