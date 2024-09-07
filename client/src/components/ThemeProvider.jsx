import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="text-black bg-white  dark:text-gray-200 dark:bg-[rgba(16,23,42)]  ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
