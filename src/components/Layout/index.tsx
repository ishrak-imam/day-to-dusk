import { type FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};
