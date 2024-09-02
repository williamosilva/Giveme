import TextFieldGiveme from "./components/TextField";
import ButtonGiveme from "./components/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Photo from "../../assets/perfil.jpg";
import Background from "../../assets/gato.jpg";

export default function Login() {
  return (
    <main className="w-[1000px] relative h-[700px] gap-0 p-3 bg-white flex items-center justify-center rounded-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <section className="w-[50%] relative h-full flex flex-col items-start justify-between p-12">
        <div className="bg-[#4747FF] w-20 h-20 rounded-xl flex items-center justify-center text-white font-medium ">
          Logo
        </div>
        <div className="flex flex-col justify-start gap-3  mb-12">
          <h1
            className="text-6xl font-black text-neutral-900
          "
          >
            Registrar
          </h1>
          <div className="flex gap-1">
            <p className="text-base text-neutral-400">Já é registrado?</p>{" "}
            <p className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline">
              Entrar agora
            </p>
          </div>
        </div>
        <div className="w-full gap-12 flex flex-col">
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
        <div className="w-full">
          <ButtonGiveme buttonText="Registrar" />
        </div>
      </section>
      <section className="flex-1  w-[50%] relative h-full  rounded-2xl overflow-hidden block">
        <img src={Background} className="object-cover h-full w-full " />
      </section>
      <section className="absolute flex top-16 left-[37%] transform[translate(-50%, -50%)]">
        <div className="flex flex-col justify-center">
          <p className="text-base text-neutral-400">Dúvidas?</p>
          <p className=" text-base text-[#4747FF] font-bold tracking-tight">
            Me chame!
          </p>
        </div>
        <div className="w-20 h-20 bg-white p-2 rounded-full">
          <img
            alt=""
            className="w-full h-full  object-contain rounded-full"
            src={Photo}
          />
        </div>
      </section>
    </main>
  );
}
