const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const API_users = API_URL + '/users';

const testData = '{"success":true,"total_pages":9,"total_users":54,"count":6,"page":8,"links":{"next_url":"https://frontend-test-assignment-api.abz.agency/api/v1/users?page=9&count=6","prev_url":"https://frontend-test-assignment-api.abz.agency/api/v1/users?page=7&count=6"},"users":[{"id":34,"name":"Clifford Lehner","email":"pschinner@welch.net","phone":"+380999068087","position":"Lawyer","position_id":1,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a04f834.jpeg"},{"id":35,"name":"Stanton Nolan","email":"bethany32@yahoo.com","phone":"+380950924426","position":"Designer","position_id":4,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a180435.jpeg"},{"id":36,"name":"Alessandro Jones","email":"qfadel@adams.net","phone":"+380995954494","position":"Security","position_id":3,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a29a836.jpeg"},{"id":37,"name":"Cody Rogahn","email":"noah04@yahoo.com","phone":"+380990070537","position":"Lawyer","position_id":1,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a43c237.jpeg"},{"id":38,"name":"Bernice Hahn","email":"delia.schneider@lueilwitz.com","phone":"+380932275002","position":"Designer","position_id":4,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a544838.jpeg"},{"id":39,"name":"Anna Bertha Cecilia Diana Emily Fanny Gertrude","email":"anna.bertha.cecilia.diana.emily.fanny.gertrude@gmail.com","phone":"+380930579606","position":"Content manager","position_id":2,"registration_timestamp":1604494937,"photo":"https://frontend-test-assignment-api.abz.agency/images/users/5fa2a659a6b1039.jpeg"}]}';

export function getUsers({page = 1, count = 6} = {}) {
    return new Promise((res, rej) => res(JSON.parse(testData)));
    return fetch(API_users + `?page=${page}&count=${count}`).then(data => data.json());
}

export {
    API_users
}