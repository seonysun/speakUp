/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import useLazyImage from '../../hooks/useLazyImage';
import FavoriteButton from '../Button/FavoriteButton';

function YoutubeCard({
  id,
  item,
  size = 'w-[47%] md:w-[31%]',
  isLCPcandidate,
}) {
  const navigate = useNavigate();
  const imgRef = useLazyImage({ disable: isLCPcandidate });

  return (
    <div
      className={`${size} z-0 mb-2`}
      onClick={() => {
        navigate(`/home/video/${id}`);
      }}
    >
      <div className="relative w-full overflow-hidden rounded-xl pb-[56.25%]">
        <img
          ref={imgRef}
          src={
            isLCPcandidate ? item.thumbnails.standard?.url : '/speakupIcon.png'
          }
          data-src={item.thumbnails.standard?.url || '/speakupIcon.png'}
          alt={item.title}
          onError={(e) => {
            e.currentTarget.src = '/speakupIcon.png';
          }}
          className="absolute inset-0 z-0 size-full object-cover"
        />
      </div>
      <div className="relative p-2">
        <p className="line-clamp-1 text-sm">{item.channelTitle}</p>
        <p className="my-1 line-clamp-2 h-12 font-semibold">{item.title}</p>
        <span className="absolute right-0 top-1">
          <FavoriteButton id={id} />
        </span>
        <p className="line-clamp-2 text-xs text-gray">
          {item.publishedAt.split('T')[0]}
        </p>
      </div>
    </div>
  );
}

export default YoutubeCard;
