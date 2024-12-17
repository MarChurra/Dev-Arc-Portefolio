interface DownArrowProps {
  nextSectionId: string;
}

const DownArrow: React.FC<DownArrowProps> = ({ nextSectionId }) => {
  return (
    <a className="downArrowHook" href={nextSectionId}>
      <img
        className="downArrow"
        src="/assets/icons/arrow_down.png"
        alt="Clickable arrow to go down a page"
      />
    </a>
  );
};

export default DownArrow;
