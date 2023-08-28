export default class UsersDTO {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.birth_date = user.birth_date;
        this.role = user.role;
      }
    }