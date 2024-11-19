import { ThemeProvider } from "../components/ThemeProvider";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-screen flex flex-col bg-background dark:bg-background pt-5 md:pt-2">
        {/* <Header /> */}
        <div className="">{children}</div>
      </main>
    </ThemeProvider>
  );
};
