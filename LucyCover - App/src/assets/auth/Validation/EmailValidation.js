const emailREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const CheckEmailIsValid = (email) => {
  return email.match(emailREGEX);
};
