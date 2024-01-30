export function calculateAge(birthday: any) {
    let bday = new Date(birthday).getTime();
    var ageDifMs = Date.now() - bday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function formatDate(date: any) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}