import * as Yup from 'yup'

function configureValidations(){
  //Parameters: for what kind of, the name, and the validation 
  Yup.addMethod(Yup.string, 'firstLetterUppercase', function(){
    return this.test('first-letter-uppercase',
    //validation error message
    'Textul trebuie sa inceapa cu litera mare', 
    //value=wathever the user puts in the textbox
    function(value){
      if(value && value.length > 0){
        const firstLetter = value.substring(0, 1);
        return firstLetter === firstLetter.toLocaleUpperCase();
      }
      return true;
    })
  })
}

export default configureValidations;