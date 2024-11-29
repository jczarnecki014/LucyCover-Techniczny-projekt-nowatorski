const emailREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const phoneREGEX = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/
const zipCodeREGEX = /\d{2}-\d{3}$/


export const CheckEmailIsValid = (email) => {
  return emailREGEX.test(email);
};

export const CheckPhoneIsValid = (phone) => {
  return phoneREGEX.test(phone);
};

export const CheckZipCodeIsValid = (zipCode) => {
  return zipCodeREGEX.test(zipCode);
};

