export default function Button(props: buttonProps) {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
      style={props.style}
      // style={{backgroundColor: "#6d2bbd"}}
    >
      {props.children}
    </button>
  );
}

interface buttonProps {
  children: React.ReactNode;
  onClick?(): void;
  type: "button" | "submit";
  disabled: boolean;
  className: string;
  style?: any;
}

Button.defaultProps = {
  type: "button", 
  disabled: false,
  className: "btn btn-primary",
};
