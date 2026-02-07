import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

export const getPopularMovies = async (pages = 1) => {
  const results = [];
  try {
    for (let i = 1; i <= pages; i++) {
      const res = await tmdb.get("/movie/popular", {
        params: { i },
      });
      results.push(...res.data.results);
    }    
    return results;
  } catch (error) {
    console.error("getPopularMovies 에러: ", error);
    return [];
  }
};

export const getPopularTvs = async (pages = 1) => {
  const results = [];
  try {
    for (let i = 1; i <= pages; i++) {
      const res = await tmdb.get("/tv/popular", {
        params: { i },
      });
      results.push(...res.data.results);
    }    
    return results;
  } catch (error) {
    console.error("getPopularTvs 에러: ", error);
    return [];
  }  
};

// 상세 정보 가져오기
export const getMovieDetail = async (id) => {
  const res = await tmdb.get(`/movie/${id}`);
  return res.data;
};

export const getTvDetail = async (id) => {
  const res = await tmdb.get(`/tv/${id}`);
  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await tmdb.get(`/movie/${id}/credits`);
  return res.data.cast;
};

export const getTvCredits = async (id) => {
  const res = await tmdb.get(`/tv/${id}/credits`);
  return res.data.cast;
};

export const getActorMovieCredits = async (id) => {
  const res = await tmdb.get(`/person/${id}/movie_credits`);
  return res.data.cast.map(c => ({
    ...c,
    roleType: c.order <= 2 ? '주연' : '조연'
  }));
};

export const getActorTvCredits = async (id) => {
  const res = await tmdb.get(`/person/${id}/tv_credits`);
  return res.data.cast.map(c => ({
    ...c,
    roleType: c.order <= 2 ? '주연' : '조연'
  }));
};

// 배우 기본 정보
export const getActorDetail = async (id) => {
  try {
    const res = await tmdb.get(`/person/${id}`);
    console.log("getActorDetail data: ", res.data);
    return res.data;
  } catch (error) {
    console.error("getActorDetail 에러: ", error);
    throw error;
  }
};

// 배우 이미지
export const getActorImages = async (id) => {
  const res = await tmdb.get(`/person/${id}/images`);
  return res.data.profiles; // 여러 장의 프로필 이미지 배열
};

export const getActorKnownFor = async (name) => {
  const res = await tmdb.get(`/search/person`, {
    params: { query: name }
  });
  // 첫 번째 결과의 known_for 배열 반환(최대 3개)
  return res.data.results[0]?.known_for || [];
};

export const getActorTopMainRolesByVoteCount = async (id, limit = 10) => {
  const res = await tmdb.get(`/person/${id}/combined_credits`);
  const allWorks = res.data.cast;

  // 주연작 필터링 (order 기준)
  const mainRoles = allWorks.filter(work => {
    // order 값이 존재하고, 2 이하일 경우 주연으로 간주
    return typeof work.order === "number" && work.order <= 2;
  });

  // vote_count 기준 내림차순 정렬
  const sorted = mainRoles.sort((a, b) => b.vote_count - a.vote_count);

  return sorted.slice(0, limit);
};

// 영화 예고편
export const getMovieVideos = async (id) => {
  const res = await tmdb.get(`/movie/${id}/videos`);
  // Trailer, Teaser, Clip 등 모두 포함
  return res.data.results.filter(v => v.site === "YouTube");
};

// TV 예고편
export const getTvVideos = async (id) => {
  const res = await tmdb.get(`/tv/${id}/videos`);
  return res.data.results.filter(v => v.site === "YouTube");
};

// 멀티 검색
export const searchMulti = async (query, page = 1) => {
  const res = await tmdb.get("/search/multi", {
    params: { query, page },
  });
  // 영화/TV만 필터링
  const filteredResults = res.data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  // 메타데이터 유지하면서 results만 교체
  return {
    ...res.data,
    results: filteredResults,
  };
};

// 배우의 전체 커리어 연도별 집계 (영화+TV)
export const getActorCareerByYear = async (id) => {
  const [movies, tvs] = await Promise.all([
    getActorMovieCredits(id),
    getActorTvCredits(id),
  ]);

  const allCredits = [...movies, ...tvs];

  const creditsByYear = allCredits.reduce((acc, item) => {
    const date = item.release_date || item.first_air_date;
    if (!date) return acc;
    const year = date.slice(0, 4);

    if (!acc[year]) acc[year] = { year, lead: 0, support: 0 };
    if (item.roleType === "주연") acc[year].lead++;
    else acc[year].support++;

    return acc;
  }, {});

  console.log("creditsByYear: ", creditsByYear);
  return Object.values(creditsByYear).sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );
};