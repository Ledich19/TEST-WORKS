import { FaLightbulb } from "react-icons/fa";
import { FaFlushed } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";

const CategoryIcon = ({ category, className }: { category: string; className: string  }) => {
  let icon ;

  switch (category) {
    case 'Task': 
    icon = <FaListUl />
    break;
    case 'Idea': 
    icon = <FaLightbulb />
    break;
    default:
      icon = <FaFlushed />
      break;
  }

  return (
    <div title={category} className={className}>{icon}</div>
  )
}

export default CategoryIcon