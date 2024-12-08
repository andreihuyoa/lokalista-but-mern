import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const Layout = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background dark:bg-background flex min-h-screen items-center justify-center p-4 md:p-6">
        {/* <Header /> */}
        <main className="container mx-auto flex-grow px-2 pt-5 sm:px-6 md:pt-2 lg:px-8">
          {children}
          <Toaster />
        </main>
        {/* Footer */}
      </div>
    </ThemeProvider>
  );
};
