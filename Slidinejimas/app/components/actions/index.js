export const AddUser = (Name, Surname, CompanyName, CheckInTime) => {
  return {
    type: 'ADD_USER_INFO',
    Name,
    Surname,
    CompanyName,
    CheckInTime,
  };
};
