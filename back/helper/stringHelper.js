const stringHelper = {};

stringHelper.buildFirstLastName = (name = "") => {
  name = name.split(' ');
  const firstName = name[0];
  name.shift();
  const lastName = name.join(' ');
  return {
    firstName, lastName
  }
}

module.exports = stringHelper;