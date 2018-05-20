export function validateCheckIn(inputObj) {
  return genericValidator(inputObj.name, inputObj.surname, inputObj.awaiter);
}

export function validateCheckOut(inputObj) {
  return genericValidator(inputObj.name, inputObj.surname);
}

export function validateDelivery(inputObj) {
  return genericValidator(inputObj.name, inputObj.surname, inputObj.companyName);
}
function genericValidator(){
  for (let argNum = 0; argNum < arguments.length; argNum++) {
    if (arguments[argNum].trim() == '')
      return false;
  }
  return true;
}
