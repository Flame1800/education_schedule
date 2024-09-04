import { DateTime } from "luxon";

export function formatDate(dateISO) {
    const isValidString = dateISO.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)?.[0];

    return isValidString
        ? DateTime.fromISO(dateISO).toFormat("dd.MM.yyyy")
        : "";
}
