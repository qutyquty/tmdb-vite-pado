import React from 'react';

import MediaIntro from './MediaIntro';
import CastList from './CastList';
import TrailerList from './TrailerList';

const MediaDetail = ({ data, credits, videos, type }) => {
  return (
    <div>
      {/** 영화/TV 정보 */}
      <MediaIntro data={data} type={type} />

      {/** 주요 출연진 */}
      <CastList credits={credits} />

      <TrailerList videos={videos} />
    </div>
  );
};

export default MediaDetail;