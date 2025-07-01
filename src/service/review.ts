import { client } from './index';

export const updateReview = async (
  reviewId: number,
  data: {
    customerId: number;
    content: string;
    rating: number;
  }
): Promise<{
  resultCode: string;
  result: string;
}> => {
  const response = await client.put(`/api/reviews/${reviewId}`, data);
  return response.data;
};

export const deleteReview = async (
  reviewId: number,
  customerId: number
): Promise<{
  resultCode: string;
  result: string;
}> => {
  const response = await client.delete(`/api/reviews/${reviewId}`, {
    params: { customerId },
  });
  return response.data;
};

interface CreateReviewRequest {
  id: number;
  customerId: number;
  nickname: string;
  hotelId: number;
  content: string;
  rating: number;
}

interface CreateReviewResponse {
  resultCode: string;
  result: {
    reviewId: number;
    customerId: number;
    hotelId: number;
    nickname: string;
    content: string;
    rating: number;
  };
}

export const createReview = async (
  data: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  const response = await client.post('/api/reviews', data);
  return response.data;
};

// 너무 복잡해서 chatGPT 돌렸어요
// 리팩토링 필요
export const getHotelReviews = async (
  hotelId: number,
  pageable: {
    page: number;
    size: number;
    sort: string[]; // 예: ["rating,desc"]
  }
): Promise<{
  resultCode: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
      unpaged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
    };
    content: {
      reviewId: number;
      customerId: number;
      hotelId: number;
      nickname: string;
      content: string;
      rating: number;
    }[];
  };
}> => {
  const response = await client.get(`/api/reviews/hotels/${hotelId}`, {
    params: pageable,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();
      query.append('page', String(params.page));
      query.append('size', String(params.size));
      params.sort.forEach((s: string) => query.append('sort', s));
      return query.toString();
    },
  });

  return response.data;
};

// 너무 복잡해서 chatGPT 돌렸어요
// 리팩토링 필요
export const getCustomerReviews = async (
  customerId: number,
  pageable: {
    page: number;
    size: number;
    sort: string[]; // 예: ["rating,desc"]
  }
): Promise<{
  resultCode: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
      unpaged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
    };
    content: {
      reviewId: number;
      customerId: number;
      hotelId: number;
      nickname: string;
      content: string;
      rating: number;
    }[];
  };
}> => {
  const response = await client.get(`/api/reviews/customers/${customerId}`, {
    params: pageable,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();
      query.append('page', String(params.page));
      query.append('size', String(params.size));
      params.sort.forEach((s: string) => query.append('sort', s));
      return query.toString();
    },
  });

  return response.data;
};