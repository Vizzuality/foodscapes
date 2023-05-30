import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CaseStudy } from 'types/case-studies';

import CaseStudiesInfo from 'data/case-studies';

import API from 'services/api';

function addInfoToCaseStudy(caseStudy) {
  const caseStudyInfo = CaseStudiesInfo[caseStudy?.slug];

  return {
    ...caseStudy,
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
    }).then((response) =>
      response.data
        .map((caseStudy) => addInfoToCaseStudy(caseStudy))
        .filter(({ content }) => !!content)
    );
  };

  const query = useQuery(['case-studies'], fetchCaseStudies, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}

export function useCaseStudy(id, queryOptions: UseQueryOptions<CaseStudy, unknown> = {}) {
  const fetchCaseStudy = () => {
    return API.request({
      method: 'GET',
      url: `/case-studies/${id}`,
    }).then((response) => addInfoToCaseStudy(response.data));
  };

  const query = useQuery(['case-study', id], fetchCaseStudy, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
