import React from 'react';

import MediaIntro from './MediaIntro';
import CastList from './CastList';
import TrailerList from './TrailerList';

const MediaDetail = ({ data, directors, casts, videos, type }) => {
  return (
    <div>
      {/** 영화/TV 정보 */}
      <MediaIntro data={data} type={type} directors={directors} />

      {/** 주요 스태프&출연진 */}
      <CastList casts={casts} directors={directors} />

      <TrailerList videos={videos} />
    </div>
  );
};

export default MediaDetail;