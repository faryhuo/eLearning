// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** search Exam GET /api/Exam/list */
export async function exam(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ExamListItem>('/api/exam', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** update Exam PUT /api/Exam */
export async function updateExam(options?: { [key: string]: any }) {
  return request<API.ExamListItem>('/api/exam', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/**add Exam POST /api/Exam */
export async function addExam(options?: { [key: string]: any }) {
  return request<API.ExamListItem>('/api/exam', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** delete Exam DELETE /api/Exam */
export async function removeExam(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/exam', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}

