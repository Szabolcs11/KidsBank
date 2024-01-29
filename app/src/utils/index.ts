export function calculateAge(birthday: any) {
    let bday = new Date(birthday).getTime();
    var ageDifMs = Date.now() - bday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}