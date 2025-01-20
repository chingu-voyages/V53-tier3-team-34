const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-16 md:gap-10 p-8 md:p-16">{children}</div>
  );
};

export default ContentLayout;
