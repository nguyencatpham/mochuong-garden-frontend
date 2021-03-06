import { REDUCER, submit } from 'reducers/recovery'

export const mapDispathToProps = {
  submit: (alias, username, newPassword, confirmPassword, token) => submit(alias, username, newPassword, confirmPassword, token)
}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER]
  }
}

export default { mapStateToProps, mapDispathToProps }
