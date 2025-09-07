import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { T_VotedFaqs } from './vote';

const buttons = [
  {
    isUpButton: true,
    icon: <FiThumbsUp />,
    className: 'hover:border-green-500 hover:bg-green-300',
    activeClassName: 'border-green-500 bg-green-300',
  },
  {
    isUpButton: false,
    icon: <FiThumbsDown />,
    className: 'hover:border-red-500 hover:bg-red-300',
    activeClassName: 'border-red-500 bg-red-300',
  },
];

const VoteButton = ({ vote = null, onClick }) => {
  return buttons.map(
    ({ isUpButton, icon, className, activeClassName }, index) => {
      const classNames = [
        'p-2 border rounded-md',
        vote !== null && vote !== undefined && 'pointer-events-none',
        className,
        vote?.isUpVote === isUpButton && activeClassName,
      ];

      return (
        <button
          key={index}
          disabled={!!vote}
          onClick={() => onClick(isUpButton)}
          className={classNames.join(' ')}
        >
          {icon}
        </button>
      );
    }
  );
};

export default VoteButton;
