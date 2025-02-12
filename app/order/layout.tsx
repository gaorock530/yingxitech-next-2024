import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CheckLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<CircularProgress />}>

  {children}
  </Suspense>
}