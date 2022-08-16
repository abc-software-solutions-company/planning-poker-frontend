import qs from 'qs';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {
  ICategoriesResponse,
  ICategoryResponse,
  IPostResponse,
  IPostsResponse,
  IProjectResponse,
  IProjectsResponse,
  ISectionResponse,
  ISectionsResponse,
  ISettingResponse
} from '@/types';
import {HttpClient} from '@/utils/http-client';

class HttpBase {
  categories = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<ICategoriesResponse>(`${API_ENDPOINTS.CATEGORY}?${query}`);
    },
    get: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<ICategoryResponse>(`${API_ENDPOINTS.CATEGORY}?${query}`);
    }
  };

  posts = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IPostsResponse>(`${API_ENDPOINTS.POST}?${query}`);
    },
    get: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IPostResponse>(`${API_ENDPOINTS.POST}?${query}`);
    }
  };

  sections = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<ISectionsResponse>(`${API_ENDPOINTS.SECTION}?${query}`);
    },
    get: async (sectionId: string, populate?: any) => {
      const query = qs.stringify(populate, {encodeValuesOnly: true});
      return HttpClient.get<ISectionResponse>(`${API_ENDPOINTS.SECTION}/${sectionId}?${query}`);
    }
  };

  projects = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IProjectsResponse>(`${API_ENDPOINTS.PROJECT}?${query}`);
    },
    get: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IProjectResponse>(`${API_ENDPOINTS.PROJECT}?${query}`);
    }
  };

  settings = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<ISettingResponse>(`${API_ENDPOINTS.SETTING}?${query}`);
    }
  };
}

export default new HttpBase();
