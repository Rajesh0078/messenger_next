import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/Store/StoreProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-chat-elements/dist/main.css'
const inter = Inter({ subsets: ["greek"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <ToastContainer />
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
