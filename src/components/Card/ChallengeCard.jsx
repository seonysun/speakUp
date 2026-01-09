/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import useLazyImage from '../../hooks/useLazyImage';
import FavoriteButton from '../Button/FavoriteButton';

function ChallengeCard({
  item,
  isLoading,
  size = 'w-[47%] md:w-[31%]',
  isLCPcandidate = true,
}) {
  const navigate = useNavigate();
  const imgRef = useLazyImage({ disabled: isLCPcandidate });

  if (isLoading) {
    return (
      <div className={`${size} flex flex-col gap-3 px-2`}>
        <div className="aspect-square animate-spark rounded-xl bg-gray-300" />
        <p className="h-3 animate-spark rounded-md bg-gray-300 text-sm" />
        <p className="h-3 animate-spark rounded-md bg-gray-300 text-sm" />
      </div>
    );
  }

  return (
    <div
      className={`${size} overflow-hidden px-2`}
      onClick={() => {
        navigate(`/home/detail/${item.id}`);
      }}
    >
      <div className="aspect-square rounded-xl border">
        <picture>
          <source srcSet="/speakupIcon.avif" type="image/avif" />
          <source srcSet="/speakupIcon.webp" type="image/webp" />
          <img
            ref={imgRef}
            src="/speakupIcon.png"
            data-src={item.thumbnail}
            alt={item.title}
            onError={(e) => {
              e.currentTarget.src = '/speakupIcon.png';
            }}
            className="size-full rounded-xl"
          />
        </picture>
      </div>
      <div className="relative p-2">
        <p className="line-clamp-1 text-sm">{item.category}</p>
        <p className="my-1 line-clamp-2 h-12 font-semibold">{item.title}</p>
        <span className="absolute right-0 top-1">
          <FavoriteButton id={item.id} type="bookmark" size="23" />
        </span>
        <p className="line-clamp-2 text-xs">{item.description}</p>
      </div>
    </div>
  );
}

export default ChallengeCard;
