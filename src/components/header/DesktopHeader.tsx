import LoginOrRegisterButtons from "../loginOrRegisterButtons";

export default function DesktopHeader() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <div className="ml-auto flex gap-2">
          <LoginOrRegisterButtons />
        </div>
      </header>
    </div>
  );
}
