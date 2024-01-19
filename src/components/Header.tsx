import Image from "next/image";

export const Header = () => {
  return (
    <header style={{ textAlign: "center", fontSize: "30px" }}>
      <Image src={"/icon.png"} alt={`icon`} width={60} height={60} />
      {/* Scors */}
    </header>
  );
};
