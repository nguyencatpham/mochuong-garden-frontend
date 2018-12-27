import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import axios from 'axios'
import constant from '../config/default'
import { notification } from 'antd'
import { createGroupPolicy } from '../services/policy'
import { setUserDetailPage, updateUserState } from 'reducers/user'
export const REDUCER = 'group'

const NS = `@@${REDUCER}/`
const api = constant.api.authen
const groupApi = `${api.host}/${api.group}`

export const setGroupPage = createAction(`${NS}SET_GROUP_PAGE`)
export const setGroupDetailPage = createAction(`${NS}SET_GROUP_DETAIL_PAGE`)
export const createGroupState = createAction(`${NS}CREATE_GROUP`)
export const getPermissions = createAction(`${NS}GET_GROUP_PERMISSION`)
export const updateGroupState = createAction(`${NS}UPDATE_GROUP`)


export const getList = (limit = 10, page = 0, sort = 'name', isAsc = false) => (
  dispatch,
  getState,
) => {
  axios
    .get(groupApi, { params: { limit: limit, page: page, sort: sort, isAsc: isAsc } })
    .then(response => {
      let { groups, page, totalItems } = response.data
      if (!groups) {
        groups = []
      }
      dispatch(setGroupPage({ groups, page, totalItems }))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get groups fail'
      message.error(errorMessage)
    })
}
export const getOne = id => (dispatch, getState) => {
  axios
    .get(`${groupApi}/${id}`)
    .then(response => {
      dispatch(setGroupDetailPage(response.data))
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'get groups fail'
      message.error(errorMessage)
    })
}
export const changeStatus = (id, status) => (dispatch, getState) => {
  axios
    .patch(`${groupApi}/${id}`, { active: status })
    .then(response => {
      if (response && response.data) {
        let { groups, page, totalItems } = getState().group
        if (groups && Array.isArray(groups) && groups.length > 0) {
          let groupId = groups.findIndex(x => x.id === response.data.id)
          if (groupId) {
            groups[(id = groupId)] = response.data
            dispatch(setGroupPage({ groups, page, totalItems }))
            notification['success']({
              message: 'Change status of users success!',
              description:
                'Users status are updated. When users was left their job, you will remove them by delete users button or just deactive these users.',
            })
          }
        }
      }
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'change status groups fail'
      message.error(errorMessage)
    })
}

export const create = (model, isCreate = false) => (dispatch, getState) => {
  console.log('create group', model)
  dispatch(createGroupState(model))
  if (isCreate) {
    axios
      .post(groupApi, { name: model.name })
      .then(response => {
        let { groups, page, totalItems } = getState().group
        groups.push(response.data)
        dispatch(setGroupPage({ groups, page, totalItems: totalItems++ }))
        if (model.permissions && Array.isArray(model.permissions) && model.permissions.length > 0) {
          createGroupPolicy(response.data.uuid, {
            policyIds: model.permissions.map(x => x.policyId).join(),
          })
            .then(message.success('attach permission success'))
            .catch(error => {
              let errorMessage =
                ((error.response || {}).data || {}).message ||
                `create permission for user ${model.username} fail`
              message.error(errorMessage)
            })
        }
        if (model.users && Array.isArray(model.users) && model.users.length > 0) {
          let userIds = model.users.map(x => x.id).join()
          dispatch(addUsers(response.data.id, userIds))
        }
        dispatch(createGroupState({}))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'create groups fail'
        message.error(errorMessage)
      })
  }
}
export const update = (id, model, isUpdate) => (dispatch, getState) => {
  let { groups, page, totalItems, detail } = getState().group
  dispatch(setGroupDetailPage({ ...detail, name: model.name }))
  if (isUpdate) {
    axios
      .patch(`${groupApi}/${id}`, { name: model.name })
      .then(response => {
        notification['success']({
          message: 'Update group success!',
          description: 'These groups is updated successfully!',
        })
        let group = groups.find(x => x.id === response.data.id)
        if (group) {
          group = response.data
        }
        dispatch(setGroupPage({ groups, page, totalItems: totalItems }))
      })
      .catch(error => {
        let errorMessage = ((error.response || {}).data || {}).message || 'update groups fail'
        message.error(errorMessage)
      })
  }
}
export const addUsers = (id, userIds) => (dispatch, getState) => {
  console.log('adding user', id, userIds)
  axios
    .post(`${groupApi}/${id}/addusers?ids=${userIds}`)
    .then(response => {
      let { groups, page, totalItems } = getState().group
      let { detail } = getState().user
      if (groups && Array.isArray(groups) && groups.length > 0) {
        let group = groups.find(x => x.id === id)
        if (group) {
          ((detail || {}).groups || []).push(group)
          dispatch(setUserDetailPage(detail))
        }
      }
    }).catch(error => {
      console.log(error)
      let errorMessage = ((error.response || {}).data || {}).message || 'add user to group fail'
      message.error(errorMessage)
    })
}
export const removeUsers = (id, userIds) => (dispatch, getState) => {
  console.log('removing user')
  axios
    .delete(`${groupApi}/${id}/removeusers?ids=${userIds}`)
    .then(response => {
      let { detail } = getState().user
      if(detail){
        dispatch(setUserDetailPage({ ...detail, groups: (detail.groups || []).filter(x => x.id !== id) }))
      }
    }).catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'remove user to group fail'
      message.error(errorMessage)
    })
}
export const changeGroupsForUser = (groupIds, userId, isChange = false) => (dispatch, getState) => {
  console.log('change group for user in group reducer', groupIds, userId, isChange)
  dispatch(updateUserState({ userId, groups: groupIds }))
  if (isChange) {
    // get current users in this group, then compare the list to detect add or remove
    axios.get(`${groupApi}/byuser/${userId}`).then(response => {
      let groups = response.data.groups || []
      let groupRemoves = groups.filter(x => !groupIds.includes(x.id)).map(x => x.id)
      let groupAdds = groupIds.filter(x => !groups.find(a => a.id === x))
      console.log(groupRemoves, groupAdds)

      console.log('wait all promise...')
      let result = Promise.all(groupAdds.map(x => dispatch(addUsers(x, userId)))).then(
        data => Promise.all(groupRemoves.map(x => dispatch(removeUsers(x, userId))))
      )
      // reset when done
      result.then(data => {
        console.log('reset when done', data)
        dispatch(updateUserState({ userId, groups: [] }))
        notification['success']({
          message: 'Change groups for user success!',
          description: 'These groups is updated successfully!',
        })
      })
    }).catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'change groups for user fail'
      message.error(errorMessage)
    })
  }
}
export const changeUsersForGroup = (groupId, userIds, isChange = false) => (dispatch, getState) => {
  console.log('change  user in group reducer', groupId, userIds, isChange)
  dispatch(updateGroupState({ groupId, userIds }))
  if (isChange) {
    // get current users in this group, then compare the list to detect add or remove
    axios.get(`${groupApi}/${groupId}`).then(response => {
      let users = response.data.users || []
      let userRemoves = users.filter(x => !userIds.includes(x.id)).map(x => x.id)
      let userAdds = userIds.filter(x => !users.find(a => a.id === x))
      console.log(userRemoves, userAdds)
      if (userAdds && userAdds.length > 0) {
        dispatch(addUsers(groupId, userAdds))
      }
      if (userRemoves && userRemoves.length > 0) {
        dispatch(removeUsers(groupId, userRemoves))
      }
      dispatch(updateGroupState({ groupId, userIds: [] }))
      notification['success']({
        message: 'Change users for group success!',
        description: 'This group is updated successfully!',
      })
    }).catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'change users for group fail'
      message.error(errorMessage)
    })
  }
}
export const destroy = ids => (dispatch, getState) => {
  axios
    .delete(`${groupApi}?ids=${ids}`)
    .then(response => {
      notification['success']({
        message: 'Delete group success!',
        description:
          'These groups will be delete permanly shortly in 1 month. In that time, if you re-create these group, we will revert information for them.',
      })
      let { groups, page, totalItems } = getState().group
      dispatch(
        setGroupPage({
          groups: groups.filter(group => !ids.includes(group.id)),
          page,
          totalItems: totalItems - ids.length,
        }),
      )
    })
    .catch(error => {
      let errorMessage = ((error.response || {}).data || {}).message || 'delete groups fail'
      message.error(errorMessage)
    })
}
const initialState = {
  totalItems: -1,
  page: 0,
  groups: [],
  groupCreate: {},
  detail: {},
}
const ACTION_HANDLES = {
  [setGroupPage]: (state, { groups, page, totalItems }) => ({ ...state, groups, page, totalItems }),
  [setGroupDetailPage]: (state, detail) => ({ ...state, detail }),
  [createGroupState]: (state, groupCreate) => ({ ...state, groupCreate }),
  [getPermissions]: (state, permissions) => ({ ...state, permissions }),
  [updateGroupState]: (state, groupUpdate) => {
    console.log('handle action update group', state, groupUpdate)
    return { ...state, detail: { ...state.detail, groupUpdate } }
  },
}
export default createReducer(ACTION_HANDLES, initialState)
