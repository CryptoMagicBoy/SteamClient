function getUserWord() {
  var userWord = prompt("Введите слово:");
  if (userWord === null){
    window.location.replace("/tic_tac_toe");
    return ;
  }
  if ((userWord.length < 4 || userWord.length > 10)){
    alert("Слово должно быть от 4 до 10 букв")
    userWord = getUserWord();
  }
  return userWord ;

}

export { getUserWord };
