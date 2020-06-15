const inquirer = require('inquirer');

module.exports = {
  askCreateParams: () => {
    const questions = [
      {
        name: 'shares',
        type: 'input',
        message: 'Enter number of shares you want to create (default: 10)',
        validate: function( value ) {
          return true;
        }
      },
      {
        name: 'threshold',
        type: 'input',
        message: 'Enter the minimum amount of shares needed for restore (default: 5)',
        validate: function(value) {
          return true;
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Insert a password to encrypt the data (default: none)',
        validate: function(value) {
          return true;
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};