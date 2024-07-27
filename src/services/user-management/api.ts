// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** search user GET /api/user/list */
export async function user(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** update user PUT /api/user */
export async function updateUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/user', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/**a dd user POST /api/user */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/user', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** delete user DELETE /api/user */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}

  export async function userGroups(
    params: {
      // query
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    return request<API.RuleList>('/api/userGroups', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }
  /** update user PUT /api/user */
  export async function updateUserGroups(options?: { [key: string]: any }) {
    return request<API.UserListItem>('/api/userGroups', {
      method: 'POST',
      data:{
        method: 'update',
        ...(options || {}),
      }
    });
  }
  
  /**a dd user POST /api/user */
  export async function addUserGroups(options?: { [key: string]: any }) {
    return request<API.UserListItem>('/api/userGroups', {
      method: 'POST',
      data:{
        method: 'post',
        ...(options || {}),
      }
    });
  }
  
  /** delete user DELETE /api/user */
  export async function removeUserGroups(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/userGroups', {
      method: 'POST',
      data:{
        method: 'delete',
        ...(options || {}),
      }
    });
}
