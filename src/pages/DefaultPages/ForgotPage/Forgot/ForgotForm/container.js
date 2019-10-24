import { REDUCER, submit } from 'reducers/forgot'

export const mapDispathToProps = {
  submit: (alias, username) => submit(alias, username),
}
export const mapStateToProps = (state, props) => {
  return {
    isSubmitForm: state.app.submitForms[REDUCER],
  }
}

export default { mapStateToProps, mapDispathToProps }
