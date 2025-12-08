import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@seonysun/intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ListNav from './ListNav';
import ListSkeleton from '../../components/Card/ListSkeleton';
import YoutubeCard from '../../components/Card/YoutubeCard';
import { LIST_MENU, MAX_LIST_LENGTH, SKELETON } from '../../constants/uiData';
import videoOptions from '../../utils/api/videoOptions';

function List() {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(LIST_MENU[0]);
  useEffect(() => {
    const selectedPlaylist = LIST_MENU.find((menu) => menu.to === playlistId);
    if (selectedPlaylist) {
      setPlaylist(selectedPlaylist);
    }
  }, [playlistId]);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(videoOptions.playList(playlist.playlist));

  const observerRef = useIntersectionObserver({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <>
      <ListNav playlist={playlist} setPlaylist={setPlaylist} />
      <div className="my-3 pt-[96px]">
        {isLoading ? (
          <ListSkeleton
            num={MAX_LIST_LENGTH.LIST.ITEMS}
            size={SKELETON.responsive23}
          />
        ) : (
          <div className="flex flex-wrap gap-4 lg:gap-x-6">
            {data?.pages.flatMap((page) =>
              page.items.map((item) => (
                <YoutubeCard
                  key={item.id}
                  id={item.snippet.resourceId.videoId}
                  item={item.snippet}
                />
              )),
            )}
          </div>
        )}
      </div>
      {isFetchingNextPage && (
        <ListSkeleton
          num={MAX_LIST_LENGTH.VIDEO.ITEMS}
          size={SKELETON.responsive23}
        />
      )}
      <div ref={observerRef} className="h-10" />
    </>
  );
}

export default List;
