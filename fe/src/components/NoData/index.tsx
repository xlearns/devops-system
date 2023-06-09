import Icon from '@ant-design/icons';
import { noFileSvg } from './themeIcons';

interface Props {
  text?: string | React.ReactNode;
  className?: string;
}
const noData: React.FC<Props> = ({ text, className }) => {
  return (
    <div
      className={`h-full w-full flex justify-center items-center ${className}`}
    >
      <div className="flex flex-col justify-center">
        <Icon component={noFileSvg} />
        <span className="text-[22px] text-[#5c6ead]">
          {text || 'Nothing yet'}
        </span>
      </div>
    </div>
  );
};
export default noData;
