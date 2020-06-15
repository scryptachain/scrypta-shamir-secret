const inquirer = require('inquirer');

module.exports = {
  askCreateParams: () => {
    const questions = [
      {
        name: 'shares',
        type: 'number',
        default: 10,
        message: 'Enter number of shares you want to create',
        validate: function( value ) {
          return true;
        }
      },
      {
        name: 'threshold',
        type: 'number',
        default: 5,
        message: 'Enter the minimum amount of shares needed for restore',
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