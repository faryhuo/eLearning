// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** search Exam GET /api/Exam/list */
export async function examSubject(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ExamListItem>('/api/exam/subject', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** update Exam PUT /api/Exam */
export async function updateExamSubject(options?: { [key: string]: any }) {
  return request<API.ExamListItem>('/api/exam/subject', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/**add Exam POST /api/Exam */
export async function addExamSubject(options?: { [key: string]: any }) {
  return request<API.ExamListItem>('/api/exam/subject', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** delete Exam DELETE /api/Exam */
export async function removeExamSubject(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/exam/subject', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}

