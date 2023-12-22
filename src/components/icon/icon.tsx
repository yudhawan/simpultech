import SVG from 'react-inlinesvg'
import { IconProp } from '../../types'
const IconComponent: React.FC<IconProp> = ({ name, className }) => {
  return (
    <SVG src={name.src} className={className} />
  )
}

export default IconComponent