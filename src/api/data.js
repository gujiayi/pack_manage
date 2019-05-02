import axios from '@/libs/api.request'

export const getUserData = () => {
  return axios.request({
    url: '/admin/user/select',
    method: 'post'
  })
}

export const readUser = ({
  user_id
}) => {
  const data = {
    user_id
  }
  return axios.request({
    url: '/admin/user/read',
    data,
    method: 'post'
  })
}

export const DeleteUser = ({
  user_id
}) => {
  const data = {
    user_id
  }
  return axios.request({
    url: '/admin/user/delete',
    data,
    method: 'post'
  })
}
export const createUser = ({
  username,
  password,
  re_password,
  realname,
  email,
  status,
  roles
}) => {
  const data = {
    username,
    password,
    re_password,
    realname,
    email,
    status,
    roles
  }
  return axios.request({
    url: '/admin/user/create',
    data,
    method: 'post'
  })
}

export const updataUser = ({
  user_id,
  username,
  realname,
  email,
  status,
  roles
}) => {
  const data = {
    user_id,
    username,
    realname,
    email,
    status,
    roles
  }
  return axios.request({
    url: '/admin/user/update',
    data,
    method: 'post'
  })
}

export const getRolesData = () => {
  return axios.request({
    url: '/admin/role/select',
    method: 'post',
    stauts:'1',
  })
}

export const readRole = ({
    role_id
  }) => {
  const data = {
    role_id
  }
  return axios.request({
    url: '/admin/role/read',
    data,
    method: 'post'
  })
}


export const getMenuData = ()=>{
    return axios.request({
    url: '/admin/menu/select',
    method: 'post',
    stauts:'1',
  })
}













export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}
