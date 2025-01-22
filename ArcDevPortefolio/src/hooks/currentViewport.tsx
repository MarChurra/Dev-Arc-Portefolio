import { useState, useEffect } from "react";

// Custom Hook to detect screen size

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;

};

export default useIsDesktop

