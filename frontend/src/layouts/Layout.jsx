import { ThemeProvider } from "../components/ThemeProvider";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background p-4 md:p-6">
        {/* <Header /> */}
        <main className="container mx-auto flex-grow pt-5 md:pt-2 px-2 sm:px-6 lg:px-8">
          {children}
        </main>
        {/* Footer */}
      </div>
    </ThemeProvider>
  );
};
