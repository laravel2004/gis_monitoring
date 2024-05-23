"use client"

import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ToastContainer />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
