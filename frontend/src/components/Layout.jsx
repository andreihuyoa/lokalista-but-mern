export const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <main className="min-h-screen bg-background dark:bg-background pt-5">
        <div className="">{children}</div>
      </main>
    </div>
  );
};
