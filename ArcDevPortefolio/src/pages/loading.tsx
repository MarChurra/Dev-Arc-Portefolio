const Loading: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <img
          className="loading-logo"
          src="/assets/icons/loading.png"
          alt="Front page Logo"
        />
      </div>
    </div>
  );
};

export default Loading;
