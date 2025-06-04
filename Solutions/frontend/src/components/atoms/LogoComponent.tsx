interface LogoComponentProps {
  pathImage: string;
}

function LogoComponent({ pathImage }: LogoComponentProps) {
  return (
    <a href="/" className="block">
      <img
        src={pathImage}
        alt="Logo do Fitmeet"
        className="w-fit lg:w-[119px] h-[40px] lg:h-auto"
      />
    </a>
  );
}

export default LogoComponent;
