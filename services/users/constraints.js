const CREATE = {
  email: {
    presence: true,
    email: true
  },
  name: {
    presence: true,
    length: {
      minimum: 5,
      maximum: 30
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 5,
      maximum: 30
    }
  }
};

module.exports.CREATE = CREATE;
