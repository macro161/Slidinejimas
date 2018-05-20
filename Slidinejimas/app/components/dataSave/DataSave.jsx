export function validateData(props) {
  return props.CompanyName.trim() != '' && props.Name.trim() != '' && props.Surname.trim() != '';
}