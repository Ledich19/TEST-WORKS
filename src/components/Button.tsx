interface ButtonProps {
  name: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button  = ({ name, className, onClick}: ButtonProps) => {
  return (
    <button 
    onClick={onClick} 
    className={className}
    >{name}</button>
  )
}

export default Button 