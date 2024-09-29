import TextFieldGiveme from "./components/TextField";
import ButtonGiveme from "./components/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React from "react";

export default function Login({
  registerRedirect,
}: {
  registerRedirect: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}) {
  return (
    <section className="w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5">
      <div className="bg-[#4747FF] w-20 h-20 rounded-xl flex items-center justify-center text-white font-medium">
        Logo
      </div>
      <div className="flex flex-col justify-start gap-3 mb-12">
        <h1 className="sm:text-6xl text-5xl font-black text-neutral-900">
          Entrar
        </h1>
        <div className="flex gap-1">
          <p className="text-base text-neutral-400">Não possui registro?</p>
          <p
            className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline"
            onClick={registerRedirect}
          >
            Registrar
          </p>
        </div>
      </div>
      <div className="w-full gap-12 flex flex-col">
        <TextFieldGiveme
          placeholder="Insira seu email..."
          title="Email"
          icon={<EmailOutlinedIcon />}
        />
      </div>
      <div className="w-full h-full flex items-center">
        <div className="w-full">
          <ButtonGiveme buttonText="Entrar" />
        </div>
      </div>
    </section>
  );
}
