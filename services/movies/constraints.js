const CREATE = {
  title: {
    presence: true,
    length: {
      maximum: 40
    }
  },
  director: {
    presence: true,
    length: {
      minimum: 5,
      maximum: 30
    }
  },
};

module.exports.CREATE = CREATE;
