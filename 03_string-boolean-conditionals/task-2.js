let userName = 'АННА'
let userSurname = 'ИВАНИЩЕВА'

let normName = userName.substring(0,1).toLowerCase() + userName.substring(1).toLowerCase();
let normSurname = userSurname.substring(0,1).toLowerCase() + userSurname.substring(1).toLowerCase();

console.log (normName, normSurname);
