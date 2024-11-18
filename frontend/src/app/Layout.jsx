const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <main className="min-h-screen bg-background dark:bg-background pt-5">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
