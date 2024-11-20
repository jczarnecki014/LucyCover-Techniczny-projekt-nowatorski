export const ConvertDateToLocalString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const fullDate = `${year}-${month}-${day}`
        return fullDate;
}