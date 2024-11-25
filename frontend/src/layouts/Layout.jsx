import { ThemeProvider } from "../components/ThemeProvider";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex bg-background dark:bg-background pt-2 md:pt-4">
        {/* <Header /> */}
        <main className="flex-grow pt-5 md:pt-2">
          <div className="container mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
        </main>
        {/* Footer */}
      </div>
    </ThemeProvider>
  );
};
