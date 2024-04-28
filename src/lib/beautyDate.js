import { DateTime } from "luxon";

export const beautyDate = (stringDate) => {
  if (!stringDate) {
    return DateTime.now().setLocale('ru').toFormat('cccc, dd.MM.yyyy')
  }

  const dateObject = DateTime.fromISO(stringDate).setLocale('ru');

  return dateObject.toFormat('cccc, dd.MM.yyyy');
}


