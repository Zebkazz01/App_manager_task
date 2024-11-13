import { useAuth } from "../context/AuthContext";

function BackgroundImage() {
  const { user } = useAuth();
  return (
    <div
      style={{
        backgroundImage: `url('../images/${user.background}')`,
      }}
      className="absolute cover bg-cover bottom-0 left-0 right-0 top-0"
    ></div>
  );
}

export default BackgroundImage;
