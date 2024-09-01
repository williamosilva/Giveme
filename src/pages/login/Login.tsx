import TextFieldGiveme from "./components/TextField";

export default function Login() {
  return (
    <main className="w-[1000px] h-[700px] gap-3 p-3 bg-white flex items-center justify-center rounded-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
      <section className="w-full h-full">
        <TextFieldGiveme placeholder="Digite aqui..." title="Nome" />
      </section>
      <section className="w-full h-full  rounded-2xl overflow-hidden">
        <img
          src="https://placehold.co/600x400"
          className="object-cover h-full w-full "
        />
      </section>
    </main>
  );
}
