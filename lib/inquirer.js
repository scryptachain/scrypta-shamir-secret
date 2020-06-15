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
  askSecureData: () => {
    const questions = [
      {
        name: 'data',
        type: 'string',
        message: 'Enter the data you want to secure',
        validate: function( value ) {
          if(value.length > 0){
            return true;
          }else{
            console.log('You must write something to secure first.')
          }
        }
      },
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