import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import CaseStudiesInfo from 'data/case-studies';

import { CaseStudy } from 'types/case-studies';

import API from 'services/api';

function addInfoToCaseStudy(c: Partial<CaseStudy>): CaseStudy {
  const caseStudyInfo = CaseStudiesInfo[c?.slug];

  return {
    ...c,
    ...(caseStudyInfo && {
      ...caseStudyInfo?.data,
      content: caseStudyInfo.content,
    }),
  };
}

export function useCaseStudies(queryOptions: UseQueryOptions<CaseStudy[], unknown> = {}) {
  const fetchCaseStudies = () => {
    return API.request({
      method: 'GET',
      url: '/case-studies',
    }).then((response) => response.data);
  };

  const query = useQuery(['case-studies'], fetchCaseStudies, {
    placeholderData: [],
    select: (data: CaseStudy[]) => data.map(addInfoToCaseStudy),
    ...queryOptions,
  });

  return query;
}

export function useCaseStudy(id, queryOptions: UseQueryOptions<CaseStudy, unknown> = {}) {
  const fetchCaseStudy = () => {
    return API.request({
      method: 'GET',
      url: `/case-studies/${id}`,
    }).then((response) => response.data);
  };

  const query = useQuery(['case-study', id], fetchCaseStudy, {
    placeholderData: [],
    select: (data: CaseStudy) => addInfoToCaseStudy(data),
    enabled: !!id,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}
