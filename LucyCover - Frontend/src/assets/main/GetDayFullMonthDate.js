
export const GetDayFullMonthDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const fullNameMonth = new Intl.DateTimeFormat("pl-PL", {month:'long'}).format(date);
    return `${day} ${fullNameMonth}`;
  }

