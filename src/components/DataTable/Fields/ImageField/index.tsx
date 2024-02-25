interface Props {
  url?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ImageField = ({ url, className, style, onClick }: Props) => {
  return (
    <div>
      {url ? (
        <img
          src={url}
          alt="image"
          className={className}
          onClick={onClick}
          style={onClick ? { cursor: "pointer", ...style } : style}
        />
      ) : (
        <div className="bg-gray-100 w-24 h-24 rounded-lg"></div>
      )}
    </div>
  );
};

export default ImageField;
