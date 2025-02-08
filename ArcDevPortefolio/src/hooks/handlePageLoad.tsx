const handlePageLoad = (setIsLoading: (isLoading: boolean) => void) => {
  const loadPage = () => {
    setIsLoading(false); // Finish loading as soon as app content
  };

  if (document.readyState === "complete") {
    loadPage();
  } else {
    window.addEventListener("load", loadPage);
  }

  return () => {
    window.removeEventListener("load", loadPage);
  };
};
export default handlePageLoad;
