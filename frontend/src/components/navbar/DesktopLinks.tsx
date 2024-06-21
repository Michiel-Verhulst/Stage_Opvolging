import { FC } from "react";

interface DesktopLinksProps {
  children: React.ReactNode;
}

const DesktopLinks: FC<DesktopLinksProps> = ({ children }) => {
  return (
    <div className="relative hidden xl:ml-6 xl:block">
      <div className="flex space-x-4">{children}</div>
    </div>
  );
};

export default DesktopLinks;
