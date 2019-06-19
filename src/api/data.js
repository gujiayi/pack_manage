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
    status:'1',
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

export const createRole = ({
  name,
  ordid,
  status,
  routes
}) => {
  const data = {
    name,
    ordid,
    status,
    routes
  }
  return axios.request({
    url: '/admin/role/create',
    data,
    method: 'post'
  })
}

export const updataRole = ({
  role_id,
  name,
  ordid,
  status,
  routes
}) => {
  const data = {
    role_id,
    name,
    ordid,
    status,
    routes
  }
  return axios.request({
    url: '/admin/role/update',
    data,
    method: 'post'
  })
}

export const DeleteRole = ({
  role_id
}) => {
  const data = {
    role_id
  }
  return axios.request({
    url: '/admin/role/delete',
    data,
    method: 'post'
  })
}





export const getMenuTreeData = ()=>{
    return axios.request({
    url: '/admin/menu/access_menu',
    method: 'post',
    status:'1',
  })
}

export const getMasterPackageData = ()=>{
  return axios.request({
  url: '/admin/master_package/select',
  method: 'post',
  status:'1',
})
}

export const createMasterPackage = ({
  name,
  apk_name,
  path
}) => {
  const data = {
    name,
    apk_name,
    path
  }
  return axios.request({
    url: '/admin/master_package/create',
    data,
    method: 'post'
  })
}
export const readMasterPackage = ({
  id
}) => {
  const data = {
    id
  }
  return axios.request({
    url: '/admin/master_package/read',
    data,
    method: 'post'
  })
}
export const updataMasterPackage = ({
  id,
  name,
  apk_name,
  path,
  status
}) => {
  const data = {
    id,
    name,
    apk_name,
    path,
    status
  }
  return axios.request({
    url: '/admin/master_package/update',
    data,
    method: 'post'
  })
}

export const DeleteMasterPackage = ({
  id
}) => {
  const data = {
    id
  }
  return axios.request({
    url: '/admin/master_package/delete',
    data,
    method: 'post'
  })
}


export const getTaskData = ()=>{
  return axios.request({
  url: '/admin/task/select',
  method: 'post'
})
}

export const readTask = ({
  id
}) => {
  const data = {
    id
  }
  return axios.request({
    url: '/admin/task/read',
    data,
    method: 'post'
  })
}
export const createTask = ({
    master_package_id,
    name,
    type_id,
    task_data
}) => {
  const data = {
    master_package_id,
    name,
    type_id,
    task_data
  }
  return axios.request({
    url: '/admin/task/create',
    data,
    method: 'post'
  })
}

export const getTaskTypeData = ()=>{
  return axios.request({
  url: '/admin/task_type/select',
  method: 'post'
})
}


//menu
export const getMenuData = () => {
  return axios.request({
    url: '/admin/menu/select',
    method: 'post',
    status:'1',
  })
}
export const readMenu = ({
  menu_id
}) => {
  const data = {
    menu_id
  }
  return axios.request({
    url: '/admin/menu/read',
    data,
    method: 'post'
  })
}
export const DeleteMenu = ({
  menu_id
}) => {
  const data = {
    menu_id
  }
  return axios.request({
    url: '/admin/menu/delete',
    data,
    method: 'post'
  })
}
export const createMenu = ({
  route,
  name
}) => {
  const data = {
    route,
    name
  }
  return axios.request({
    url: '/admin/menu/create',
    data,
    method: 'post'
  })
}
export const updataMenu = ({
  menu_id,
  route,
  name
}) => {
  const data = {
    menu_id,
    route,
    name
  }
  return axios.request({
    url: '/admin/menu/update',
    data,
    method: 'post'
  })
}
//chart图表

export const getChart = ({
  route,
  start_date,
  end_date
}) => {
  const data = {
    route,
    start_date,
    end_date
  }
  return axios.request({
    url: '/admin/menu/graph',
    data,
    method: 'post'
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
