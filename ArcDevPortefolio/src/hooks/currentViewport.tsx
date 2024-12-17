import { useState, useEffect } from "react";

// Custom Hook to detect screen size

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;

};

export default useIsDesktop

