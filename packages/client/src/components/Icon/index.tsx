import {
  IconProps as IconPropsNative,
  XSquareFill,
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
  InfoSquareFill,
  PauseBtn,
  PencilFill,
  TrashFill,
} from 'react-bootstrap-icons'
import classNames from 'classnames'
import './Icon.scss'
import logo from '@images/Y_log_30_bordo_transp.svg'

const OauthYandexIcon = () => <img width="32px" src={logo} />

const icons = {
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
  XSquareFill,
  InfoSquareFill,
  PauseBtn,
  PencilFill,
  TrashFill,
  OauthYandexIcon,
}

export type IconName = keyof typeof icons
interface IconProps extends IconPropsNative {
  iconName: IconName
}
const Icon = ({ iconName, className: cls, ...props }: IconProps) => {
  const BootstrapIcon = icons[iconName]
  return (
    <div className={classNames('icon', cls)}>
      <BootstrapIcon className="icon__img" {...props} />
    </div>
  )
}
export default Icon
