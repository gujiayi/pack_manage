import axios from '@/libs/api.request'

export const login = ({
  username,
  password,
  captcha
}) => {
  const data = {
    username,
    password,
    captcha
  }
  return axios.request({
    url: '/admin/login/index',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'admin/user/self',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'admin/logout/index',
    method: 'post'
  })
}

export const getCodeImg = () => {
  return axios.request({
    url: '/captcha',
    method: 'get',
    responseType: 'arraybuffer'
  })
}
  //修改密码
  export const modify_password = ({
    old_password,
    new_password,
    re_password
  }) => {
    const data = {
      old_password,
      new_password,
      re_password
    }
    return axios.request({
      url: '/admin/user/modify_password',
      data,
      method: 'post'
    })
  }

